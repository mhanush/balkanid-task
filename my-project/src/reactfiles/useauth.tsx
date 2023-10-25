import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function UseAuth() {
  const navigate = useNavigate();
  const [id, setId] = useState("");

  useEffect(() => {
    async function checkAuthentication() {
      const response = await fetch('http://127.0.0.1:8000/api/user', {
        headers: { 'Content-type': 'application/json' },
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const content = await response.json();
        console.log("API Response Content:", content);
        if (content.Email) {
          setId(content.Email);
          if (content.Designation === "Manager") {
            navigate('/project');
          } else {
            navigate('/main');
          }
        }
      }
    }

    checkAuthentication();
  }, [navigate]);
  
  return id;
}
