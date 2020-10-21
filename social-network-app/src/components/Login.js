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
