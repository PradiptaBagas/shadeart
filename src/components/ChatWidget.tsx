import { useState, useRef, useEffect } from "react"
import ReactMarkdown from "react-markdown" //

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([])
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto scroll ke pesan terbaru
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMsg = { role: 'user' as const, text: input }
    setMessages((prev) => [...prev, userMsg])
    setInput("")

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      })

      const data = await res.json()
      
      if (data.reply) {
        setMessages((prev) => [...prev, { role: 'ai', text: data.reply }])
      } else {
        throw new Error("No reply data")
      }
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'ai', text: "Maaf, ShadeArt AI sedang mengalami gangguan teknis." }])
    }
  }

  return (
    <>
      {/* Floating Launcher Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 bg-black text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200 z-50"
        >
          <span className="text-2xl">💬</span>
        </button>
      )}

      {/* Chat Box Container */}
      {open && (
        <div className="fixed bottom-6 right-6 w-[350px] h-[500px] bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 animate-in fade-in zoom-in duration-200">
          
          {/* Header */}
          <div className="bg-black p-4 text-white flex justify-between items-center shadow-md">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <h3 className="font-semibold tracking-wide italic">ShadeArt AI</h3>
            </div>
            <button 
              onClick={() => setOpen(false)}
              className="hover:bg-gray-800 p-1 rounded-md transition-colors"
            >
              <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"/>
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div 
            ref={scrollRef}
            className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3 custom-scrollbar"
          >
            {messages.length === 0 && (
              <div className="text-center mt-10">
                <p className="text-gray-400 text-sm italic">Ada yang bisa Shade bantu hari ini?</p>
              </div>
            )}
            
            {messages.map((msg, i) => (
              <div 
                key={i} 
                className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-black text-white self-end rounded-tr-none' 
                    : 'bg-white text-gray-800 self-start border border-gray-200 rounded-tl-none shadow-sm'
                }`}
              >
                {/* PERBAIKAN: Menggunakan ReactMarkdown untuk AI agar link bisa diklik */}
                {msg.role === 'ai' ? (
                  <div className="prose prose-sm max-w-none prose-a:text-blue-600 prose-a:underline prose-p:my-0">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                ) : (
                  msg.text
                )}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100 flex gap-2 items-center">
            <input
              className="flex-1 bg-gray-100 border-none px-4 py-2 rounded-full text-sm focus:ring-2 focus:ring-black outline-none transition-all"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Tanya tentang art..."
            />
            <button
              onClick={sendMessage}
              className="bg-black hover:bg-gray-800 text-white p-2 rounded-full transition-all active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}