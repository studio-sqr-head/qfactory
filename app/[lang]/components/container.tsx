import { ReactNode } from "react"
import clsx from "clsx"

export const Container = ({
  classNameOverrides,
  children,
  ...props
}: {
  classNameOverrides?: string
  children: ReactNode
  props?: any
}) => {
  return (
    <div
      className={clsx("container mx-auto px-4", classNameOverrides)}
      {...props}
    >
      {children}
    </div>
  )
}
