import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'my_secret111111111111111111111111111111111'; // 建议用 .env 文件管理
const JWT_EXPIRES_IN = '24h'; // token 有效期

export function generateToken(payload: { id: string; name: string }) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}