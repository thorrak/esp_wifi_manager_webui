import { persistentAtom } from '@nanostores/persistent'
import { localeFrom, browser, createI18n } from '@nanostores/i18n'
import type { ComponentsJSON } from '@nanostores/i18n'

import es from './translations/es.json'
import fr from './translations/fr.json'
import de from './translations/de.json'

const translations: Record<string, ComponentsJSON> = { es, fr, de }

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
    return translations[code]
  },
})

export function setLocale(code: string) {
  localeSettings.set(code)
}
