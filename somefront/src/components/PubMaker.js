import { addPub} from '../services/contentService';

const PubMaker = () => {

    const handleCreate = (event) => {
        event.preventDefault();
        const user = window.localStorage.getItem('loggeduser').username;
        // const userId = getUser(user)
        const publication = {
            publisher: user,
            title: event.target.titlefield,
            content: event.target.contentfield,
            date: Date.now()
        }
    }

    return (
        <div>
            <form className='pubform' onSubmit={handleCreate}>
                <label for="titlefield">Title</label><br/>
                <input id="titlefield" type="text" placeholder="title"/><br/>
                <label>Content</label><br/>
                <input id="contentfield" type="textfield" placeholder="content" /><br/>
                <button id="pubsubmit" type="submit">Publish</button>
            </form>
        </div>
    )
}

export default PubMaker;