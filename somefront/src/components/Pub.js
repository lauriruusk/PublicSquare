
const Pub = (props) => {
    return (
        <div>
            <h3>{props.posterid}</h3>
            <p>{props.date}</p>
            <p>{props.content}</p>
        </div>
    )
}

export default Pub;