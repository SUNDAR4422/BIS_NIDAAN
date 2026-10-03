import { useState } from 'react'

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulated login
    if (email && password) {
      onLogin()
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-lg shadow-lg border border-slate-200">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary-900 mb-2">Login</h2>
        <p className="text-slate-500">Access the BIS NIDAAN Admin Portal</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
            required
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-primary-700 hover:bg-primary-900 text-white font-semibold py-3 px-4 rounded-md transition-colors"
        >
          Sign In
        </button>
      </form>
    </div>
  )
}
