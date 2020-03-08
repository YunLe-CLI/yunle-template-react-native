import * as RNLocalize from 'react-native-localize'
import I18n from 'i18n-js'

I18n.defaultLocale = 'en'
I18n.fallbacks = true
I18n.missingTranslation = (scope: any) => scope
I18n.translations = {}

export const locales = ['en', 'de', 'nl']

const fallback = { languageTag: 'en', isRTL: false }
const { languageTag } =
  RNLocalize.findBestAvailableLanguage(locales) || fallback
I18n.locale = languageTag

const localeSpecificImages = {
}

export const getI18nImage = (filename: string): string => {
  const locale = locales.includes(I18n.locale)
    ? I18n.locale
    : I18n.defaultLocale

  return localeSpecificImages[locale][filename]
}

export default I18n