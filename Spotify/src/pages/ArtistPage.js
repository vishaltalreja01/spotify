import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./ArtistPage.module.css";
import def from "../images/img.jpeg";
import jwtDecode from "jwt-decode";
 
import Singer from './../components/Singer';
import Tracks from './../components/Tracks';
import Spinner from './../components/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ArtistTitle from './ArtistTitle';


 

const ArtistPage = () => {
  const navigate = useNavigate();

  const onBackButtonContainerClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onHomeClick = useCallback(() => {
    navigate("/");
  }, [navigate]);
 
  
 
 
 useEffect(() => {
   //  fetchAllNotes();
   console.log(localStorage.getItem('token') );
 
    
 }, [])
//this is for tracks
 const track ={
  ElectronicDance: [
    {
      id:"98632663",
      spotify:"https://open.spotify.com/track/1VutwUjHPwEELxHkwdhMkz?si=fb02fc5496eb4e9f"
    
    },
    {
      id:"92650596",
      spotify:"https://open.spotify.com/track/7n24EOW7ElKwtz5wXkzynQ?si=bc316453cb6c499e"
    },
  ],
  Indie:[
    {
      id:'17902186',
      spotify:"https://open.spotify.com/track/5pSflTWYmlRVthO8CZpRem?si=cb9ac11821584c7c"
    },
    {
      id:'31825656',
      spotify:"https://open.spotify.com/track/56Df9c12QLMaM9Sp7QoyvK?si=88ab95deae4b4548"
    },
    {
      id:'68752519',
      spotify:"https://open.spotify.com/track/6u29w7XYvobu1ru3NjLg7G?si=57fa2cbf3be847e6"
    },
  ] 
  
 }
 //this is for artists
  const data = {
    Piano: [
      {
        id:"9468643",
        spotify:"https://open.spotify.com/artist/5nWYvcpaqKtp08cYxjOfFr?si=_UXbdSAcRp6-TYaFqWyjGg"
     
      },
      {
        id:"1666033",
        // spotify:""
        spotify:"https://open.spotify.com/artist/4aajGre4nwTLmu8tbZ2vom?si=3eolk8nyRdOysO6RNDsJcQ"
      },
    ],
    Ambient: [
      {
        id:"3578846",
        spotify:"https://open.spotify.com/artist/0dgJbQ0bKPyUXco8hEXN7X?si=j3bVPQFcTLGdlqDF36OR-Q"
      },
      {
        id:"4308986",
        spotify:"https://open.spotify.com/artist/7HaSqpaqnOWSaqvezpdhX4?si=hyxVUVRsTOOeIAQpRa5xDw"
      },
      {
        id:"547808",
        spotify:"https://open.spotify.com/artist/5bIjYVZzgTuFujDI0XW3K1?si=X0G4bb1JSnuyazsCZAfXaA "
      },
      {
        id:"564578",
        spotify:"https://open.spotify.com/artist/6ovctVkv7d2fBdilDRYfDW?si=wRVaqF_tQBytVQBad2hWIg "
      },
    ],
    Phonk: [
      {
        id:"9331094",
        spotify:"https://open.spotify.com/artist/2rgcNuLkn8pPBdKZhjZ8Em?si=LWhXwE0WQhyvnvCpDrxwxw "
      },
      {
        id:"9843191",
        spotify:"https://open.spotify.com/artist/09cKncAQn28NqTUORLMwSR?si=zCV_3hqFRcmvUhkh3QU3KA"
      },
      {
        id:"9599095",
        spotify:"https://open.spotify.com/artist/2217gZ1hgFCeaDXFrYrjeL?si=JOsZDyxjSeyiTX5TInP-Gg"
      },
      {
        id:"4708455",
        spotify:"https://open.spotify.com/artist/60vF1fLR6yzLxCQUlnAYYj?si=YRKizOh0SMiZ8KA10pHT5Q"
      },
      {
        id:"4508329",
        spotify:"https://open.spotify.com/artist/0PszchiiynrfCAwjdHdN5r?si=I5kPqjJ_Ro6RFoZ5l62Qhg"
      },
    ],
    Indie: [
    
      {
        id:"3555876",
        spotify:"https://open.spotify.com/artist/6K1Arugub6xpjLfkJfgCZL?si=wID8q2iqSY6bUM8dms2FLQ "
      },
      {
        id:"1792900",
        spotify:"https://open.spotify.com/artist/0Ym5QNtGZn5e9Lrs9Y1jWz?si=Jnm5TU07TyyhaHZJPiobbQ"
      },
    ],
    Funk: [
      {
        id:"7665469",
        spotify:"https://open.spotify.com/artist/5x5QpMsxPAaMgm0bxQyKJC?si=2FfNJ_RcQAidjeaGz0dlnw "
      },
      {
        id:"10079911",
        spotify:"https://open.spotify.com/track/4eMgoZVRBGSKsAZOelb52Q?si=54d2d10f6b7d4f38"
      },
      {
        id:"10094677",
        spotify:"https://open.spotify.com/track/0C9MlEXA0UUxFHyL8UQxQD?si=fcb99bf92e8c4665"
      },
    ],
   
    Synthwave: [
      {
        id:"1153103",
        spotify:"https://open.spotify.com/artist/5bQ1u5yLlL2WZv49doSgRz?si=nuUOly94SD2VBDmaL0MAXQ"
      },
    ]
  
  
    
  };
  const [artists, setArtists] = useState([data]);
  const [item, setitem] = useState([]);
  const params = useParams();
  const [id, setid] = useState("");

  useEffect(() => {
    setid(params.id);

    Object.entries(artists).map(
      ([k, v]) => (
        id === "Piano" ? setitem(v.Piano) : console.log("no"),
        id === "Ambient" ? console.log(setitem(v.Ambient)) : console.log("no"),
        id === "Electronic/Dance" ? console.log(setitem(v.ElectronicDance)) : console.log("no"),
        id === "Funk" ? console.log(setitem(v.Funk)) : console.log("no"),
        id === "Indie" ? console.log(setitem(v.Indie)) : console.log("no"),
        id === "Phonk" ? console.log(setitem(v.Phonk)) : console.log("no"),
        id === "Synthwave" ? console.log(setitem(v.Synthwave)) : console.log("no"),
        id === "DreamPop" ? console.log(setitem(v.DreamPop)) : console.log("no"),
        id === "BedroomPop" ? console.log(setitem(v.BedroomPop)) : console.log("no")
        
      )
    );
  });
 
  
  return (
   <>
   <div className={styles.header}>
     
    <Link className={styles.navLogo} to="/" />
    <div className={styles.navMenu}>
       <Link className={styles.nonAactive} to="mailto:contact@kuratemusic.com">Contact</Link>
     
      <Link className={styles.nonAactive} to="/" onClick={onHomeClick}>
        Home
      </Link>
    </div>
  </div>
    <div className={styles.artistPage} style={{background:'black'}}>
    <div className={styles.NaviateHead}>
    <div className={styles.heading}  >
      
          <span>{`Artist Showcase: `}</span>
          <ArtistTitle text={id} />
        </div>
        {/* <Spinner/> */}
        <div className={styles.backButton} onClick={onBackButtonContainerClick}>
         
         <Link to='/'>
          <FontAwesomeIcon icon={faArrowLeft} className={styles.vectorIcon} aria-label="Back"  />
          </Link>
          <div className={styles.back}>Back</div>
        </div>
    </div>
      <div className={styles.mainBody}>


<div className="container ps-1" style={{marginTop:'40px', height:"auto"}}>
  <div className="row ">
  
  { (id=="Funk" && <Singer artists = {data.Funk} loader = {true}/>)  }
  { (id=="Piano" && <Singer artists = {data.Piano} loader = {true}/>)  }
  { (id=="Phonk" && <Singer artists = {data.Phonk} loader = {true}/>)  }
  { (id=="Ambient" && <Singer artists = {data.Ambient} loader = {true}/>)  }
  { id=="Indie" && <div className="">
     <Tracks tracks = {track.Indie}  loader = {true}/>
    <Singer artists = {data.Indie}  loader = {false}/>
  </div>
   }
  { (id=="ElectronicDance" && <Tracks  tracks = {track.ElectronicDance} loader = {true}/>)  }
 
  { (id=="Synthwave" && <Singer artists = {data.Synthwave} loader = {true}/>)  }
  
  {/* for artists Singer component will be used and for tracks track component */}

   
        
  </div>
</div>

       
      </div>
   
    </div>
    </>

  );
};

export default ArtistPage;
