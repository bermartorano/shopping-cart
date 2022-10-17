const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('A função chama o método getItem.', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  })
});
