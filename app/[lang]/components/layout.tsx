"use client"

import { useState } from "react"
import { Footer } from "@/app/[lang]/components/footer"
import { Header, Menu } from "@/app/[lang]/components/header"
import { Main } from "@/app/[lang]/components/main"

export const MainLayout = ({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: "en" | "nl" }
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const handleMenuOpen = () => setIsMenuOpen(true)
  const handleMenuClose = () => setIsMenuOpen(false)
  return (
    <>
      <Header lang={params.lang} onMenuClick={handleMenuOpen} />
      <Menu
        lang={params?.lang}
        onMenuClose={handleMenuClose}
        isOpen={isMenuOpen}
      />
      <Main>{children}</Main>
      <Footer />
    </>
  )
}
