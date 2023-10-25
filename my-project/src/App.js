import Home from './reactfiles/home.tsx'
import Login from './reactfiles/login.tsx'
import Register from './reactfiles/register.tsx'
import Main from './reactfiles/main.tsx'
import Project from './reactfiles/project.tsx'
import Delete from './reactfiles/delete.tsx'
import Data from './reactfiles/view.tsx'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { UseAuth } from './reactfiles/useauth.tsx'
import React, { useState } from 'react';
export default function App(){
    const [name, setName] = useState('');
    return(
        <div>
            <BrowserRouter>
            <Routes>
                <Route path="/auth" element={<UseAuth />} />
                <Route path="/login" element={<Login setName={setName} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Home />} />
                <Route path="/main" element={<Main name={name} setName={setName} />} />
                <Route path="/project" element={<Project name={name} setName={setName} />} />
                <Route path="/delete" element={<Delete name={name} setName={setName} />} />
                <Route path="/view" element={<Data />} />
            </Routes>
            </BrowserRouter>
        </div>
    )
}