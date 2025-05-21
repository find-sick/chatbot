'use server'; // 标记为 Server Action

import { supabaseServer } from '@/lib/supabase-server';
import { generateToken } from '@/lib/auth';

// 注册用户
export async function addUser(name: string, password: string) {
  if (!name.trim()) throw new Error('用户名不能为空');
  
  const { error } = await supabaseServer.from('test').insert([{ name, password}]);
  if (error) throw error;
  return { message: '注册成功' };
}
//查询用户是否在数据库中存在
export async function checkUser(name: string, password: string) {
  const { data, error } = await supabaseServer
    .from('test')
    .select('*')
    .eq('name', name)
    .eq('password', password);

  if (error) throw error;

  if (data.length === 0) {
    return null; // 用户不存在或密码错误
  }

  const user = data[0];

  // 生成 Token
  const token = generateToken({
    id: user.id,
    name: user.name,
  });

  return { user, token };
}
