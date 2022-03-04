import style from './Toolbar.module.scss';
import Dropdown from './Dropdown';
import { useState, useEffect } from 'react';

export default function Toolbar({ products, setDisplayProducts }) {
  const [name, setName] = useState('');
  const [minRatings, setMinRatings] = useState(0);

  const sortOptions = ['Default', 'Ratings'];
  const [sort, setSort] = useState(sortOptions[0]);

  useEffect(() => {
    let displayProducts = [...products];

    if (name) {
      displayProducts = displayProducts.filter((product) => {
        const productName = product.name.toLowerCase();
        const searchName = name.toLowerCase();
        return productName.includes(searchName);
      });
    }

    if (minRatings) {
      displayProducts = displayProducts.filter((product) => {
        return product.ratingCount >= minRatings;
      });
    }

    if (sort === 'Ratings') {
      displayProducts.sort((a, b) => {
        if (a.ratingCount > b.ratingCount) {
          return -1;
        }
        if (a.ratingCount < b.ratingCount) {
          return 1;
        }
        return 0;
      });
    }

    setDisplayProducts(displayProducts);
  }, [name, minRatings, sort]);

  const openTopTen = () => {};

  const openBestSellers = () => {};

  return (
    <div className={style.toolbar}>
      <div className={style.topRow}>
        <div className={style.inputGroup}>
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            type="text"
            placeholder="Enter a name..."
          />
        </div>
        <div className={style.inputGroup}>
          <label>Minium Ratings</label>
          <input
            value={minRatings}
            onChange={(e) => setMinRatings(Number(e.currentTarget.value))}
            min={0}
            step={100}
            type="number"
          />
        </div>
      </div>

      <div className={style.bottomRow}>
        <div className={style.buttons}>
          <button onClick={openTopTen} className={style.button}>
            Open Top 10
          </button>
          <button onClick={openBestSellers} className={style.button}>
            Open Best Sellers
          </button>
        </div>

        <Dropdown options={sortOptions} value={sort} onChange={(option) => setSort(option)} />
      </div>
    </div>
  );
}
