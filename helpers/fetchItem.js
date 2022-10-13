const fetchItem = async (itemFound) => {
  if (itemFound === undefined) {
    throw new Error('You must provide an url');
  }
  try {
    const request = await fetch(`https://api.mercadolibre.com/items/${itemFound}`);
    const result = await request.json();
    return result;
  } catch (error) {
    // captura o erro!!!
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
