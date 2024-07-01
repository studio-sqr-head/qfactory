import type { Metadata, Viewport } from "next"

import "./globals.css"

export const viewport: Viewport = {
  themeColor: "#000000",
  initialScale: 1,
  width: "device-width",
  height: "device-height",
}

export async function generateMetadata(): Promise<Metadata> {
  const title = "Q-Factory Amsterdam"
  const description =
    "Q-Factory is het grootste muziekmakerscentrum van Europa en biedt muzikanten, acteurs en dansers alle mogelijkheden om te repeteren, op te treden of opnames te maken."
  return {
    title,
    description,
    keywords: ["Q-Factory", "Amsterdam", "muziekmakerscentrum"],
  }
}

export default async function RootLayout(
  props: Readonly<{
    children: React.ReactNode
  }>
) {
  const { children } = props
  return <>{children}</>
}
