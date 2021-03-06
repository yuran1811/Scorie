import { deleteSubject, editSubject, validateSubjectOption } from '@/services';
import { ScoreDetailType, SubjectDetailType, ToastDefaultConfig } from '@/shared';
import { useStore } from '@/store';
import { shallowObjectCompare, successToast } from '@/utils';
import {
  AddIcon,
  CloseIcon,
  IgnoreIcon,
  ImportantIcon,
  ListAllIcon,
  ListIcon,
  StarIcon,
  TrashIcon,
} from '@cpns/icons';
import { ConfirmBox, Input, TimeContainer, Tooltip } from '@cpns/shared';
import { ScoreAddNew } from './ScoreAddNew';
import { ScoreContainer } from './ScoreContainer';
import Tippy from '@tippyjs/react/headless';
import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

interface SubjectDetailProps {
  style: {
    color: string;
    background: string;
  };
  subject: SubjectDetailType | undefined;
  scores: ScoreDetailType[];
  averageScore: string | number;
  setOpenDetail: Dispatch<SetStateAction<boolean>>;
}

export const SubjectDetail: FC<SubjectDetailProps> = ({
  style,
  subject,
  scores,
  averageScore,
  setOpenDetail,
}) => {
  const currentUser = useStore((s) => s.currentUser);

  const { t } = useTranslation();

  const toastId = useRef<any>(null);

  const [viewMode, setViewMode] = useState('all');
  const [timeoutId, setTimeoutId] = useState<any>();
  const [addNewOpen, setAddNewOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [saveErr, setSaveErr] = useState({ content: '', counter: 0 });
  const [expectedAverage, setExpectedAverage] = useState(subject?.expectedAverage || '');
  const [scoreOptions, setScoreOptions] = useState({
    isIgnored: subject?.isIgnored || false,
    isSpecial: subject?.isSpecial || false,
    isVital: subject?.isVital || false,
  });

  const updateSubjectData = useCallback(() => {
    if (!currentUser || !currentUser?.uid || !subject?.id) return;

    const isError = validateSubjectOption({ ...scoreOptions });
    if (isError) {
      setSaveErr({
        content: 'Subject cannot be both ignored and vital (or special)',
        counter: saveErr.counter + 1,
      });
      return;
    }

    if (
      shallowObjectCompare(
        {
          isIgnored: subject.isIgnored,
          isSpecial: subject.isSpecial,
          isVital: subject.isVital,
          expectedAverage: subject.expectedAverage,
        },
        {
          ...scoreOptions,
          expectedAverage: +expectedAverage,
        }
      )
    ) {
      setSaveErr({ content: '', counter: saveErr.counter + 1 });
      setOpenDetail(false);
      return;
    }

    editSubject(currentUser.uid, subject.id, {
      ...scoreOptions,
      scores: [...scores],
      expectedAverage: +expectedAverage,
    })
      .then(() => {
        successToast();
        setSaveErr({ content: '', counter: saveErr.counter + 1 });
        setOpenDetail(false);
      })
      .catch(() => {
        setSaveErr({ content: 'Fail to update', counter: saveErr.counter + 1 });
        clearTimeout(timeoutId);

        setTimeoutId(
          setTimeout(() => {
            setOpenDetail(false);
          }, 2000)
        );
      });
  }, [subject, scores, scoreOptions, expectedAverage]);

  const removeSubjectRecord = () => {
    if (!currentUser || !currentUser?.uid || !subject?.id)
      return new Promise((res, rej) => {
        rej('Failed');
      });
    return deleteSubject(currentUser.uid, subject.id);
  };

  const typeList = useMemo<string[]>(() => {
    if (!scores) return [] as string[];

    const list: {
      [key: string]: boolean;
    } = {};

    scores.forEach((_) => (list[_.type] = true));
    return Object.keys(list) as string[];
  }, [scores]);

  useEffect(() => {
    if (!saveErr.content.length) return;

    toastId.current = toast.error(t(saveErr.content.toLowerCase()), {
      ...ToastDefaultConfig,
      toastId: saveErr.content,
      autoClose: false,
      closeButton: false,
      draggable: false,
    });
  }, [saveErr]);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId);
      toast.update(toastId.current, { autoClose: 1 });
    };
  });

  return createPortal(
    <>
      <div className="fullscreen scrollY bg-violet-200 text-center font-bold text-rose-600">
        <div className="sticky top-0 left-0 right-0 flex items-center justify-between bg-violet-200 p-8">
          <div className="flexcenter w-full flex-wrap mobile:pl-24">
            <StarIcon
              className="m-[0.6rem] scale-75 cursor-pointer mobile:m-5 mobile:scale-100"
              fill={!scoreOptions.isSpecial ? 'white' : '#d97706'}
              width="40"
              height="40"
              onClick={() => setScoreOptions((s) => ({ ...s, isSpecial: !s.isSpecial }))}
            />
            <ImportantIcon
              className="m-[0.6rem] scale-75 cursor-pointer mobile:m-5 mobile:scale-100"
              fill={!scoreOptions.isVital ? 'white' : '#57534e'}
              width="40"
              height="40"
              onClick={() => setScoreOptions((s) => ({ ...s, isVital: !s.isVital }))}
            />
            <IgnoreIcon
              className="m-[0.6rem] scale-75 cursor-pointer mobile:m-5 mobile:scale-100"
              fill={!scoreOptions.isIgnored ? 'white' : '#0891b2'}
              width="40"
              height="40"
              onClick={() => setScoreOptions((s) => ({ ...s, isIgnored: !s.isIgnored }))}
            />

            <div className="custom-tippy">
              <Tippy
                interactive
                visible={showConfirm}
                placement="bottom-end"
                render={(attrs) => (
                  <ConfirmBox
                    {...attrs}
                    className={showConfirm ? '' : 'z-[-1] !hidden'}
                    content="confirm delete subject"
                    setConfirm={setShowConfirm}
                    actionWhenConfirm={removeSubjectRecord}
                  />
                )}
              >
                <div onClick={() => setShowConfirm((s) => !s)}>
                  <TrashIcon
                    className="m-[0.6rem] scale-75 cursor-pointer text-slate-500 mobile:m-5 mobile:scale-100"
                    width="35"
                    height="35"
                  />
                </div>
              </Tippy>
            </div>
          </div>

          <CloseIcon
            className="mx-4 cursor-pointer"
            width="50"
            height="50"
            onClick={() => {
              updateSubjectData();
            }}
          />
        </div>

        <TimeContainer obj={{ createdAt: subject?.createdAt, updatedAt: subject?.updatedAt }} />

        <div className="flexcentercol px-8 py-8">
          <div className="w-full text-center text-[5rem] text-teal-700 line-clamp-1">
            {subject?.name || ''}
          </div>

          <div
            className="my-4 rounded-[1rem] px-6 text-center text-[10rem] line-clamp-1"
            style={{ ...style }}
          >
            {averageScore}
          </div>

          <div className="flexcenter mt-6 mb-12 flex-wrap">
            <span className="mr-4 p-4 text-[3rem] text-indigo-800">{t('expected score')} </span>
            <div className="flex-1">
              <Input
                className="w-[15rem]"
                inputMode="decimal"
                value={expectedAverage}
                onChange={(e) => {
                  if (!Number(e.currentTarget.value)) setExpectedAverage('');
                  else setExpectedAverage(e.currentTarget.value);
                }}
              />
            </div>
          </div>

          <div className="flex w-full flex-wrap items-center justify-between bg-violet-200 py-8 text-slate-800">
            <div className="w-full px-6 text-center text-[4rem] font-bold line-clamp-1 smallmb:w-auto smallmb:text-left">
              {t('recent')}
            </div>
            <div className="flex w-full items-start justify-center smallmb:w-auto smallmb:justify-end">
              <Tooltip
                content="Add new score"
                options={{
                  delay: 400,
                }}
              >
                <AddIcon
                  className={`mx-5 cursor-pointer`}
                  width="50"
                  height="50"
                  onClick={() => setAddNewOpen(true)}
                />
              </Tooltip>
              {addNewOpen && <ScoreAddNew subject={subject} onClick={() => setAddNewOpen(false)} />}

              <Tooltip
                content="Grid view"
                options={{
                  delay: 400,
                }}
              >
                <ListIcon
                  className={`${viewMode === 'group' ? 'block' : 'hidden'} mx-5 cursor-pointer`}
                  width="50"
                  height="50"
                  onClick={() => setViewMode('all')}
                />
              </Tooltip>

              <Tooltip
                content="Show all"
                options={{
                  delay: 400,
                }}
              >
                <ListAllIcon
                  className={`${viewMode === 'all' ? 'block' : 'hidden'} mx-5 cursor-pointer`}
                  width="50"
                  height="50"
                  onClick={() => setViewMode('group')}
                />
              </Tooltip>
            </div>
          </div>
          <div className="flexcenter w-full flex-wrap pb-6">
            <ScoreContainer
              viewMode={viewMode}
              typeList={typeList}
              subject={subject}
              scores={scores}
            />
          </div>
        </div>
      </div>
    </>,
    document.getElementById('modal-container') as HTMLElement
  );
};
