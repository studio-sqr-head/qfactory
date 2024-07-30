import type { Metadata, Viewport } from "next"
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc"

import { StoryblokProvider } from "@/app/[lang]/components/storyblok-provider"
import { storyblokComponents } from "@/app/[lang]/components/storyblok"
import { env } from "@/env"

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

storyblokInit({
  accessToken: env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN,
  use: [apiPlugin],
  components: storyblokComponents,
})

export default async function RootLayout(
  props: Readonly<{
    children: React.ReactNode
  }>
) {
  const { children } = props
  return <StoryblokProvider>{children}</StoryblokProvider>
}
