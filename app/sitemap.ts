import { MetadataRoute } from "next"
import { env } from "@/env"
import { getAllCourses } from "@/api/course"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { stories } = await getAllCourses({ lang: "en" })
  const courses = stories.map(({ slug }) => ({
    url: `${env.NEXT_PUBLIC_BASE_URL}/en/courses/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  return [
    {
      url: `${env.NEXT_PUBLIC_BASE_URL}/en`,
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 1,
    },
    {
      url: `${env.NEXT_PUBLIC_BASE_URL}/en/about`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${env.NEXT_PUBLIC_BASE_URL}/en/contact`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    ...courses,
  ]
}
