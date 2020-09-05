import * as bcrypt from 'bcryptjs';
import { BcryptAdapter } from './bcrypt.adapter';

describe('BcryptAdapter', () => {
  let bcryptAdapter: BcryptAdapter;

  beforeEach(() => {
    bcryptAdapter = new BcryptAdapter();
  });

  describe('hash', () => {
    it('should return a valid hash on hash success', async () => {
      const result = 'hash';
      jest.spyOn(bcrypt, 'hash').mockImplementation(async () => result);

      expect(await bcryptAdapter.hash('any_value')).toBe(result);
    });
  });

  describe('compare', () => {
    it('should return true when compare succeeds', async () => {
      const result = true;
      jest.spyOn(bcrypt, 'compare').mockImplementation(async () => result);

      expect(await bcryptAdapter.compare('any_value', 'any_hash')).toBe(result);
    });

    it('should return false when compare fails', async () => {
      const result = false;
      jest.spyOn(bcrypt, 'compare').mockImplementation(async () => result);

      expect(await bcryptAdapter.compare('any_value', 'any_hash')).toBe(result);
    });
  });
});
