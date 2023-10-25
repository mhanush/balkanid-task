import React, { SyntheticEvent, useState} from "react";
import { useNavigate,Link } from "react-router-dom";
import { UseAuth } from "./useauth.tsx";

const Project = (props: { name: string; setName: (name: string) => void }) => {
  const navigate = useNavigate();
  const Email=UseAuth();
const[response,setResponse]=useState<Response | null>(null);
  const Logout = async () => {
    await fetch("http://127.0.0.1:8000/api/logout", {
      headers: { "Content-type": "application/json" },
      method: "POST",
      credentials: "include",
    });
    props.setName("");
    navigate("/");
  };
  /*const views=async(e:SyntheticEvent)=>{
    e.preventDefault();
    navigate("/view")
  }*/
  const[Topic,settopic]=useState("")
  const [users, setUsers] = useState([
    {
      email: "",
      work: "",
      status: "Assigned",
    },
  ]);

  const addUser = () => {
    setUsers([
      ...users,
      {
        email: "",
        work: "",
        status: "Assigned",
      },
    ]);
  };

  const updateUser = (index, field, value) => {
    const updatedUsers = [...users];
    updatedUsers[index][field] = value;
    setUsers(updatedUsers);
  };

  const removeUser = (index) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
  };
  const insert=async()=>{
    const result=await fetch("http://127.0.0.1:8000/api/Manager", {
      headers: { "Content-type": "application/json" },
      method: "POST",
      credentials: "include",
      body:JSON.stringify({
        Topic,
        Email,
        users,
    })
    });
    if(result.ok){
      const jsonResponse = await result.json();
      setResponse(jsonResponse);
    }
  }
  return (
<div className="container mx-auto p-4">
<div className="flex justify-end m-4 space-x-4">
<Link to={`/view?Email=${Email}`}><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">View</button></Link>
    <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      onClick={Logout}
    >
      Logout
    </button>
    <Link to="/delete">
      <button className="bg-red-500 hover-bg-red-700 text-white font-bold py-2 px-4 rounded">
        Delete Account
      </button>
    </Link>
    
  </div>

      <label
        htmlFor="title"
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        Project Title
      </label>
      <textarea
        name="title"
        id="title"
        cols={30}
        rows={3}
        value={Topic}
        onChange={(e) => settopic(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      ></textarea>
      {users.map((user, index) => (
        <div key={index} className="mt-4 p-4 border rounded">
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={(e) => updateUser(index, "email", e.target.value)}
            placeholder="Email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <textarea
            name="work"
            value={user.work}
            onChange={(e) => updateUser(index, "work", e.target.value)}
            cols={30}
            rows={2}
            placeholder="Work"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <select
            name="status"
            value={user.status}
            onChange={(e) => updateUser(index, "status", e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="Pending">Pending</option>
            <option value="Done">Done</option>
            <option value="Assigned">Assigned</option>
          </select>
          <button
            onClick={() => removeUser(index)}
            className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Remove
          </button>
        </div>
      ))}
      <div>
        <button onClick={addUser} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add User</button>
      </div>
      <div className="text-center">
        <button className="mt-4 bg-green-500 hover.bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={insert}>Done</button>
      </div>
      <div>
      {response !== null ? (
        <pre>{JSON.stringify(response, null, 2)}</pre>
      ) : null}
    </div>
    </div>

  );
};

export default Project;
