import { Link } from "react-router";

export default function ErrorPage() {
  return (
    <div className="flex w-full justify-center items-center flex-col text-white min-h-screen">
      <h1 className="font-bold text-5xl">404</h1>
      <h2 className="font-bold text-4xl mb-4">Página não encontrada</h2>
      <p className="italic text-2xl">Você caiu em uma página que não existe!</p>

      <Link to="/" className="mt-4 bg-gray-50/20 py-1 px-4 rounded-md">Voltar para home</Link>
    </div>
  );
}
