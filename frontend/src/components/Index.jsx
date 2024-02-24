import { useUser } from "../hooks/useUser";
import { Navigate } from "react-router-dom";

export const Index = () => {
    const user = useUser();
    
    if(user.loading){
        return "loading....."
    }

    if(!user.userDetails){
        return <Navigate to={"/signin"}></Navigate>
    }
    return <Navigate to={"/dashboard"}></Navigate>
}

