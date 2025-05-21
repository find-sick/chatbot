"use client";
import Image from "next/image";
import { useState } from "react";
import './chat-styles.css'; 
import { useRouter } from 'next/navigation'; 
import { useEffect } from "react";
// 导入拆分的组件
import Sidebar from './components/Sidebar';
import UserAvatar from './components/UserAvatar';
import ChatMessages from './components/ChatMessages';
import MessageInput from './components/MessageInput';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // const handleLogout = () => {
  //   console.log("执行退出登录操作");
  // };
  const router = useRouter(); // 新增：获取路由实例

   useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // 已登录，跳转或其他处理
      console.log('Token found:', token);
    } else {
      // 未登录
     router.push('/login');
    }
  }, []);

  return (
    <div className="grid min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="grid grid-cols-[1fr] sm:grid-cols-[auto_1fr] gap-8 h-screen relative">
        {/* 侧边栏组件 */}
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />

        {/* 右侧主区域 */}
        <div className="flex flex-col">
          {/* 顶部标题和用户头像（修改布局方式） */}
          <div className="relative flex items-center justify-between h-25 px-4 w-full">
            <div></div> {/* 占位元素，用于保持布局 */}
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">智能助手</h2>
            <UserAvatar  className="absolute right-5"  />
          </div>
          {/* 消息列表组件 */}
          <ChatMessages />
          {/* 输入框组件 */}
          <MessageInput />
        </div>

        {/* 固定侧边栏开关按钮 */}
        {!isSidebarOpen && (
          <button
            className="fixed top-6 left-6 z-50 p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full shadow-lg transition-transform hover:scale-105"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Image
              src="/left.svg"
              alt="打开侧边栏"
              width={24}
              height={24}
            />
          </button>
        )}
      </main>
    </div>
  );
}