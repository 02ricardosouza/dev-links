import Social from "../../components/Social";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useEffect, useState } from "react";
import { db } from "../../services/firebaseConnection";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  getDoc,
  doc,
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

interface SocialProps {
  facebook: string;
  instagram: string;
  linkedin: string;
}

export default function Home() {
  const [links, setLinks] = useState<LinksProps[]>([]);
  const [redesSociais, setRedesSociais] = useState<SocialProps>();

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

  useEffect(() => {
    function socialLinks() {
      const sociaisRef = doc(db, "social", "link");
      getDoc(sociaisRef).then((snapshot) => {
        if (snapshot.data() !== undefined) {
          setRedesSociais({
            facebook: snapshot.data()?.facebook,
            instagram: snapshot.data()?.instagram,
            linkedin: snapshot.data()?.linkedin,
          });
        }
      });
    }

    socialLinks();
  }, []);

  return (
    <div className="flex flex-col w-full py-4 items-center justify-center">
      <h1 className="md:text-4xl text-white text-3xl font-bold mt-20">
        Ricardo Souza
      </h1>
      <span className="text-gray-50 mb-5 mt-3">Veja meus links 👇</span>

      <main className="flex flex-col w-11/12 max-w-xl text-center">
        {links.map((link) => (
          <article
            key={link.id}
            className="flex items-center justify-center max-w-xl rounded py-3 px-2 mb-2 select-none w-11/12"
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
          </article>
        ))}

        {redesSociais && Object.keys(redesSociais).length > 0 && (
          <footer className="flex justify-center gap-3 my-4">
            <Social url={redesSociais?.facebook}>
              <FaFacebook size={35} color="#fff" />
            </Social>

            <Social url={redesSociais?.instagram}>
              <FaInstagram size={35} color="#fff" />
            </Social>

            <Social url={redesSociais?.linkedin}>
              <FaLinkedin size={35} color="#fff" />
            </Social>
          </footer>
        )}
      </main>
    </div>
  );
}
