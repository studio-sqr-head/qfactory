"use client"

import { useParams } from "next/navigation"
import NextImage from "next/image"
import NextLink from "next/link"
import { useState } from "react"
import { Container } from "@/app/[lang]/components/container"
import { Button } from "@headlessui/react"
import { ISbStoryData } from "@storyblok/react"
import clsx from "clsx"
import { motion } from "framer-motion"
import { formatDatetime } from "@/utils/formatDatetime"

import { Text } from "@/app/[lang]/components/text"
import { RichText } from "@/app/[lang]/components/rich-text"
import {
  CarouselSectionStoryblok,
  EventStoryblok,
  AllEventsSectionStoryblok,
  CategoriesStoryblok,
  RichtextStoryblok,
} from "@/types"
import { formatCurrency } from "@/utils/formatCurrency"

export const Divider = () => {
  return <div className="bg-gray-100 h-1" />
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
        className="flex gap-4 w-full"
        initial={{ x: 0 }}
        transition={{ type: "tween", duration: 0.5 }}
        animate={{
          x: `calc(-${currentIndex * 100}% - ${margin * currentIndex}px)`,
        }}
      >
        {carouselItems?.map(({ _uid, image, title, subtitle, ctas }) => (
          <div key={_uid} className="w-full min-w-full">
            <div className="relative h-96 w-full">
              {image?.filename && (
                <NextImage
                  src={image?.filename}
                  alt={image?.alt ?? "Image"}
                  fill
                  className="object-cover object-center"
                />
              )}
            </div>
            <div className="flex flex-col gap-4 py-4">
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
        ))}
      </motion.div>

      <div className="flex gap-4">
        <button onClick={prevItem} className="bg-black text-white p-2">
          Prev
        </button>
        <button onClick={nextItem} className="bg-black text-white p-2">
          Next
        </button>
      </div>
    </div>
  )
}

export const EventList = ({
  events,
}: {
  events: AllEventsSectionStoryblok["events"]
}) => {
  return (
    <div className="flex flex-col md:gap-4 gap-8">
      {(events as ISbStoryData<EventStoryblok>[])?.map(
        ({
          uuid,
          slug,
          content: {
            title,
            location,
            description,
            datetime,
            price,
            image,
            category,
          },
        }) => {
          return (
            <EventListItem
              key={uuid}
              slug={slug}
              uuid={uuid}
              title={title}
              location={location}
              description={description}
              datetime={datetime}
              price={price}
              image={image}
              category={category}
            />
          )
        }
      )}
    </div>
  )
}

export const EventListItem = ({
  slug,
  uuid,
  title,
  location,
  description,
  datetime,
  price,
  image,
  category,
}: {
  slug: string
  uuid: string
  title?: string
  location?: string
  description?: RichtextStoryblok
  datetime?: string
  price?: any // FIXME: Fix typing
  image: EventStoryblok["image"]
  category: EventStoryblok["category"]
}) => {
  const params = useParams()
  const { lang } = params as { lang: "en" | "nl" }

  if (!image) {
    return null
  }

  const buttonClass =
    "flex flex-col md:flex-row gap-4 cursor-pointer md:items-center"
  return (
    <NextLink href={`/modal/events/${slug}`} className={buttonClass}>
      <div className="relative h-64 w-full md:w-96">
        {image && (
          <NextImage
            src={image?.filename}
            alt={image?.alt ?? "Event image"}
            fill
            className="object-cover object-center"
          />
        )}

        <div className="absolute bottom-0 left-0 right-0">
          <div className="flex gap-4">
            {(category as ISbStoryData<CategoriesStoryblok>[])?.map(
              ({ uuid, content: { label } }) => (
                <div key={uuid} className="bg-black text-white px-2 py-1">
                  <Text variant="label">{label}</Text>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full gap-4">
        <div className="flex flex-col gap-2 items-start flex-1">
          <Text variant="headline">{title}</Text>
          <Text variant="label" classNameOverrides="text-gray-500">
            {location}
          </Text>
          <RichText document={description} />
        </div>

        <div className="flex md:flex-col justify-between items-end h-full w-full flex-1">
          {datetime && (
            <Text variant="label">{formatDatetime({ datetime, lang })}</Text>
          )}
          <Text variant="label" classNameOverrides="text-gray-500">
            {formatCurrency({
              amount: price,
              currency: "EUR",
            })}
          </Text>
        </div>
      </div>
    </NextLink>
  )
}
