import {
  render,
  NODE_HEADING,
  NODE_PARAGRAPH,
  MARK_LINK,
  NODE_UL,
  NODE_LI,
  NODE_OL,
  MARK_BOLD,
  MARK_ANCHOR,
} from "storyblok-rich-text-react-renderer"
import Link from "next/link"
import { Text } from "@/app/[lang]/components/text"

type Elements =
  | "p"
  | "b"
  | "strong"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "ul"
  | "ol"
  | "li"
  | "a"
export const RichText = ({
  document,
  classNameOverrides,
}: {
  document: any
  classNameOverrides?: { [key in Elements]?: string }
}) => {
  return (
    <div className="space-y-4 overflow-hidden break-words">
      {render(document, {
        markResolvers: {
          [MARK_ANCHOR](children) {
            return (
              <a className={`text-orange underline ${classNameOverrides?.a}`}>
                {children}
              </a>
            )
          },

          [MARK_LINK](children, { href }) {
            return <Link href={href as any}>{children}</Link>
          },
          [MARK_BOLD](children) {
            return (
              <Text variant="body" classNameOverrides="font-bold" as="span">
                {children}
              </Text>
            )
          },
        },
        nodeResolvers: {
          [NODE_PARAGRAPH](children) {
            return <Text variant="body">{children}</Text>
          },

          [NODE_OL](children) {
            return (
              <ol
                className={`space-y-2 list-decimal text-primary pl-8 ${classNameOverrides?.ol}`}
              >
                <Text variant="body">{children}</Text>
              </ol>
            )
          },
          [NODE_UL](children) {
            return (
              <ul
                className={`space-y-2 list-disc text-primary pl-8 ${classNameOverrides?.ul}`}
              >
                <Text variant="body">{children}</Text>
              </ul>
            )
          },
          [NODE_LI](children) {
            return (
              <li className={classNameOverrides?.li}>
                <Text variant="body">{children}</Text>
              </li>
            )
          },
        },
      })}
    </div>
  )
}
