
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
    }
}