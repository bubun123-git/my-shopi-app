import LoginForm from "../components/login-form"

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <div className="max-w-md mx-auto">
        <LoginForm />
      </div>
    </div>
  )
}

