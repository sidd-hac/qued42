"use client";

import { Product } from '@/utils/apis';

import { Loader2 } from 'lucide-react';
import ProductCard from './ProductCard';

interface ProductPageProps {
    filteredProducts: Product[],
    loading: boolean,
    error: string | null
}

const ProductPage = ({ filteredProducts, loading, error }: ProductPageProps) => {



    if (error) return <p className='flex justify-center items-center text-red-500 font-semibold'>{error}</p>;

    return (
        <div className='flex flex-col justify-center items-center w-full px-4 bg-slate-100'>
            <h1 className="text-3xl font-bold text-center text-gray-800 mt-8 mb-4 border-b-4 border-blue-500 pb-2">
                Featured Products
            </h1>
            {loading ? (
                <span className='flex justify-center items-center'>
                    <Loader2 className='w-10 h-10 text-blue-500 animate-spin' />
                </span>
            ) : (
                <div className='flex flex-col w-full mb-10'>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                </div>
            )}
           
        </div>
    );
};

export default ProductPage;
