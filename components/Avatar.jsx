import { User, Bot } from "lucide-react"

export function Avatar({ sender }) {
  return (
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center ${
        sender === "user" ? "bg-blue-100" : "bg-gray-100"
      }`}
    >
      {sender === "user" ? <User className="w-5 h-5 text-blue-500" /> : <Bot className="w-5 h-5 text-gray-500" />}
    </div>
  )
}

