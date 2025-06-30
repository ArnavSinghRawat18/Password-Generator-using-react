import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(12)
  const [numberAllowed, setNumberAllowed] = useState(true)
  const [charAllowed, setCharAllowed] = useState(true)
  const [password, setPassword] = useState("")
  const [copied, setCopied] = useState(false)
  const passwordRef = useRef(null)

  const copyPasswordToClipboard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select()
      window.navigator.clipboard.writeText(password)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [password])

  const passwordGenerator = useCallback(() => {
    let charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) charset += "0123456789"
    if (charAllowed) charset += "!@#$%^&*()_+-=[]{}|;:,.<>/?`~\""

    let pass = ""
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length)
      pass += charset[randomIndex]
    }

    setPassword(pass)
  }, [length, numberAllowed, charAllowed])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-700 via-indigo-800 to-gray-900 px-4 py-8 sm:px-6">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 sm:p-8 rounded-2xl w-full max-w-md shadow-2xl text-white">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 tracking-wide">
          🔐 Password Generator
        </h1>

        {/* Password + Copy */}
        <div className="flex flex-col sm:flex-row mb-4 gap-2">
          <input
            type="text"
            value={password}
            ref={passwordRef}
            readOnly
            className="flex-1 px-4 py-2 rounded-lg sm:rounded-l-lg sm:rounded-r-none bg-white/20 text-white outline-none placeholder:text-gray-300 w-full"
            placeholder="Your password..."
          />
          <button
            onClick={copyPasswordToClipboard}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg sm:rounded-l-none sm:rounded-r-lg font-semibold transition"
          >
            Copy
          </button>
        </div>

        {/* Settings */}
        <div className="space-y-4 text-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <label htmlFor="lengthSlider">Length: {length}</label>
            <input
              id="lengthSlider"
              type="range"
              min={8}
              max={32}
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full sm:w-1/2 accent-purple-500"
            />
          </div>

          <div className="flex items-center gap-x-3">
            <input
              type="checkbox"
              id="numberInput"
              checked={numberAllowed}
              onChange={() => setNumberAllowed(prev => !prev)}
              className="accent-purple-500"
            />
            <label htmlFor="numberInput">Include Numbers</label>
          </div>

          <div className="flex items-center gap-x-3">
            <input
              type="checkbox"
              id="characterInput"
              checked={charAllowed}
              onChange={() => setCharAllowed(prev => !prev)}
              className="accent-purple-500"
            />
            <label htmlFor="characterInput">Include Symbols</label>
          </div>
        </div>

        <button
          onClick={passwordGenerator}
          className="mt-6 w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-2 rounded-lg transition shadow-lg"
        >
          🔄 Generate New Password
        </button>
      </div>

      {/* Footer */}
      <p className="mt-6 text-center text-white text-sm opacity-80">
        Made with ❤️ by <span className="font-semibold underline">Arnav Singh Rawat</span>
      </p>

      <a
        href="https://github.com/ArnavSinghRawat18/Password-Generator-using-react"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 text-sm text-blue-300 hover:text-white underline transition"
      >
        🔗 View Source Code on GitHub
      </a>

      {/* Toast */}
      {copied && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all animate-pulse z-50 text-sm sm:text-base">
          ✅ Password is copied!
        </div>
      )}
    </div>
  )
}

export default App
