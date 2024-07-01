"use client"

import NextLink from "next/link"
import NextImage from "next/image"
import { useState } from "react"
import { Container } from "@/app/[lang]/components/container"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"

const HeroSectionOverlay = () => {
  return (
    <div className="absolute bottom-0 left-0 top-0 right-0 flex flex-col items-start justify-end z-10">
      <Container classNameOverrides="py-8">
        <h1 className="text-white text-6xl font-bold mb-2">
          Ruimte voor geluid
        </h1>
        <p className="text-white text-lg">
          Ieder geluid heeft ruimte nodig om te ontwikkelen, resoneren, en
          gehoord te worden. Onze ruimte resoneert met instrumenten en mensen,
          van vroege vogels tot nachtbrakers. Hier kun je spelen, slapen,
          lachen, en luisteren, altijd welkom en nooit weg. Q-Factory geeft
          geluid de ruimte.
        </p>
      </Container>
    </div>
  )
}
const HeroSection = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-72px)] relative aspect-w-16 aspect-h-9">
      <NextImage
        src="/q-factory.jpeg"
        alt="Q-Factory Amsterdam"
        fill
        priority
        className="brightness-50 object-cover object-center"
      />

      <HeroSectionOverlay />
    </div>
  )
}
export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <HeroSection />
      <CarouselSection />
      <Divider />
      <ProgramsSection />
      <Divider />
      <AboutSection />
    </div>
  )
}

const Divider = () => {
  return <div className="bg-gray-100 h-1" />
}

const AboutSection = () => {
  // two col grid with text h3 and text and image on thr right. Mobile one col

  return (
    <Container classNameOverrides="py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl font-bold">Over ons</h2>
          <p className="text-gray-500">
            Q-Factory is het grootste muziekmakerscentrum van Europa en biedt
            muzikanten, acteurs en dansers alle mogelijkheden om te repeteren,
            op te treden of opnames te maken. Met een café, concertzaal,
            oefenruimtes, studio’s en kantoren is Q-Factory de ideale plek voor
            iedereen die met muziek, dans of theater bezig is.
          </p>
        </div>
        <div className="relative w-full h-96">
          <NextImage
            src="/q-factory.jpeg"
            alt="Q-Factory Amsterdam"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="rounded-md"
          />
        </div>
      </div>
    </Container>
  )
}

const CarouselSection = () => {
  return (
    <Container classNameOverrides="py-16">
      <h2 className="text-4xl font-bold mb-4">Kom bij ons</h2>
      <div className="flex space-x-4">
        <Carousel />
      </div>
    </Container>
  )
}

