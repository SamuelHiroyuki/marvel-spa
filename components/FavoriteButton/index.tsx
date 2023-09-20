import { cookies } from "next/headers";
import FavoriteButtonClient, { FavoriteButtonProps } from "./client";

export default function FavoriteButton(props: Omit<FavoriteButtonProps, "isChecked">) {
    const cookieStore = cookies()
    const storedCharacterId = cookieStore.get(`fav-character:${props.characterId}`)

    return <FavoriteButtonClient {...props} isChecked={!!storedCharacterId?.value} />
}
