export enum Language {
  RUS='RUS',
  ENG='ENG'
}

export function getAllLanguages(): Language[] {
  return [Language.ENG, Language.RUS];
}
