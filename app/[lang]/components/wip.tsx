"use client"

import { useParams } from "next/navigation"
import NextImage from "next/image"
import NextLink from "next/link"
import { useEffect, useCallback, useState, useRef } from "react"
import { Container } from "@/app/[lang]/components/container"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { Button, DialogPanel, Dialog, DialogBackdrop } from "@headlessui/react"
import clsx from "clsx"
import { AnimatePresence, motion } from "framer-motion"
import { storyblokEditable } from "@storyblok/react/rsc"
import { formatDatetime } from "@/utils/formatDatetime"
import { Text } from "@/app/[lang]/components/text"

import { RichText } from "./rich-text"
import {
  CarouselSectionStoryblok,
  HeroSectionStoryblok,
  ContentSectionStoryblok,
  EventStoryblok,
  AllEventsSectionStoryblok,
} from "@/types"
import { formatCurrency } from "@/utils/formatCurrency"

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

export const Divider = () => {
  return <div className="bg-gray-100 h-1" />
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

const Carousel = ({
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

export const AllEventsSection = ({
  blok,
}: {
  blok: AllEventsSectionStoryblok
}) => {
  // const [showModal, setShowModal] = useState(false)
  const [category, setCategory] = useState("All")

  const events =
    category === "All"
      ? blok?.events
      : blok?.events?.filter(({ content }) =>
          content?.category?.includes(category)
        )

  // const handleOpenModal = () => {
  //   setShowModal(true)
  // }
  // const handleCloseModal = () => {
  //   setShowModal(false)
  // }

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
      {/* <EventModal showModal={showModal} handleCloseModal={handleCloseModal} /> */}
    </Container>
  )
}

const EventList = ({
  events,
}: {
  events: AllEventsSectionStoryblok["events"]
}) => {
  return (
    <div className="flex flex-col md:gap-4 gap-8">
      {events?.map(
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
  title: string
  location: string
  description: string
  datetime: Date
  price: number
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
            {category?.map(({ uuid, content: { label } }) => (
              <div key={uuid} className="bg-black text-white px-2 py-1">
                <Text variant="label">{label}</Text>
              </div>
            ))}
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
          <Text variant="label">{formatDatetime({ datetime, lang })}</Text>
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
