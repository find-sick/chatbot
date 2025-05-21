'use server';

import { supabaseServer } from '@/lib/supabase-server';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { generateToken } from '@/lib/auth';

// 注册用户
export async function signUpWithEmail(email: string, password: string) {
  if (!email || !password) throw new Error('邮箱和密码不能为空');
  
  // 调用 Supabase Auth 注册接口（自动处理密码哈希、邮箱验证邮件发送）
  const { data, error } = await supabaseServer.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/login`, // 邮箱验证重定向地址
    },
  });

  if (error) throw error;
  return { message: '注册成功，请检查邮箱完成验证' };
}

// 邮箱密码登录
export async function signInWithEmail(email: string, password: string) {
  if (!email || !password) throw new Error('邮箱和密码不能为空');

  // 调用 Supabase Auth 登录接口
  const { data, error } = await supabaseServer.auth.signInWithPassword({
    email,
    password,
  });

   if (error) {
    if (error.status === 400 && error.code === 'invalid_credentials') {
      return { error: '邮箱或密码错误' };
    }
    console.error('登录时发生意外错误:', error.message);
    return { error: '登录失败，请稍后再试' };
  }

  //如果你需要存储额外信息,可以在这里对自建user表进行操作

  // 登录成功后自动管理 session（Supabase 会自动设置 cookie）
  return { user: data.user, session: data.session };
}

// Google登录
export async function signInWithGoogle() {
  const supabase = createServerComponentClient({ cookies });
  
  // 调用 Supabase OAuth 登录接口
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}`, // 登录成功重定向地址
    },
  });

  if (error) throw error;
  return data;
}

