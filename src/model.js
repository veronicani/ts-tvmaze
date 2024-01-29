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
exports.MISSING_IMAGE_URL = exports.TVMAZE_API_URL = exports.getEpisodesOfShow = exports.searchShowsByTerm = void 0;
var MISSING_IMAGE_URL = "https://tinyurl.com/missing-tv";
exports.MISSING_IMAGE_URL = MISSING_IMAGE_URL;
var TVMAZE_API_URL = "https://api.tvmaze.com/";
exports.TVMAZE_API_URL = TVMAZE_API_URL;
/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */
function searchShowsByTerm(term) {
    return __awaiter(this, void 0, void 0, function () {
        var resp, showsAndScores, showsData, shows;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("".concat(TVMAZE_API_URL, "search/shows?q=").concat(term))];
                case 1:
                    resp = _a.sent();
                    return [4 /*yield*/, resp.json()];
                case 2:
                    showsAndScores = _a.sent();
                    showsData = showsAndScores.map(function (s) { return s.show; });
                    shows = showsData.map(function (s) {
                        var _a;
                        return ({
                            id: s.id,
                            name: s.name,
                            summary: s.summary,
                            image: ((_a = s.image) === null || _a === void 0 ? void 0 : _a.medium) || MISSING_IMAGE_URL
                        });
                    });
                    console.log('result shows:', shows);
                    return [2 /*return*/, shows];
            }
        });
    });
}
exports.searchShowsByTerm = searchShowsByTerm;
/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */
function getEpisodesOfShow(id) {
    return __awaiter(this, void 0, void 0, function () {
        var resp, episodesData, episodes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("".concat(TVMAZE_API_URL, "shows/").concat(id, "/episodes"))];
                case 1:
                    resp = _a.sent();
                    return [4 /*yield*/, resp.json()];
                case 2:
                    episodesData = _a.sent();
                    if (episodesData.status === 404)
                        throw new Error("404: Show not found.");
                    episodes = episodesData.map(function (_a) {
                        var id = _a.id, name = _a.name, season = _a.season, number = _a.number;
                        return ({ id: id, name: name, season: season, number: number });
                    });
                    return [2 /*return*/, episodes];
            }
        });
    });
}
exports.getEpisodesOfShow = getEpisodesOfShow;
