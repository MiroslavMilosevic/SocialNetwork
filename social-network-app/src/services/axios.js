import axios from 'axios'
export const getUsersArray=()=>{

   return axios.get('https://script.google.com/macros/s/AKfycbyaPSgO1KOnrE1vPswfyrByQwhcMtJH5t8VfErd_pc3viSAkU4/exec?id=2')
}

export const postMessage=(inputPoruka)=>{

    axios.post(`https://script.google.com/macros/s/AKfycbyaPSgO1KOnrE1vPswfyrByQwhcMtJH5t8VfErd_pc3viSAkU4/exec?poruka=${inputPoruka}&id=1`)
 }