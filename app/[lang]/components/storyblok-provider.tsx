/** 1. Tag it as client component */
"use client"
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc"
import { env } from "@/env"

/** 2. Import your components */
import { storyblokComponents } from "@/app/[lang]/components/storyblok"

storyblokInit({
  accessToken: env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN,
  use: [apiPlugin],
  components: storyblokComponents,
})

export function StoryblokProvider({ children }: { children: React.ReactNode }) {
  return children
}
