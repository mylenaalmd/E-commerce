const saveCartItems = (salvos) => {
  const itemsSalvos = salvos;
  localStorage.setItem('cartItems', itemsSalvos);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
