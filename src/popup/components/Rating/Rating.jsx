import style from './Rating.module.scss';

export default function Rating({ rating }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars > 0 ? 1 : 0;
  const emptyStars = 5 - (fullStars + halfStar);

  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(<span className={`material-icons ${style.star}`}>star_rate</span>);
  }
  if (halfStar) {
    stars.push(<span className={`material-icons ${style.star}`}>star_half</span>);
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<span className={`material-icons ${style.star}`}>star_border</span>);
  }

  return <div className={style.rating}>{stars}</div>;
}
