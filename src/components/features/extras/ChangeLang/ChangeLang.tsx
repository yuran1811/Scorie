import { useStore } from '@/store';
import { EnLocale, ViLocale } from '@cpns/icons';
import i18next from 'i18next';

const ChangeLang = () => {
  const locale = useStore((s) => s.locale);
  const setLocale = useStore((s) => s.setLocale);

  const changeLanguage = (lang: string) => {
    i18next.changeLanguage(lang);
    setLocale(lang);
  };

  return (
    <>
      {locale === 'en' ? (
        <ViLocale className="mx-6 my-4 cursor-pointer" width="32" height="32" onClick={() => changeLanguage('vi')} />
      ) : (
        <EnLocale className="mx-6 my-4 cursor-pointer" width="32" height="32" onClick={() => changeLanguage('en')} />
      )}
    </>
  );
};

export default ChangeLang;
