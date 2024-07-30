import { storyblokEditable } from "@storyblok/react"
import { AccordionSectionStoryblok } from "@/types"
import { Accordion } from "@/app/[lang]/components/storyblok/accordion"
import { Container } from "@/app/[lang]/components/container"
import { Text } from "@/app/[lang]/components/text"

export const AccordionSection = ({
  blok,
}: {
  blok: AccordionSectionStoryblok
}) => {
  return (
    <Container classNameOverrides="py-16" {...storyblokEditable(blok)}>
      <div className="flex flex-col gap-4">
        <Text variant="headline">{blok.title}</Text>

        <div className="flex flex-col gap-4">
          {blok?.accordionItems?.map((nestedBlok) => (
            // add dividers between accordion items
            <div key={nestedBlok._uid}>
              <Accordion blok={nestedBlok} />
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}
