/** 1. Tag it as client component */
"use client"
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc"
import { env } from "@/env"

/** 2. Import your components */
import {
  HeroSection,
  ContentSection,
  CarouselSection,
  AllEventsSection,
  ContentLinkSection,
  Page,
} from "@/app/[lang]/components/storyblok"

export const components = {
  heroSection: HeroSection,
  contentSection: ContentSection,
  carouselSection: CarouselSection,
  allEventsSection: AllEventsSection,
  contentLinkSection: ContentLinkSection,
  page: Page,
}

storyblokInit({
  accessToken: env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN,
  use: [apiPlugin],
  components,
})

export function StoryblokProvider({ children }: { children: React.ReactNode }) {
  return children
}
