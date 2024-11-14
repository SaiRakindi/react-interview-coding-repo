import { useEffect, useRef, useState } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef();

  const fetchProducts = async () => {
    setIsLoading(true);

    try {
      const res = await fetch(
        `https://dummyjson.com/products?limit=10&skip=${page * 10}`
      );

      const data = await res.json();
      setProducts((prevProducts) => [...prevProducts, ...data.products]);
      setHasMore(data.products.length > 0);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];

      if (target.isIntersecting && !isLoading && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [isLoading, hasMore]);

  return (
    <div>
      <h1>Infinite Scrolling</h1>
      <div className="products">
        {products.map((product, index) => (
          <div key={index}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
      {isLoading && <p>Loading...</p>}
      {!hasMore && <p>No more products...</p>}
      <div ref={observerRef} style={{ height: "20px" }}></div>
    </div>
  );
}

export default App;
