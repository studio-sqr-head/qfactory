import { StoryblokComponent, storyblokEditable } from "@storyblok/react/rsc"
import { ActivationPopup } from "@/app/[lang]/components/storyblok"

export const Page = ({
  blok,
}: {
  blok: {
    body: any[]
  }
}) => {
  console.log(blok?.body)
  return (
    <div {...storyblokEditable(blok)} className="flex flex-col gap-4">
      {blok.body?.map((nestedBlok) => {
        if (nestedBlok.component === "activation-popup") {
          return <ActivationPopup blok={nestedBlok} key={nestedBlok._uid} />
        }
        return <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      })}
    </div>
  )
}
