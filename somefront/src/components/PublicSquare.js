import Pub from "./Pub";

const PublicSquare = (props) => {

    return (
        <div>

            {props.content.length > 0 ? 
                props.content.map(c => {
                    return <Pub posterid={c.posterid} date={c.postdate} content={c.content} />
                }) 
                :
                <Pub posterid="123" date={() => new Date.now()} content="If you see this content, backend doesn't work" />
            }
        </div>
    )
}

export default PublicSquare;