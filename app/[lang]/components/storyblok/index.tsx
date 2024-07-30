import { Accordion } from "@/app/[lang]/components/storyblok/accordion"
import { AccordionSection } from "@/app/[lang]/components/storyblok/accordion-section"
import { ActivationPopup } from "@/app/[lang]/components/storyblok/activation-popup"
import { AllEventsSection } from "@/app/[lang]/components/storyblok/events-section"
import { CarouselSection } from "@/app/[lang]/components/storyblok/caoursel-section"
import { ContentLinkSection } from "@/app/[lang]/components/storyblok/content-link-section"
import { ContentSection } from "@/app/[lang]/components/storyblok/content-section"
import { HeroSection } from "@/app/[lang]/components/storyblok/hero-section"
import { Page } from "@/app/[lang]/components/storyblok/sb-page"
import { PhotoBlockSection } from "@/app/[lang]/components/storyblok/photo-block-section"

export const storyblokComponents = {
  accordion: Accordion,
  accordionSection: AccordionSection,
  activationPopup: ActivationPopup,
  heroSection: HeroSection,
  contentSection: ContentSection,
  carouselSection: CarouselSection,
  allEventsSection: AllEventsSection,
  contentLinkSection: ContentLinkSection,
  photoBlockSection: PhotoBlockSection,
  page: Page,
}

export {
  Accordion,
  AccordionSection,
  ActivationPopup,
  HeroSection,
  ContentSection,
  CarouselSection,
  AllEventsSection,
  ContentLinkSection,
  PhotoBlockSection,
  Page,
}
