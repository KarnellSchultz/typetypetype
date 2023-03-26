import prisma from '../../../lib/prisma'


import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {

  try {
    const games = await prisma.game.findMany()
    console.log('Request method', games);
    return NextResponse.json({ games })
  } catch (e) {
    console.error('Request error', e)
    return NextResponse.json({ error: 'Error fetching posts' })
  }
}

export async function POST(request: NextRequest) {
  const res = await request.json();
  console.log('Request method', res);

  try {
    const game = await prisma.game.create({
      data: {
        ...res
      }
    })
    return
  } catch (e) {
    console.error('Request error', e)
    return NextResponse.json({ error: 'Error fetching posts' })
  }
}