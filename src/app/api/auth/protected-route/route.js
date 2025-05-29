import { verifyToken } from '@/lib/auth';

export async function GET(req) {
  const { valid, decoded, message } = verifyToken();

  if (!valid) {
    return new Response(JSON.stringify({ error: message || 'Unauthorized' }), {
      status: 401,
    });
  }

  // Token is valid, proceed with your protected logic
  return new Response(JSON.stringify({ message: 'Welcome!', user: decoded }), {
    status: 200,
  });
}
