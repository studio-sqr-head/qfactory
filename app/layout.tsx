import type { Metadata, Viewport } from "next"
import { Open_Sans } from "next/font/google"
import { env } from "@/env"

import "./globals.css"

export const openSans = Open_Sans({ subsets: ["latin"] })

export const viewport: Viewport = {
  themeColor: "#000000",
  initialScale: 1,
  width: "device-width",
  height: "device-height",
}

export async function generateMetadata({
  params,
}: {
  params: { lang: "en" | "nl" }
}): Promise<Metadata> {
  const { lang } = params
  const title = "Q-Factory Amsterdam"
  const description =
    "Q-Factory is het grootste muziekmakerscentrum van Europa en biedt muzikanten, acteurs en dansers alle mogelijkheden om te repeteren, op te treden of opnames te maken."
  return {
    title,
    description,
    keywords: ["Q-Factory", "Amsterdam", "muziekmakerscentrum"],

    openGraph: {
      type: "website",
      locale: lang,
      url: `${env.NEXT_PUBLIC_BASE_URL}/${lang}`,
      title,
      description,
      images: [
        {
          url: `${env.NEXT_PUBLIC_BASE_URL}/logo.png`,
          width: 800,
          height: 600,
          alt: "Q-Factory Amsterdam",
        },
      ],
    },
  }
}

export default async function RootLayout(
  props: Readonly<{
    children: React.ReactNode
    params: { lang: "en" | "nl" }
  }>
) {
  const { children, params } = props
  return (
    <html
      lang={params.lang}
      className={`${openSans.className} bg-black text-primary`}
    >
      <body className="relative">{children}</body>
    </html>
  )
}
