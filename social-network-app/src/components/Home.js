import React from 'react'
import {v1 as uuid } from 'uuid'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

export default function Home({usersArray}) {
    return (
        <div>
            
    {usersArray.map(el=> <p key={uuid()}>Idi na Chat sa<Link key={uuid()} to={`chat/${el.id}`}  >{el.username}</Link> </p>)}
          
        </div>
    )
}
