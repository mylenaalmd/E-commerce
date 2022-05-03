const buttonCar = document.querySelector('.empty-cart');
const carrinho = document.querySelector('.cart');
const ol = document.querySelector('.cart__items');
const sections = document.createElement('section');
const totalPrice = document.createElement('section');
totalPrice.className = 'total-price';
sections.appendChild(totalPrice);
carrinho.appendChild(sections);

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

let total = 0;
const savedItens = () => {
  saveCartItems(ol.innerHTML);
  localStorage.setItem('totalPrice', total);
};

const somTotal = async (sku) => {
  const productValue = await fetchItem(sku);
  const { price } = productValue;
  const preço = price;
  total += preço;
  
  totalPrice.innerText = `${parseFloat(total)}`;
  savedItens();
};

const clearCar = () => {
  buttonCar.addEventListener('click', () => {
    ol.innerHTML = '';
    totalPrice.innerText = `${parseFloat(total = 0)}`;
    savedItens();
  });
};

const subTotal = async (event) => {
  const item = event.target.innerText;
  const { price } = await fetchItem(item.split(' ')[1]);
    total -= price;
    totalPrice.innerText = total;
  };

function cartItemClickListener(event) {
  console.log(event.target);
  subTotal(event);
  event.target.remove();
  savedItens();
}

const savedPag = () => {
  const saved = getSavedCartItems();
  ol.innerHTML = saved;
  clearCar();
  const lii = document.querySelectorAll('.cart__item');
  lii.forEach((item) => item.addEventListener('click', cartItemClickListener));
  if (localStorage.getItem('totalPrice')) {
  total = parseFloat(localStorage.getItem('totalPrice'));
  }
  totalPrice.innerText = total;
};

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const addItem = async (product) => {
  const item = product.target.parentNode.firstChild.innerText;
  // const item = 'MLB1341925291';
  // const { id } = await fetchItem(item.split(' ')[1]);
  const addProduct = await fetchItem(item);
  const add = createCartItemElement({
    sku: addProduct.id,
    name: addProduct.title,
    salePrice: addProduct.price,
  });
  ol.appendChild(add);
  somTotal(addProduct.id);
  savedItens();
};

const itemsId = () => {
  const button = document.querySelectorAll('.item__add');
  button.forEach((item) => item.addEventListener('click', addItem));
};

const addList = async (produto) => {
  const listProduct = await fetchProducts(produto);
  const creatSection = document.querySelector('.items');
  listProduct.results.forEach((item) => {
    const obj = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const add = createProductItemElement(obj);
    creatSection.appendChild(add);
  });
  itemsId();
};

window.onload = () => { 
  addList('computador');
  savedPag();
};