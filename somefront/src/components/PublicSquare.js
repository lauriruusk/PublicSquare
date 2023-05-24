import {useState} from 'react';
import Pub from "./Pub";
import PubMaker from './PubMaker';

const PublicSquare = (props) => {
    const [make, setMake] = useState(false);
    return (
        <div>
            <button onClick={() => setMake(current => !current)}> Make a publication </button>
            {make && <PubMaker />}
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