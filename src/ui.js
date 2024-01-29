"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var jquery_1 = require("jquery");
var model_ts_1 = require("./model.ts");
var $showsList = (0, jquery_1.default)("#showsList");
var $episodesArea = (0, jquery_1.default)("#episodesArea");
var $searchForm = (0, jquery_1.default)("#searchForm");
var $episodesList = (0, jquery_1.default)("#episodesList");
/** Given list of shows, create markup for each and to DOM */
function populateShows(shows) {
    $showsList.empty();
    for (var _i = 0, shows_1 = shows; _i < shows_1.length; _i++) {
        var show = shows_1[_i];
        var $show = (0, jquery_1.default)("<div data-show-id=\"".concat(show.id, "\" class=\"Show col-md-12 col-lg-6 mb-4\">\n         <div class=\"media\">\n           <img\n              src=").concat(show.image, "\n              alt=").concat(show.name, "\n              class=\"w-25 me-3\">\n           <div class=\"media-body\">\n             <h5 class=\"text-primary\">").concat(show.name, "</h5>\n             <div><small>").concat(show.summary, "</small></div>\n             <button class=\"btn btn-outline-light btn-sm Show-getEpisodes\">\n               Episodes\n             </button>\n           </div>\n         </div>\n       </div>\n      "));
        $showsList.append($show);
    }
}
/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */
function searchForShowAndDisplay() {
    return __awaiter(this, void 0, void 0, function () {
        var term, shows;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    term = (0, jquery_1.default)("#searchForm-term").val();
                    return [4 /*yield*/, (0, model_ts_1.searchShowsByTerm)(term)];
                case 1:
                    shows = _a.sent();
                    $episodesArea.hide();
                    populateShows(shows);
                    return [2 /*return*/];
            }
        });
    });
}
//NOTE: giving this fn a evt type gives 'No overload' err on "submit"
$searchForm.on("submit", function (evt) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    evt.preventDefault();
                    return [4 /*yield*/, searchForShowAndDisplay()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
});
/** Given list of episodes from a show, create markup for each and add to DOM */
function populateEpisodes(episodes) {
    $episodesList.empty();
    for (var _i = 0, episodes_1 = episodes; _i < episodes_1.length; _i++) {
        var episode = episodes_1[_i];
        var $episode = (0, jquery_1.default)("<li>\n          ".concat(episode.name, " (season ").concat(episode.season, " number ").concat(episode.number, ")\n        </li>\n        "));
        $episodesList.append($episode);
    }
    ;
}
;
/** Gets list of episodes from API and display in episodesArea.
*/
function getEpisodesAndDisplay(evt) {
    return __awaiter(this, void 0, void 0, function () {
        var id, episodes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = Number((0, jquery_1.default)(evt.target).closest('.Show').attr('data-show-id'));
                    return [4 /*yield*/, (0, model_ts_1.getEpisodesOfShow)(id)];
                case 1:
                    episodes = _a.sent();
                    populateEpisodes(episodes);
                    $episodesArea.show();
                    return [2 /*return*/];
            }
        });
    });
}
$showsList.on("click", "button", getEpisodesAndDisplay);
