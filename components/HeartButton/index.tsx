import { cookies } from "next/headers";
import HeartButtonClient, { HeartButtonProps } from "./client";

export default function HeartButton(props: Omit<HeartButtonProps, "isChecked">) {
    const cookieStore = cookies()
    const storedCharacterId = cookieStore.get(`fav-character:${props.characterId}`)

    return <HeartButtonClient {...props} isChecked={!!storedCharacterId?.value} />
}
