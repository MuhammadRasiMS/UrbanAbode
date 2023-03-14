import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const {setUser} = useContext(UserContext)
  async function handleLoginSubmit(ev){
     ev.preventDefault();
    try{
    const {data} = await axios.post('/login', {email, password})
    setUser(data);
        console.log('Login success');
        setRedirect(true)
    } catch(e){
        console.log('Login error');
    }
  }

  if(redirect){
    return <Navigate to={'/'}/>
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-center text-4xl  mt-6">LOGIN</h1>
        <form className="max-w-md mx-auto mt-2" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="youremail@gmail.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <motion.button className="primary mt-1" whileHover={{ scale: 1.1 }}>Login</motion.button>
        </form>
        <div className="text-center py-2 text-gray-500">
          Don't have an account yet?{" "}
          <Link to={"/register"} className="underline text-black">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
