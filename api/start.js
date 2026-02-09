export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const response = await fetch("https://api.openai.com/v1/chatkit/sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer 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`,
      "OpenAI-Beta": "chatkit_beta=v1"
    },
    body: JSON.stringify({
      workflow: { id: "wf_6953e8fbe24c8190a0dd8dae4a7c8be20ca99330869474a0" },
      user: "user_" + Date.now()
    })
  });

  const data = await response.json();
  res.status(200).json(data);
}