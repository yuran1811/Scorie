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
        <ViLocale
          className="my-4 mx-6 cursor-pointer"
          width="40"
          height="40"
          onClick={() => changeLanguage('vi')}
        />
      ) : (
        <EnLocale
          className="my-4 mx-6 cursor-pointer"
          width="40"
          height="40"
          onClick={() => changeLanguage('en')}
        />
      )}
    </>
  );
};

export default ChangeLang;
