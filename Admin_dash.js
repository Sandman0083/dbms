import React, {useEffect, useState} from "react"
import jwt from "jsonwebtoken"
import Navbar from "./Navbar"
import {useNavigate} from "react-router-dom"
import Axios from "axios"

function Admin_dash(){
    const [sem, setSem] = useState("")
    const [subCode, setSubCode] = useState("")
    const [link, setLink] = useState("")
    const [msg, setMsg] = useState("")
    const [datas, setData] = useState([])

    function handleSubmit(){
      Axios.post('http://localhost:3001/add',{
          sem : sem,
          subCode : subCode,
          link: link
      }).then(setMsg("success"))
    }
    function handleClick(){
        Axios.get('http://localhost:3001/getdata').then((response)=>{
        
         setData(response.data)
         console.log(response.data);
        
       })
     }

return <div>
 <Navbar />
    <input 
     onChange={(event)=>{
        setSem(event.target.value)
     }}  placeholder="Enter Semester"></input>
    <input
    onChange={(event)=>{
        setSubCode(event.target.value)}} placeholder="Enter Subject Code"></input>
    <input
    onChange={(event)=>{
        setLink(event.target.value)}} placeholder="Enter Resource Link"></input>
    <button onClick={handleSubmit} >Submit</button>
   <h1>{msg}</h1>

   <button onClick={handleClick} className="btn btn-primary">Search Data</button>
    
   {datas.map((data)=>{
       return(
         <div key={data.id}>
          <h4>{data.course_id}</h4>
          <p>{data.sem_id}</p>
          <a href={data.link}>{data.link}</a>
          <br></br>
          <br></br>
         </div>
         
       )
     })}

</div>

}

export default Admin_dash