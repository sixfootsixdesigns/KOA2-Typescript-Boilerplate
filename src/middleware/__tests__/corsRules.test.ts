import { isAllowedCorsOrigin, corsRules } from '../corsRules';
import { Environment } from '../../lib/environment';

describe('corsRules', () => {
  describe('corsRules', () => {
    it('it works', () => {
      const spy = jest
        .spyOn(Environment, 'getAdditionalOrigins')
        .mockReturnValue(['yep', 'this ', '']);
      expect(isAllowedCorsOrigin('yep')).toEqual(true);
      expect(isAllowedCorsOrigin('this')).toEqual(true);
      expect(isAllowedCorsOrigin('')).toEqual(false);
      expect(isAllowedCorsOrigin('nope')).toEqual(false);
      expect(isAllowedCorsOrigin(undefined)).toEqual(true);
      spy.mockRestore();
    });
  });

  describe('corsRules', () => {
    it('returns *', () => {
      const spy = jest.spyOn(Environment, 'getAdditionalOrigins').mockReturnValue(['yep']);
      const origin: any = corsRules.origin;
      const ctx: any = {
        get: (str: string) => {
          return 'yep';
        },
      };
      expect(origin(ctx)).toEqual('*');
      spy.mockRestore();
    });

    it('throws', () => {
      const spy = jest.spyOn(Environment, 'getAdditionalOrigins').mockReturnValue(['yep']);
      const origin: any = corsRules.origin;
      const ctx: any = {
        get: (str: string) => {
          return 'nope';
        },
      };
      expect(() => origin(ctx)).toThrowError('Cross-Origin Request Blocked');
      spy.mockRestore();
    });
  });
});
