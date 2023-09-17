import Await from "@/components/Await";
import Header from "@/components/Header";
import HeroesList from "@/components/HeroesList";
import InputSearch from "@/components/InputSearch";
import { MarvelCharacter } from "@/types/MarvelCharacters";
import { MarvelListResponse, MarvelResponse } from "@/types/MarvelResponse";
import { parseNumberWithMin } from "@/utils/number";
import { SearchParams, handleServerSearchParam } from "@/utils/params";
import { Suspense } from "react";
import HeroesSorter from "@/components/HeroesSorter";
import { OrderByType, parseStringToOrderBy } from "@/utils/orderBy";
import HeartSwitch from "@/components/HeartSwitch";
import Pagination from "@/components/Pagination";
import Footer from "@/components/Footer";
import Skeleton from "@/components/HeroesList/skeleton";

interface FetchHeroesProps {
  query: string
  page: number
  orderBy: OrderByType
}

async function fetchHeroes({ page, query, orderBy }: FetchHeroesProps): Promise<MarvelResponse<MarvelListResponse<MarvelCharacter>>> {
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
          {({ data, attributionText }) => {
            const heroesFoundText = data.count === 0 ?
              "Nenhum herói encontrado" :
              `Encontrados ${1 + ((page - 1) * 20)} - ${page * 20} de ${data.total} heróis`
            return (
              <>
                <section className="max-w-7xl mx-auto px-24 flex-1 w-full flex flex-col gap-8">
                  <header className="flex flex-col gap-20">
                    <InputSearch query={query} />

                    <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-8">
                      <p className="font-medium text-neutral-400 md:text-base text-sm">
                        {heroesFoundText}
                      </p>

                      <div className="md:ml-auto m-0 flex justify-between gap-8">
                        <HeroesSorter />
                        <HeartSwitch />
                      </div>
                    </div>
                  </header>

                  <HeroesList heroes={data.results} />
                  {data.count !== 0 && <Pagination page={page} total={data.total} />}
                </section>

                <Footer attributionText={attributionText} />
              </>
            )
          }}
        </Await>
      </Suspense>
    </main >
  )
}
