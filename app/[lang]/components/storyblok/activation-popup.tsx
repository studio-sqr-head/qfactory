import { Button } from "@headlessui/react"
import { storyblokEditable } from "@storyblok/react"

import { RichText } from "@/app/[lang]/components/rich-text"

import { ActivationPopupStoryblok } from "@/types"

export const ActivationPopup = ({
  blok,
}: {
  blok: ActivationPopupStoryblok
}) => {
  return (
    <div
      className="flex flex-col gap-4 fixed bottom-0 p-4 shadow-lg right-0 z-50 bg-black text-white"
      {...storyblokEditable(blok)}
    >
      <h1 className="text-2xl font-bold">{blok.title}</h1>
      <RichText document={blok.content} />
      <div className="flex gap-4">
        {blok?.ctas?.map((cta) => (
          <Button key={cta._uid} className="bg-black text-white px-4 py-2">
            {cta.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
