import React from "react";
import { Link } from "react-router-dom";
const Home=()=>{
    return(
        <div className="flex justify-center items-center h-screen">
        <div className="mb-4">
            <form className="text-center" action="/home" method="get" >
            <Link to="/login">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >Login</button>
            </Link>
            <Link to="/register">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Register</button>
            </Link>
            </form>
        </div>
    </div>
    )
}
export default Home