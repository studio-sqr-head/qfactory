import { MetadataRoute } from "next"
import { env } from "@/env"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `${env.NEXT_PUBLIC_BASE_URL}/en`,
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 1,
    },
    {
      url: `${env.NEXT_PUBLIC_BASE_URL}/nl`,
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 1,
    },
  ]
}
