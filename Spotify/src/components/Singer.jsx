import React from 'react'
import { useEffect,useState } from 'react';
import { Link, useNavigate , useParams } from "react-router-dom";
import './Tracks.css'
import { CSSTransition,TransitionGroup } from 'react-transition-group';
import Spinner from './Spinner';
const Singer = ({artists,loader}  ) => {
    const [artistData, setartistData] = useState([]);
    const [AcessToken, setAcessToken] = useState(localStorage.getItem("token"))
    const [loading, setLoading] = useState(true)
    const [isVisible, setIsVisible] = useState(true);

   const navigate = useNavigate();
    //method for fetching the monthly listernes of artists

    // console.log(loader);
 
    const monthlyListernes =async()=>{
      const newData = [];
      if(artists){
        setLoading(true) 
        if(!loader){
   setLoading(false);
 }
          for (const artist of artists) {
          console.log(artist)     
           
        const response = await fetch( `/api/artist/${artist.id}`, {
       
        method: 'GET', 
          headers: {
          'Content-Type': 'application/json',
            'Authorization':`Bearer ${AcessToken}`
          // "refreshtoken":"9BQWqEmD55Z0U51Cqs8bpB0vCm5nHim4R1n8bvNBeRb9Hp2etHCpqgMXui9UGcyi"
        }
       
      });
     
      
     try {
    
     
        const {obj}=await response.json();
        // console.log(obj);
     console.log(obj.cm_statistics.sp_monthly_listeners);
     newData.push({
        id:artist.id,
        name:obj.name,
        img:obj.image_url,
        monthlyListeners: obj.cm_statistics.sp_monthly_listeners,
        spotify:artist.spotify,
      });
    } 
      catch (error) {
         
      console.log(error.message);
      
      
      }
    }
    setartistData(newData);
    setLoading(false) ; 
    console.log(artistData)
     

    }
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
      monthlyListernes();
    }
  }
    
 
 
 

   
}, [AcessToken])
function formatNumber(numberString) {
  const number = parseInt(numberString, 10);
  return number.toLocaleString();
}

function MyComponent(props) {
  const { listeners } = props;
  const formattedStreams = formatNumber(listeners);

  return (
    <h6 className="text-center card-third-text">
      Monthly Listeners : {formattedStreams}
    </h6>
  );
}



  return (
    <>
     
        {loading && <Spinner />}

        <TransitionGroup className='d-flex flex-wrap justify-content-center backgroundchange'>
        {
      artistData.map(({ id, monthlyListeners,img,name,spotify }) => (
//    console.log(artist)
  
    <Link to={spotify} style={{textDecoration:"none", color:"black"}} target="_blank"> 
       <CSSTransition
   in={isVisible.toString()}
   appear={Boolean("true")}
  timeout={1000}
  onExited={() => console.log("Exited")}
  classNames="fade"
> 
    <div key={id} className=" mt-4 cardContainer">
      <div className="card tracksCard"  >
     <div className="img-body card-img-top img-fluid responsive_image"  style={{ height:"333px" }}>
  {img ? (
          <img
            src={img}
            className="w-100 h-100 object-fit-cover"
            alt="..."
           
          />
        ) : (
          <img src={"https://m.media-amazon.com/images/I/51orVzm-YgL._UXNaN_FMjpg_QL85_.jpg"}   className="w-100 h-100 object-fit-cover"/>
        )}
        </div>
        <div className="card-body" style={{  height: "100px" }}>
          <div className="card-text">
            <h4 className="text-center card-head-text " >{name}</h4>
           
            <MyComponent listeners={monthlyListeners} />
         
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

export default Singer