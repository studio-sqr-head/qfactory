export const formatDatetime = ({
  datetime,
  lang,
}: {
  datetime: string
  lang: "en" | "nl"
}) => {
  const date = new Date(datetime)
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  } as Intl.DateTimeFormatOptions

  return date.toLocaleDateString(lang, options)
}
