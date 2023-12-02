import { useContext } from "react";

import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../pages/AxiosSecure/UseAxiosSecure";
import { AuthContext } from "../providers/AuthProvider";


const UseAdmin = () => {
    const {user} = useContext(AuthContext);
    const axiosSecure = UseAxiosSecure();
    const {data: isAdmin, isPending: isAdminLoading} = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            console.log(res.data);
            return res.data?.admin;
        }
    })
    return [isAdmin, isAdminLoading];    
};

export default UseAdmin;