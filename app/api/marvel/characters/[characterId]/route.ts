import { fetchMarvel } from '@/services/marvel';
import { NextResponse } from 'next/server';

interface Params {
    characterId: string;
}

export async function GET(_: Request, { params }: { params: Params }) {
    const { characterId } = params

    const _request = await fetchMarvel(`characters/${characterId}`)

    return NextResponse.json(await _request.json());
}