// app/api/memes/load/route.ts
import { promises as fs } from 'fs'
import { NextResponse } from 'next/server'
import path from 'path'

const dbPath = path.join(process.cwd(), 'db', 'memes.json')

export async function GET() {
  try {
    const file = await fs.readFile(dbPath, 'utf-8')
    const data = JSON.parse(file)
    if (data.length) {
      return NextResponse.json({ fromCache: true, memes: data })
    }

    const res = await fetch('https://api.imgflip.com/get_memes')
    const json = await res.json()

    if (!json.success)
      return NextResponse.json(
        { error: 'Failed to load memes' },
        { status: 500 }
      )

    const memes = json.data.memes.slice(0, 10).map((m: any) => ({
      id: m.id,
      name: m.name,
      image: m.url,
      likes: 0,
    }))

    await fs.writeFile(dbPath, JSON.stringify(memes, null, 2), 'utf-8')
    return NextResponse.json({ fromCache: false, memes })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Error loading memes' }, { status: 500 })
  }
}
