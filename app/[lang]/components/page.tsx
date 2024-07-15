import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc"

export const Page = ({
  blok,
}: {
  blok: {
    body: any[]
  }
}) => (
  <div {...storyblokEditable(blok)}>
    {blok.body.map((nestedBlok) => (
      <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
    ))}
  </div>
)
