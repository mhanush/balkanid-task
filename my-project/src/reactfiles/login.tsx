import { SyntheticEvent,useState} from "react"
import React from "react"
import { useNavigate } from "react-router-dom";

const Login=(props: { name: string, setName: (name: string) => void })=>{
    const[Email,setEmail]=useState("")
    const[Password,setPassword]=useState("")
    const navigate = useNavigate();
    const[Redirect,setRedirect]=useState(false);
    const submitthis=async (e: SyntheticEvent)=>{
        e.preventDefault();
        const response=await fetch('http://127.0.0.1:8000/api/login',{
        method:'POST',
        credentials:'include',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify({
            Email,
            Password
        })
        });
        if (response.ok) {
            /*const content=await response.json()
            setRedirect(true)
            props.setName(content.Uid)
            console.log(props.name)*/
            // Convert the response body to JSON
            response.json().then(data => {
                
                // 'data' now contains the JSON response from the server
                setRedirect(true);
                console.log(data);
                props.setName(data.Uid);
                console.log(props.name)
            }).catch(error => {
                // Handle JSON parsing errors here
                console.error('Failed to parse JSON:', error);
            });
        }
        console.log(response)
    }
    React.useEffect(():void => {
        if (Redirect) {
          navigate("/auth ");
        }
      }, [Redirect, navigate]);
    return(
        <div className="flex justify-center items-center h-screen">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" action="/login" method="get" onSubmit={submitthis}>
                <label  className="block text-gray-700 text-sm font-bold mb-2"htmlFor="email">Username</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" name="email" id="email" value={Email} onChange={(e)=>setEmail(e.target.value)}/>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" name="password" id="password" value={Password} onChange={(e)=>setPassword(e.target.value)}/>
                <div className="flex justify-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4" type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}
export default Login