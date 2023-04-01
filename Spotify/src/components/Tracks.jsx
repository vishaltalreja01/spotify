import React from 'react'
import { useEffect,useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import { CSSTransition,TransitionGroup } from 'react-transition-group';
 import './Tracks.css'

 
const Tracks = ({tracks}) => {
    const [tracksData, setTracksData] = useState([]);
    const [AcessToken, setAcessToken] = useState(localStorage.getItem("token"))
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [isVisible, setIsVisible] = useState(true);
    //method for fetching the Tracks
    
    const fetchtracks =async()=>{
        const newData = [];
        setLoading(true)
        for (const track of tracks) {
             console.log(track.id)
           
        const response = await fetch(`/api/track/${track.id}`, {
       
        method: 'GET',
        mode:'cors',  
          headers: {
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${AcessToken}`
       
        }
       
      });
    try {
        
     const {obj}=await response.json();
     
     console.log(obj.artists);
let  streams = obj.cm_statistics.sp_streams;
     newData.push({
        id:obj.id,
        name:obj.name,
        img:obj.image_url,
        artists: obj.artists,
        streams: streams,
        spotify: track.spotify
      });
         
    } catch (error) {
     console.log(error);
      }
    }  

    // }
    
    setTracksData(newData);
    setLoading(false)
      console.log(tracksData);
}
function formatNumber(numberString) {
  const number = parseInt(numberString, 10);
  console.log("number");
  return number.toLocaleString();
}
function checkAccessTokenValidity(accessToken) {
  if (!accessToken) {
    // If access token is not available
    return false;
  }

  const tokenExpirationTime = localStorage.getItem('accessTokenExpirationTime');
  console.log(tokenExpirationTime);
  const currentTime = new Date().getTime();

  if (!tokenExpirationTime || tokenExpirationTime < currentTime) {
    // If expiration time is not available or has already passed
    return false;
  }

  // Access token is valid
  return true;
}
useEffect(() => {
  if (AcessToken) {
    // logic to check the validity of the access token before each API request
    const isAccessTokenValid = checkAccessTokenValidity(AcessToken);
    if (!isAccessTokenValid) {
      // redirect the user to the home page if the access token is invalid
     navigate('/');
    }
    else{
       
    fetchtracks();
    }
  }
    
    
   
}, [])

function formatNumber(numberString) {
  const number = parseInt(numberString, 10);
  return number.toLocaleString();
}

function MyComponent(props) {
  const { streams } = props;
  const formattedStreams = formatNumber(streams);

  return (
    <h6 className="text-center card-third-text">
      Streams: {formattedStreams}
    </h6>
  );
}

//method for putting ... if title greater then 3 words

function truncateTitle(title, maxLength) {
  if (title.length > maxLength) {
    title = title.slice(0, maxLength) + "...";
  }
  return title;
}

function Title(props) {
  const { title } = props;
  const truncatedTitle = truncateTitle(title, 18); // truncate to 10 letters

  return (
    <h4 className="text-center card-head-text  " >{truncatedTitle}</h4>
  );
}
 



  return (
    <>
    
    {loading && <Spinner />}
    <TransitionGroup className='d-flex flex-wrap justify-content-center backgroundchange'>
        {
      tracksData.map(({ id, streams,img,name ,artists ,spotify}) => (
         
  
        <Link to={spotify} className="transition" style={{textDecoration:"none", color:"black"}} target="_blank">  
   <CSSTransition
   in={isVisible.toString()}
   appear={Boolean("true")}
  timeout={1000}
  onExited={() => console.log("Exited")}
  classNames="fade"
>
    <div key={id} className=" mt-4  cardContainer">
      <div className= "card tracksCard  "  style={{ }}>
     
        {img ? (
          <img
            src={img}
            className="card-img-top"
            alt="..."
            style={{ height: "40vh" }}
          />
        ) : (
          <img src={""} />
        )}
        <div className="card-body">
          <div className="card-text">
          <Title title={name}/>
            <div className="text-center">
            
            <h6 className='card-second-text'>Artists : &nbsp;  
            {artists.map((artist, index) => (
              <span key={artist.id}>
                {artist.name}{index === artists.length - 1 ? '' : ', '}
                 </span>
            ))}
           </h6>
                    
                      </div>
                      <MyComponent streams={streams} />
       
         
          </div>
        </div>
      </div>
    </div>
    </CSSTransition> 
    </Link>
    ))
  }
  
  </TransitionGroup>
    </>
  )
}

export default Tracks