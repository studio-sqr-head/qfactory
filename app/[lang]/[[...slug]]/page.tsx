import { getStoryblokApi, ISbStoriesParams } from "@storyblok/react/rsc"
import StoryblokStory from "@storyblok/react/story"

export default async function Page({
  params,
}: {
  params: { lang: "en" | "nl"; slug: string }
}) {
  const { data } = await fetchData({
    lang: params.lang,
    slug: params.slug,
  })

  return (
    <div className="flex flex-col gap-4">
      {data && <StoryblokStory story={data.story} />}
    </div>
  )
}

export async function fetchData(params: { lang: "en" | "nl"; slug: string }) {
  const { lang, slug } = params
  const sbParams: ISbStoriesParams = {
    language: lang,
    resolve_relations: [
      "allEventsSection.events",
      "allEventsSection.categories",
      "event.category",
    ],
  }

  const storyblokApi = getStoryblokApi()
  const data = await storyblokApi?.get(
    `cdn/stories/${slug ?? "home"}`,
    sbParams,
    {
      cache: "no-store",
    }
  )

  return data
}
