
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    {params}: {params: Promise<{ id: number }>}
) {
    const { id } = await params;

    if (!id || isNaN(Number(id))) {
        return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
    }

    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        return NextResponse.json(data);
    } catch {
        return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
    }
}