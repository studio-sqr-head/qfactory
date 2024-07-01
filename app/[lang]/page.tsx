import NextImage from "next/image"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 align-middle">
      <div className="flex flex-col items-center space-y-8 justify-center h-full">
        <NextImage
          src="/logo.png"
          width={800}
          priority
          height={600}
          alt="Q-Factory Amsterdam"
        />

        <p className="text-lg text-secondary">
          We zijn druk bezig met het bouwen van de Q-Factory-website. Kom snel
          terug!
        </p>
      </div>
    </main>
  )
}
