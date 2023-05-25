import './Pub.css';
import { getUser } from '../services/contentService.js'
const Pub = (props) => {
    const getPoster = () => {
        const poster = props.posterid
        return poster.email;
    }
    return (
        <div className="publication">
            <h3>{props.posterid}</h3>
            <p>{props.date}</p>
            <p>{props.content}</p>
        </div>
    )
}

export default Pub;