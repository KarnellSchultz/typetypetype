import prisma from '../../../lib/prisma'
import { currentUser } from '@clerk/nextjs/app-beta';
import type { User } from '@clerk/nextjs/dist/api'



import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {

  try {
    const games = await prisma.game.findMany({
      take: 20,
      orderBy: {
        wpm: 'desc',
      },
    })
    return NextResponse.json({ games })
  } catch (e) {
    console.error('Request error', e)
    return NextResponse.json({ error: 'Error fetching posts' })
  }
}

export async function POST(request: NextRequest) {
  const user: User | null = await currentUser();

  try {
    const res = await request.json();
    console.log("POST request", res);
    await prisma.game.create({
      data: {
        ...res,
        userName: user?.username ?? 'Player Unknown',
        userId: user?.id,
      }
    })
    return NextResponse.json({ message: 'Game created' })
  } catch (e) {
    console.error('Request error', e)
    return NextResponse.json({ error: 'Error fetching posts' })
  }
}