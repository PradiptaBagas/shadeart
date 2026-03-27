// api/chat.js
export default async function handler(req, res) {
if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
}

try {
    const { message } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    // Data Katalog dari posters.ts
    const catalogInfo = `
    KATALOG POSTER SHADEART:
    1. The Black Parade (Kategori: Song) - Harga: $25.00. Deskripsi: Urban loneliness, neon lights, gaya film 35mm.
    2. Echoes of Silence (Kategori: Song) - Harga: $20.00. Deskripsi: Representasi visual single "Echoes", digital illustration.
    3. The Last Train (Kategori: Film) - Harga: $25.00. Deskripsi: Nostalgia era emas kereta api, vintage photography.
    4. Horizon Corp (Kategori: Company) - Harga: $30.00. Deskripsi: Branding minimalis, vector art (Landscape).
    5. Stellar Voyage (Kategori: Film) - Harga: $35.00. Deskripsi: Space opera epic, sci-fi concept (Landscape).
    6. Midnight Jazz (Kategori: Song) - Harga: $22.00. Deskripsi: Album cover art, mixed media.
    7. Urban Jungle (Kategori: Company) - Harga: $25.00. Deskripsi: Kampanye keberlanjutan GreenCity, photography.
    8. Velvet Sky (Kategori: Song) - Harga: $20.00. Deskripsi: Visual dreamy untuk track synth-pop, digital art.
    9. Apex Peak (Kategori: Company) - Harga: $28.00. Deskripsi: Poster promosi Outdoor Gear, photography (Landscape).
    `;

    // Prompt sistem biar AI tahu jati dirinya dan isi web
    const systemInstruction = `Kamu adalah AI assistant resmi website ShadeArt (Experimental Poster Art and Apparel Store). 
    Gaya bicaramu santai, edgy, kreatif, tapi tetap profesional. Gunakan bahasa saya/kamu yang sopan. 
    Tugasmu:
    1. Jawab pertanyaan berdasarkan katalog: ${catalogInfo}
    2. FORMAT JAWABAN WAJIB SEPERTI INI:
    - Berikan kalimat pembuka singkat.
    - Gunakan list (1, 2, dst) untuk setiap produk.
    - Di setiap poin, tulis penjelasan dulu, lalu di baris baru (masih di poin yang sama) kasih link: **[→ Lihat Detail Poster] (https://shadeart.vercel.app/poster/ID)**.
    3. JANGAN mengulang kalimat "Cek posternya di sini" berkali-kali di akhir pesan. Taruh link LANGSUNG di bawah deskripsi itemnya.`;

    //(3.1 Flash Lite) 
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite-preview:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        contents: [{ parts: [{ text: `${systemInstruction}\n\nUser: ${message}` }] }]
    })
    });

    const data = await response.json();
    
    if (data.candidates && data.candidates[0].content.parts[0].text) {
    const reply = data.candidates[0].content.parts[0].text;
    res.status(200).json({ reply });
    } else {
    throw new Error("Respon API tidak valid");
    }

} catch (error) {
    res.status(500).json({ reply: "Aduh, server lagi pusing nih. Coba lagi ya!", error: error.message });
}
}