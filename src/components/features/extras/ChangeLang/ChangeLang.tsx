import { useStore } from '@/store';
import { EnLocale, ViLocale } from '@cpns/icons';
import dayjs from 'dayjs';
import i18next from 'i18next';

const ChangeLang = () => {
  const locale = useStore((s) => s.locale);
  const setLocale = useStore((s) => s.setLocale);

  const changeLanguage = (lang: string) => {
    i18next.changeLanguage(lang);
    dayjs.locale(lang);
    setLocale(lang);
  };

  return (
    <>
      {locale === 'en' ? (
        <ViLocale className="mx-6 my-4 aspect-square w-12 cursor-pointer" onClick={() => changeLanguage('vi')} />
      ) : (
        <EnLocale className="mx-6 my-4 aspect-square w-12 cursor-pointer" onClick={() => changeLanguage('en')} />
      )}
    </>
  );
};

export default ChangeLang;
