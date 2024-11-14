import React, { useState, useEffect, useRef } from "react";

const InfiniteScrollIntersectionObserver = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef(); // Ref for the intersection observer

  // Function to fetch products with pagination
  const fetchProducts = async (page) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://dummyjson.com/products?limit=10&skip=${page * 10}`
      );
      const data = await res.json();
      setProducts((prevProducts) => [...prevProducts, ...data.products]);
      setHasMore(data.products.length > 0); // Check if more products exist
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  // Initial data fetch
  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  // Intersection Observer setup
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loading) {
        setPage((prevPage) => prevPage + 1); // Load next page when in view
      }
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    // Clean up observer when component unmounts
    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loading, hasMore]);

  return (
    <div>
      <h1>Infinite Scroll with Intersection Observer</h1>
      <div className="products">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
      {loading && <p>Loading more products...</p>}
      {!hasMore && <p>No more products to display.</p>}
      {/* This element is being observed */}
      <div ref={observerRef} style={{ height: "20px" }} />
    </div>
  );
};

export default InfiniteScrollIntersectionObserver;
