import React, { useEffect, useState } from "react";
import { useNavigate,Link} from "react-router-dom";
import {UseAuth} from "./useauth.tsx"

const Main = (props: { name: string; setName: (name: string) => void }) => {
  const navigate = useNavigate();
  const Email=UseAuth();
  const Logout = async () => {
    await fetch("http://127.0.0.1:8000/api/logout", {
      headers: { "Content-type": "application/json" },
      method: "POST",
      credentials: "include",
    });
    props.setName("");
    navigate("/");
  };
  const [data, setData] = useState([])
  useEffect(()=>{
      console.log("Email:", Email);
      async function viewdata(){
          const response=await fetch('http://127.0.0.1:8000/api/data',{
              method:'POST',
              credentials:'include',
              headers:{'Content-type':'application/json'},
              body:JSON.stringify({
                  Email,
              })
          });
          if(response.ok){
              const result = await response.json();
              console.log(result);
              setData(result);                
          }
      }
      viewdata();
  },[Email]);
  return(
<div className="mt-8">
  <h2 className="text-2xl mb-4">My Projects</h2>
  <div className="flex justify-end items-center mb-4">
    <Link to="/delete">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
        Delete Account
      </button>
    </Link>
    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={Logout}>
      Logout
    </button>
  </div>
  <ul>
    {data.map((item, index) => (
      <li
        key={index}
        className="bg-white border rounded p-4 mb-4 shadow-md"
      >
        <p>Work: {item.Work}</p>
        <p>Status: {item.Status}</p>
      </li>
    ))}
  </ul>
</div>

  )
};

export default Main;
