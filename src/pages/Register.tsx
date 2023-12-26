import { Link, useNavigate } from "react-router-dom"
import { auth, googleProvider  } from "../config/firebase"
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { useState } from "react"

export const Register=()=>{
    
    const navigate=useNavigate();
    
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")

    const signIn=async ()=>{
        // try{
        //     await createUserWithEmailAndPassword(auth,email,password);
        // }catch(error){
        //     console.error(error)
        // }

        await createUserWithEmailAndPassword(auth,email,password).then(res=>{
            console.log(res)
            navigate('/home')
        }).catch((error:Error)=>{
            console.log(error)
        })
    }

    const signInWithGoogle=async()=>{
        await signInWithPopup(auth,googleProvider).then(res=>{
            console.log(res)
            navigate('/home')
        }).catch((error:Error)=>{
            console.log(error)
        })
    }

    return(
        <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-96 flex-col gap-4 items-center">
                <h1 className="text-3xl mb-2">Register</h1>
                <label className="w-full">
                    <span className="block text-sm font-medium text-slate-700">Email</span>
                    <input onChange={(e)=>{setEmail(e.target.value)}} className="border h-10 pl-2 rounded-md w-full" type="text" placeholder="Enter email"/>
                </label>
                <label className="w-full">
                    <span className="block text-sm font-medium text-slate-700">Password</span>
                    <input onChange={(e)=>{setPassword(e.target.value)}} className="border h-10 pl-2 rounded-md w-full" type="password" placeholder="Enter password"/>
                </label>
                
                <button onClick={signIn} className="bg-blue-600 h-10 w-full rounded-md">Register</button>
                <button onClick={signInWithGoogle} className="text-blue-500">Sign In With Google</button>
                <p className="text-slate-700">Already have an account? <Link className="text-blue-500" to="/">login</Link></p>
                
            </div>
            
        </div>
    )
}