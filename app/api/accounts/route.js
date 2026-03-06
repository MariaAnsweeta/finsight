import { getUserAccounts } from "@/actions/dashboard";

export async function GET() {
  try {
    const accounts = await getUserAccounts();
    return Response.json(accounts);
  } catch (error) {
    console.error('Error fetching accounts:', error);
    return Response.json(
      { error: 'Failed to fetch accounts' },
      { status: 500 }
    );
  }
}
