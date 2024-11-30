export enum Language {
  RUS='RUS',
  ENG='ENG'
}

export namespace Language {
  export function getAllLanguages(): Language[] {
    return [Language.ENG, Language.RUS];
  }

  export function getCurrencySymbol(language: Language) {
    if (language === Language.RUS) {
      return 'руб';
    } else {
      return '€';
    }
  }

  export function getAdminLanguage() {
    return Language.RUS;
  }
}
