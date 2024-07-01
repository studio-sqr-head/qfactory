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
        src: "/logo-alt.png",
        sizes: "48x48",
        type: "favicon",
      },
    ],
    lang: "nl",
    display_override: ["standalone"],
  }
}
