import { useCallback, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";
import axios from "axios";
import { Link ,useParams  } from "react-router-dom";

const HomePage = () => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();
 
  const data1 = [
    {'no':1,'name' :'Piano'}, 
    {'no':2,'name' :'Ambient'}, 
    {'no':3,'name' :'Phonk'}, 
    {'no':4,'name' :'Indie'}, 
    {'no':5,'name' :'Funk'}, 
    {'no':6,'name' :'Electronic/Dance'}, 
    {'no':7,'name' :'Synthwave'}, 
    
  
    
  ]

  const CLIENT_ID = "6d33d99eaabf42b19c151b82171944a8";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  
  const params = useParams();
   
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState(data1);
  const [newToken, setnewToken] = useState();
  const  getToken =async()=> {
    //TODO : API CALL
    console.log("data1")
    const response = await fetch( `./api/token`, {
       
      method: 'POST',
      mode:'cors', 
        headers: {
        'Content-Type': 'application/json',

        // "refreshtoken":"9BQWqEmD55Z0U51Cqs8bpB0vCm5nHim4R1n8bvNBeRb9Hp2etHCpqgMXui9UGcyi"
      },
      body:JSON.stringify(
        {
          "refreshtoken":"txsvSdeOvZB04Hy8scOdTUoszsVZ38WK5jSuDffGc16FkfqY2AJlgKe5J5n2MmtF"
        }

      )
    });
    try {
      const json =await response.json();
      console.log("getting listening...");
      const expirationTime = new Date().getTime() + json.expires_in * 1000; // convert to milliseconds
      localStorage.setItem('accessTokenExpirationTime', expirationTime);
      localStorage.setItem("token",json.token)
       console.log(expirationTime)
       
      
      
      
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    const accessToken = localStorage.getItem('token');
    const expirationTime = localStorage.getItem('accessTokenExpirationTime');
    console.log(expirationTime)
    console.log(new Date().getTime())
  // getToken();
    if (!accessToken || !expirationTime ||  new Date().getTime()>= expirationTime ) {
      // If access token or expiration time is not available or has already passed,
      // navigate to home page and refresh token
      console.log(expirationTime)
      console.log("get token called")

       //1;20 <2;20
       //1;20 >2;20
      getToken();
    }
   
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzA4NzkwOCwidGltZXN0YW1wIjoxNjc5NzcxODQxOTE2LCJpYXQiOjE2Nzk3NzE4NDEsImV4cCI6MTY3OTc3NTQ0MX0.A7ljQKKg6sRGSOYmtGYWX2mriqmo_BBaVu6T12c5VdE
  }, []);

  

  const search = (e) => {
   
  const searchList = data1.filter((item) => {
  return item.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1;
});
const tableBody = document.querySelector(".table");
// if (searchList.length === 0) {
   
  // console.log("No items found");
// } else {
  console.log(setArtists(searchList));
// }
// console.log(setArtists(searchList))
 
 
  };



  return (
    <>
        <div className={styles.header}>
        
        <Link className={styles.navLogo} to="/" />
        <div className={styles.navMenu}>
          <div className={styles.contact}>
          <Link className={styles.contact} to="mailto:contact@kuratemusic.com">Contact</Link>
          </div>
          <div  className={styles.contact}>

          
          <Link className={styles.home +''}  to="/" >
            Home
          </Link>
          </div>
        </div>
      </div>
      <div className={styles.artistPage}>
      <div className={styles.mainBody}>
      <input
            className={styles.searchBar}
            type="text"
            placeholder="Search"
            onChange={search}
          />
      <div
        className="container  bg-light p-sm-1 p-md-5 mx-lg-5 rounded  "
        style={{ marginTop: "60px" ,height:"auto", minHeight:"70vh"  }}
      >
        <table className="table table-responsive-md">
          <thead>
            <tr>
              
              <th scope="col">Genre</th>
              <th scope="col center-text" style={{textAlign:"center" ,width:"32%"}}>Details</th>
            </tr>
          </thead>
          <tbody>
            {artists.length >0 ?
               artists.map((item) => { 
                return (
                    <tr scope="row" key={item.no}>
                      
                      <td scope="col" style={{lineHeight: "2.3rem"}}>{item.name}</td>
                      <td scope="col text-center " style={{textAlign:"center",width:"32%"}}>
                        <Link to={"/card/" + item.name.replace('/', '')}>
                          <button className="btn btn-outline-dark view-btn">
                            View 
                          </button>
                        </Link>
                      </td>
                    </tr>
                  
                );
              
                }):<div style={{marginTop:"10px"}}>Match Not found</div>}
          </tbody>
        </table>
      </div>
      </div>
   
    </div>
    </>
  );
};

export default HomePage;
