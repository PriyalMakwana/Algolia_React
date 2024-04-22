import algoliasearch from "algoliasearch";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  Pagination,
  Stats,
  SortBy,
  RefinementList,
  Menu,
} from "react-instantsearch";
import "./App.css";

const algoliaAppId = process.env.REACT_APP_ALGOLIA_APP_ID;
const algoliaApiKey = process.env.REACT_APP_API_KEY;

const searchClient = algoliasearch(algoliaAppId, algoliaApiKey);

function Hit({ hit }) {
  return (
    <>
      <div className="main">
        <div className="card">
          <h3>
            <Highlight attribute="title" hit={hit} />
          </h3>
          <h5>Id : {hit.id}</h5>
          <p>{hit.overview}</p>

          <p>Popularity : {hit.popularity}</p>
          <p>Vote_Average : {hit.vote_average}</p>
          <h4>genres: {hit.genres}</h4>
          <p>Language: {hit.original_language}</p>
        </div>
        <div>
          <img src={hit.poster_path} alt={hit.title} height="200" />
          <p>Release_Date : {hit.release_date}</p>
        </div>
      </div>
    </>
  );
}

function Sorting() {
  return (
    <div className="sidebar">
      <div className="sideCard">
        <h5>Genres</h5>
        <RefinementList attribute="genres" />
      </div>

      <div className="sideCard">
        <h5>Language</h5>
        <Menu attribute="original_language" />
      </div>
    </div>
  );
}

function App() {
  return (
    <InstantSearch searchClient={searchClient} indexName="react_algolia">
      <div className="rightDiv">
        <div>
          <header>
            <SearchBox />
          </header>

          <div className="stats">
            <Stats />
          </div>

          {/* <SortBy
            defaultRefinement="vote_average"
            items={[
              { value: "vote_average", label: "Popularity" },
              { value: "vote_average", label: "Vote Average" },
            ]}
          /> */}

          <Hits hitComponent={Hit} />
          <Pagination className="pagination-list" showLast />
        </div>
        <Sorting />
      </div>
    </InstantSearch>
  );
}

export default App;
