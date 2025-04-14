'use server'
import { MemeList } from '@/components/MemeList'
import { Meme } from '@/types/meme'

async function fetchMemes(): Promise<Meme[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/memes/load`,
    {
      cache: 'no-store',
    }
  )
  return res.json()
}

export default async function TablePage() {
  await fetchMemes()
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Memes list</h1>
      <MemeList />
    </main>
  )
}
