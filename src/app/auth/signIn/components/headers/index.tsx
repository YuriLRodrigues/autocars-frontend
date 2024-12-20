import Image from "next/image";
import logo from "../../../../../assets/images/turbo.svg";
export default function Header() {
  return (
    <>
      <div className="flex items-center justify-center mb-4 gap-3">
        <Image src={logo} alt="Auto Cars Logo" className="w-12 h-auto" />
        <h2 className="text-orange-500 text-lg font-bold">Auto Cars</h2>
      </div>
      <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
        Crie sua conta
      </h1>
      <p className="text-gray-600">
        Já tem uma conta?
        <a
          href="/login"
          className="text-orange-500 font-bold hover:underline pl-2"
        >
          Entre nela por aqui!
        </a>
      </p>
    </>
  );
}
