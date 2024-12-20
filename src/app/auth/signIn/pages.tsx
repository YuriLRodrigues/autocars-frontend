// components
import Form from "./components/form";
import Header from "./components/headers";

export default function SignIn() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <Header />
        <Form />
      </div>
    </main>
  );
}
