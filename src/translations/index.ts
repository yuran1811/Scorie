import BannerTranslation from './banner';
import PanelTranslation from './panel';
import TooltipTranslation from './tooltip';
import UtilitiesTranslation from './utilities';
import TourTranslation from './tour';

const TRANSLATIONS = [BannerTranslation, PanelTranslation, TooltipTranslation, UtilitiesTranslation, TourTranslation];

const getTranslations = (lang: string) => {
  const translations = {} as {
    [key: string]: string;
  };

  TRANSLATIONS.forEach((item) =>
    Object.keys(item).forEach((key) => {
      translations[key] = item[key][lang];
    })
  );

  return translations;
};

export default {
  vi: getTranslations('vi'),
  en: getTranslations('en'),
};
