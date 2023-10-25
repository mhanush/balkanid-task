import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Data=()=>{
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const Email = searchParams.get("Email");
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
        <div className="mt-8"> {/* Add top margin here */}
        <h2 className="text-2xl mb-4">My Projects</h2>
        <ul>
          {data.map((item, index) => (
            <li
              key={index}
              className="bg-white border rounded p-4 mb-4 shadow-md flex items-center justify-center"
            >
              {item.Topic}
            </li>
          ))}
        </ul>
      </div>
  
    )
}
export default Data

