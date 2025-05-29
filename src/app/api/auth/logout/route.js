import { cookies } from 'next/headers';

export async function POST() {
  try {
    // Remove the token cookie by setting it to empty and expiring immediately
    cookies().set({
      name: 'token',
      value: '',
      httpOnly: true,
      path: '/',
      expires: new Date(0),
    });

    return new Response(JSON.stringify({ message: 'Logged out successfully' }), {
      status: 200,
    });
  } catch (error) {
    console.error('Logout error:', error);
    return new Response(JSON.stringify({ error: 'Logout failed' }), {
      status: 500,
    });
  }
}