const items = [
  {
    id: 1,
    title: "Muziek",
    subtitle: "Ontdek de muzikale mogelijkheden van Q-Factory",
    ctas: (
      <div className="flex gap-4 items-center">
        <NextLink href="/muziek" className="bg-black text-white px-4 py-2">
          Bekijk programma
        </NextLink>
      </div>
    ),
  },
  {
    id: 2,
    title: "Dans",
    subtitle: "Ontdek de dansmogelijkheden van Q-Factory",
    ctas: (
      <div className="flex gap-4 items-center">
        <NextLink href="/dans" className="bg-black text-white px-4 py-2">
          Bekijk programma
        </NextLink>
        <NextLink href="/dans" className="text-black">
          Lees meer
        </NextLink>
      </div>
    ),
  },
  {
    id: 3,
    title: "Theater",
    subtitle: "Ontdek de theatrale mogelijkheden van Q-Factory",
    ctas: (
      <div className="flex gap-4 items-center">
        <NextLink href="/theater" className="bg-black text-white px-4 py-2">
          Bekijk programma
        </NextLink>
        <NextLink href="/theater" className="text-black">
          Lees meer
        </NextLink>
      </div>
    ),
  },
  {
    id: 4,
    title: "Events",
    subtitle: "Ontdek de evenementen van Q-Factory",
    ctas: (
      <div className="flex gap-4 items-center">
        <NextLink href="/events" className="bg-black text-white px-4 py-2">
          Bekijk programma
        </NextLink>
      </div>
    ),
  },
  {
    id: 5,
    title: "Café",
    subtitle: "Ontdek het café van Q-Factory",
    ctas: (
      <div className="flex gap-4 items-center">
        <NextLink href="/cafe" className="bg-black text-white px-4 py-2">
          Bekijk menu
        </NextLink>
      </div>
    ),
  },
]

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const itemWidthPercentage = 100 / 3

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 3 : prev - 1))
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= items.length - 3 ? 0 : prev + 1))
  }

  return (
    <div className="relative overflow-hidden w-full">
      <div
        className="flex transition-transform ease-out duration-500"
        style={{
          transform: `translateX(-${currentIndex * (itemWidthPercentage + 2)}%)`,
        }}
      >
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`flex-shrink-0 h-64 bg-gray-100 rounded-md p-4 flex items-end ${index === items.length - 1 ? "mr-0" : "mr-4"}`}
            style={{ width: `calc(${itemWidthPercentage}% - 2rem)` }}
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <h3 className="text-2xl font-bold">{item.title}</h3>
                <p>{item.subtitle}</p>
              </div>

              {item.ctas}
            </div>
          </div>
        ))}
      </div>

      <div className="flex align-center py-4 gap-2">
        <button
          className="bg-black rounded-full p-2 text-white flex items-center"
          onClick={prevSlide}
        >
          <ChevronLeftIcon className="w-6 h-6 stroke-current stroke-2" />
        </button>
        <button
          className="bg-black rounded-full p-2 text-white"
          onClick={nextSlide}
        >
          <ChevronRightIcon className="w-6 h-6 stroke-current stroke-2" />
        </button>
      </div>
    </div>
  )
}
// title, location description, time, price, image, slug
interface Program {
  title: string
  location: string
  description: string
  time: string
  price: string
  image: string
  slug: string
  category?: string
}
const PROGRAMS = [
  {
    title: "Q-Factory Open Mic",
    location: "Q-Factory",
    description:
      "Iedere maandagavond is het Open Mic in het café van Q-Factory. Kom langs en laat je talent zien!",
    time: "20:00 - 23:00",
    price: "Gratis",
    image: "/image1.png",
    slug: "open-mic",
    category: "muziek",
  },
  {
    title: "Q-Factory Live",
    location: "Q-Factory",
    description:
      "Iedere vrijdagavond is het tijd voor Q-Factory Live. Kom langs en geniet van de beste bands en artiesten.",
    time: "20:00 - 23:00",
    price: "€5",
    image: "/image2.png",
    slug: "live",
    category: "muziek",
  },
  {
    title: "Q-Factory Dance Night",
    location: "Q-Factory",
    description:
      "Iedere zaterdagavond is het tijd voor Q-Factory Dance Night. Kom langs en dans de hele nacht!",
    time: "22:00 - 04:00",
    price: "€10",
    image: "/image3.png",
    slug: "dance-night",
    category: "dans",
  },
] as Program[]
const ProgramsSection = () => {
  return (
    <Container classNameOverrides="py-16">
      <h2 className="text-4xl font-bold mb-4">Programma</h2>
      <ProgramList programs={PROGRAMS} />
    </Container>
  )
}
const ProgramList = (props: { programs: Program[] }) => {
  return (
    <div className="flex flex-col gap-4">
      {props.programs.map((program) => (
        <ProgramListItem key={program.slug} {...program} />
      ))}
    </div>
  )
}

const ProgramListItem = (props: Program) => {
  return (
    <div className="flex gap-4">
      <div className="relative w-96 h-64">
        <NextImage
          src={props.image}
          alt={props.title}
          layout="fill"
          className="rounded-md object-cover object-center"
        />

        <div className="absolute bottom-0 left-0 right-0 p-2">
          <p className="text-white text-sm">{props.category}</p>
        </div>
      </div>
      <div className="flex justify-between w-full items-center">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 flex-col">
            <h3 className="text-4xl font-bold">{props.title}</h3>

            <p className="text-gray-500">{props.location}</p>
          </div>
          <p>{props.description}</p>
        </div>

        <div className="flex flex-col justify-between">
          <p>{props.time}</p>
          <p>{props.price}</p>
        </div>
      </div>
    </div>
  )
}
