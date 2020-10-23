import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Redirect, useParams } from 'react-router-dom'
import { getUserMessages, postMessage, } from '../services/axios'
import { v1 as uuid } from 'uuid'

export default function Chat() {
    const [id] = useState(useParams().id);
    const [user] = useState({ id: localStorage.getItem('id'), username: localStorage.getItem('username'), password: localStorage.getItem('password') });
    const [nizPoruka, setNizPoruka] = useState([]);
    const [porukePrijatelja, setPorukePrijatelja] = useState([]);
    const [zajednickePoruke, setZajednickePoruke] = useState([]);
    const [inputPoruka, setInputPoruka] = useState('');
    const intervalRef = useRef();

    useEffect(() => {

        getUserMessages(Number(id)).then(res => {
            let tmp = res.data.map(el => { return { id: el.split(';')[0], poruka: el.split(';')[1], date:  Date.parse(el.split(';')[2]) } })
            setPorukePrijatelja(tmp);
        })
        getUserMessages(Number(user.id)).then(res => {
            let tmp = res.data.map(el => { return { id: el.split('')[0], poruka: el.split(';')[1], date: Date.parse(el.split(';')[2]) } })
            console.log(tmp);
            setNizPoruka(tmp);
        })
        setInterval(() => {
            getUserMessages(Number(id)).then(res => {
                let tmp = res.data.map(el => { return { id: el.split(';')[0], poruka: el.split(';')[1], date: Date.parse(el.split(';')[2]) } })
                setPorukePrijatelja(tmp);
                console.log('setInterval u useEffect-u');   
            })
        }, 1200);
        setInterval(() => {
            getUserMessages(Number(user.id)).then(res => {
            let tmp = res.data.map(el => { return { id: el.split(';')[0], poruka: el.split(';')[1], date: Date.parse(el.split(';')[2]) } })
            setNizPoruka(tmp);
        })
        console.log('updateeeeeeeeeeeeee');
        }, 3200);
    }, [])

    useEffect(() => {
     //   if (porukePrijatelja !== []) {       
            let tmp = [...porukePrijatelja, ...nizPoruka];
            console.log(zajednickePoruke.sort((a,b)=> a.date-b.date));
            setZajednickePoruke(tmp);
      //  }
 console.log('useefecttttttttttt');
    }, [porukePrijatelja, nizPoruka])






    return (
        <div>
             {/* <button onClick={()=>{ setNizPoruka([])}}>DUGME</button> */}
            <h1>{'chat sa korisnikom sa id-om: ' + id}</h1>
            <input type='text' value={inputPoruka} placeholder='poruka...' onChange={(e)=>{setInputPoruka(e.target.value)} } onKeyPress={(event)=>{
                    if (event.key == 'Enter') {
                       postMessage(inputPoruka, user.id)
                       let tmp=[...nizPoruka];
                       tmp.push( { id: user.id, poruka:inputPoruka,   date:new Date().toString() } );
                     //  let objekat={ id: user.id, poruka:inputPoruka,   date:new Date().toString() }
                       setNizPoruka(tmp);
                     }
                  
            }}/>
            {zajednickePoruke.sort((a,b)=>a.date-b.date)
            .map(el => <p key={uuid()}>{el.poruka + ' | ' + el.id+ '   |  datum: '+el.date}</p>)
            }
        </div>
    )
}
