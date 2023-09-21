import { fetchMarvel } from '@/services/marvel';
import { parseNumberWithMin, parseStringToNumber } from '@/utils/number';
import { parseStringToOrderBy } from '@/utils/orderBy';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    const query = searchParams.get('query') || ""
    const page = parseNumberWithMin(searchParams.get('page') || "", 1)
    const limit = parseStringToNumber(searchParams.get('limit') || "", 20) || 20
    const orderBy = parseStringToOrderBy(searchParams.get('orderBy') || "", "asc")

    const offset = (page - 1) * 20
    const _request = await fetchMarvel("characters", {
        searchParams: {
            offset: offset.toString(),
            nameStartsWith: query,
            limit: limit.toString(),
            orderBy: orderBy === "asc" ? "name" : "-name"
        }
    })

    return NextResponse.json(await _request.json());
}