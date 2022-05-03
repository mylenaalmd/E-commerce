const fetchItem = (id) => {
  // seu código aqui
  const url = `https://api.mercadolibre.com/items/${id}`;

  if (!id) throw new Error('You must provide an url');

  return fetch(url)
  .then((response) => response.json())
  .then((result) => result);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
