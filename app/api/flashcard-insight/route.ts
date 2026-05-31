import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const client = new Anthropic()

export async function POST(req: NextRequest) {
  const { term, definition, isRedefined } = await req.json()

  if (!term || !definition) {
    return NextResponse.json({ text: 'Missing term or definition.' }, { status: 400 })
  }

  const seriesContext = isRedefined && definition
    ? `This term was explained to a professional non-technical audience in a series called "Redefined by AI." The author's framing: "${definition}". Build on that voice and frame.`
    : ''

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 200,
      system: `You are an expert AI educator writing for a professional non-technical audience. In 2–3 sentences, share a deeper insight — a concrete analogy, a nuance practitioners often miss, or a connection to something broader. Plain prose only. ${seriesContext}`,
      messages: [{ role: 'user', content: `Concept: ${term}\nDefinition: ${definition}\n\nShare a deeper insight.` }],
    })

    const text = message.content[0].type === 'text' ? message.content[0].text.trim() : 'No response.'
    return NextResponse.json({ text })
  } catch {
    return NextResponse.json({ text: 'Unable to reach Claude. Check your connection.' }, { status: 500 })
  }
}
