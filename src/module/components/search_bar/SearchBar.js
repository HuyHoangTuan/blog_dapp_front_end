import "./SearchBar.css";

const SearchBar = ({ formSubmit, value, handleSearchKey, clearSearch }) => {
    const results = [
        {
            text: "Real Performance Paradox",
        },
        {
            text: "The Email Scam That Nearly Worked On Me",
        },
        {
            text: "The forgotten benefits of “low tech” user interfaces",
        },
        {
            text: "Become a Web3 Developer with just simple JS...",
        },
    ];
    return (
        <div className="search_bar">
            <div className='searchBar-wrap'>
                <form onSubmit={formSubmit}>
                    <input
                        type='text'
                        placeholder='Search'
                        value={value}
                        onChange={handleSearchKey}
                    />
                    {value && <span onClick={clearSearch}>X</span>}
                    <button>Go</button>
                </form>
            </div>
            {(results.length != 0) ? (
                <div className="trends">
                    {results.map((e, i) => {
                        return (
                            <div key={i} className="trend">
                                <div className="trendText">{e.text}</div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="trends">No results found!</div>
            )}
        </div>

    );
};

export default SearchBar;