import { useState } from 'react'
import Generator from "./components/PasswordGenerator/Generator"
import Checker from "./components/PasswordChecker/Checker"
import './styles/globals.css'

function App() {
  return (
    <div className="container">
      <h1>Password Toolkit</h1>
      <p className="helper">
        Generate strong passwords and check their strength in real time.
      </p>

      <div className="row" style={{ marginTop: 16 }}>
        <div className="panel">
          <h2>Password Generator</h2>
          <Generator />
        </div>

        <div className="panel">
          <h2>Password Strength Checker</h2>
          <Checker />
        </div>
      </div>
    </div>
  );
}

export default App
