"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export default function UserSync() {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetch("/api/sync-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clerkUserId: user.id,
          name: `${user.firstName} ${user.lastName}`,
          imageUrl: user.imageUrl,
          email: user.emailAddresses[0].emailAddress,
        }),
      }).catch(console.error);
    }
  }, [user]);

  return null;
}
