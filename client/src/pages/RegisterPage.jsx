import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import {motion} from "framer-motion"

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function registerUser(ev){
    ev.preventDefault();
    try {
      await axios.post("/register", {
          name,
          email,
          password
      });
      alert('Your registeration is complete.')
    }catch(e){
      alert('Registration failed, Please try again later!')
    }
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-center text-4xl  mt-6">Register</h1>
        <form className="max-w-md mx-auto mt-2" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="yourname"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
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
          <motion.button
            className="primary mt-1"
            whileHover={{ scale: 1.1 }}
          >
            Register
          </motion.button>
        </form>
        <div className="text-center py-2 text-gray-500">
          Already a member?{" "}
          <Link to={"/login"} className="underline text-black">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
