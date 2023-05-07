import prisma from '../../../lib/prisma'


import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {

    try {
        const games = await prisma.game.deleteMany({
        })
        return NextResponse.json({ games })
    } catch (e) {
        console.error('Request error', e)
        return NextResponse.json({ error: 'Error fetching posts' })
    }
}

