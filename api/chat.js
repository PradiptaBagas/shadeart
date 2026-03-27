// api/chat.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { message } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite-preview:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Kamu adalah AI assistant ShadeArt. ${message}` }] }]
      })
    });

    const data = await response.json();
    const reply = data.candidates[0].content.parts[0].text;
    
    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ reply: "Gangguan teknis.", error: error.message });
  }
}