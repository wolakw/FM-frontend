import axios from "axios";

export const api={
    newUser:(data)=>{
        const token = localStorage.getItem('token');
        return axios.post("http://localhost:8081/user",data,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    },
    newPlayer:(data)=>{
        const token = localStorage.getItem('token');
        return axios.post("http://localhost:8081/add-player",data,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    },
    getMe:()=>{
        const token = localStorage.getItem('token');
        return axios.get("http://localhost:8081/api/v1/auth/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

    },
    login:(data)=>{
        return axios.post("http://localhost:8081/api/v1/auth/authenticate",data)
    },
    register:(data)=>{
        return axios.post("http://localhost:8081/api/v1/auth/register",data)
    }

}