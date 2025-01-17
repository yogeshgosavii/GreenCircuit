import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function Protected({children, authentication = true,path}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
   
    const authStatus = useSelector(state => state.auth.status)
    const userData = useSelector(state => state.auth.userData)
    const [label, setlabel] = useState("");
    
    console.log(children);
    // console.log(label,userData.labels[0]);


    useEffect(() => {
       
        // const userId = userData?.$id
        // console.log(userId);
        // setlabel(userId?.split(".")[0])
        // if(authentication && (authStatus !== authentication)){
        //     navigate("/")
        // } else if(!authentication && authStatus !== authentication){
            
        //     // console.log("label "+label+" "+userData.labels[0]);
        //     // if(label !== userlabel){
        //     //     navigate(".")
        //     // }
        //     // else{
        //         console.log(label);
        //         if(label === "organization"){
        //             navigate("/inbox")
        //         }
        //         else{
        //             navigate("/requests")

        //         }
        //     // }
        // }
        setLoader(false)
    }, [authStatus, navigate, authentication])

  return loader ? <h1>Loading...</h1> : <>{children}</>
}

