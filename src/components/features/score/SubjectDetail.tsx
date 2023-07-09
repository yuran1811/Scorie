import { deleteSubject, editSubject, validateSubjectOption } from '@/services';
import { ScoreDetailType, SubjectDetailType, ToastDefaultConfig } from '@/shared';
import { useStore } from '@/store';
import { shallowObjectCompare, successToast } from '@/utils';
import { AddIcon, CloseIcon, IgnoreIcon, ImportantIcon, ListAllIcon, ListIcon, StarIcon, TrashIcon } from '@cpns/icons';
import { ConfirmBox, FullScreenLoading, Input, TimeContainer, Tooltip } from '@cpns/shared';
import Tippy from '@tippyjs/react/headless';
import { Dispatch, FC, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { ScoreAddNew } from './ScoreAddNew';
import { ScoreContainer } from './ScoreContainer';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ErrorMessage } from '@cpns/interfaces';

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

interface Inputs {
  name: string;
}

export const SubjectDetail: FC<SubjectDetailProps> = ({ style, subject, scores, averageScore, setOpenDetail }) => {
  const currentUser = useStore((s) => s.currentUser);

  const { t } = useTranslation();

  const toastId = useRef<any>(null);

  const [viewMode, setViewMode] = useState('all');
  const [timeoutId, setTimeoutId] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [addNewOpen, setAddNewOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [saveErr, setSaveErr] = useState({ content: '', counter: 0 });
  const [expectedAverage, setExpectedAverage] = useState(subject?.expectedAverage || '');
  const [scoreOptions, setScoreOptions] = useState({
    isIgnored: subject?.isIgnored || false,
    isSpecial: subject?.isSpecial || false,
    isVital: subject?.isVital || false,
  });

  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    values: {
      name: subject?.name || '',
    },
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

    setLoading(true);
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
      })
      .finally(() => setLoading(false));
  }, [subject, scores, scoreOptions, expectedAverage]);

  const removeSubjectRecord = () => {
    if (!currentUser || !currentUser?.uid || !subject?.id)
      return new Promise((res, rej) => {
        rej('Failed');
      });
    return deleteSubject(currentUser.uid, subject.id);
  };

  const onSubmit: SubmitHandler<Inputs> = (data: any) => {
    if (!currentUser || !currentUser?.uid || !subject?.id) return;

    setLoading(true);
    editSubject(currentUser.uid, subject.id, { ...data })
      .then(() => {
        successToast();
        setSaveErr({ content: '', counter: saveErr.counter + 1 });
      })
      .catch(() => {
        setSaveErr({ content: 'Fail to update', counter: saveErr.counter + 1 });
      })
      .finally(() => setLoading(false));
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

  useEffect(() => {
    return () => {
      unregister('name');
    };
  }, []);

  return createPortal(
    <>
      <div className="fullscreen scrollY bg-ctbg text-center font-bold">
        <div className="sticky left-0 right-0 top-0 flex items-center justify-between bg-ctbg p-8">
          <div className="flexcenter w-full flex-wrap lgmb:pl-24">
            <StarIcon
              className="m-[0.6rem] scale-75 cursor-pointer lgmb:m-5 lgmb:scale-100"
              fill={!scoreOptions.isSpecial ? 'white' : '#d97706'}
              width="32"
              height="32"
              onClick={() => setScoreOptions((s) => ({ ...s, isSpecial: !s.isSpecial }))}
            />
            <ImportantIcon
              className="m-[0.6rem] scale-75 cursor-pointer lgmb:m-5 lgmb:scale-100"
              fill={!scoreOptions.isVital ? 'white' : '#94a3b8'}
              width="32"
              height="32"
              onClick={() => setScoreOptions((s) => ({ ...s, isVital: !s.isVital }))}
            />
            <IgnoreIcon
              className="m-[0.6rem] scale-75 cursor-pointer lgmb:m-5 lgmb:scale-100"
              fill={!scoreOptions.isIgnored ? 'white' : '#0891b2'}
              width="32"
              height="32"
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
                    className="m-[0.6rem] scale-75 cursor-pointer text-slate-500 lgmb:m-5 lgmb:scale-100"
                    width="35"
                    height="35"
                  />
                </div>
              </Tippy>
            </div>
          </div>

          <CloseIcon
            className="mx-4 cursor-pointer text-rose-500"
            width="50"
            height="50"
            onClick={() => {
              updateSubjectData();
            }}
          />
        </div>

        <TimeContainer className="text-ctcolor" obj={{ createdAt: subject?.createdAt, updatedAt: subject?.updatedAt }} />

        <div className="flexcentercol gap-6 px-8 py-8 text-ctcolor lgtab:!flex-row lgtab:!items-start lgtab:!justify-around">
          <div className="pt-4 lgtab:sticky lgtab:top-[9rem]">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                className="!max-w-[36rem] !rounded-none !border-0 !bg-transparent !p-0 text-center !text-[5rem] !font-bold"
                defaultValue={subject?.name || ''}
                formHandle={{
                  ...register('name', {
                    validate: {
                      isValid: (v) => /[\w\d\s]*/.test(v.trim()) || 'Invalid name',
                    },
                  }),
                }}
              />
              {errors?.name && <ErrorMessage content={errors.name.message || ''} />}
            </form>

            <div
              className="mx-auto my-4 line-clamp-1 w-max max-w-full rounded-[1rem] px-6 text-center text-[8rem]"
              style={{ ...style }}
            >
              {averageScore}
            </div>
            <div className="flexcenter mt-6 flex-wrap">
              <span className="typo mr-4 p-4">{t('expected score')} </span>
              <div className="w-max">
                <Input
                  className="!max-w-[8rem]"
                  inputMode="decimal"
                  value={expectedAverage}
                  onChange={(e) => {
                    if (!Number(e.currentTarget.value)) setExpectedAverage('');
                    else setExpectedAverage(e.currentTarget.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="flex w-full flex-wrap items-center justify-between bg-ctbg py-6 medmb:px-6 lgtab:sticky lgtab:top-[9rem]">
              <div className="typo-xl line-clamp-1 w-full px-6 text-center font-bold smmb:w-auto smmb:text-left">
                {t('recent')}
              </div>
              <div className="flex w-full items-start justify-center smmb:w-auto smmb:justify-end">
                <Tooltip content="Add new score" options={{ delay: 400 }}>
                  <AddIcon className={`mx-5 cursor-pointer`} width="32" height="32" onClick={() => setAddNewOpen(true)} />
                </Tooltip>
                {addNewOpen && <ScoreAddNew subject={subject} onClick={() => setAddNewOpen(false)} />}
                <Tooltip content="Grid view" options={{ delay: 400 }}>
                  <ListIcon
                    className={`${viewMode === 'group' ? 'block' : 'hidden'} mx-5 cursor-pointer`}
                    width="32"
                    height="32"
                    onClick={() => setViewMode('all')}
                  />
                </Tooltip>
                <Tooltip content="Show all" options={{ delay: 400 }}>
                  <ListAllIcon
                    className={`${viewMode === 'all' ? 'block' : 'hidden'} mx-5 cursor-pointer`}
                    width="32"
                    height="32"
                    onClick={() => setViewMode('group')}
                  />
                </Tooltip>
              </div>
            </div>
            <div className="flexcenter w-full flex-wrap overflow-y-auto pb-6">
              <ScoreContainer viewMode={viewMode} typeList={typeList} subject={subject} scores={scores} />
            </div>
          </div>
        </div>
      </div>

      {loading && <FullScreenLoading />}
    </>,
    document.getElementById('modal-container') as HTMLElement
  );
};
