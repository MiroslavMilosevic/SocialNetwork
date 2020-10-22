import React, { useEffect, useState, } from 'react';
import { BrowserRouter as Redirect, useParams } from 'react-router-dom'
import { getUserMessages, } from '../services/axios'
import { v1 as uuid } from 'uuid'

export default function Chat() {
    const [id] = useState(useParams().id)
    const [user] = useState({ id: localStorage.getItem('id'), username: localStorage.getItem('username'), password: localStorage.getItem('password') });
    const [nizPoruka, setNizPoruka] = useState([]);
    const [porukePrijatelja, setPorukePrijatelja] = useState([])
    const [zajednickePoruke, setZajednickePoruke] = useState([])

    useEffect(() => {

        getUserMessages(Number(id)).then(res => {
            let tmp = res.data.map(el => { return { id: el.split(';')[0], poruka: el.split(';')[1], date: el.split(';')[2] } })
            setPorukePrijatelja(tmp);
        })
        getUserMessages(Number(user.id)).then(res => {
            let tmp = res.data.map(el => { return { id: el.split(';')[0], poruka: el.split(';')[1], date: el.split(';')[2] } })
            console.log(tmp);
            setNizPoruka(tmp);
        })
    }, [])

    useEffect(() => {
        if (porukePrijatelja !== []) {
            let tmp = [...porukePrijatelja, ...nizPoruka];
            setZajednickePoruke(tmp);
        }
    }, [porukePrijatelja, nizPoruka])






    return (
        <div>
            {'cetujem sa korisnikom sa id-om: ' + id}
            {zajednickePoruke.map(el => <p key={uuid()}>{el.poruka + ' | ' + el.id}</p>)}
        </div>
    )
}
