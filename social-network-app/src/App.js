import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import './App.css';
import { usersArrayImported, } from './u&p/users'
import Login from './components/Login'
import Home from './components/Home'
import Chat from './components/Chat'
function App() {
 // const [nizPoruka, setNizPoruka] = useState([]);
  const [usersArray, setUsersArray] = useState([]);
  const [user, setUser] = useState({});
 // const [inputPoruka, setInputPoruka] = useState('')
 localStorage.setItem('id','1');
 localStorage.setItem('username','milancemkc');
 localStorage.setItem('password','mkc');
  useEffect(() => {
    setUser(
      {id:localStorage.getItem('id'), username:localStorage.getItem('username'), password:localStorage.getItem('password')}
      )
    setUsersArray(usersArrayImported)
    // getUserMessages(1).then(res => {
    //   let tmp = res.data.map(el => { return { id: el.split(';')[0], poruka: el.split(';')[1], date: el.split(';')[2] } })
    //   console.log(tmp);
    //   setNizPoruka(tmp);
  
    // })//////sve ispod je setInterval ////////////////////////////////////////////////////// obrati paznju
    // setInterval(() => {
    //   getUsersArray().then(res => {
    //     let tmp = res.data.map(el => { return { id: el.split(';')[0], poruka: el.split(';')[1], date: el.split(';')[2] } })
    //     setNizPoruka(tmp);
    //   })
    // }, 1200);
  }, [])

  // useEffect(()=>{
  //   console.log(nizPoruka);
  //   //console.log(user);
  // },[nizPoruka])



  return (
    <div className="App">
{}

      {/* <Link to={`/one/${el.id}`}>Detalji</Link> */}

      <Router>

        <Switch>
          <Route exact path="/home">
            <Home usersArray={usersArray} />

          </Route>
          <Route exact path="/">
            <button onClick={() => {
              console.log(usersArray)
             // console.log(nizPoruka);

            }}>abcdefg</button>
          </Route>
          <Route exact path="/login">
            <Login usersArray={usersArray} />


          </Route>
          <Route exact path="/register">

          </Route>
          <Route exact path="/chat/:id">
               <Chat/>
            {/* {localStorage.getItem('user')=== ''? <ParagrafS2>Niste Ulogovani</ParagrafS2> : <Club niz={niz} setNiz={setNiz}></Club>} */}
          </Route>
        </Switch>

      </Router>





      {/* <button onClick={()=>{console.log(nizUsera);}}>abcdefg</button> 
 <input type='text' value={inputPoruka} onChange={(e)=>{setInputPoruka(e.target.value)}}/>
       <button onClick={()=>{
         postMessage(inputPoruka);
         let tmp=[...nizPoruka];
         console.log(tmp);
         tmp.push({date:new Date(), id: "1", poruka:inputPoruka});
         setNizPoruka(tmp);
         setInputPoruka('');
       }}>Posalji Poruku</button>   
  {nizPoruka.length>0 ? nizPoruka.sort((a,b)=>{return a-b}).map(el=>{return <p key={uuid()}>{el.poruka}</p>}):<p>{'Ucitava se...'}</p>} */}
    </div>
  );
}
//https://docs.google.com/spreadsheets/d/1NeY3gcMAzC-iany4HwYZULSRdkxYA7NoLB1aI1-_kfc/edit?usp=sharing
export default App;
