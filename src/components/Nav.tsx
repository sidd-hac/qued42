"use client"

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import CategorySort from "./CategorySort";
import PriceSort from "./PriceSort";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import CartItem from "./CartItem";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";


interface ProductFilterProps {
    categories: string[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    sortBy: string;
    onSortChange: (sort: string) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

const Navbar = ({
    categories,
    selectedCategory,
    onCategoryChange,
    sortBy,
    onSortChange,
    searchQuery,
    onSearchChange,
}: ProductFilterProps) => {


    const cartCount = useSelector((state: RootState) =>
        state.cart.items.reduce((total, item) => total + item.quantity, 0)
    );

    const cartTotal = useSelector((state: RootState) => {
        return state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
    })

    const cartItems = useSelector((state: RootState) => state.cart.items);
    const [isOpen, setIsOpen] = useState(false);
    // const [categoryOpen, setCategoryOpen] = useState(false);


    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gradient-to-r from-purple-600 to-pink-400 shadow-lg">
            <div className=" flex items-center justify-between lg:px-5 px-2 py-3">
                
                <div className="hidden lg:flex lg:text-3xl sm:text-2xl max-sm:xl font-semibold text-white tracking-wider mr-2">
                    <Link href="/">Shopsy</Link>
                </div>
                <div className="flex lg:hidden lg:text-3xl sm:text-2xl max-sm:xl font-semibold text-white tracking-wider mr-2">
                    <Image src="/logos.png" alt="logo" width={50} height={50} />

                </div>

               
                <div className="flex items-center w-1/2">
                    <input
                        type="text"
                        placeholder="Search for products..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full sm:px-6 sm:py-2 px-3 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-300 max-sm:placeholder:text-xs sm:placeholder:text-sm max-w-96"
                    />
                </div>

                
                <div className="hidden md:flex items-center gap-3">
                   
                    <CategorySort categories={categories} selectedCategory={selectedCategory} onCategoryChange={onCategoryChange} />

                    

                    <PriceSort sortBy={sortBy} onSortChange={onSortChange} />
                </div>

      
                <div className="flex items-center space-x-6">
                    <div className="  flex items-center">
                        <Sheet>
                            <SheetTrigger>
                                <ShoppingCart className="md:w-8 md:h-8 sm:w-8 sm:h-8 max-sm:w-5 max-sm:h-5 text-white" />
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>Cart ({cartItems.length})</SheetTitle>
                                    <SheetDescription>
                                        {cartCount ? (
                                            cartItems.map((item) => (

                                                <div key={item.id}  >
                                                    <ScrollArea>

                                                        <CartItem product={item} />

                                                    </ScrollArea>
                                                </div>
                                            ))

                                        ) : (
                                            <div className="h-full flex flex-col justify-center items-center space-y-2">
                                                <div className="relative flex h-52 w-52 text-muted-foreground " aria-hidden='true'>
                                                    <Image src='/hippo-empty-cart.png' alt="empty cart image" fill />
                                                </div>
                                                <div className="text-sm font-bold">
                                                    Your Cart is Empty
                                                </div>
                                            </div>
                                        )}

                                    </SheetDescription>
                                </SheetHeader>

                                <div className="space-y-2">

                                    {cartCount > 0 && <div className="flex flex-col gap-2">
                                        <Separator />
                                        <div className="flex">
                                            <span className="flex-1">Total</span>
                                            <span>${cartTotal.toFixed(2)}</span>
                                        </div>
                                    </div>}
                                </div>

                            </SheetContent>

                        </Sheet>

                        <span className="relative -top-2  right-2 w-4 h-4 text-white bg-blue-700 rounded-full flex justify-center items-center text-xs" >{cartItems.length}</span>
                    </div>
                    <Link href="/profile" className="hidden md:flex text-white hover:text-purple-200 transition duration-300 ease-in-out">

                        <Avatar className="md:w-8 md:h-8 sm:w-8 sm:h-8 max-sm:w-5 max-sm:h-5" >
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>

                    </Link>
                    <button
                        className="md:hidden text-white hover:text-purple-200 transition duration-300 ease-in-out"
                        onClick={toggleMenu}
                    >
                        ☰
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-white bg-opacity-90 border-t shadow-md">
                    <ul className="space-y-4 p-6">
                        <li>
                            <a
                                href="#"
                                className="block text-gray-800 hover:text-purple-600 font-medium transition duration-300 ease-in-out"
                            >
                                Shop
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block text-gray-800 hover:text-purple-600 font-medium transition duration-300 ease-in-out"
                            >
                                About
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block text-gray-800 hover:text-purple-600 font-medium transition duration-300 ease-in-out"
                            >
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
