import axios from "axios";

export const api={
    newUser:(data)=>{
        return axios.post("http://localhost:8081/user",data)
    },
}