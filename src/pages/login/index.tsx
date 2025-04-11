import { Link } from "react-router";
import Input from "../../components/Input";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router";

import { auth } from '../../services/firebaseConnection';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    
    if(email === '' || password === '') {
      alert("Preencha todos os campos")
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      navigate("/admin", {replace: true});
    })
    .catch((err) => {
      console.log("Erro ao fazer o login")
      console.log(err)
    })

  }

  return (
    <div className="flex w-full h-screen items-center justify-center flex-col">
      <Link to={"/"}>
        <h1 className="mt-11 text-white mb-7 font-bold text-5xl">
          Dev
          <span className="bg-yellow-500 to-orange-400 bg-clip-text text-transparent">
            Link
          </span>
        </h1>
      </Link>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl flex flex-col px-2"
      >
        <Input
          placeholder="Digite seu email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          placeholder="************"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="h-9 bg-blue-600 rounded border-0 text-lg font-medium cursor-pointer">
          Acessar
        </button>
      </form>
    </div>
  );
}
