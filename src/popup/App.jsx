import { useEffect, useState } from 'react';
import style from './App.module.scss';
import Product from './components/Product';
import Toolbar from './components/Toolbar';

export default function App() {
  const [products, setProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      const tabId = tabs[0].id;

      chrome.tabs.sendMessage(tabId, 'get_products', (res = []) => {
        setProducts(res);
        setDisplayProducts(res);
      });
    };
    getProducts();
  }, []);

  return (
    <div className={style.container}>
      <h1 className={style.title}>Amazon Extension v2.0</h1>

      {products.length === 0 && (
        <h2 className={style.error}>Please search for a product on Amazon, then open this extension.</h2>
      )}

      {products.length > 0 && (
        <>
          <Toolbar products={products} setDisplayProducts={setDisplayProducts} />

          <span className={style.resultCount}>{displayProducts.length} product(s)</span>

          <div className={style.products}>
            {displayProducts.map((product) => (
              <Product {...product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
