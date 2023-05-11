

const SearchForm = (props) => {
    const handleSearch = (event) => {
        event.PreventDefault();
        props.handler(event.target.value);
    }
    return (
        <>
            <form onChange={handleSearch}>
                <input id="searchFilter" type="text" placeholder="search..." />
            </form>
            
        </>
    )
}

export default SearchForm;