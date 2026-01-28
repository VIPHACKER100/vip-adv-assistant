import utils from '../js/utils.js';

describe('utils.js', () => {
  test('generateId should return a string with prefix', () => {
    const id = utils.generateId('user');
    expect(id).toMatch(/^user_/);
  });

  test('formatDate should return a formatted string', () => {
    const date = new Date(2023, 0, 1, 12, 0, 0);
    const formatted = utils.formatDate(date);
    expect(formatted).toBe('12:00:00');
  });

  test('delay should resolve after specified time', async () => {
    const start = Date.now();
    await utils.delay(100);
    const duration = Date.now() - start;
    expect(duration).toBeGreaterThanOrEqual(100);
  });

  test('clone should create a deep copy', () => {
    const obj = { a: 1, b: { c: 2 } };
    const copied = utils.clone(obj);
    expect(copied).toEqual(obj);
    expect(copied).not.toBe(obj);
    expect(copied.b).not.toBe(obj.b);
  });
});
