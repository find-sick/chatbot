'use client';
import Image from 'next/image';

export default function ChatMessages() {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {/* 用户消息 */}
      <div className="flex justify-end mb-4 items-start gap-2">
        <div className="user-message">你好，帮我介绍下这个项目~</div>
        <Image
          src="/globe.svg"
          alt="用户头像"
          width={32}
          height={32}
          className="rounded-full"
        />
      </div>
      
      {/* AI回复 */}
      <div className="flex justify-start mb-4 items-start gap-2">
        <Image
          src="/globe.svg"
          alt="AI头像"
          width={32}
          height={32}
          className="rounded-full"
        />
        <div className="ai-message">这是一个基于Next.js和Tailwind CSS的聊天机器人项目，支持...</div>
      </div>
    </div>
  );
}