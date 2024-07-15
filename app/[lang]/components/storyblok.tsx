"use client"

import NextImage from "next/image"
import NextLink from "next/link"
import { useState } from "react"
import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc"
import { Button } from "@headlessui/react"
import clsx from "clsx"

import { Container } from "@/app/[lang]/components/container"
import { Text } from "@/app/[lang]/components/text"
import { RichText } from "@/app/[lang]/components/rich-text"
import {
  CarouselSectionStoryblok,
  ContentSectionStoryblok,
  HeroSectionStoryblok,
  AllEventsSectionStoryblok,
} from "@/types"
import { Carousel, EventList } from "@/app/[lang]/components/wip"

export const Page = ({
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

export const CarouselSection = ({
  blok,
}: {
  blok: CarouselSectionStoryblok
}) => {
  return (
    <Container classNameOverrides="py-16" {...storyblokEditable(blok)}>
      <Text variant="headline">{blok.title}</Text>
      <div className="flex space-x-4">
        <Carousel carouselItems={blok?.carouselItems} />
      </div>
    </Container>
  )
}

export const HeroSection = ({ blok }: { blok: HeroSectionStoryblok }) => {
  return (
    <div
      className="flex flex-col items-center justify-center h-[calc(100vh-72px)] relative aspect-w-16 aspect-h-9"
      {...storyblokEditable(blok)}
    >
      {blok.heroImage?.filename && (
        <NextImage
          src={blok.heroImage?.filename}
          alt={blok.heroImage?.alt ?? "Hero image"}
          fill
          priority
          className="brightness-50 object-cover object-center"
        />
      )}

      <div className="absolute bottom-0 left-0 top-0 right-0 flex flex-col items-start justify-end z-10">
        <Container classNameOverrides="py-8">
          <Text variant="headline" classNameOverrides="text-white">
            {blok.header}
          </Text>
          <Text variant="subline" classNameOverrides="text-white">
            {blok.subheader}
          </Text>
          {blok?.cta?.map((cta) => (
            <Button
              key={cta._uid}
              className={clsx("bg-white text-black px-4 py-2")}
            >
              {cta.label}
            </Button>
          ))}
        </Container>
      </div>
    </div>
  )
}
export const ContentSection = ({ blok }: { blok: ContentSectionStoryblok }) => {
  return (
    <Container classNameOverrides="py-16" {...storyblokEditable(blok)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <Text variant="headline">{blok.title}</Text>
          <RichText document={blok.content} />
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

export const AllEventsSection = ({
  blok,
}: {
  blok: AllEventsSectionStoryblok
}) => {
  const [category, setCategory] = useState("All") // FIXME: Fix typing AND translation

  const events =
    category === "All"
      ? blok?.events
      : blok?.events?.filter(({ content }) =>
          content?.category?.includes(category)
        )

  return (
    <Container classNameOverrides="py-16">
      <Text variant="headline">{blok.title}</Text>

      <div className="flex gap-4 mb-8 overflow-x-auto">
        {[
          { uuid: "all", content: { label: "All" } },
          ...(blok?.categories ?? []),
        ]?.map(({ uuid, content }, key) => (
          <Button
            key={uuid}
            onClick={() => setCategory(content?.label)}
            className={clsx(
              "border border-black px-4 py-2 rounded-full",
              category === content?.label ? "bg-black text-white" : "text-black"
            )}
          >
            {content?.label}
          </Button>
        ))}
      </div>

      <EventList events={events} />
    </Container>
  )
}
