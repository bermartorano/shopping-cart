const fetchProducts = async () => {
  const bernardo = await fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  const resposta = await bernardo.json();
  return resposta;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
