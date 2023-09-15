import Header from "@/components/Header";
import HeartButton from "@/components/HeartButton";
import HeroesList from "@/components/HeroesList";
import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <main className="min-h-screen flex flex-col gap-4 py-6 px-24">
      <Header />

      <section className="max-w-7xl mx-auto">
        <HeroesList />
      </section>
    </main >
  )
}
