'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../utils/apis';
import { Star, ShoppingCart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
import { RootState } from '@/store/store';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const existingItem = cartItems.find(item => item.id === product?.id);


  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden transform hover:-translate-y-1 duration-200">
      <Link href={`/product/${product.id}`}>
        <div className="relative h-60 w-full group">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-800 truncate hover:text-blue-600 transition-colors">
            {product.title}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 mt-1">{product.category}</p>
        <div className="flex items-center mt-2">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm text-gray-600 ml-1">
            {product.rating.rate} ({product.rating.count})
          </span>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-5 h-5" />
           {existingItem ? "Added" :  "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
