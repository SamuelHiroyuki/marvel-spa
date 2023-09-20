"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import type { TypeOptions } from "react-toastify"

interface ReturnType {
    message: string
    icon: string
    type: TypeOptions
}

export async function addToCookies(data: FormData, revalidateFavorites: boolean): Promise<ReturnType> {
    "use server"
    const characterId = (data.get('characterId') || "") as string

    const cookieStore = cookies()
    const allEntries = cookieStore.getAll()
    const favorites = allEntries.filter(entry => entry.name.includes("fav-character"))
    const storedCharacterId = favorites.find(entry => entry.name === `fav-character:${characterId}`)

    if (storedCharacterId) {
        cookieStore.delete(storedCharacterId)
        if (revalidateFavorites) revalidatePath("my-favorites")
        return { message: 'Herói desfavoritado!', icon: "🐱‍🏍", type: "success" }
    }

    if (favorites.length < 5) {
        cookieStore.set(`fav-character:${characterId}`, characterId)
        if (revalidateFavorites) revalidatePath("my-favorites")
        return { message: 'Herói favoritado!', icon: "🦸", type: "default" }
    }

    return {
        message: 'Limite de heróis favoritados alcançado!',
        type: "error",
        icon: "✋"
    }
}