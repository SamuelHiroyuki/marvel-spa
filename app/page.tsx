import Await from "@/components/Await";
import Header from "@/components/Header";
import HeroesList from "@/components/HeroesList";
import InputSearch from "@/components/InputSearch";
import { MarvelCharacter } from "@/types/MarvelCharacters";
import { MarvelCharacterResponse, MarvelResponse } from "@/types/MarvelResponse";
import { parseNumberWithMin } from "@/utils/number";
import { SearchParams, handleServerSearchParam } from "@/utils/params";
import { Suspense } from "react";
import Skeleton from "./skeleton";

interface FetchHeroesProps {
  query: string
  page: number
}

async function fetchHeroes({ page, query }: FetchHeroesProps): Promise<MarvelResponse<MarvelCharacterResponse<MarvelCharacter>>> {
  const url = new URL("api/marvel/characters", "http://localhost:3000/")

  url.searchParams.append("page", page.toString())
  url.searchParams.append("query", query)

  const request = await fetch(url, { next: { revalidate: 1800 } })

  return await request.json()
}

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  const getParam = handleServerSearchParam(searchParams)
  const page = getParam<number>("page", 1, parseNumberWithMin)
  const query = getParam<string>("q", "")

  // const { data, attributionText } = await fetchHeroes({ page, query })
  const promise = fetchHeroes({ page, query })

  return (
    <main className="min-h-screen flex flex-col gap-12 pt-6">
      <Header />

      <Suspense key={`${page}_${query}`} fallback={<Skeleton />}>
        <Await promise={promise}>
          {({ data, attributionText }) => (
            <>
              <section className="max-w-7xl mx-auto px-24 flex-1 w-full">
                <header className="mb-8 flex flex-col gap-16">
                  <InputSearch query={query} />
                  <div>
                    <p className="font-medium text-neutral-400">Encontrados {data.count} heróis</p>
                  </div>
                </header>
                <HeroesList heroes={data.results} />
              </section>

              <footer className="bg-[#ff0000] h-16 mt-12 flex items-center justify-center">
                <p className="text-white font-medium">{attributionText}</p>
              </footer>
            </>
          )}
        </Await>
      </Suspense>
    </main >
  )
}
