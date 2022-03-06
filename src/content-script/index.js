import productAttributes from './product-attributes';

const getProducts = () => {
  const productElements = Array.from(document.querySelectorAll('[data-asin]:not([data-asin=""])'));

  return productElements
    .filter((productElement) => productElement.offsetParent !== null)
    .map((productElement) => {
      const product = {};

      Object.entries(productAttributes).forEach(([attribute, getAttribute]) => {
        product[attribute] = getAttribute(productElement);
      });

      return product;
    });
};

chrome.runtime.onMessage.addListener((req, sender, res) => {
  if (req === 'get_products') {
    const products = getProducts();
    console.log(products);
    res(products);
  }
});
