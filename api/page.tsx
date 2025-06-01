'use client'

import { useState } from 'react'

export default function Home() {
  const [product, setProduct] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const generateDescription = async () => {
    setLoading(true)
    setResult('')

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product }),
      })

      const data = await res.json()
      setResult(data.result)
    } catch (error) {
      setResult('Error al generar la descripción.')
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen p-8 bg-white text-black">
      <h1 className="text-2xl font-bold mb-4">Generador de Descripciones con IA</h1>
      <input
        className="border px-4 py-2 w-full max-w-md"
        placeholder="Nombre del producto..."
        value={product}
        onChange={(e) => setProduct(e.target.value)}
      />
      <button
        className="mt-4 px-6 py-2 bg-black text-white rounded"
        onClick={generateDescription}
        disabled={loading}
      >
        {loading ? 'Generando...' : 'Generar descripción'}
      </button>

      {result && (
        <div className="mt-6 p-4 border rounded bg-gray-100">
          <h2 className="text-lg font-semibold mb-2">Descripción generada:</h2>
          <p>{result}</p>
        </div>
      )}
    </main>
  )
}
