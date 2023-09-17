import { requestToMarvel } from '@/utils/marvelService';
import { NextResponse } from 'next/server';

interface Params {
    characterId: string;
}

export async function GET(_: Request, { params }: { params: Params }) {
    const { characterId } = params

    const _request = await requestToMarvel(`characters/${characterId}/comics`, {
        searchParams: {
            limit: "12",
            orderBy: "-onsaleDate"
        }
    })

    return NextResponse.json(await _request.json());
}