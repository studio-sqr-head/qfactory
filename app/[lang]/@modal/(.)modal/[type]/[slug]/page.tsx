import { Modal } from "@/app/[lang]/components/modal"

import {
  getStoryblokApi,
  ISbStoriesParams,
  storyblokInit,
  apiPlugin,
} from "@storyblok/react/rsc"
import { env } from "@/env"
import { storyblokComponents } from "@/app/[lang]/components/storyblok"

storyblokInit({
  accessToken: env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN,
  use: [apiPlugin],
  components: storyblokComponents,
}) // getEventDetails
const getEventDetails = async ({
  lang,
  slug,
  type,
}: {
  lang: "en" | "nl"
  slug: string
  type: string
}) => {
  const sbParams: ISbStoriesParams = {
    language: lang,
    resolve_relations: ["event.category"],
    // FIX ME - MAKE ME GENERIC
  }

  const storyblokApi = getStoryblokApi()
  const response = await storyblokApi?.get(
    `cdn/stories/${type}/${slug}`,
    sbParams,
    {
      cache: "no-store",
    }
  )

  return response
}

const ModalPage = async ({
  params,
}: {
  params: {
    lang: "en" | "nl"
    slug: string
    type: string
  }
}) => {
  console.log(params)
  const { data } = await getEventDetails({
    lang: params.lang,
    slug: params.slug,
    type: params.type,
  })

  return <Modal showModal={true} event={data?.story?.content} />
}
export default ModalPage
