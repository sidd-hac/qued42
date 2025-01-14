"use client"

import Navbar from "@/components/Nav";
import ProductPage from "@/components/Products";

import { fetchCategories, fetchProducts, Product } from '@/utils/apis';
import { useEffect, useState } from 'react';


export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');


  useEffect(() => {

    setLoading(true);
    const loadProducts = async () => {

      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
        setFilteredProducts(productsData);

      } catch (err) {
        console.error(err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
        setError("")
      }
    };

    const loadCategories = async () => {
      try {
        const categories = await fetchCategories();
        setCategories(categories);
        setError('Failed to load data');
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
        setError("")
      }

    }

    loadProducts();
    loadCategories();
  }, []);


  useEffect(() => {
    let result = [...products];

   
    if (searchQuery) {
      result = result.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

   
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }

    
    if (sortBy) {
      switch (sortBy) {
        case 'price-low':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          result.sort((a, b) => b.rating.rate - a.rating.rate);
          break;
      }
    }

    setFilteredProducts(result);
  }, [products, searchQuery, selectedCategory, sortBy]);




  return (
    <div>

      <Navbar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}

      />
      <ProductPage
        filteredProducts={filteredProducts}
        loading={loading}
        error={error}
      />
    </div>
  );
}
