import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Inisialisasi dotenv untuk membaca file .env di folder server
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            console.error("❌ ERROR: API Key tidak ditemukan!");
            return res.status(500).json({ reply: "Konfigurasi server salah (API Key hilang)." });
        }

        // PAKAI MODEL TERBARU DARI DAFTAR AKUN KAMU (2026 Version)
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite-preview:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: `Kamu adalah AI assistant untuk website ShadeArt (Experimental Poster Art and Apparel Store). 
                                Gaya bicaramu santai, kreatif, dan profesional. 
                                Kamu membantu menjelaskan karya seni, style, dan memberi rekomendasi artistik : ${message}`
                            }
                        ]
                    }
                ]
            })
        });

        const data = await response.json();

        // Cek jika ada error dari Google
        if (data.error) {
            console.error("❌ GOOGLE API ERROR:", data.error.message);
            throw new Error(data.error.message);
        }

        // Pastikan ada jawaban dari Google
        if (!data.candidates || data.candidates.length === 0) {
            throw new Error("Google AI tidak memberikan jawaban.");
        }

        const reply = data.candidates[0].content.parts[0].text;
        res.json({ reply });

    } catch (error) {
        console.error("DETEKSI ERROR:", error.message);
        res.status(500).json({ 
            reply: "Maaf, ShadeArt AI sedang gangguan teknis.",
            debug: error.message 
        });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ Server ShadeArt aktif di http://localhost:${PORT}`);
    console.log(`🚀 Menggunakan Model Masa Depan: Gemini 3.1 Flash Lite`);
    console.log(`🔑 API Key: ${process.env.GEMINI_API_KEY ? "OK" : "KOSONG"}`);
});