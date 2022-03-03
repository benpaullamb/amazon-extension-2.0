import { useEffect, useState } from 'react';
import style from './App.module.scss';
import Product from './Product';

export default function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      const tabId = tabs[0].id;

      chrome.tabs.sendMessage(tabId, 'get_products', (res) => {
        setProducts(res);
      });
    };
    getProducts();
  }, []);

  return (
    <div className={style.container}>
      <h1 className={style.title}>Amazon Extension v2.0</h1>
      <div className={style.products}>
        {products.map((product) => (
          <Product {...product} />
        ))}
      </div>
    </div>
  );
}
