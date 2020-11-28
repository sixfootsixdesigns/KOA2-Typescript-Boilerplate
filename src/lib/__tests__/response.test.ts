import { buildResponseBody } from '../response';

describe('response', () => {
  it('should have correct properties when not sending status', () => {
    const data = {
      name: 'foo',
    };

    const resp = buildResponseBody(data);

    expect(resp).toEqual({
      name: 'foo',
    });
  });

  it('should have correct properties when sending status', () => {
    const data = {
      name: 'foo',
    };

    const resp = buildResponseBody(data);

    expect(resp).toEqual({
      name: 'foo',
    });
  });
});
