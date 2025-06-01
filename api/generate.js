export default async function handler(req, res) {
  const { product } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;

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

  const json = await completion.json();
  const result = json.choices?.[0]?.message?.content || "Error al generar descripción.";
  res.status(200).json({ result });
}
