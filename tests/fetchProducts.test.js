require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Testa se a função é de fato uma função.', () => {
    expect(typeof fetchProducts).toBe('function');
  })
  it('Com o argumento computador a função fetchProducts chama a fetch.', async () => {
    await fetchProducts('computador');
    expect(global.fetch).toHaveBeenCalled();
  })
  it('Com o argumento computador, a função fetchProducts faz com que a fetch utiliza o endpoinst correto', async () => {
    await fetchProducts('computador');
    const correctUrl = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(global.fetch).toHaveBeenCalledWith(correctUrl);
  })
  it('Com o argumento "computador", fetchProducts retorna o objeto correto.', async () => {
    await expect(fetchProducts('computador')).resolves.toEqual(computadorSearch);
  })
  it('Sem parâmetros, a função deve lançar um erro.', async () => {
    await expect(fetchProducts()).rejects.toThrow('You must provide an url');
  })
});
