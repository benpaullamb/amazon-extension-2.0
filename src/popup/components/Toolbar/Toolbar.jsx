import style from './Toolbar.module.scss';
import { useState, useEffect, useMemo } from 'react';
import Dropdown from '../Dropdown';
import Input from '../Input';
import Button from '../Button';

export default function Toolbar({ products, setDisplayProducts }) {
  const [name, setName] = useState('');
  const [minRatings, setMinRatings] = useState(0);

  const sortOptions = ['Default', 'Ratings'];
  const [sort, setSort] = useState(sortOptions[0]);

  const displayProducts = useMemo(() => {
    let output = [...products];

    if (name) {
      output = output.filter((product) => {
        const productName = product.name.toLowerCase();
        const searchName = name.toLowerCase();
        return productName.includes(searchName);
      });
    }

    if (minRatings) {
      output = output.filter((product) => {
        return product.ratingCount >= minRatings;
      });
    }

    if (sort === 'Ratings') {
      output.sort((a, b) => {
        if (a.ratingCount > b.ratingCount) {
          return -1;
        }
        if (a.ratingCount < b.ratingCount) {
          return 1;
        }
        return 0;
      });
    }

    return output;
  }, [products, name, minRatings, sort]);

  useEffect(() => {
    setDisplayProducts(displayProducts);
  }, [products, name, minRatings, sort]);

  const openTopTen = async () => {
    const topTen = displayProducts.slice(0, 10);

    openTabGroup(topTen.map(({ link }) => link));
  };

  const openBestSellers = () => {
    const bestSellerPages = displayProducts
      .filter(({ bestSeller }) => !!bestSeller)
      .map(({ bestSeller }) => bestSeller);

    openTabGroup(bestSellerPages, 'Best Sellers');
  };

  const openTabGroup = async (urls = [], title = 'Amazon', color = 'orange') => {
    const tabs = await Promise.all(
      urls.map((url) =>
        chrome.tabs.create({
          url,
          active: false,
        })
      )
    );

    const groupId = await chrome.tabs.group({
      tabIds: tabs.map(({ id }) => id),
    });

    chrome.tabGroups.update(groupId, {
      title,
      color,
    });
  };

  return (
    <div className={style.toolbar}>
      <div className={style.topRow}>
        <Input
          label="Name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          type="text"
          placeholder="Enter a name..."
        />
        <Input
          label="Minimum Ratings"
          value={minRatings}
          onChange={(e) => setMinRatings(Number(e.currentTarget.value))}
          min={0}
          step={100}
          type="number"
        />
      </div>

      <div className={style.bottomRow}>
        <div className={style.buttons}>
          <Button onClick={openTopTen} className={style.button}>
            Open Top 10
          </Button>
          <Button onClick={openBestSellers} className={style.button}>
            Open Best Sellers
          </Button>
        </div>

        <Dropdown options={sortOptions} value={sort} onChange={(option) => setSort(option)} />
      </div>
    </div>
  );
}
