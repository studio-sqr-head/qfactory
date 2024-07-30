"use client"

import NextImage from "next/image"
import NextLink from "next/link"
import { useParams } from "next/navigation"
import { useState } from "react"
import { ISbStoryData } from "@storyblok/react/rsc"
import { Button } from "@headlessui/react"
import clsx from "clsx"

import { Container } from "@/app/[lang]/components/container"
import { Text } from "@/app/[lang]/components/text"
import { RichText } from "@/app/[lang]/components/rich-text"
import {
  AllEventsSectionStoryblok,
  CategoryStoryblok,
  EventStoryblok,
  CategoriesStoryblok,
  RichtextStoryblok,
} from "@/types"
import { formatDatetime } from "@/utils/formatDatetime"
import { formatCurrency } from "@/utils/formatCurrency"

export const AllEventsSection = ({
  blok,
}: {
  blok: AllEventsSectionStoryblok
}) => {
  const [selectedCategory, setSelectedCategory] = useState("all") // FIXME: Fix typing AND translation

  const { categories, events } = blok

  const filteredEvents =
    selectedCategory === "all"
      ? events
      : (events as ISbStoryData<EventStoryblok>[])?.filter(({ content }) =>
          (content?.category as ISbStoryData<CategoryStoryblok>[])?.some(
            ({ name }) => name.toLowerCase() === selectedCategory.toLowerCase()
          )
        )

  return (
    <Container classNameOverrides="py-16">
      <Text variant="headline">{blok.title}</Text>

      <div className="flex gap-4 mb-8 overflow-x-auto">
        {(
          [
            { name: "all", content: { label: "All" } },
            ...(categories ?? []),
          ] as ISbStoryData<CategoriesStoryblok>[]
        )?.map(({ uuid, name, content }, key) => {
          const isSelected =
            selectedCategory.toLowerCase() === name.toLowerCase()
          return (
            <Button
              key={`${uuid}-${key}`}
              onClick={() => setSelectedCategory(name)}
              className={clsx(
                "border border-black px-4 py-2 rounded-full",
                isSelected ? "bg-black text-white" : "text-black"
              )}
            >
              {content?.label}
            </Button>
          )
        })}
      </div>

      <EventList events={filteredEvents} />
    </Container>
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
