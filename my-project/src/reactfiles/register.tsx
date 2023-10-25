import { SyntheticEvent,useState } from "react"
import React from "react"
import { useNavigate } from "react-router-dom";
const Register= ()=>{
    const[Uid,setMobile]=useState(0);
    const[Name,setName]=useState("");
    const[Email,setEmail]=useState("");
    const[Designation,setRole]=useState("");
    const[Password,setPassword]=useState("");
    const[Redirect,setRedirect]=useState(false);
    const navigate = useNavigate(); 
    const submitthis=async (e: SyntheticEvent)=>{
        e.preventDefault();
        const response=await fetch('http://127.0.0.1:8000/api/register',{
        method:'POST',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify({
            Uid:Uid.toString(),
            Name,
            Designation,
            Email,
            Password
        })
        });
        if (response.ok) {
            // Convert the response body to JSON
            const Content = await response.json();
            console.log(Content);
            console.log(response)
        }
    setRedirect(true);
    }
    React.useEffect(():void => {
        if (Redirect) {
          navigate("/login");
        }
      }, [Redirect, navigate]);
    //parseInt(e.target.value, 10)
    return(
        <div className="flex justify-center items-center h-screen">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" action="/register" method="get" onSubmit={submitthis}>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="name" id="name" value={Name} onChange={(e)=>setName(e.target.value)}/>
                <label className="block text-gray-700 text-sm font-bold mb-2"htmlFor="email">Email</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" name="email" id="email" value={Email} onChange={(e)=>setEmail(e.target.value)}/>
                <label  className="block text-gray-700 text-sm font-bold mb-2"htmlFor="mobile">Mobile Number</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"type="number" name="mobile" id="mobile" value={Uid.toString()}  onChange={(e) => setMobile(parseInt(e.target.value, 10))}/>
                <label className="block text-gray-700 text-sm font-bold mb-2"htmlFor=""><input type="radio" name="role" id="manager" value="Manager" checked={Designation === "Manager"} onChange={(e)=>setRole(e.target.value)}/>Manager</label>
                <label className="block text-gray-700 text-sm font-bold mb-2"htmlFor=""><input type="radio" name="role" id="employee" value="Employee" checked={Designation === "Employee"} onChange={(e)=>setRole(e.target.value)}/>Employee</label>
                <label className="block text-gray-700 text-sm font-bold mb-2"htmlFor=""><input type="radio" name="role" id="user" value="User" checked={Designation === "User"} onChange={(e)=>setRole(e.target.value)}/>User</label>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" name="password" id="password" value={Password} onChange={(e)=>setPassword(e.target.value)}/>
                <div className="mb-6 flex justify-center">
                    <button className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-8" type="submit">Register</button>
                </div>
            </form>
        </div>
    )
}
export default Register