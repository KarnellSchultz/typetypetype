import { useRouter } from 'next/router';
import prisma from '../../../../lib/prisma'


import { NextRequest, NextResponse } from 'next/server';

export async function GET(_: NextRequest, { params }: { params: { userId: string } }) {

    const { userId } = params

    try {
        const games = await prisma.game.findMany({
            where: { userId: userId }
        })
        return NextResponse.json({ games })
    } catch (e) {
        console.error('Request error', e)
        return NextResponse.json({ error: 'Error fetching posts' })
    }
}
