import { storyblokEditable } from "@storyblok/react"
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import { AccordionItemStoryblok } from "@/types"
import { RichText } from "@/app/[lang]/components/rich-text"

export function Accordion({ blok }: { blok: AccordionItemStoryblok }) {
  return (
    <Disclosure as="div" defaultOpen={true} {...storyblokEditable(blok)}>
      <DisclosureButton className="group flex w-full items-center justify-between">
        <span className="text-black group-data-[hover]:text-black/80">
          {blok?.title}
        </span>
        <ChevronDownIcon className="h-6 w-6 text-black/80 transform group-data-[open]:rotate-180" />
      </DisclosureButton>
      <DisclosurePanel className="text-gray-500">
        <RichText document={blok.content} />
      </DisclosurePanel>
    </Disclosure>
  )
}
