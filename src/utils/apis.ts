
export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}


export const fetchProducts = async (): Promise<Product[]> => {
    const response = await fetch('/api/products');
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    return await response.json();
};

export const fetchCategories = async (): Promise<string[]> => {
    const response = await fetch('/api/categories');
    if (!response.ok) {
        throw new Error('Failed to fetch categories');
    }
    return await response.json();
};

export const fetchProductById = async (id: string): Promise<Product> => {
    const response = await fetch(`/api/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
};
