export default {
  name(el) {
    return el.querySelector('h2 a span')?.textContent;
  },

  bestSeller(el) {
    const bestSellerEl = el.querySelector('a[href*="bestsellers"]');
    return bestSellerEl ? bestSellerEl.href : undefined;
  },

  amazonChoice(el) {
    const amazonChoiceEl = el.querySelector('span[aria-label="Amazon\'s Choice"]');
    return !!amazonChoiceEl;
  },

  link(el) {
    const linkEl = el.querySelector('[data-component-type="s-product-image"] a');
    return linkEl?.href;
  },

  image(el) {
    return el.querySelector('img')?.src || '';
  },

  rating(el) {
    let rating = 0;
    const ratingEl = el.querySelector('[aria-label$="out of 5 stars"]');
    if (ratingEl) {
      const ratingText = ratingEl.getAttribute('aria-label');
      const ratingMatch = ratingText.match(/(\d\.?\d?) out of 5 stars/i)[1];
      rating = Number(ratingMatch);
    }
    return rating;
  },

  ratingCount(el) {
    let ratingCount = 0;
    const ratingCountEl = el.querySelector('[aria-label$="out of 5 stars"] + [aria-label]');
    if (ratingCountEl) {
      const ratingCountText = ratingCountEl.getAttribute('aria-label').replace(',', '');
      ratingCount = Number(ratingCountText);
    }
    return ratingCount;
  },

  price(el) {
    let price = 0;
    const priceEl = el.querySelector('span.a-price > span.a-offscreen');
    if (priceEl) {
      const priceText = priceEl.textContent.match(/£(\d+\.?\d{0,2})/i)[1];
      price = Number(priceText);
    }
    return price;
  },

  prime(el) {
    const primeEl = el.querySelector('i[aria-label="Amazon Prime"]');
    return !!primeEl;
  },
};
