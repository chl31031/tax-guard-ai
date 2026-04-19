"use client";

import { useState, useEffect } from "react";
import { useChatStore } from "@/store/useChatStore";

export default function ChatPage() {
  const { formData } = useChatStore();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // 페이지 진입 시 사용자의 데이터를 바탕으로 AI의 첫 마디 생성
  useEffect(() => {
    const initialMessage = {
      role: "assistant",
      content: `조사관입니다. 제출하신 ${formData.businessType} 관련 자료를 검토 중입니다. 특히 ${formData.selectedIssue} 부분이 중점 조사 대상이 될 것 같군요. 구체적으로 어떤 대응 계획이 있으신지 말씀해 보시죠.`
    };
    setMessages([initialMessage]);
  }, [formData]);

  const sendMessage = () => {
    if (!input) return;
    
    // 사용자 메시지 추가
    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    
    // TODO: 여기에 OpenAI 또는 Gemini API 호출 로직 추가 예정
    setInput("");
  };

  return (
    <main className="max-w-2xl mx-auto h-screen flex flex-col bg-gray-50 shadow-2xl">
      {/* Header */}
      <header className="p-4 bg-gray-800 text-white flex justify-between items-center">
        <h2 className="font-bold">국세청 조사관 AI 대화창</h2>
        <span className="text-xs bg-red-600 px-2 py-1 rounded">실시간 분석 중</span>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm font-medium ${
              m.role === "user" 
              ? "bg-blue-600 text-white" 
              : "bg-white border border-gray-200 text-gray-800 shadow-sm"
            }`}>
              {m.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <footer className="p-4 bg-white border-t flex gap-2">
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="조사관에게 답변하기..."
          className="flex-1 p-3 bg-gray-100 rounded-xl outline-none text-gray-900 font-bold"
        />
        <button 
          onClick={sendMessage}
          className="px-6 py-3 bg-gray-800 text-white rounded-xl font-bold hover:bg-black transition"
        >
          전송
        </button>
      </footer>
    </main>
  );
}