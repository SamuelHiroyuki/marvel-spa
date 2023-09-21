
import CharacterComics from "@/components/CharacterComics";
import Footer from "@/components/Footer";
import FavoriteButton from "@/components/FavoriteButton";
import InputSearch from "@/components/InputSearch";
import Logo from "@/components/Logo";
import CharacterComicsSkeleton from "@/components/Skeletons/CharacterComicsSkeleton";
import { MarvelCharacter } from "@/types/MarvelCharacters";
import { MarvelComic } from "@/types/MarvelComic";
import { MarvelListResponse, MarvelResponse } from "@/types/MarvelResponse";
import { parseISO, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import Vibrant from "node-vibrant";
import { Suspense } from "react";
import { getApiUrl } from "@/services";

interface PageProps {
  params: { slug: string }
}

async function fetchHero({ name }: { name: string }): Promise<MarvelResponse<MarvelListResponse<MarvelCharacter>>> {
  const url = getApiUrl("api/marvel/characters")

  url.searchParams.append("query", name)

  const request = await fetch(url, { next: { revalidate: 1800 } })

  return await request.json()
}

async function fetchLastComicDate({ characterId }: { characterId: number }): Promise<string> {
  const url = getApiUrl(`api/marvel/characters/${characterId}/comics`)
  url.searchParams.append("limit", "1")

  const request = await fetch(url, { next: { revalidate: 1800 } })

  const data = await request.json() as MarvelResponse<MarvelListResponse<MarvelComic>>
  const [lastComic] = data.data.results

  if (!lastComic) {
    return ""
  }

  const stringOnSaleDate = lastComic.dates.find(date => date.type === "onsaleDate")

  return stringOnSaleDate?.date || ""
}


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const charecterName = decodeURI(params.slug).replace(/__/g, "/");
  const { data } = await fetchHero({ name: charecterName })
  const [hero] = data.results

  if (!hero) {
    return {
      title: "Herói desconhecido"
    }
  }

  const meta = {
    title: `Marvel Search Heroes | ${hero.name}`,
    description: "Detalhes do herói"
  }

  if (!!hero.description) meta.description = hero.description

  return meta
}


export default async function CharacterDetails({ params }: PageProps) {
  const charecterName = decodeURI(params.slug).replace(/__/g, "/");
  const { data, attributionText } = await fetchHero({ name: charecterName })
  const [hero] = data.results

  if (!hero) {
    redirect("/not-found")
  }

  const lastComicDate = await fetchLastComicDate({ characterId: hero.id })

  const paletteData = await Vibrant
    .from(`${hero.thumbnail.path}.${hero.thumbnail.extension}`)
    .getPalette();

  const rating = Math.floor(Math.random() * 6)
  const randomMovies = Math.floor(Math.random() * 101)
  const sanitizedName = hero.name.replace(/\s*\([^)]*\)/g, '').trim();

  return (
    <main
      className="min-h-screen flex flex-col gap-12 pt-6"
      style={{ backgroundColor: paletteData.LightVibrant?.hex + "4D" }}
    >
      <header className="flex flex-col items-center gap-4 max-w-7xl w-full mx-auto lg:flex-row px-6">
        <Logo small />

        <div className="max-w-3xl sm:px-12 w-full mx-auto">
          <InputSearch className="bg-white text-neutral-500 placeholder:text-neutral-500" query={""} />
        </div>
      </header>

      <section
        data-name={sanitizedName}
        className="lg:bg-name-container flex-1 isolate gap-16 items-center max-w-7xl mx-auto px-6 lg:px-24 py-24 grid md:grid-cols-6 lg:grid-cols-12"
      >
        <div className="items-center lg:items-start xl:col-span-4 lg:col-span-6 sm:col-span-full flex flex-col gap-6">
          <div className="flex justify-between items-center w-full">
            <h2 className="text-neutral-700 uppercase font-extrabold text-4xl">
              {hero.name}
            </h2>
            <div className="min-w-[24px]">
              <FavoriteButton characterId={hero.id} dimension={24} />
            </div>
          </div>

          <p className="text-neutral-500 font-semibold text-sm leading-6">
            {hero.description}
          </p>

          <div className="flex justify-start gap-24">
            <div className="flex flex-col gap-2">
              <p className="text-neutral-700 text-sm font-semibold">Quadrinhos</p>
              <div className="flex gap-4 items-end flex-1">
                <Image
                  src="/comics.svg"
                  width={28}
                  height={28}
                  alt=""
                />
                <p className="text-neutral-500 font-bold">{hero.comics.available}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-neutral-700 text-sm font-semibold">Filmes</p>
              <div className="flex gap-4 items-end flex-1">
                <Image
                  src="/movies.svg"
                  width={28}
                  height={28}
                  alt=""
                />
                <p className="text-neutral-500 font-bold">{randomMovies}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <p className="text-neutral-700 text-sm font-semibold">Rating:</p>
            <div className="flex gap-2 ml-4">
              {[...Array(5)].map((_, index) => (
                <Image
                  key={index}
                  src={index + 1 <= rating ? "/star-rating-filled.svg" : "/star-rating-empty.svg"}
                  width={16}
                  height={16}
                  alt=""
                />
              ))}
            </div>
          </div>

          <div>
            <p className="text-neutral-700 text-sm font-semibold">
              Último quadrinho: {lastComicDate === "" ? "Nunca" : (
                <time
                  className="text-neutral-500 ml-4"
                  dateTime={lastComicDate}>
                  {format(parseISO(lastComicDate), "PP", {
                    locale: ptBR
                  })}
                </time>
              )}
            </p>
          </div>
        </div>

        <div
          className="xl:col-span-5 lg:col-span-6 sm:col-span-full xl:col-start-7 rounded w-full"
        >
          <Image
            src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
            alt={hero.name}
            width={400}
            height={400}
            className="rounded w-full"
            priority
          />
        </div>
      </section>

      <section className="flex-1 isolate max-w-7xl mx-auto px-6 lg:px-24 w-full">
        <h2 className="text-neutral-700 font-extrabold text-2xl mb-14">Últimos lançamentos</h2>
        <Suspense fallback={<CharacterComicsSkeleton />}>
          <CharacterComics characterId={hero.id} />
        </Suspense>
      </section>

      <Footer attributionText={attributionText} />
    </main >
  )
}
