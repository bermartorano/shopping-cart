// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 
// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
*/

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */

 const sectionItems = document.getElementsByClassName('items')[0];
 const cart = document.querySelector('.cart__items');
 const totalToPay = document.querySelector('#total-price');
 
 const createProductImageElement = (imageSource) => {
   const img = document.createElement('img');
   img.className = 'item__image';
   img.src = imageSource;
   return img;
 };

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */

const createProductItemElement = (object) => {
  const section = document.createElement('section');
  section.className = 'item';
  const newButton = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');

  section.appendChild(createCustomElement('span', 'item_id', object.id));
  section.appendChild(createCustomElement('span', 'item__title', object.title));
  section.appendChild(createProductImageElement(object.thumbnail));
  section.appendChild(newButton);

  return section;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
const getIdFromProductItem = (product) => product.querySelector('span.id').innerText;

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */

function removeItemFromCart(event) {
  event.target.parentElement.removeChild(event.target);
}

function getItemIdFromCart(param) {
  const itemDescription = param.innerText;
  const itemId = itemDescription.split(' ', 2)[1];
  return itemId;
}

function removeItemFromLS(event) {
  const itemId = getItemIdFromCart(event.target);
  const LSinfo = getSavedCartItems();
  if (LSinfo.some((value) => value.id === itemId)) {
    const itemToRemove = LSinfo.find((value) => value.id === itemId);
    const index = LSinfo.indexOf(itemToRemove);
    LSinfo.splice(index, 1);
    saveCartItems(LSinfo);
  }
}

function totalPriceCalculator() {
  const localStorageArray = getSavedCartItems();
  const soma = localStorageArray.reduce((acc, cur) => acc + cur.price, 0);
  console.log('A soma dos preços é: ', soma);
  totalToPay.innerText = `O total a pagar é: R$ ${soma}`;
}

const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', removeItemFromCart);
  li.addEventListener('click', removeItemFromLS);
  li.addEventListener('click', totalPriceCalculator);
  return li;
};

const getProductInfo = async (param) => {
  const itemId = param.parentElement.children[0].innerText;
  const itemInfo = await fetchItem(itemId);
  return itemInfo;
};

const addItemToCart = async (event) => {
  const itemInfoRequest = await getProductInfo(event.target);
  const cartItem = createCartItemElement(itemInfoRequest);
  cart.appendChild(cartItem);
};

const addItemToLocalStorage = async (event) => {
  const itemInfoRequest = await getProductInfo(event.target);
  if (localStorage.getItem('cartItems') === null) {
    const localSVector = [];
    localSVector.push(itemInfoRequest);
    saveCartItems(localSVector);
    totalPriceCalculator();
  } else {
    const localSVector = JSON.parse(localStorage.getItem('cartItems'));
    localSVector.push(itemInfoRequest);
    saveCartItems(localSVector);
    totalPriceCalculator();
  }
};

function populateItemCartFromLs() {
  const LSinfo = getSavedCartItems();
  if (LSinfo !== null && LSinfo.length > 0) {
    LSinfo.forEach((value) => {
      const cartItem = createCartItemElement(value);
      cart.appendChild(cartItem);
    });
  }
}

window.onload = () => {
  fetchProducts('computador')
    .then(({ results }) => {
      results.forEach((value) => {
        const itemCriado = createProductItemElement(value);
        sectionItems.appendChild(itemCriado);
      });
    })
    .then(() => {
      const sectionButttons = document.querySelectorAll('.item__add');
      sectionButttons.forEach((value) => {
        value.addEventListener('click', addItemToCart);
        value.addEventListener('click', addItemToLocalStorage);
      });
    })
    .then(() => populateItemCartFromLs());
};