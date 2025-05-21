'use client';

export default function MessageInput() {
  return (
    <div className="input-container">
      <div className="flex gap-4">
        <textarea
          className="w-full border rounded-lg p-2 resize-none"
          placeholder="输入消息..."
        />
        <button className="new-chat-btn">发送</button>
      </div>
    </div>
  );
}