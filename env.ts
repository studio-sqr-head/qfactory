import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

export const env = createEnv({
  clientPrefix: "NEXT_PUBLIC_",
  client: {
    NEXT_PUBLIC_BASE_URL: z.string(),
    NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN: z.string(),
    NEXT_PUBLIC_STORYBLOK_REGION: z.string(),
    NEXT_PUBLIC_IS_PREVIEW: z.string(),
  },

  runtimeEnv: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_STORYBLOK_REGION: process.env.NEXT_PUBLIC_STORYBLOK_REGION,
    NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN:
      process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN,
    NEXT_PUBLIC_IS_PREVIEW: process.env.NEXT_PUBLIC_IS_PREVIEW,
  },
})
