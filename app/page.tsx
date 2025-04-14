import { Meme } from '@/types/meme'
import { MemeTable } from '@/components/MemeTable'

async function fetchMemes(): Promise<Meme[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/memes/load`,
    {
      cache: 'no-store',
    }
  )
  return res.json()
}

export default async function Home() {
  await fetchMemes()

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">🎭 Memes table</h1>
      <MemeTable />
    </main>
  )
}
