import style from './App.module.scss';

export default function App() {
  return (
    <div className={style.container}>
      <div className={style.page}>
        <h1 className={style.title}>Privacy Policy</h1>
        <h2 className={style.subtitle}>Lamb AMZN Search Helper</h2>

        <p className={style.text}>
          This extension collects product information from an Amazon search results page by scraping the content from
          the website you are on when you open the extensions popup.
        </p>
        <p className={style.text}>
          The product information is then used to display a list that can be searched/filtered/sorted in the popup.
        </p>
        <p className={style.text}>
          No information is shared or stored. As soon as the popup closes the information is discarded.
        </p>
      </div>
    </div>
  );
}
