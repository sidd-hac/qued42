"use client"




import { decreseQuantity, increseQuantity, removeFromCart } from "@/store/cartSlice"
import { Product } from "@/utils/apis"
import { Trash2, X } from "lucide-react"
import Image from "next/image"
import { useDispatch } from "react-redux"



interface CartItem extends Product {
    quantity: number;
}


const CartItem = ({ product }: { product: CartItem }) => {



    const dispatch = useDispatch();

    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(product.id));
    };

    const handleIncrement = () => {
        dispatch(increseQuantity(product.id));
    };

    const handleDecrement = () => {
        dispatch(decreseQuantity(product.id));
    };

    return (
        <div className="space-y-3 py-2 ">
            <div className="flex justify-between items-start gap-4 bg-slate-200 p-2 rounded-lg">
                <div className="flex w-full items-center space-x-4">
                    <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
                        <Image src={product.image} alt={product.title} fill className="absolute object-contain" />
                    </div>
                    <div className="flex flex-col self-start">
                        <span className="line-clamp-1 text-sm font-medium mb-1">
                            {product.title}
                        </span>


                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                className="px-2 py-1 bg-gray-300 rounded-md hover:bg-gray-400"
                                onClick={handleDecrement}
                                disabled={product.quantity <= 1}
                            >
                                -
                            </button>
                            <span>{product.quantity}</span>
                            <button
                                type="button"
                                className="px-2 py-1 bg-gray-300 rounded-md hover:bg-gray-400"
                                onClick={handleIncrement}
                            >
                                +
                            </button>
                        </div>
                    </div>


                </div>
                <div className="flex flex-col justify-between items-center h-full space-y-1 font-medium">
                    <span className="ml-auto line-clamp-1 text-sm">
                        {product.price}

                    </span>
                    <span className="flex justify-center items-center" >
                        <X className="w-3 h-3" />
                        {product.quantity}
                    </span>
                    <div className="  mt-4 text-xs text-muted-foreground ">
                        <button
                            type="button"
                            className="flex items-center gap-1"
                            onClick={handleRemoveFromCart}
                        >

                            <Trash2 className="w-4 h-4" />
                        </button>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default CartItem