import { UrlObject } from "url"
import { Route } from "next"

export enum Language {
  nl = "nl",
  en = "en",
}

export interface LanguageItem<T> {
  id: Language
  title: string
  isDefault: boolean
  path: UrlObject | Route<`/${Language}`>
}

export const languages: LanguageItem<Language>[] = [
  {
    id: Language.nl,
    title: "NL",
    isDefault: true,
    path: `/${Language.nl}`,
  },
  {
    id: Language.en,
    title: "EN",
    isDefault: false,
    path: `/${Language.en}`,
  },
]

const i18n = {
  languages,
  base: languages.find((item) => item.isDefault)?.id ?? Language.en,
}

export { i18n }
