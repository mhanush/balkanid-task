import React, { SyntheticEvent, useState } from "react";
import { useNavigate,Link} from "react-router-dom";
const Delete=(props: { name: string, setName: (name: string) => void })=>{
    const navigate = useNavigate();
    const[Redirect,setRedirect]=useState(false);
    const[Email,setEmail]=useState("");
    const[Uid,setMobile]=useState(0);
    const[Password,setPassword]=useState("");
    const submitthis=async(e:SyntheticEvent)=>{
        e.preventDefault();
        const response=await fetch("http://127.0.0.1:8000/api/delete",{
            headers: { "Content-type": "application/json" },
            method: "POST",
            credentials: "include",
            body:JSON.stringify({
                Uid:Uid.toString(),
                Email,
                Password
            })     
          });
          if (response.ok){
            response.json().then(data => {
                setRedirect(true);
                props.setName("");
            }).catch(error => {
                console.error('Failed to parse JSON:', error);
            });
          }
    }
    React.useEffect(():void => {
        if (Redirect) {
          navigate("/");
        }
      }, [Redirect, navigate]);

    return(
        <div>
            <form action="" onSubmit={submitthis}>
            <label className="block text-gray-700 text-sm font-bold mb-2"htmlFor="email">Email</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" name="email" id="email" value={Email} onChange={(e)=>setEmail(e.target.value)}/>
                <label  className="block text-gray-700 text-sm font-bold mb-2"htmlFor="mobile">Mobile Number</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"type="number" name="mobile" id="mobile" value={Uid.toString()}  onChange={(e) => setMobile(parseInt(e.target.value, 10))}/>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" name="password" id="password" value={Password} onChange={(e)=>setPassword(e.target.value)}/>
                <div className="mb-6 flex justify-center">
                    <button className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-8" type="submit">Delete</button>
                </div>
            </form>
        </div>
    )
  };
export default Delete