export const formatCurrency = ({
  amount,
  currency,
}: {
  amount: number
  currency: "EUR" | "USD"
}) => {
  const formatter = new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency,
  })

  return formatter.format(amount)
}
