"use client"

import NextImage from "next/image"
import { storyblokEditable } from "@storyblok/react/rsc"
import { Button } from "@headlessui/react"

import { Container } from "@/app/[lang]/components/container"
import { Text } from "@/app/[lang]/components/text"
import { RichText } from "@/app/[lang]/components/rich-text"
import { ContentSectionStoryblok } from "@/types"

export const ContentSection = ({ blok }: { blok: ContentSectionStoryblok }) => {
  return (
    <Container classNameOverrides="py-16" {...storyblokEditable(blok)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4 md:order-1 order-2">
          <Text variant="headline">{blok.title}</Text>
          <RichText document={blok.content} />

          <div className="flex gap-4 md:flex-row flex-col">
            {blok?.cta?.map((cta) => (
              <Button key={cta._uid} className="bg-black text-white px-4 py-2">
                {cta.label}
              </Button>
            ))}
          </div>
        </div>

        {blok.image && (
          <div className="relative w-full h-96 md:order-2 order-1">
            <NextImage
              src={blok.image?.filename}
              alt={blok.image?.alt ?? ""}
              fill
            />
          </div>
        )}
      </div>
    </Container>
  )
}
