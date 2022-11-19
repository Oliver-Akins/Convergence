import Game from "./Game";

function SearchList({ results=null, controls=null }) {
    if(!results || results.length < 1) {
        return <></>;
    }

    return (
        <div className="search-list">
            <div className="search-list__heading">
                <h2>{ results.length } Results</h2>
            </div>
            <div className="search-list__results">
                {results.map((item, i) => {
                    return (
                        <Game game={item} key={i} controls={controls} />
                    );
                })}
            </div>
        </div>
    );
}

export default SearchList;