import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc"

export const SbPage = ({
  blok,
}: {
  blok: {
    body: any[]
  }
}) => {
  return (
    <div {...storyblokEditable(blok)}>
      {blok.body.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  )
}
