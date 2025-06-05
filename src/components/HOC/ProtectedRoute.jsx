'use client';

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";

const ProtectedRoutes = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isPaid, user } = useUser();

  useEffect(() => {
    // Don't run until context is ready
    if (isAuthenticated === null || isPaid === null) return;

    const protectedRoutes = ["/dashboard", "/players", "/admin"];
    const onProtectedRoute = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );

    // ✅ 1. Not Authenticated? Force login.
    if (!isAuthenticated && pathname !== "/sign-in") {
      router.replace("/sign-in");
      return;
    }

    // ✅ 2. Admin redirect only on sign-in or dashboard
    if (
      isAuthenticated &&
      user?.email === "crossoveradmin01@gmail.com" &&
      (pathname === "/sign-in" || pathname === "/dashboard")
    ) {
      router.replace("/admin");
      return;
    }

    // ✅ 3. Unpaid user accessing protected? Send to /payment
    if (
      isAuthenticated &&
      onProtectedRoute &&
      !isPaid &&
      pathname !== "/payment"
    ) {
      router.replace("/payment");
      return;
    }

    // ✅ 4. Paid user on /payment? Redirect to dashboard
    if (isAuthenticated && isPaid && pathname === "/payment") {
      router.replace("/dashboard");
      return;
    }
  }, [pathname, isAuthenticated, isPaid, user, router]);

  // 🔄 Show loading until user status is determined
  if (isAuthenticated === null || isPaid === null) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
