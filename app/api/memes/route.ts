// app/api/memes/route.ts

import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const dbPath = path.join(process.cwd(), 'db', 'memes.json')

export async function GET() {
  try {
    const file = await fs.readFile(dbPath, 'utf-8')
    const data = file ? JSON.parse(file) : []
    return NextResponse.json({ memes: data })
  } catch (error) {
    console.error('Error loading memes:', error)
    return NextResponse.json({ error: 'Error loading memes' }, { status: 500 })
  }
}
