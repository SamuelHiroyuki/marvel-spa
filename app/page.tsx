import Await from "@/components/Await";
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
import Logo from "@/components/Logo";

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
      <header className="flex flex-col items-center gap-4">
        <Logo />
        <div className="flex flex-col items-center gap-2 px-14">
          <h1 className="text-neutral-700 uppercase font-bold text-3xl">Explore o Universo</h1>
          <p className="text-neutral-500 font-medium text-sm text-center">
            Mergulhe no domínio deslumbrante de todos os personagens que você ama - e aqueles que você descobrirá em breve!
          </p>
        </div>
      </header>

      <Suspense key={`${page}_${query}_${orderBy}`} fallback={<Skeleton />}>
        <Await promise={promise}>
          {({ data, attributionText }) => {
            const heroesFoundText = data.count === 0 ?
              "Nenhum herói encontrado" :
              `Encontrados ${1 + ((page - 1) * 20)} - ${Math.min(page * 20, data.count)} de ${data.total} heróis`
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
