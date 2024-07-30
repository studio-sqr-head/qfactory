import NextImage from "next/image"

import { PhotoBlockSectionStoryblok } from "@/types"
import { Container } from "@/app/[lang]/components/container"

export const PhotoBlockSection = ({
  blok,
}: {
  blok: PhotoBlockSectionStoryblok
}) => {
  return (
    <Container classNameOverrides="py-16 flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blok?.photos?.map(({ photoBlockItem }) => {
          if (!photoBlockItem) return null
          return (
            <div key={photoBlockItem?.id} className="relative w-full h-96">
              <NextImage
                src={photoBlockItem?.filename}
                alt={photoBlockItem.alt ?? ""}
                fill
              />
            </div>
          )
        })}
      </div>
    </Container>
  )
}
