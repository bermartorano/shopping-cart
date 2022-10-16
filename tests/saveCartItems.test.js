const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('Com o argumento "cartItem", localStorage.setItem é chamado.', () => {
    saveCartItems('cartItem');
    expect(localStorage.setItem).toHaveBeenCalled();
  })
});
