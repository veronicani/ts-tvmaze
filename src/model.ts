const MISSING_IMAGE_URL = "https://tinyurl.com/missing-tv";
const TVMAZE_API_URL = "https://api.tvmaze.com/";
import { IShow, IEpisode } from "./interfaces";


/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function searchShowsByTerm(term: string) : Promise<IShow[]> {
    const resp = await fetch(`${TVMAZE_API_URL}search/shows?q=${term}`);
    const showsAndScores = await resp.json();

    const showsData = showsAndScores.map(s => s.show);
    //NOTE: do we need to specify type for this? and how to add 'bang' (!) if so
    const shows = showsData.map(s => ({
      id: s.id,
      name: s.name,
      summary: s.summary,
      image: s.image?.medium || MISSING_IMAGE_URL
    }));
    
    return shows;
}


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

async function getEpisodesOfShow(id: number) : Promise<IEpisode[]> {
  const resp = await fetch(`${TVMAZE_API_URL}shows/${id}/episodes`);
  const episodesData = await resp.json();

  if (episodesData.status === 404) throw new Error ("404: Show not found.");

  const episodes = episodesData.map(
    ({ id, name, season, number }) => ({ id, name, season, number }));
  
  return episodes;
}


export {
  searchShowsByTerm,
  getEpisodesOfShow,
  TVMAZE_API_URL,
  MISSING_IMAGE_URL,
};
