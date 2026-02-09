export default async function handler(req, res) {

  res.setHeader("Access-Control-Allow-Origin", "https://botchatkit.lovestoblog.com");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { currentClientSecret } = req.body;

  const response = await fetch(
    `https://api.openai.com/v1/chatkit/sessions/${currentClientSecret}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "OpenAI-Beta": "chatkit_beta=v1"
      }
    }
  );

  const data = await response.json();
  res.status(200).json(data);
}