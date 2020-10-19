import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'
import {v1 as uuid} from 'uuid'
function App() {
      //const [stejt,setStejt]= useState(1);
      const [nizPoruka,setNizPoruka]= useState([]);
      const [inputPoruka, setInputPoruka] = useState('') 
    //   useEffect(()=>{
    //  axios.post('https://script.google.com/macros/s/AKfycbyaPSgO1KOnrE1vPswfyrByQwhcMtJH5t8VfErd_pc3viSAkU4/exec?poruka=h e j d ru ze dali&id=1').then(res=>{
    //    console.log(res.data);
    //    setStejt(5);
    //  })
    // },[])

    useEffect(()=>{
       console.log();
       axios.get('https://script.google.com/macros/s/AKfycbyaPSgO1KOnrE1vPswfyrByQwhcMtJH5t8VfErd_pc3viSAkU4/exec').then(res=>{
         console.log(res.data);
         let tmp=res.data.map(el=>{return { id:el.split(';')[0], poruka:el.split(';')[1], date:el.split(';')[2]} } )
         console.log(tmp);
         setNizPoruka(tmp);
       })
    },[])
    


  return (
    <div className="App">
 <input type='text' value={inputPoruka} onChange={(e)=>{setInputPoruka(e.target.value)}}/>
       <button onClick={()=>{
         axios.post(`https://script.google.com/macros/s/AKfycbyaPSgO1KOnrE1vPswfyrByQwhcMtJH5t8VfErd_pc3viSAkU4/exec?poruka=${inputPoruka}&id=1`)
         let tmp=[...nizPoruka];
         console.log(tmp);
         tmp.push({date:new Date(), id: "1", poruka:inputPoruka});
         setNizPoruka(tmp);
         setInputPoruka('');
       }}>Posalji Poruku</button>   
  {nizPoruka.length>0 ? nizPoruka.sort((a,b)=>{return a-b}).map(el=>{return <p key={uuid()}>{el.poruka}</p>}):<p>{'Ucitava se...'}</p>}




    </div>
  );
}
//https://docs.google.com/spreadsheets/d/1NeY3gcMAzC-iany4HwYZULSRdkxYA7NoLB1aI1-_kfc/edit?usp=sharing
export default App;
