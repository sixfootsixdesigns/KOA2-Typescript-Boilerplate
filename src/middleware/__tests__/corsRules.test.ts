import { isAllowedCorsOrigin, corsRules } from '../corsRules';
import { Config } from '../../config';

describe('corsRules', () => {
  describe('isAllowedCorsOrigin', () => {
    it('it returns correct results', () => {
      const spy = jest.spyOn(Config, 'allowedOrigins').mockReturnValue(['yep', 'this ', '']);
      expect(isAllowedCorsOrigin('yep')).toEqual(true);
      expect(isAllowedCorsOrigin('this')).toEqual(true);
      expect(isAllowedCorsOrigin('')).toEqual(false);
      expect(isAllowedCorsOrigin('nope')).toEqual(false);
      expect(isAllowedCorsOrigin(undefined)).toEqual(true);
      spy.mockRestore();
    });

    describe('dymanic origins', () => {
      it('it returns correct results', async () => {
        const spy = jest
          .spyOn(Config, 'dynamicOrigins')
          .mockReturnValue([/^https:\/\/[a-zA-Z-]*.mysite.com$/]);
        expect(isAllowedCorsOrigin('https://www.mysite.com')).toEqual(true);
        expect(isAllowedCorsOrigin('https://sub.mysite.com')).toEqual(true);
        expect(isAllowedCorsOrigin('https://sub-domain.mysite.com')).toEqual(true);
        expect(isAllowedCorsOrigin('http://sub.mysite.com')).toEqual(false);
        expect(isAllowedCorsOrigin('http://www.mysite.com')).toEqual(false);
        expect(isAllowedCorsOrigin('https://mysite.com')).toEqual(false);
        spy.mockRestore();
      });
    });
  });

  describe('corsRules', () => {
    it('returns *', () => {
      const spy = jest.spyOn(Config, 'allowedOrigins').mockReturnValue(['yep']);
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
      const spy = jest.spyOn(Config, 'allowedOrigins').mockReturnValue(['yep']);
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
