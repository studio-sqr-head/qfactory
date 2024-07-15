import type { Metadata } from "next"
import { env } from "@/env"
import { abcFavoritRegular } from "@/app/fonts"
import { MainLayout } from "@/app/[lang]/components/layout"

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
    metadataBase: new URL(`${env.NEXT_PUBLIC_BASE_URL}/${lang}`),
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
        {
          url: `${env.NEXT_PUBLIC_BASE_URL}/${lang}/logo.png`,
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
    modal: React.ReactNode
  }>
) {
  const { children, params, modal } = props

  return (
    <html
      lang={params.lang}
      className={`${abcFavoritRegular.className} text-black bg-white`}
    >
      <body className="text-black bg-white overflow-x-hidden">
        <MainLayout params={params}>
          {children}
          {modal}
        </MainLayout>
      </body>
    </html>
  )
}
