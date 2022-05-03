const fetchProducts = (produto) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${produto}`;

  if (!produto) throw new Error('You must provide an url');

    return fetch(url)
    .then((response) => response.json())
    .then((result) => result);
}; 

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
