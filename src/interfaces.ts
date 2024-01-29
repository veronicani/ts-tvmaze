// Returns (promise) array of show objects: [show, show, ...].
// *    Each show object should contain exactly: {id, name, summary, image}
// *    (if no image URL given by API, put in a default image URL)

interface IShow {
  id: number,
  name: string,
  summary: string,
  image: string
}

/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

interface IEpisode {
  id: number,
  name: string,
  season: number,
  number: number
}

export type { IShow, IEpisode };


