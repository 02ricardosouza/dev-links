import { FormEvent, useEffect, useState } from "react";
import Header from "../../components/Header";
import Input from "../../components/Input";
import { FiTrash } from "react-icons/fi";
import { db } from "../../services/firebaseConnection";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";

interface LinksProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
  fonte: string;
  pesoFonte: string;
  tema: string;
}

export default function Admin() {
  const [nameInput, setNameInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [textColorInput, setTextColorInput] = useState("#f1f1f1");
  const [backgroundColorInput, setBackgroundColorInput] = useState("#121212");
  const [colorTheme, setColorTheme] = useState("#121212");
  const [links, setLinks] = useState<LinksProps[]>([]);

  const [fontWeight, setFontWeight] = useState("500");

  const listFontWeight = ["400", "500", "600", "700", "800", "900"];

  const googleFonts = [
    "Roboto",
    "Open Sans",
    "Lato",
    "Poppins",
    "Montserrat",
    "Oswald",
    "Raleway",
    "Playfair Display",
  ];

  const [selectedFont, setSelectedFont] = useState(googleFonts[0]);

  const toggleTheme = () => {
    setColorTheme((prev) => (prev === "#121212" ? "#ffffff" : "#121212"));
  };

  const isDark = colorTheme === "#121212";

  useEffect(() => {
    const linksRef = collection(db, "links");
    const queryRef = query(linksRef, orderBy("created", "asc"));

    const unsub = onSnapshot(queryRef, (snapshot) => {
      let lista = [] as LinksProps[];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color,
          fonte: doc.data().fonte,
          pesoFonte: doc.data().pesoFonte,
          tema: doc.data().tema,
        });
      });

      setLinks(lista);
    });

    return () => {
      unsub();
    };
  }, []);

  function handleRegister(e: FormEvent) {
    e.preventDefault();

    if (nameInput === "" || urlInput === "") {
      alert("Preencha todos os campos");
      return;
    }

    addDoc(collection(db, "links"), {
      name: nameInput,
      url: urlInput,
      bg: backgroundColorInput,
      color: textColorInput,
      fonte: selectedFont,
      pesoFonte: fontWeight,
      tema: colorTheme,
      created: new Date(),
    })
      .then(() => {
        setNameInput("");
        setUrlInput("");
        setFontWeight("500");
        setSelectedFont(googleFonts[0]);
        console.log("Cadastrado com sucesso!");
      })
      .catch((error) => {
        console.log("Erro ao cadastrar", error);
      });
  }

  async function handleDeleteLink(id: string) {
    const docRef = doc(db, "links", id);
    await deleteDoc(docRef);
  }

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />

      <form
        className="flex flex-col mt-8 w-full max-w-xl"
        onSubmit={handleRegister}
      >
        <label className="text-white font-medium mt-2 mb-2">Nome do Link</label>
        <Input
          placeholder="Digite o nome do link..."
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />

        <label className="text-white font-medium mt-2 mb-2">URL do Link</label>
        <Input
          type="url"
          placeholder="Digite a URL..."
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />

        <section className="flex my-4 gap-4">
          <div className="flex gap-4 items-center">
            <label className="text-white font-medium mt-2 mb-2">
              Cor do Link
            </label>
            <input
              className="rounded-4xl"
              type="color"
              value={textColorInput}
              onChange={(e) => setTextColorInput(e.target.value)}
            />
          </div>

          <div className="flex gap-4 items-center">
            <label className="text-white font-medium mt-2 mb-2">
              Fundo do Link
            </label>
            <input
              className="rounded-4xl"
              type="color"
              value={backgroundColorInput}
              onChange={(e) => setBackgroundColorInput(e.target.value)}
            />
          </div>

          <div className="flex gap-4 items-center">
            <label className="text-white font-medium mt-2 mb-2">Tema</label>
            <button
              type="button"
              onClick={toggleTheme}
              className={`p-1 border rounded text-sm ${
                isDark
                  ? "text-zinc-900 bg-white hover:bg-zinc-200 cursor-pointer"
                  : "text-white bg-zinc-900 hover:bg-zinc-800 cursor-pointer"
              }`}
            >
              {isDark ? "modo claro" : "modo escuro"}
            </button>
          </div>
        </section>

        <section className="flex my-4 gap-4">
          <div className="flex gap-4 items-center">
            <label className="text-white font-medium mt-2 mb-2">
              Peso fonte
            </label>

            <select
              className="rounded-4xl w-24 text-white border pr-2"
              value={fontWeight}
              onChange={(e) => setFontWeight(e.target.value)}
            >
              {listFontWeight.map((item, index) => (
                <option key={index} value={item} className="text-zinc-900">
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-4 items-center">
            <label className="text-white font-medium mt-2 mb-2">
              Escolha uma fonte:
            </label>
            <select
              value={selectedFont}
              onChange={(e) => setSelectedFont(e.target.value)}
              className="rounded-4xl w-48 text-white border pr-2"
            >
              {googleFonts.map((font, index) => (
                <option key={index} value={font} className="text-zinc-900">
                  {font}
                </option>
              ))}
            </select>
          </div>
        </section>

        {nameInput !== "" && (
          <div
            className="flex gap-4 flex-col items-center border-amber-50 border rounded-2xl p-4 mt-4"
            style={{ backgroundColor: colorTheme }}
          >
            <label
              className={`font-medium mt-2 mb-3 ${
                isDark ? "text-white" : "text-zinc-900"
              }`}
            >
              Veja como está ficando:
            </label>
            <article
              className="w-11/12 max-w-lg flex items-center flex-col justify-between bg-zinc-900 rouded px-1 py-3 rounded"
              style={{
                marginBottom: 8,
                marginTop: 8,
                backgroundColor: backgroundColorInput,
              }}
            >
              <p
                style={{
                  color: textColorInput,
                  fontWeight: fontWeight,
                  fontFamily: selectedFont,
                }}
              >
                {nameInput}
              </p>
            </article>
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-600 h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center mt-16 mb-7 cursor-pointer"
        >
          Cadastrar
        </button>
      </form>

      <h2 className="font-bold text-white mb-4 text-2xl">Meus links</h2>

      {links.map((link) => (
        <article
          key={link.id}
          className="flex items-center justify-between max-w-xl rounded py-3 px-2 mb-2 select-none w-11/12"
          style={{ backgroundColor: link.bg, color: link.color }}
        >
          <p
            style={{
              color: link.color,
              fontWeight: link.pesoFonte,
              fontFamily: link.fonte,
            }}
          >
            {link.name}
          </p>
          <div>
            <button
              className="border border-dashed p-1 rounded bg-neutral-900"
              onClick={() => handleDeleteLink(link.id)}
            >
              <FiTrash size={18} color="#fff" />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
