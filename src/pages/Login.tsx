import { Link } from "react-router-dom"
export const Login=()=>{
    return(
        <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-96 flex-col gap-4 items-center">
                <h1 className="text-3xl mb-2">Login</h1>
                <label className="w-full">
                    <span className="block text-sm font-medium text-slate-700">Email</span>
                    <input className="border h-10 pl-2 rounded-md w-full" type="text" placeholder="Enter email"/>
                </label>
                <label className="w-full">
                    <span className="block text-sm font-medium text-slate-700">Password</span>
                    <input className="border h-10 pl-2 rounded-md w-full" type="password" placeholder="Enter password"/>
                </label>
                
                <button className="bg-blue-600 h-10 w-full rounded-md">Login</button>
                <p className="text-slate-700">Not an account? <Link to="/register">register</Link></p>
            </div>
            
        </div>
    )
}