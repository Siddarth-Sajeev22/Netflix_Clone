import React, { useEffect, useState } from 'react'
import Youtube from 'react-youtube'
import "./RowPost.css"
import axios from "../axios"
import { imageUrl,API_KEY} from "../../constants/constants"
function RowPost(props) {
    let [image,setImage]=useState(false);
    const [flag,setFlag] = useState(0);
    const [movies, setMovies] = useState([])
    const [urlId,setUrlId]= useState({})
    useEffect(() => {
        axios.get(props.url).then(response => {
            setMovies(response.data.results)
        })


    }, [])

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        }
    };

    function handleMovie(id)
    {
        console.log(id);
        if(!image)
        {
            setImage(true);
            setFlag(0);
        }
        

        else if(image){
            setImage(false);
            setFlag(1);
        }
        
        axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{
            if(response.data.results.length!==0 ){
                setUrlId(response.data.results[0])
            }
            else {
                console.log('Array empty')
            }
        })
    }
        return(
        <div className = 'row' >
            <h2>{props.title}</h2>
            <div className="posters">
                {movies.map((obj)=>
                <div>
                    <img onClick={()=>handleMovie(obj.id)} className={image ? 'poster':'smallPoster'} src={`${imageUrl+obj.backdrop_path}`} alt="poster" />
                    {image? <h1 className='description2'>{obj.overview}</h1>:""}
                </div>
                )}
                
            </div>
            <div></div>
            { flag && urlId && <Youtube videoId={urlId.key} opts={opts} />}
        </div>
    )
}

export default RowPost