import { FormEvent, useEffect, useState } from "react";
import Header from "../../components/Header";
import Input from "../../components/Input";
import { db } from "../../services/firebaseConnection";
import {
  setDoc,
  getDoc,
  doc  
} from "firebase/firestore";

export default function NetWorks() {
  const [facebook, setFacebook] = useState("")
  const [instagram, setInstagram] = useState("")
  const [linkedin, setLinkedin] = useState("")

  useEffect(() =>{
    function loadLinks(){
      const docRef = doc(db, "social", "link")
      getDoc(docRef)
      .then((snapshot) => {
        if(snapshot.data() !== undefined) {
          setFacebook(snapshot.data()?.facebook)
          setInstagram(snapshot.data()?.instagram)
          setLinkedin(snapshot.data()?.linkedin)
          
        }        
      })
    }

    loadLinks()

  }, [])
  
  function handleRegister(e: FormEvent) {
    e.preventDefault();

    setDoc(doc(db, "social", "link"), {
      facebook: facebook,
      instagram: instagram,
      linkedin: linkedin
    })
    .then(() => {      
      console.log("Cadastrado com sucesso!")
    })
    .catch((error) => {
      console.log("Erro ao salvar" + error)
    })
  }

  return(
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
        <Header />
        <h1 className="text-white text-2xl font-medium mt-8 mb-4">Minhas Redes Sociais</h1>

        <form className="flex flex-col max-w-xl w-full" onSubmit={handleRegister}>
          <label className="text-white font-medium mt-2 mb-2">Link do Facebook</label>
          <Input placeholder="Digite a url do facebook..." value={facebook} onChange={(e) => setFacebook(e.target.value) }/>

          <label className="text-white font-medium mt-2 mb-2">Link do Instagram</label>
          <Input placeholder="Digite a url do instagram..." value={instagram} onChange={(e) => setInstagram(e.target.value) }/>

          <label className="text-white font-medium mt-2 mb-2">Link do Linkedin</label>
          <Input placeholder="Digite a url do linkedin..." value={linkedin} onChange={(e) => setLinkedin(e.target.value) }/>

          <button
          type="submit"
          className="bg-blue-600 h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center mt-16 mb-7 cursor-pointer"
        >
          Cadastrar
        </button>
        </form>
    </div>
  )
}
