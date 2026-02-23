import { persistentAtom } from '@nanostores/persistent'
import { localeFrom, browser, createI18n } from '@nanostores/i18n'

export const localeSettings = persistentAtom<string | undefined>(
  'locale',
  undefined
)

export const locale = localeFrom(
  localeSettings,
  browser({ available: ['en', 'es', 'fr', 'de'] as const, fallback: 'en' })
)

export const i18n = createI18n(locale, {
  async get(code) {
    const res = await fetch(`/translations/${code}.json`)
    return res.json()
  },
})

export function setLocale(code: string) {
  localeSettings.set(code)
}
