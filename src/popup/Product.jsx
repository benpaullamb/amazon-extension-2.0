import { useMemo } from 'react';
import style from './Product.module.scss';
import numeral from 'numeral';
import Rating from './Rating';

export default function Product({ name, bestSeller, link, image, rating, ratingCount, price, prime }) {
  const truncatedName = useMemo(() => {
    const maxLength = 100;
    if (name.length > maxLength) {
      return `${name.slice(0, maxLength)}...`;
    }
    return name;
  }, [name]);

  const formattedPrice = useMemo(() => `£${numeral(price).format('0,0.00')}`, [price]);

  const formattedRatingCount = useMemo(() => {
    return numeral(ratingCount).format('0,0');
  }, [ratingCount]);

  return (
    <a href={link} target="_blank" className={style.product}>
      <div style={{ backgroundImage: `url("${image}")` }} className={style.image} />

      <div className={style.tags}>
        {bestSeller && <span className={style.bestSeller}>Best Seller</span>}
        {prime && <i className={style.prime} />}
      </div>

      <span className={style.price}>{formattedPrice}</span>

      {ratingCount === 0 && <span className={style.noRating}>No ratings</span>}
      {ratingCount > 0 && (
        <div className={style.rating}>
          <Rating rating={rating} />
          <span className={style.ratingCount}>{formattedRatingCount}</span>
        </div>
      )}

      <span className={style.name}>{truncatedName}</span>
    </a>
  );
}
