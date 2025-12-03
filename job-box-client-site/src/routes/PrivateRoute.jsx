import { Navigate, useLocation } from "react-router-dom";
import useAuthContext from "../Hooks/useAuthContext";

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuthContext()
    const location = useLocation()
    console.log(location)

    if(loading){
        return <div className="flex justify-center items-center my-24 gap-4">
            <span className="loading loading-spinner text-primary "></span>
            <span className="loading loading-spinner text-primary "></span>
            <span className="loading loading-spinner text-primary "></span>
            <span className="loading loading-spinner text-primary "></span>
            <span className="loading loading-spinner text-primary "></span>
        </div>
    }
    if(user){
        return children
    }
    return <Navigate to='/Login' state={location.pathname}></Navigate>

};

export default PrivateRoute;