'use client';

import Image from 'next/image';
import { fetchProductById, Product } from '../../../utils/apis';
import { Star, ShoppingCart, ArrowLeft, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
import { Button } from '@/components/ui/button';
import { RootState } from '@/store/store';

const ProductDetailsPage = () => {
    const params = useParams();
    const id = params.id;

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');



    const dispatch = useDispatch();

    const handleAddToCart = () => {
      
        dispatch(addToCart(product as Product ));
    };

    const cartItems = useSelector((state: RootState) => state.cart.items);
    const existingItem = cartItems.find(item => item.id === product?.id);

    useEffect(() => {
        if (!id) return;

        const loadProduct = async () => {
            try {
                setLoading(true);
                const productData = await fetchProductById(id as string);
                setProduct(productData);
            } catch (err) {
                console.error(err);
                setError('Failed to load product details.');
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="text-center p-8 bg-white rounded-lg shadow-lg">
                    <p className="text-red-500 text-lg font-medium">{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (!product) return null;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-12">
                <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    <Link href="/">Back to Products</Link>
                </button>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                
                        <div className="flex justify-center items-center bg-gray-50 rounded-xl p-8">
                            <div className="relative w-full aspect-square">
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    className="object-contain hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        </div>

                        
                        <div className="flex flex-col justify-between">
                            <div>
                                <div className=" w-fit px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm mb-4">
                                    {product.category}
                                </div>
                                
                                <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.title}</h1>

                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                        <span className="ml-1 text-yellow-700 font-medium">
                                            {product.rating.rate}
                                        </span>
                                    </div>
                                    <span className="text-gray-500">
                                        {product.rating.count} reviews
                                    </span>
                                </div>

                                <p className="text-gray-600 leading-relaxed mb-8">
                                    {product.description}
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-3xl font-bold text-gray-900">
                                        ${product.price.toFixed(2)}
                                    </span>
                                    <span className="text-green-600 font-medium">In Stock</span>
                                </div>

                                <Button 
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 font-medium"
                                onClick={handleAddToCart}
                                
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    {existingItem ? "Added" : "Add to Cart"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;