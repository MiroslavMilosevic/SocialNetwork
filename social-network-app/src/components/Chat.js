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
    const [pomocniState, setPomocniState] = useState(0);
  //  const intervalRef = useRef();

    useEffect(() => {

        getUserMessages(Number(id)).then(res => {
            let tmp = res.data.map(el => { return { id: el.split(';')[0], idPoslao:el.split(';')[1] ,
             poruka: el.split(';')[2], date:  Date.parse(el.split(';')[3]), stringDate:el.split(';')[3] } })
            setPorukePrijatelja(tmp);
        })
        getUserMessages(Number(user.id)).then(res => {
            let tmp = res.data.map(el => { return { id: el.split(';')[0], idPoslao:el.split(';')[1] ,
            poruka: el.split(';')[2], date:  Date.parse(el.split(';')[3]), stringDate:el.split(';')[3] } })
            console.log(tmp);
            setNizPoruka(tmp);
        })
      let interval1 =  setInterval(() => {
            getUserMessages(Number(id)).then(res => {
                let tmp = res.data.map(el => { return { id: el.split(';')[0], idPoslao:el.split(';')[1] ,
                poruka: el.split(';')[2], date:  Date.parse(el.split(';')[3]), stringDate:el.split(';')[3] } })
                setPorukePrijatelja(tmp);
      //          console.log('setInterval u useEffect-u');   
            })
        }, 1200);
    //    let interval2 = setInterval(() => {
    //         getUserMessages(Number(user.id)).then(res => {
    //             let tmp = res.data.map(el => { return { id: el.split(';')[0], idPoslao:el.split(';')[1] ,
    //             poruka: el.split(';')[2], date:  Date.parse(el.split(';')[3]), stringDate:el.split(';')[3] } })
    //             if(tmp.length===nizPoruka.length||pomocniState===0){
    //                 console.log(nizPoruka.length, tmp.length,'qqqqqqqqqqqqqqqqqqqqqqqqq');
    //         setNizPoruka(tmp);
    //             }
    //             console.log(nizPoruka.length, tmp.length,'qqqqqqqqqqqqqqqqqqqqqqqqq');
    //     })
    //     console.log('updateeeeeeeeeeeeee');
    //     }, 3000);
        return function(){
            clearInterval(interval1);
          //  clearInterval(interval2);
        }
    }, [])

    useEffect(() => {
     //   if (porukePrijatelja !== []) {       
            let tmp = [...porukePrijatelja.filter(el => el.idPoslao===user.id) , ...nizPoruka.filter(el => el.idPoslao===id)];
         //   console.log(zajednickePoruke.sort((a,b)=> a.date-b.date));
            setZajednickePoruke(tmp);
      //  }
 console.log(zajednickePoruke);
    }, [porukePrijatelja, nizPoruka])






    return (
        <div>
             {/* <button onClick={()=>{ setNizPoruka([])}}>DUGME</button> */}
            <h1>{'chat sa korisnikom sa id-om: ' + id}</h1>
            <input type='text' value={inputPoruka} placeholder='poruka...' onChange={(e)=>{setInputPoruka(e.target.value)} } onKeyPress={(event)=>{
                    if (event.key === 'Enter') {
                       postMessage(inputPoruka, user.id,id)
                       let tmp=[...nizPoruka];
                       tmp.push( { id: user.id,idPoslao:id, poruka:inputPoruka,   date:Date.parse(new Date().toString()), stringDate:(new Date).toString() } );
                       setNizPoruka(tmp);
                     }
                  
            }}/>
            {zajednickePoruke.sort((a,b)=>a.date-b.date)
            .map(el => { return (<div key={uuid()}><p key={uuid()}>{el.poruka + ' | ' + el.id+ '   | '}</p></div>)})
            }
        </div>
    )
}
