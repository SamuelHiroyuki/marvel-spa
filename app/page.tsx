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
import HeroesSorter from "@/components/HeroesSorter";
import { OrderByType, parseStringToOrderBy } from "@/utils/orderBy";

interface FetchHeroesProps {
  query: string
  page: number
  orderBy: OrderByType
}

async function fetchHeroes({ page, query, orderBy }: FetchHeroesProps): Promise<MarvelResponse<MarvelCharacterResponse<MarvelCharacter>>> {
  const url = new URL("api/marvel/characters", "http://localhost:3000/")

  url.searchParams.append("page", page.toString())
  url.searchParams.append("query", query)
  url.searchParams.append("orderBy", orderBy)

  const request = await fetch(url, { next: { revalidate: 1800 } })

  return await request.json()
}

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  const getParam = handleServerSearchParam(searchParams)

  const page = getParam<number>("page", 1, parseNumberWithMin)
  const query = getParam<string>("q", "")
  const orderBy = getParam<OrderByType>("orderBy", "asc", parseStringToOrderBy)

  const promise = fetchHeroes({ page, query, orderBy })

  return (
    <main className="min-h-screen flex flex-col gap-12 pt-6">
      <Header />

      <Suspense key={`${page}_${query}_${orderBy}`} fallback={<Skeleton />}>
        <Await promise={promise}>
          {({ data, attributionText }) => (
            <>
              <section className="max-w-7xl mx-auto px-24 flex-1 w-full">
                <header className="mb-8 flex flex-col gap-20">
                  <InputSearch query={query} />

                  <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-8">
                    <p className="font-medium text-neutral-400 md:text-base text-sm">Encontrados {data.count} heróis</p>

                    <div className="md:ml-auto m-0 flex justify-between">
                      <HeroesSorter />
                    </div>
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
