
import CharacterComics from "@/components/CharacterComics";
import Skeleton from "@/components/CharacterComics/skeleton";
import Footer from "@/components/Footer";
import { MarvelCharacter } from "@/types/MarvelCharacters";
import { MarvelListResponse, MarvelResponse } from "@/types/MarvelResponse";
import { redirect } from "next/navigation";
import Vibrant from "node-vibrant";
import { Suspense } from "react";

async function fetchHero({ name }: { name: string }): Promise<MarvelResponse<MarvelListResponse<MarvelCharacter>>> {
  const url = new URL("api/marvel/characters", "http://localhost:3000/")

  url.searchParams.append("query", name)

  const request = await fetch(url, { next: { revalidate: 1800 } })

  return await request.json()
}

export default async function CharacterDetails({ params }: { params: { slug: string } }) {
  const charecterName = decodeURI(params.slug)
  const { data, attributionText } = await fetchHero({ name: charecterName })
  const [hero] = data.results

  if (!hero) {
    redirect("/not-found")
  }

  const paletteData = await Vibrant
    .from(`${hero.thumbnail.path}.${hero.thumbnail.extension}`)
    .getPalette();

  return (
    <main
      className={`min-h-screen flex flex-col gap-12 pt-6`}
      style={{ backgroundColor: paletteData.LightVibrant?.hex + "99" }}
    >
      {charecterName}

      <section className="flex-1 max-w-7xl mx-auto px-24">
        <h2 className="text-neutral-700 font-extrabold text-2xl mb-14">Últimos lançamentos</h2>
        <Suspense fallback={<Skeleton />}>
          <CharacterComics characterId={hero.id} />
        </Suspense>
      </section>

      <Footer attributionText={attributionText} />
    </main >
  )
}
