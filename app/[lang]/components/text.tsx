import { createElement } from "react"
import clsx from "clsx"

import { abcFavoritMedium, abcFavoritRegular, maaxMonoBold } from "@/app/fonts"

export const Text = ({
  variant = "body",
  children,
  classNameOverrides,
  as,
}: {
  variant?: "headline" | "subline" | "body" | "label"
  children: React.ReactNode
  classNameOverrides?: string
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"
}) => {
  if (variant === "headline") {
    return (
      <h1
        className={clsx(
          maaxMonoBold.className,
          "text-4xl text-start",
          classNameOverrides
        )}
      >
        {children}
      </h1>
    )
  }
  if (variant === "subline") {
    return (
      <h2
        className={clsx(
          abcFavoritMedium.className,
          "text-2xl text-start",
          classNameOverrides
        )}
      >
        {children}
      </h2>
    )
  }
  if (variant === "body") {
    return createElement(
      as || "p",
      {
        className: clsx(
          abcFavoritRegular.className,
          "text-base text-start",
          classNameOverrides
        ),
      },
      children
    )
  }
  if (variant === "label") {
    return (
      <span
        className={clsx(
          abcFavoritRegular.className,
          "text-sm text-start",
          classNameOverrides
        )}
      >
        {children}
      </span>
    )
  }
}
