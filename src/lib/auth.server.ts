import { cookies } from 'next/headers';
import { verifyToken } from '../lib/auth';

// Server-only functions
export async function getAuthCookie(): Promise<string | undefined> {
  const cookieStore = cookies();
  return (await cookieStore).get('authToken')?.value;
}

export async function removeAuthCookie(): Promise<void> {
  const cookieStore = cookies();
  (await cookieStore).delete('authToken');
}

export async function getCurrentUser(): Promise<string | null> {
  const token = await getAuthCookie();
  if (!token) return null;
  
  const payload = verifyToken(token);
  return payload?.sub ?? null;
}