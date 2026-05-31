import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import RedefinedByAi from '@/components/RedefinedByAi'

export const metadata: Metadata = {
  title: 'Redefined by AI — a vocabulary for AI, in working language',
  description:
    'A series about the words AI borrowed and quietly redefined. Temperature. Token. Harness. Written from inside the work. The posts are the source material for the flashcards and the game built on top of them.',
}

/**
 * /redefined-by-ai
 *
 * Dedicated section page for the writing series. Reads off
 * content/data.ts → redefinedByAi. Single source of truth: edit
 * the entries array there, and this page updates.
 */
export default function RedefinedByAiPage() {
  return (
    <>
      <Nav />
      <main>
        <RedefinedByAi />
      </main>
    </>
  )
}
