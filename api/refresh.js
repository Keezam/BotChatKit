export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { currentClientSecret } = req.body;

  const response = await fetch(
    "https://api.openai.com/v1/chatkit/sessions/refresh",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "OpenAI-Beta": "chatkit_beta=v1"
      },
      body: JSON.stringify({
        current_client_secret: currentClientSecret
      })
    }
  );

  const data = await response.json();
  res.status(200).json(data);
}