const fetchProducts = async (product) => {
  if (product === undefined) {
    throw new Error('You must provide an url');
  }
  try {
    const request = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`);
    const result = await request.json();
    return result;
  } catch (error) {
    // console.log('Error: ', error);
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
