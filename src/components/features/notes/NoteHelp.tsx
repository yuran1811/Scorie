import { DivProps, NOTE_RULE } from '@/shared';
import { classnames, mdConvert } from '@/utils';
import { ModalBox, ModalBoxHeader } from '@cpns/shared';
import { Tab } from '@headlessui/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const NoteHelp: FC<DivProps> = ({ onClick }) => {
  const { t } = useTranslation();

  return (
    <ModalBox
      disableContainerClass
      className="rounded-[2rem] border-l-4 border-t-4 border-violet-400/70 bg-gray-900 text-center font-bold text-white"
      onClick={onClick}
    >
      <div className="typo-3sm h-screen max-h-[calc(100vh-5rem)] w-[65rem] max-w-full medtab:max-h-[calc(100vh-15rem)]">
        <Tab.Group>
          <ModalBoxHeader onClick={onClick}>
            <Tab.List className="flexcenter w-full gap-4">
              {['content', 'preview'].map((_) => (
                <Tab
                  key={_}
                  className={({ selected }) =>
                    classnames(
                      'isAnimated w-[12rem] rounded-lg py-2.5 text-current',
                      selected ? 'bg-ctbg' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                    )
                  }
                >
                  {t(_)}
                </Tab>
              ))}
            </Tab.List>
          </ModalBoxHeader>

          <Tab.Panels className="mt-2 h-[calc(100%-9rem)] overflow-auto">
            <Tab.Panel className="h-full w-full">
              <textarea
                disabled
                className={`typo-3sm h-full w-full bg-transparent px-6 font-normal outline-none`}
                value={NOTE_RULE}
              />
            </Tab.Panel>
            <Tab.Panel className="h-full w-full overflow-y-auto">
              <div
                className={`typo-3sm mdformat prose min-h-[8rem] bg-transparent px-12 text-left font-normal`}
                dangerouslySetInnerHTML={{ __html: mdConvert.render(NOTE_RULE) }}
              />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </ModalBox>
  );
};
