
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {

    if (!params.id || isNaN(Number(params.id))) {
        return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
    }

    try {
        const response = await fetch(`https://fakestoreapi.com/products/${params.id}`);
        const data = await response.json();
        return NextResponse.json(data);
    } catch {
        return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
    }
}