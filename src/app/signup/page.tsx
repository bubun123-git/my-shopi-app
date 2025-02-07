import SignupForm from "../components/signup-form"

export default function SignupPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <div className="max-w-md mx-auto">
        <SignupForm />
      </div>
    </div>
  )
}

