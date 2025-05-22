'use client';
import { useState } from 'react';

interface MessageInputProps {
  onSend: (input: string) => void;
  isLoading: boolean;
}

export default function MessageInput({ onSend, isLoading }: MessageInputProps) {
  const [input, setInput] = useState(''); // 管理输入内容的 state

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 阻止表单默认提交行为
    if (input.trim()) { // 确保输入非空
      onSend(input.trim()); // 调用父组件的发送函数
      setInput(''); // 清空输入框
    }
  };

  return (
    <div className="input-container">
      <form onSubmit={handleSubmit} className="flex gap-4">
        <textarea
          className="w-full border rounded-lg p-2 resize-none"
          placeholder="输入消息..."
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          disabled={isLoading}
        />
        <button 
          type="submit" 
          className="new-chat-btn" 
          disabled={isLoading}
        >
          {isLoading ? '思考中...' : '发送'}
        </button>
      </form>
    </div>
  );
}