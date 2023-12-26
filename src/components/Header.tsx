import { useNavigate } from "react-router-dom"
import { auth } from "../config/firebase"
import { signOut } from "firebase/auth"
export const Header=()=>{
    const navigate=useNavigate();

    const logout=async()=>{
        await signOut(auth).then(res=>{
            console.log(res)
            navigate('/')
        }).catch((error:Error)=>{
            console.log(error)
        })
    }
    return(
        <div className="py-3 bg-blue-800">
            <div className="flex justify-around items-center">
            <h1>{auth.currentUser?.email}</h1>
                <button onClick={logout} className="bg-gray-500 p-2 rounded-md">Logout</button>
            
            </div>
        </div>
    )
}