import prisma from '../../../lib/prisma'


import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {

  try {
    const games = await prisma.game.findMany({
      take: 10,
      orderBy: {
        score: 'desc',
      },
    })
    return NextResponse.json({ games })
  } catch (e) {
    console.error('Request error', e)
    return NextResponse.json({ error: 'Error fetching posts' })
  }
}

export async function POST(request: NextRequest) {
  try {
    const res = await request.json();
    await prisma.game.create({
      data: {
        ...res
      }
    })
    return NextResponse.json({ message: 'Game created' })
  } catch (e) {
    console.error('Request error', e)
    return NextResponse.json({ error: 'Error fetching posts' })
  }
}