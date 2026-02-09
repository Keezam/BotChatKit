export default async function handler(req, res) {

  // 🔓 CORS (PERMITIR TU DOMINIO)
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://botchatkit.lovestoblog.com"
  );
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ RESPONDER PREFLIGHT (ESTO ES LO QUE TE FALTABA)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // ❌ SOLO POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // 🔵 TU LÓGICA ORIGINAL (SIN CAMBIOS)
  const response = await fetch("https://api.openai.com/v1/chatkit/sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "OpenAI-Beta": "chatkit_beta=v1"
    },
    body: JSON.stringify({
      workflow: { id: process.env.WORKFLOW_ID },
      user: "user_" + Date.now()
    })
  });

  const data = await response.json();
  res.status(200).json(data);
}