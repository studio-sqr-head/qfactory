"use client"

import NextImage from "next/image"
import { storyblokEditable } from "@storyblok/react/rsc"
import { Button } from "@headlessui/react"
import clsx from "clsx"

import { Container } from "@/app/[lang]/components/container"
import { Text } from "@/app/[lang]/components/text"
import { HeroSectionStoryblok } from "@/types"

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
        <Container classNameOverrides="py-10 flex flex-col gap-4">
          <Text variant="headline" classNameOverrides="text-white">
            {blok.header}
          </Text>
          <Text variant="subline" classNameOverrides="text-white">
            {blok.subheader}
          </Text>

          <div className="flex gap-4 md:flex-row flex-col">
            {blok?.cta?.map((cta) => (
              <Button
                key={cta._uid}
                className={clsx("bg-white text-black px-4 py-2")}
              >
                {cta.label}
              </Button>
            ))}
          </div>
        </Container>
      </div>
    </div>
  )
}
