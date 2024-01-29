// Returns (promise) array of show objects: [show, show, ...].
// *    Each show object should contain exactly: {id, name, summary, image}
// *    (if no image URL given by API, put in a default image URL)

interface Ishow {
  id: number,
  name: string,
  summary: string,
  image: string
}

export type { Ishow }