'use client';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface UserAvatarProps {
  className?: string;
}

export default function UserAvatar({ className = '' }: UserAvatarProps) {
  const [isLogoutVisible, setIsLogoutVisible] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
  //查看本地存储中是否有token
    const token = localStorage.getItem('token');
    if (token) {
    localStorage.removeItem('token'); 
    }
    router.push('/login'); 
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
            onClick={handleLogout}
          >
            退出登录
          </button>
        </div>
      )}
    </div>
  );
}