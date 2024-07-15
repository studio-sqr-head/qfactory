"use client"

import { useRouter } from "next/navigation"
import NextImage from "next/image"
import { useEffect, useCallback, useState, useRef } from "react"
import { Container } from "@/app/[lang]/components/container"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { Button, DialogPanel, Dialog, DialogBackdrop } from "@headlessui/react"
import clsx from "clsx"
import { AnimatePresence, motion } from "framer-motion"
import { Text } from "@/app/[lang]/components/text"

import { useBreakpoint } from "@/hooks/use-breakpoint"
import { RichText } from "./rich-text"
import { EventStoryblok } from "@/types"
import { formatCurrency } from "@/utils/formatCurrency"

// Make this fully generic
export const Modal = ({
  showModal,
  event,
  children,
}: {
  showModal: boolean
  event: EventStoryblok
  children?: React.ReactNode
}) => {
  const [hideMeta, setHideMeta] = useState(false)
  const modalContentRef = useRef<HTMLDivElement>(null)
  const isMdAndAbove = useBreakpoint({ breakpoint: "md" })
  const router = useRouter()

  const handleClose = () => {
    setHideMeta(false)
    if (showModal === true) {
      router.back()
    }
  }

  const handleScroll = useCallback(
    (e: any) => {
      if (e?.target?.scrollTop > 0) {
        setHideMeta(true)
      } else {
        setHideMeta(false)
      }
    }, // Adjust the debounce delay as needed
    [setHideMeta]
  )

  useEffect(() => {
    setTimeout(() => {
      modalContentRef?.current?.addEventListener("scroll", handleScroll)
    }, 1000)

    return () => {
      modalContentRef.current?.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll, showModal])

  return (
    <Dialog
      open={showModal}
      onClose={handleClose}
      className="relative z-50"
      static
    >
      <DialogBackdrop className="fixed inset-0 bg-black/80 hidden md:block" />

      <div className="fixed inset-0 w-screen flex items-center justify-center p-4 hidden md:block">
        <DialogPanel
          className="bg-white relative overflow-y-auto max-h-full rounded-lg"
          ref={modalContentRef}
        >
          <EventHeader hideMeta={hideMeta} event={event} />

          <Button
            onClick={handleClose}
            className="absolute top-4 right-4 p-1 rounded-full text-black z-50"
            aria-label="Close modal"
          >
            <XMarkIcon className="w-6 h-6" />
          </Button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 px-16 pb-16">
            <div className="relative">
              {event?.image?.filename && (
                <NextImage
                  src={event?.image?.filename}
                  alt={event?.image?.alt ?? ""}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div className="flex flex-col gap-8">
              <Text variant="subline">About</Text>
              <RichText document={event?.description} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Text variant="subline">Listen</Text>
                  <SpotifyContainer trackId="0fOVjirDtwVGOO58Cekbea" />
                </div>
                <div>
                  <Text variant="subline">Watch</Text>
                  <YoutubeContainer videoId="wFbIBcTjm4k" />
                </div>
              </div>
            </div>
          </div>
        </DialogPanel>
      </div>

      {!isMdAndAbove && (
        <div className="fixed inset-0 md:hidden">
          <DialogPanel className="bg-white relative overflow-y-auto max-h-full">
            <div className="relative h-96 mb-8">
              <NextImage
                src="/stock4.jpg"
                alt="Q-Factory Open Mic"
                fill
                className="object-cover"
              />

              <Button
                onClick={handleClose}
                className="absolute top-4 right-4 p-1 rounded-full text-white z-50"
                aria-label="Close modal"
              >
                <XMarkIcon className="w-6 h-6" />
              </Button>

              <div className="absolute bottom-0 left-0 right-0 top-0 bg-black bg-opacity-50 flex flex-col items-end justify-end">
                <Container classNameOverrides="py-8">
                  <h3 className="text-4xl font-bold text-white">
                    Judith Hill + Crossroad Trail
                  </h3>
                </Container>
              </div>
            </div>

            <Container>
              <div className="flex gap-4 justify-between flex-col pb-8">
                <div className="flex flex-col gap-4">
                  <Button className="bg-black text-white px-6 py-3 flex items-center gap-2 justify-center">
                    Tickets <p className="text-gray-200">$ 19, -</p>
                  </Button>
                  <p className="text-gray-500">Exlusief servicekosten</p>
                </div>
                <div className="flex gap-4 flex-col">
                  <p className="font-bold text-2xl">Woensdag 12 oktober</p>
                  <div className="flex gap-4 items-center">
                    <div className="text-gray-500 bg-gray-100 px-4 py-2">
                      Muziek
                    </div>
                    <p className="text-gray-500">Q-Factory</p>
                  </div>
                  <p className="text-gray-500">Zaal open: 20:00</p>
                  <p className="text-gray-500">Voorprogramma: 20:30</p>
                  <p className="text-gray-500">Hoofdprogramma: 21:30</p>
                </div>
              </div>

              <div className="flex flex-col gap-8 pb-8">
                <Text variant="subline">About</Text>
                <RichText document={event?.description} />
              </div>
            </Container>
          </DialogPanel>
        </div>
      )}
    </Dialog>
  )
}

const YoutubeContainer = ({ videoId }: { videoId: string }) => {
  return (
    <div className="relative h-0 pb-[56.25%]">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}

const SpotifyContainer = ({ trackId }: { trackId: string }) => {
  return (
    <iframe
      src={`https://open.spotify.com/embed/track/${trackId}`}
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
  )
}

const EventHeader = ({
  hideMeta,
  event,
}: {
  hideMeta: boolean
  event: EventStoryblok
}) => {
  const className = clsx(
    "w-full bg-white px-16 py-16 sticky top-0 z-40",
    hideMeta && "border-b-2 border-black py-8 px-16"
  )

  return (
    <div className={className} tabIndex={0}>
      <div className="flex gap-4 items-center justify-between w-full mb-2">
        <Text variant="headline">{event?.title}</Text>
        <Button className="bg-black text-white px-6 py-3 flex items-center gap-2">
          Tickets{" "}
          {event?.price != null && (
            <Text variant="label">
              {formatCurrency({
                amount: event.price as unknown as number, // FIXME: Fix typing
                currency: "EUR",
              })}
            </Text>
          )}
        </Button>
      </div>
      <AnimatePresence initial={false}>
        {hideMeta === false && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
          >
            <div className="flex gap-4 justify-between">
              <div className="flex gap-4 flex-col">
                <div className="flex gap-4 items-center">
                  <Text variant="label">{event?.location}</Text>
                  <p className="text-gray-500">Zaal open: 20:00</p>
                  <p className="text-gray-500">Voorprogramma: 20:30</p>
                  <p className="text-gray-500">Hoofdprogramma: 21:30</p>
                </div>
                <div className="flex gap-4 items-center">
                  {/* {event?.category?.map(({ uuid, content: { label } }) => (
                    <div
                      className="text-gray-500 bg-gray-100 px-4 py-2"
                      key={uuid}
                    >
                      {label}
                    </div>
                  ))} */}
                </div>
                <Text classNameOverrides="text-gray-500" variant="label">
                  {event?.location}
                </Text>
              </div>
              <p className="text-gray-500">Exlusief servicekosten</p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  )
}
