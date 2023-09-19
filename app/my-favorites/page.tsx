import Await from "@/components/Await";
import HeroesList from "@/components/HeroesList";
import InputSearch from "@/components/InputSearch";
import { MarvelCharacter } from "@/types/MarvelCharacters";
import { MarvelListResponse, MarvelResponse } from "@/types/MarvelResponse";
import { SearchParams, handleServerSearchParam } from "@/utils/params";
import { Suspense } from "react";
import HeroesSorter from "@/components/HeroesSorter";
import { OrderByType, parseStringToOrderBy } from "@/utils/orderBy";
import HeartSwitch from "@/components/HeartSwitch";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import { cookies } from 'next/headers'
import FavoritesHeroesListSkeleton from "@/components/Skeletons/FavoritesHeroesListSkeleton";

async function fetchFavorites({ charactersIds, orderBy }: {
  charactersIds: string[];
  orderBy: OrderByType;
}) {
  const requests = await Promise.all(charactersIds.map(characterId => fetch(
    new URL(`api/marvel/characters/${characterId}`, "http://localhost:3000/"),
    { next: { revalidate: 1800 } }
  )))

  const responses: Array<MarvelResponse<MarvelListResponse<MarvelCharacter>>> =
    await Promise.all(requests.map(request => request.json()))

  const heroes = responses
    .map(response => response.data.results.at(0) as MarvelCharacter)
    .sort()

  return {
    attributionText: responses.at(0)?.attributionText || "Data provided by Marvel.",
    heroes: orderBy === "asc" ? heroes : heroes.reverse()
  }
}

export default async function Favorites({ searchParams }: { searchParams: SearchParams }) {
  const getParam = handleServerSearchParam(searchParams)
  const orderBy = getParam<OrderByType>("orderBy", "asc", parseStringToOrderBy)

  const cookieStore = cookies()
  const allEntries = cookieStore.getAll()
  const favorites = allEntries
    .filter(entry => entry.name.includes("fav-character"))
    .filter(entry => !!entry.value)
  const charactersIds = favorites.map(entry => entry.value)

  const promise = fetchFavorites({ charactersIds, orderBy })

  return (
    <main className="min-h-screen flex flex-col gap-12 pt-6">
      <header className="flex flex-col items-center gap-4">
        <Logo />
        <div className="flex flex-col items-center gap-2 px-14">
          <h1 className="text-neutral-700 uppercase font-bold text-3xl text-center">Explore o Universo</h1>
          <p className="text-neutral-500 font-medium text-sm text-center">
            Mergulhe no domínio deslumbrante de todos os personagens que você ama - e aqueles que você descobrirá em breve!
          </p>
        </div>
      </header>

      <Suspense key={orderBy} fallback={<FavoritesHeroesListSkeleton />}>
        <Await promise={promise}>
          {({ heroes, attributionText }) => {
            const heroesFoundText = heroes.length === 0 ?
              "Nenhum herói favoritado!" :
              `${heroes.length} heróis favoritados`
            return (
              <>
                <section className="max-w-7xl mx-auto px-6 lg:px-24 flex-1 w-full flex flex-col gap-8">
                  <header className="flex flex-col gap-20">
                    <InputSearch query="" />

                    <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-8">
                      <p className="font-medium text-neutral-400 md:text-base text-sm">
                        {heroesFoundText}
                      </p>

                      <div className="md:ml-auto m-0 flex justify-end gap-8 flex-wrap">
                        <HeroesSorter />
                        <HeartSwitch checked />
                      </div>
                    </div>
                  </header>

                  <HeroesList heroes={heroes} />
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
