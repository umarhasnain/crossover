'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Get the token cookie string like "token=xyz"
    const tokenCookie = document.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith('token='));

    // Extract the token value if cookie exists
    const token = tokenCookie ? tokenCookie.split('=')[1] : null;

    if (!token) {
      router.push('/sign-in');
    } else {
      setIsChecking(false);
    }
  }, [router]);

  if (isChecking) {
    return <p>Loading...</p>; 
  }

  return <>{children}</>;
}
