import React, { useState } from 'react'

export default function Login({usersArray}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div>
                     
            <input type='text' placeholder='username' value={username}  onChange={(e)=>{setUsername(e.target.value)}}/>
            <input type='password' placeholder='password' value={password}  onChange={(e)=>{setPassword(e.target.value)}}/>
            <button onClick={
                ()=>{console.log(username, password)
                    let isSuccessful=false;
                   usersArray.forEach(element => {
                       if(element.username===username && element.password===password){
                           console.log('uspesno');
                           isSuccessful=true;
                           localStorage.setItem('id', element.id.toString())
                           localStorage.setItem('username', element.username)
                           localStorage.setItem('password', element.password)
                         console.log(localStorage.getItem('username'))
                         console.log(   localStorage.getItem('password'))
                         console.log(   localStorage.getItem('id'))
                      
                       }
                   });
                if(!isSuccessful){
                    console.log('neuspesno');
                }
                      
            }
            }>Uloguj se</button>

        </div>
    )
}
