"use client";

import { useEffect } from "react";
import { ClerkProvider, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";

export default function ClerkErrorBoundary({ children }) {
  useEffect(() => {
    const handleClerkError = (event) => {
      console.error("Clerk Error:", event.detail);
      // You could add error reporting here
    };

    window.addEventListener("clerk:error", handleClerkError);
    return () => window.removeEventListener("clerk:error", handleClerkError);
  }, []);

  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <ClerkLoading>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </ClerkLoading>
      <ClerkLoaded>
        {children}
      </ClerkLoaded>
    </ClerkProvider>
  );
}
