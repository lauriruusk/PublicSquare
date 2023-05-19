import './Pub.css';

const Pub = (props) => {
    return (
        <div className="publication">
            <h3>{props.posterid}</h3>
            <p>{props.date}</p>
            <p>{props.content}</p>
        </div>
    )
}

export default Pub;