import { SignInForm } from './components/form'
import Header from './components/headers'

export default function SignIn() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
        <Header />

        <SignInForm />
      </div>
    </main>
  )
}
