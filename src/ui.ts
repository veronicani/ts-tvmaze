import $ from 'jquery';
import { getEpisodesOfShow, searchShowsByTerm } from "./model.ts";
import { IEpisode, IShow } from './interfaces';

const $showsList = $("#showsList");
const $episodesArea = $("#episodesArea");
const $searchForm = $("#searchForm");
const $episodesList = $("#episodesList");


/** Given list of shows, create markup for each and to DOM */

function populateShows(shows: IShow[]) : void {
  $showsList.empty();

  for (let show of shows) {
    const $show = $(
      `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img
              src=${show.image}
              alt=${show.name}
              class="w-25 me-3">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>
       </div>
      `
    );

    $showsList.append($show);
  }
}


/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay() {
  const term = $("#searchForm-term").val() as string;
  const shows = await searchShowsByTerm(term);

  $episodesArea.hide();
  populateShows(shows);
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});


/** Given list of episodes from a show, create markup for each and add to DOM */

function populateEpisodes(episodes: IEpisode[]) : void {
  $episodesList.empty();

  for (let episode of episodes) {
    const $episode = $(
        `<li>
          ${episode.name} (season ${episode.season} number ${episode.number})
        </li>
        `
    );

    $episodesList.append($episode)
  };
};

/** Show episode area (if asked for episodes) and call getEpisodesOfShow. */

async function searchForEpisodesAndDisplay(evt: JQuery.ClickEvent): Promise<void> {
  const id = Number($(evt.target).closest('.Show').attr('data-show-id'))
  const episodes = await getEpisodesOfShow(id);

  console.log("Episodes: ", episodes);

  populateEpisodes(episodes);
  $episodesArea.show();
}

$showsList.on("click", "button", searchForEpisodesAndDisplay);