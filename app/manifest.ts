import { MetadataRoute } from "next"

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const generalContent = {
    content: {
      metaDataName: "Q-Factory Amsterdam",
      metaDataDescription:
        "Q-Factory is het grootste muziekmakerscentrum van Europa en biedt muzikanten, acteurs en dansers alle mogelijkheden om te repeteren, op te treden of opnames te maken.",
      metaDataShortName: "Q-Factory",
    },
  }
  const { metaDataName, metaDataDescription, metaDataShortName } =
    generalContent.content
  return {
    name: metaDataName,
    short_name: metaDataShortName,
    description: metaDataDescription,
    display: "standalone",
    categories: ["education", "business", "media", "design"],
    background_color: "#000000",
    theme_color: "#ffea00",
    start_url: `/`,
    orientation: "portrait",
    id: "com.qfactory",
    icons: [
      {
        src: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },

      {
        src: "/mstile-150x150.png",
        sizes: "150x150",
        type: "image/png",
      },
      {
        src: "/safari-pinned-tab.svg",
        purpose: "maskable",
        sizes: "16x16",
        type: "image/svg+xml",
      },
    ],
    lang: "nl",
    display_override: ["standalone"],
  }
}
