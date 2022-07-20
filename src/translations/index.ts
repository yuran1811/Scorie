import BannerTranslation from './banner';
import PanelTranslation from './panel';
import UtilitiesTranslation from './panel';

const TRANSLATIONS = [BannerTranslation, PanelTranslation, UtilitiesTranslation];

const getTranslations = (lang: string) => {
  const translations = {} as {
    [key: string]: string;
  };

  TRANSLATIONS.forEach((item) =>
    Object.keys(item).forEach((key) => {
      translations[key] = item[key][lang];
    })
  );

  console.log(translations);

  return translations;
};

export default {
  vi: getTranslations('vi'),
  en: getTranslations('en'),
};
