import Header from "@/components/Header";
import HeroesList from "@/components/HeroesList";
import { MarvelCharacter } from "@/types/MarvelCharacters";
import { MarvelCharacterResponse, MarvelResponse } from "@/types/MarvelResponse";
import { requestToMarvel } from "@/utils/marvelService";
import { SearchParams, handleServerSearchParam } from "@/utils/params";

async function fetchHeroes({ page }: { page: number }): Promise<MarvelResponse<MarvelCharacterResponse<MarvelCharacter>>> {
  const offset = (page - 1) * 20
  const request = await requestToMarvel("characters", {
    searchParams: {
      offset: offset.toString()
    }
  })

  return await request.json()
}

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  const getParam = handleServerSearchParam(searchParams)
  const page = getParam<number>("page", 1, (value, initialValue) => {
    const _value = Number(value);
    if (isNaN(_value) || _value < 1) return initialValue
    return _value;
  })
  const query = getParam<string>("q", "")

  const { data, attributionText } = await fetchHeroes({ page })

  return (
    <main className="min-h-screen flex flex-col gap-16 pt-6">
      <Header />

      <section className="max-w-7xl mx-auto px-24">
        <header className="mb-8">
          <p className="font-medium text-neutral-400">Encontrados {data.total} heróis</p>
          {/* <nav>Ordenar por nome - A/Z</nav> */}
        </header>
        <HeroesList heroes={data.results} />
      </section>

      <footer className="bg-[#ff0000] h-16 flex items-center justify-center">
        <p className="text-white font-medium">{attributionText}</p>
      </footer>
    </main >
  )
}
