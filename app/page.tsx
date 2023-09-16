import Header from "@/components/Header";
import HeroesList from "@/components/HeroesList";
import InputSearch from "@/components/InputSearch";
import { MarvelCharacter } from "@/types/MarvelCharacters";
import { MarvelCharacterResponse, MarvelResponse } from "@/types/MarvelResponse";
import { requestToMarvel } from "@/utils/marvelService";
import { SearchParams, handleServerSearchParam } from "@/utils/params";

interface FetchHeroesProps {
  query: string
  page: number
}

async function fetchHeroes({ page, query }: FetchHeroesProps): Promise<MarvelResponse<MarvelCharacterResponse<MarvelCharacter>>> {
  const offset = (page - 1) * 20
  const request = await requestToMarvel("characters", {
    searchParams: {
      offset: offset.toString(),
      nameStartsWith: query
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

  const { data, attributionText } = await fetchHeroes({ page, query })

  return (
    <main className="min-h-screen flex flex-col gap-12 pt-6">
      <Header />

      <section className="max-w-7xl mx-auto px-24">
        <header className="mb-8 flex flex-col gap-16">
          <InputSearch query={query} />
          <div>
            <p className="font-medium text-neutral-400">Encontrados {data.total} heróis</p>
          </div>
        </header>
        <HeroesList heroes={data.results} />
      </section>

      <footer className="bg-[#ff0000] h-16 mt-12 flex items-center justify-center">
        <p className="text-white font-medium">{attributionText}</p>
      </footer>
    </main >
  )
}
