import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(request) {
  try {
    const clerkUser = await currentUser();
    
    if (!clerkUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { clerkUserId, name, imageUrl, email } = await request.json();

    // Verify the request is from the authenticated user
    if (clerkUser.id !== clerkUserId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existingUser = await db.user.findUnique({
      where: { clerkUserId },
    });

    if (existingUser) {
      return Response.json({ user: existingUser });
    }

    const newUser = await db.user.create({
      data: {
        clerkUserId,
        name,
        imageUrl,
        email,
      },
    });

    return Response.json({ user: newUser });
  } catch (error) {
    console.error("Error syncing user:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
