import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import RedefinedByAi from '@/components/RedefinedByAi'

export const metadata: Metadata = {
  title: 'Redefined by AI — a vocabulary for AI, in working language',
  description:
    'Words that already existed and quietly changed jobs. Temperature. Token. Harness. The series rewires them, one term at a time — written from inside the work.',
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
