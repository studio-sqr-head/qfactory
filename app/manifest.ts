import { MetadataRoute } from "next"

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const generalContent = {
    content: {
      androidChrome192x192: {
        filename: "/android-chrome-192x192.png",
      },
      androidChrome512x512: {
        filename: "/android-chrome-512x512.png",
      },
      appleTouchIcon: {
        filename: "/apple-touch-icon.png",
      },
      favicon32x32: {
        filename: "/favicon-32x32.png",
      },
      favicon16x16: {
        filename: "/favicon-16x16.png",
      },
      metaDataName: "Q-Factory Amsterdam",
      metaDataDescription:
        "Q-Factory is het grootste muziekmakerscentrum van Europa en biedt muzikanten, acteurs en dansers alle mogelijkheden om te repeteren, op te treden of opnames te maken.",
      metaDataShortName: "Q-Factory",
    },
  }
  const {
    androidChrome192x192,
    androidChrome512x512,
    appleTouchIcon,
    favicon32x32,
    favicon16x16,
    metaDataName,
    metaDataDescription,
    metaDataShortName,
  } = generalContent.content
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
        src: "/favicon.ico",
        sizes: "48x48",
        type: "favicon",
      },
      {
        src: androidChrome192x192?.filename ?? "/favicon.ico",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: androidChrome512x512?.filename ?? "/favicon.ico",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: appleTouchIcon?.filename ?? "/favicon.ico",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: favicon16x16?.filename ?? "/favicon.ico",
        sizes: "16x16",
        type: "image/png",
      },
      {
        src: favicon32x32?.filename ?? "/favicon.ico",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    lang: "en",
    display_override: ["standalone"],
  }
}
