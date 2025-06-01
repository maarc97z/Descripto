export default async function handler(req, res) {
  const { product } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "No API key configured" });
  }

  try {
    const completion = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `Genera una descripción optimizada para SEO del siguiente producto: ${product}` }],
        max_tokens: 300
      })
    });

    if (!completion.ok) {
      const errorText = await completion.text();
      return res.status(completion.status).json({ error: errorText });
    }

    const json = await completion.json();
    const result = json.choices?.[0]?.message?.content || "No se recibió respuesta de OpenAI.";
    res.status(200).json({ result });

  } catch (error) {
    res.status(500).json({ error: error.message || "Error inesperado" });
  }
}
