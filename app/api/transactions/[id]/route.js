import { getTransaction } from "@/actions/transaction";

export async function GET(request, { params }) {
  try {
    const transaction = await getTransaction(params.id);
    if (!transaction) {
      return Response.json(
        { error: 'Transaction not found' },
        { status: 404 }
      );
    }
    return Response.json(transaction);
  } catch (error) {
    console.error('Error fetching transaction:', error);
    return Response.json(
      { error: 'Failed to fetch transaction' },
      { status: 500 }
    );
  }
}
