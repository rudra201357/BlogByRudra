import {  useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



export default function Protected({children, authentication=true}){
const navigate= useNavigate()

const authStatus= useSelector(state => state.auth.status)

useEffect(() => {
    // make the logic more easy
 
    if(authentication && authStatus !== authentication){
        navigate("/login")
        
    }else if(!authentication && authStatus !== authentication){
        navigate("/")
    }

},[authStatus,navigate, authentication])

const isAuthorized = Boolean(authStatus) === authentication;

  if (!isAuthorized) {
    return <h1>Loading....</h1>;
  }

  return <>{children}</>;

}