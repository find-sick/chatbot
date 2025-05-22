"use client";
import { useState } from "react";
import Image from "next/image";
import './login-styles.css';
import { signUpWithEmail,signInWithEmail,signInWithGoogle} from '../actions/user-actions'; // 导入 Server Actions
import { useRouter } from 'next/navigation'; 
// import { signIn } from "next-auth/react"; // 需要安装next-auth库

export default function LoginPage() {
  const router = useRouter(); // 新增：获取路由实例
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      // 这里调用注册API（示例）
      handleRegister(email, password);
      console.log("注册请求:", { email, password });
    } else {
      // 这里调用登录API（示例）
      handleLogin(email, password);
    }
  };

  //登录功能
  const handleLogin = async (email: string, password: string) => {
    const result = await signInWithEmail(email, password);
    console.log("登录成功");
    
    console.log(result);
    
    if (result.session) {
      // 登录成功，跳转到首页
      console.log("登录成功");
      const {access_token: token} = result.session
      //将token和用户信息存储到本地
      localStorage.setItem('token', token);
      //清除表单
      setEmail("");
      setPassword("");
      router.push('/'); //跳转到登录页面
    } else {
      // 登录失败，显示错误信息
      console.log("登录失败");
      alert(result.error);
    }
  }
  // 注册功能
  const handleRegister = async (email: string, password: string) => {
    const result = await signUpWithEmail(email, password);
    console.log("注册成功", result);
    
    //提示注册成功
    // if (result) {
    // alert("注册成功"); 
    // // 清空表单
    // setEmail("");
    // setPassword("");
    // }
  }
  //google登录功能
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      if (result?.url) {
        console.log('Google OAuth 跳转URL:', result.url);
        window.location.href = result.url;
      } else {
        throw new Error('未获取到重定向URL');
      }
    } catch (error) {
      console.error('Google 登录失败:', error);
      alert('Google 登录失败，请重试');
    }
  }

  return (
    // 替换为自定义类名
    <div className="login-container">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="login-title">
          {isRegister ? "创建新账户" : "登录你的账户"}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="form-container">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="input-label">
                邮箱
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="input-label">
                密码
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="submit-btn"
              >
                {isRegister ? "注册" : "登录"}
              </button>
            </div>
          </form>

          <div className="divider-container">
            <div className="divider-line" />
            <div className="divider-text">
              或者使用其他方式登录
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => handleGoogleLogin()}
              className="google-btn"
            >
              <Image
                src="/google-icon.svg"
                alt="Google登录"
                width={20}
                height={20}
                className="mr-3"

              />
              使用Google登录
            </button>
          </div>

          <div className="toggle-link">
            <span className="mr-1">
              {isRegister ? "已有账户？" : "还没有账户？"}
            </span>
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="toggle-btn"
            >
              {isRegister ? "立即登录" : "创建新账户"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}