import { useContext } from "react";
import AuthContext from "../Provider/AuthContext";

const useAuthContext = ()=>{
  return useContext(AuthContext)
}

   


export default useAuthContext;