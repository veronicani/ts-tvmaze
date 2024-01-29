/** Interfaces for TVMaze data models. */

interface IShow {
  id: number,
  name: string,
  summary: string,
  image: string
}

interface IEpisode {
  id: number,
  name: string,
  season: number,
  number: number
}

//NOTE: needs export type for interfaces
export type { IShow, IEpisode };


