import NextImage from "next/image"
import NextLink from "next/link"
import { Container } from "@/app/[lang]/components/container"
import { Logo } from "@/app/[lang]/components/logo"

export const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-300">
      <Container>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            <div>
              <Logo />
              <Address />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-4">
                <h3 className="text-gray-500">Plekken</h3>
                <ul>
                  <li>
                    <Link href="/podium">Podium</Link>
                  </li>
                  <li>
                    <Link href="/repetitieruimtes">Repetitieruimtes</Link>
                  </li>
                  <li>
                    <Link href="/hotel">Hotel</Link>
                  </li>
                  <li>
                    <Link href="/cafe">Cafe</Link>
                  </li>
                  <li>
                    <Link href="/academie">Academie</Link>
                  </li>
                  <li>
                    <Link href="/broedplaats">Broedplaats</Link>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="text-gray-500">Meer info</h3>
                <ul>
                  <li>
                    <Link href="/podium">Zakelijk</Link>
                  </li>
                  <li>
                    <Link href="/repetitieruimtes">Werken bij</Link>
                  </li>
                  <li>
                    <Link href="/hotel">Nieuws</Link>
                  </li>
                  <li>
                    <Link href="/cafe">Praktische informatie</Link>
                  </li>
                  <li>
                    <Link href="/academie">Contact</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <form>
                <input
                  type="email"
                  placeholder="Email"
                  className="border border-gray-300 p-2 mr-2"
                />
                <button className="bg-black text-white p-2">Inschrijven</button>
              </form>

              <p className="text-gray-500 mt-4">
                Schrijf je in voor onze nieuwsbrief
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <div className="flex gap-4 items-center">
              {["instagram", "linkedin", "facebook", "spotify"].map(
                (social) => (
                  <div key={social}>
                    <NextImage
                      src={`/${social}.png`}
                      alt={social}
                      width={32}
                      height={32}
                    />
                  </div>
                )
              )}
            </div>
            <div className="flex justify-end gap-4 items-center">
              {/* partners */}
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="w-16 h-16 bg-gray-300 rounded-full"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}

const Link = ({ href, children }: { href: any; children: React.ReactNode }) => {
  return (
    <NextLink href={href} className="text-black font-bold">
      {children}{" "}
    </NextLink>
  )
}

const Address = () => {
  return (
    <address>
      <p>Atlantisplein 1</p>
      <p>1093 NE Amsterdam</p>
      <p>020 7606780</p>
      <p>
        <a href="mailto:q-factory">info@q-factory</a>
      </p>
    </address>
  )
}
