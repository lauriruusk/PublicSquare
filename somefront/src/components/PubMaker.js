

const PubMaker = () => {

    const handleCreate = (event) => {
        event.preventDefault();
        const publication = {
            publisher: window.localStorage.getItem('loggeduser'),
            title: event.target.titlefield,
            content: event.target.contentfield,
            date: Date.now()
        }
    }

    return (
        <div>
            <form onSubmit={handleCreate}>
                <label for="titlefield">Title</label>
                <input id="titlefield" type="text" placeholder="title"/>
                <label>Content</label>
                <input id="contentfield" type="textarea" placeholder="content" />
                <button id="pubsubmit" type="submit">Publish</button>
            </form>
        </div>
    )
}

export default PubMaker;