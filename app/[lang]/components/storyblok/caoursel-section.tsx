"use client"

import NextImage from "next/image"
import { useState } from "react"
import { storyblokEditable } from "@storyblok/react/rsc"
import { Button } from "@headlessui/react"
import clsx from "clsx"

import { Container } from "@/app/[lang]/components/container"
import { Text } from "@/app/[lang]/components/text"
import { CarouselSectionStoryblok } from "@/types"
import { motion } from "framer-motion"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid"

export const CarouselSection = ({
  blok,
}: {
  blok: CarouselSectionStoryblok
}) => {
  return (
    <Container
      classNameOverrides="py-16 flex flex-col gap-4"
      {...storyblokEditable(blok)}
    >
      <Text variant="title">{blok.title}</Text>
      <Text variant="subline">{blok.subtitle}</Text>
      <div className="flex space-x-4">
        <Carousel carouselItems={blok?.carouselItems} />
      </div>
    </Container>
  )
}
export const Carousel = ({
  carouselItems,
}: {
  carouselItems: CarouselSectionStoryblok["carouselItems"]
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const margin = 16

  const nextItem = () => {
    if (!carouselItems) return
    setCurrentIndex((prev) => (prev + 1) % carouselItems?.length)
  }

  const prevItem = () => {
    if (!carouselItems) return
    setCurrentIndex(
      (prev) => (prev - 1 + carouselItems?.length) % carouselItems?.length
    )
  }
  return (
    <div className="relative overflow-x-hidden w-full">
      <motion.div
        className="flex gap-4 w-full mb-4"
        initial={{ x: 0 }}
        transition={{ type: "tween", duration: 0.5 }}
        animate={{
          x: `calc(-${currentIndex * 100}% - ${margin * currentIndex}px)`,
        }}
      >
        {carouselItems?.map(({ _uid, image, title, subtitle, ctas }) => (
          <div key={_uid} className="w-full min-w-full">
            <div className="relative h-96 w-full bg-gray-200">
              {/* FIXME */}
              {/* {image?.filename && (
                <NextImage
                  src={image?.filename}
                  alt={image?.alt ?? "Image"}
                  fill
                  className="object-cover object-center"
                />
              )} */}

              <div className="flex flex-col gap-4 p-8 absolute bottom-0 left-0 right-0">
                <Text variant="subline">{title}</Text>
                <Text variant="body">{subtitle}</Text>

                <div className="flex gap-4">
                  {ctas?.map(({ label, _uid }) => (
                    <Button
                      key={_uid}
                      className={clsx("bg-black text-white px-4 py-2")}
                    >
                      <Text variant="label">{label}</Text>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      <div className="flex gap-4">
        <button onClick={prevItem} className="bg-gray-200 p-2 rounded-full">
          <ChevronLeftIcon className="w-6 h-6 text-white" />
        </button>
        <button onClick={nextItem} className="bg-gray-200 p-2 rounded-full">
          <ChevronRightIcon className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  )
}
