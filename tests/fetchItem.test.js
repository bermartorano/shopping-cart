require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Testa se a função é de fato uma função.', () => {
    expect(typeof fetchItem).toBe('function');
  })
  it('Com o argumento a função fetchItem chama a fetch.', async () => {
    await fetchItem('MLB1615760527');
    expect(global.fetch).toHaveBeenCalled();
  })
  it('Com o argumento, a função fetchItem faz com que a fetch utiliza o endpoinst correto', async () => {
    await fetchItem('MLB1615760527');
    const correctUrl = 'https://api.mercadolibre.com/items/MLB1615760527';
    expect(global.fetch).toHaveBeenCalledWith(correctUrl);
  })
  it('Com o argumento, fetchProducts retorna o objeto correto.', async () => {
    await expect(fetchItem('MLB1615760527')).resolves.toEqual(item);
  })
  it('Sem parâmetros, a função deve lançar um erro.', async () => {
    await expect(fetchItem()).rejects.toThrow('You must provide an url');
  })
});
