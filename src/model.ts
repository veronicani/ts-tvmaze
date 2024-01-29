const MISSING_IMAGE_URL = "https://tinyurl.com/missing-tv";
const TVMAZE_API_URL = "https://api.tvmaze.com/";
import { Ishow } from "./interfaces";


/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function searchShowsByTerm(term: string) : Promise<Ishow[]> {
  // ADD: Remove placeholder & make request to TVMaze search shows API.
    const resp = await fetch(`${TVMAZE_API_URL}search/shows?q=${term}`);
    const showsAndScores = await resp.json();
    // console.log("searchShowsByTerm shows=", showsAndScores);
    const showsData = showsAndScores.map(s => s.show);
    const shows = showsData.map(s => ({
      id: s.id,
      name: s.name,
      summary: s.summary,
      image: s.image || MISSING_IMAGE_URL
    }));
    console.log('result shows:', shows);
    return shows;
}


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

async function getEpisodesOfShow(id) {
  //TODO: implement
}


export {
  searchShowsByTerm,
  getEpisodesOfShow,
  TVMAZE_API_URL,
  MISSING_IMAGE_URL,
};
