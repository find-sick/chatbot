'use client';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // 新增：导入路由钩子

interface UserAvatarProps {
  className?: string;
}

export default function UserAvatar({ className = '' }: UserAvatarProps) {
  const [isLogoutVisible, setIsLogoutVisible] = useState(false);
  const router = useRouter(); // 新增：获取路由实例

  const handleLogout = () => {
  //查看本地存储中是否有token
    const token = localStorage.getItem('token');
    if (token) {
    localStorage.removeItem('token'); // 移除token
    }
    router.push('/login'); // 新增：跳转到登录页面
  };

  return (
    <div 
      className={`relative cursor-pointer  ${className}`}
      onMouseEnter={() => setIsLogoutVisible(true)}
      onMouseLeave={() => setIsLogoutVisible(false)}
    >
      <Image
        src="/globe.svg"
        alt="用户头像"
        width={40}
        height={40}
        className="rounded-full"
      />
      
      {isLogoutVisible && (
        <div className="absolute right-0 top-full mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-2">
          <button 
            className="w-full text-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
            onClick={handleLogout} // 修改：使用新的处理函数
          >
            退出登录
          </button>
        </div>
      )}
    </div>
  );
}