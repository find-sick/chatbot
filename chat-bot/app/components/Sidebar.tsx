'use client';
import Image from 'next/image';
import { useState } from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <div
      style={{ width: isOpen ? '260px' : '0' }}
      className="overflow-hidden transition-all duration-300 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700"
    >
      <button 
        style={{ width: '200px', height: '52px' }}
        onClick={onClose}
      >
        <Image
          src="/left.svg"
          alt="关闭侧边栏"
          width={24}
          height={24}
          style={{ marginLeft: '10px' }}
        />
      </button>
      
      <button className="new-chat-btn mb-4 ml-4">新建对话</button>
      <ul className="space-y-2 ml-4">
        {[...Array(5)].map((_, i) => (
          <li key={i} className="chat-item">
            会话 {i + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}