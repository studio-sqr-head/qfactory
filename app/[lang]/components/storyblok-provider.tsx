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
} from "./wip"
import { SbPage } from "./page"

export const components = {
  heroSection: HeroSection,
  contentSection: ContentSection,
  carouselSection: CarouselSection,
  allEventsSection: AllEventsSection,
  contentLinkSection: ContentLinkSection,
  page: SbPage,
}

storyblokInit({
  accessToken: env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN,
  use: [apiPlugin],
  components,
})

export function StoryblokProvider({ children }: { children: React.ReactNode }) {
  return children
}
