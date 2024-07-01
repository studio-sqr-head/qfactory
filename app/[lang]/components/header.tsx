import NextLink from "next/link"
import { Bars3Icon as MenuIcon } from "@heroicons/react/20/solid"
import { Container } from "@/app/[lang]/components/container"
import { Logo } from "@/app/[lang]/components/logo"

import { languages, Languages } from "@/i18n.config"

const LanguageSwitch = ({ lang }: { lang: Languages }) => {
  return (
    <div className="flex space-x-2 text-black font-bold text-sm items-center">
      {languages.map(({ id, path, title }) => (
        <NextLink
          key={id}
          className={`${lang === id ? "underline" : ""} hover:underline`}
          href={path}
        >
          {title}
        </NextLink>
      ))}
    </div>
  )
}
export const Header = ({ lang }: { lang: Languages }) => {
  return (
    <Container>
      <div className="flex justify-between items-center p-4">
        <Logo />
        <div className="flex space-x-8">
          <button className="bg-black text-white px-4 py-2">
            Bekijk programma
          </button>
          <LanguageSwitch lang={lang} />

          <button className="text-black">
            <MenuIcon className="w-8 h-8" />
          </button>
        </div>
      </div>
    </Container>
  )
}
