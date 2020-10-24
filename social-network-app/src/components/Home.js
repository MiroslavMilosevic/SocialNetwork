import React, { useEffect, useState } from 'react';
import {v1 as uuid } from 'uuid'
import { BrowserRouter as Router, Link } from 'react-router-dom'

export default function Home({usersArray}) {
    const [user, setUser] = useState({});
    useEffect(() => {
        setUser(
            {id:localStorage.getItem('id'), username:localStorage.getItem('username'), password:localStorage.getItem('password')}
            ) 
    }, [])


    return (
        <div>
                         <button onClick={()=>console.log(localStorage.getItem('username'))}>DUGME</button> 
    {usersArray.map(el=> <p key={uuid()}>Idi na Chat sa: <Link key={uuid()} to={`chat/${el.id}`}  >{el.username}</Link> </p>)}
          
        </div>
    )
}
