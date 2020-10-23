import axios from 'axios'
export const getUserMessages=(id)=>{

   return axios.get(`https://script.google.com/macros/s/AKfycbyaPSgO1KOnrE1vPswfyrByQwhcMtJH5t8VfErd_pc3viSAkU4/exec?id=${id+1}`)
}

export const postMessage=(inputPoruka, idUsera)=>{

    axios.post(`https://script.google.com/macros/s/AKfycbyaPSgO1KOnrE1vPswfyrByQwhcMtJH5t8VfErd_pc3viSAkU4/exec?poruka=${inputPoruka}&id=${idUsera}`)
 }