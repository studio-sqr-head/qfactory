"use client"

import { useEffect, useState } from "react"
import { motion, useAnimation, useCycle, useScroll } from "framer-motion"
import NextLink from "next/link"
import clsx from "clsx"
import {
  Bars3Icon as MenuIcon,
  XMarkIcon as CloseIcon,
} from "@heroicons/react/20/solid"
import { Button } from "@headlessui/react"

import { Container } from "@/app/[lang]/components/container"
import { Logo } from "@/app/[lang]/components/logo"

import { languages, Languages } from "@/i18n.config"

const LanguageSwitch = ({
  lang,
  theme = "light",
}: {
  lang: Languages
  theme?: "dark" | "light"
}) => {
  return (
    <div
      className={`flex space-x-2 font-bold text-sm items-center text-${theme === "dark" ? "white" : "black"}`}
    >
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

export const Header = ({
  lang,
  onMenuClick,
}: {
  lang: Languages
  onMenuClick: () => void
}) => {
  const [isScrollingDown, setIsScrollingDown] = useState(false)

  const controls = useAnimation()

  useEffect(() => {
    let lastScroll = 0
    const handleScroll = () => {
      const currentScroll = window.scrollY
      if (currentScroll > lastScroll) {
        setIsScrollingDown(true)
      } else {
        setIsScrollingDown(false)
      }
      lastScroll = currentScroll
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isScrollingDown) {
      controls.start({ y: "-100%", transition: { duration: 0.3 } })
    } else {
      controls.start({ y: "0%", transition: { duration: 0.3 } })
    }
  }, [isScrollingDown, controls])

  const className = clsx("w-full sticky top-0 z-40 bg-white")

  return (
    <motion.header className={className} animate={controls} initial={{ y: 0 }}>
      <Container>
        <div className="flex justify-between items-center py-4">
          <Logo />
          <div className="flex space-x-8">
            <Button className="bg-black text-white px-4 py-2">
              Bekijk programma
            </Button>
            <div className="hidden md:flex">
              <LanguageSwitch lang={lang} />
            </div>
            <Button onClick={onMenuClick} aria-label="Open Menu">
              <MenuIcon className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </Container>
    </motion.header>
  )
}

const PrimaryLinks = [
  {
    title: "Podium",
    href: "/podium",
  },
  {
    title: "Repetitieruimtes",
    href: "/repetitieruimtes",
  },
  {
    title: "Hotel",
    href: "/hotel",
  },
  {
    title: "Café",
    href: "/cafe",
  },
  {
    title: "Academy",
    href: "/academy",
  },
  {
    title: "Studio",
    href: "/studio",
  },
  {
    title: "Events",
    href: "/events",
  },
]

const SecondaryLinks = [
  {
    title: "Over ons",
    href: "/over-ons",
  },
  {
    title: "Nieuws",
    href: "/nieuws",
  },
  {
    title: "Contact",
    href: "/contact",
  },
  {
    title: "Vacatures",
    href: "/vacatures",
  },
  {
    title: "FAQ",
    href: "/faq",
  },
  {
    title: "Algemene voorwaarden",
    href: "/algemene-voorwaarden",
  },
  {
    title: "Privacyverklaring",
    href: "/privacyverklaring",
  },
]
export const Menu = ({
  isOpen,
  onMenuClose,
  lang,
}: {
  isOpen: boolean
  onMenuClose: () => void
  lang: Languages
}) => {
  return (
    <motion.div
      className="fixed top-0 right-0 w-full h-full bg-black z-50 h-screen overflow-y-auto"
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? "0%" : "100%" }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.3, type: "spring" }}
    >
      <Container classNameOverrides="h-full">
        <div className="flex flex-col justify-between py-4 h-full">
          <div className="sticky top-0 bg-black z-10 flex justify-between md:items-center items-start py-4">
            <div className="flex md:space-x-8 flex-col md:flex-row space-y-8 md:space-y-0">
              <Button className="bg-white text-black px-4 py-2">
                Bekijk programma
              </Button>
              <NextLink className="text-white py-2" href="/repetitieruimtes">
                Boek repetitieruimte
              </NextLink>
              <NextLink className="text-white py-2" href="/studio">
                Boek studio
              </NextLink>
            </div>

            <Button onClick={onMenuClose} aria-label="Close Menu">
              <CloseIcon className="w-8 h-8 text-white" />
            </Button>
          </div>

          <hr className="border-white my-12 md:hidden" />

          <div className="flex flex-col md:flex-row md:space-x-8 md:align-center md:justify-center space-y-8 md:space-y-0 overflow-y-auto">
            <div className="flex flex-col space-y-8 md:px-12">
              {PrimaryLinks.map(({ title, href }) => (
                <NextLink
                  key={title}
                  href={href as any} // FIXME: Fix typing
                  className="text-white font-bold text-xl"
                >
                  {title}
                </NextLink>
              ))}
            </div>
            <div className="flex flex-col space-y-8 md:px-12">
              {SecondaryLinks.map(({ title, href }) => (
                <NextLink
                  key={title}
                  href={href as any} // FIX ME: Fix typing
                  className="text-white text-lg"
                >
                  {title}
                </NextLink>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <LanguageSwitch lang={lang} theme="dark" />
          </div>
        </div>
      </Container>
    </motion.div>
  )
}
