import SearchForm from "./SearchForm"

const LoggedInForm = (props) => {
    const searchContent = (fltr) => {
    }

    return (
        <div>
            <SearchForm handler={searchContent} />
        </div>
    )
}

export default LoggedInForm;