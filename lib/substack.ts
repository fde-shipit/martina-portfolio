export interface SubstackPost {
  title: string
  link: string
  hook: string
  week: string
}

export async function getSubstackPosts(): Promise<SubstackPost[]> {
  try {
    const res = await fetch('https://martinaedwards.substack.com/feed', {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return []

    const xml = await res.text()
    const items = xml.match(/<item>([\s\S]*?)<\/item>/g) || []

    const parsed = items.map((item) => {
      const title =
        item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] ||
        item.match(/<title>(.*?)<\/title>/)?.[1] ||
        'Untitled'

      const link =
        item.match(/<link>(.*?)<\/link>/)?.[1] ||
        item.match(/<guid>(.*?)<\/guid>/)?.[1] ||
        'https://martini375179.substack.com'

      const rawDescription =
        item.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/)?.[1] ||
        item.match(/<description>([\s\S]*?)<\/description>/)?.[1] ||
        ''

      const hook = rawDescription
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .trim()
        .slice(0, 160)

      return { title, link, hook, week: '' }
    })

    // Reverse to chronological order, then number
    return [...parsed]
      .reverse()
      .map((post, i) => ({
        ...post,
        week: String(i + 1).padStart(2, '0'),
      }))
  } catch {
    return []
  }
}
