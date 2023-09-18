import { requestToMarvel } from '@/utils/marvelService';
import { parseStringToNumber } from '@/utils/number';
import { NextResponse } from 'next/server';

interface Params {
    characterId: string;
}

export async function GET(request: Request, { params }: { params: Params }) {
    const { characterId } = params
    const { searchParams } = new URL(request.url)

    const limit = parseStringToNumber(searchParams.get('limit') || "", 10) || 10

    const _request = await requestToMarvel(`characters/${characterId}/comics`, {
        searchParams: {
            limit: limit.toString(),
            orderBy: "-onsaleDate"
        }
    })

    return NextResponse.json(await _request.json());
}