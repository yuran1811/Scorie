import { mdConvert } from '@/utils';
import { ModalBox, ModalBoxHeader } from '@cpns/shared';
import { NOTE_RULE } from '@shared/constants';
import { DivProps } from '@shared/types';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const NoteHelp: FC<DivProps> = ({ onClick }) => {
  const [preview, setPreview] = useState(false);

  const { t } = useTranslation();

  return (
    <ModalBox onClick={onClick}>
      <ModalBoxHeader onClick={onClick}>
        <div className="typo-sm cursor-pointer rounded-xl bg-ctbg px-4 py-2" onClick={() => setPreview((s) => !s)}>
          {t(!preview ? 'preview' : 'edit')}
        </div>
      </ModalBoxHeader>
      <div className="h-[40rem] w-[60rem]">
        {preview ? (
          <div
            className="typo-3sm mdformat prose relative min-h-[8rem] overflow-y-auto px-12 font-normal"
            dangerouslySetInnerHTML={{ __html: mdConvert.render(NOTE_RULE) }}
          />
        ) : (
          <textarea
            disabled
            className="typo-3sm h-full w-full bg-transparent px-6 font-normal outline-none"
            value={NOTE_RULE}
          />
        )}
      </div>
    </ModalBox>
  );
};
