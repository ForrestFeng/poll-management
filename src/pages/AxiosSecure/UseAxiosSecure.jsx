import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})
const UseAxiosSecure = () => {

    const navigate = useNavigate();
    const {logout} = useContext(AuthContext); 
    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem('access-token')
        // console.log('req stooped by intctps', token);
        return config;
    },
    function(error){
        return Promise.reject(error);
    });
    axiosSecure.interceptors.response.use(function(response){
        return response;

    }, async (error)=>{
        const status = error.response.status;
        console.log('erroorrr', status);
        if(status === 401 || status === 403){
            await logout();
            navigate('/login')
        }
        return Promise.reject(error);
    })
        
    
    return axiosSecure;
        
};

export default UseAxiosSecure;