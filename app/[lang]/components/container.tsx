import { ReactNode } from "react"
import clsx from "clsx"

export const Container = ({
  classNameOverrides,
  children,
}: {
  classNameOverrides?: string
  children: ReactNode
}) => {
  return (
    <div className={clsx("container mx-auto px-4", classNameOverrides)}>
      {children}
    </div>
  )
}
