"use client"

import NextImage from "next/image"
import NextLink from "next/link"
import { storyblokEditable } from "@storyblok/react/rsc"

import { Container } from "@/app/[lang]/components/container"
import { Text } from "@/app/[lang]/components/text"
import { RichText } from "@/app/[lang]/components/rich-text"
import { ContentSectionStoryblok } from "@/types"

export const ContentLinkSection = ({
  blok,
}: {
  blok: ContentSectionStoryblok
}) => {
  return (
    <Container classNameOverrides="py-16" {...storyblokEditable(blok)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <Text variant="headline">{blok.title}</Text>
          <RichText document={blok.content} />
          {/* FIXME */}
          <NextLink className="bg-black text-white px-4 py-2" href={blok.link}>
            Cafe
          </NextLink>
        </div>
        {blok.image && (
          <div className="relative w-full h-96">
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
