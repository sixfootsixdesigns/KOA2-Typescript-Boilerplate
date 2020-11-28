import { unauthorized } from '@hapi/boom';
import * as Koa from 'koa';
import { errorHandler } from '../errorHandler';
import { ValidationError } from 'class-validator';

describe('errorHandler', () => {
  it('handles EntityNotFound', async () => {
    const ctx: Koa.Context = {} as any;

    const next: Koa.Next = () => {
      const err = new Error('oh no');
      err.name = 'EntityNotFound';
      return Promise.reject(err);
    };

    await errorHandler(ctx, next);

    expect(ctx).toEqual({
      status: 404,
      body: {
        statusCode: 404,
        error: 'Not Found',
        message: 'Could not find object',
      },
    });
  });

  it('handles boom error', async () => {
    const ctx: Koa.Context = {} as any;

    const next: Koa.Next = () => {
      const err = unauthorized();
      return Promise.reject(err);
    };

    await errorHandler(ctx, next);

    expect(ctx).toEqual({
      body: {
        error: 'Unauthorized',
        message: 'Unauthorized',
        statusCode: 401,
      },
      status: 401,
    });
  });

  it('handles normal error', async () => {
    const ctx: Koa.Context = {} as any;

    const next: Koa.Next = () => {
      const err = new Error('sad');
      return Promise.reject(err);
    };

    await errorHandler(ctx, next);

    expect(ctx).toEqual({
      body: {
        error: 'Internal Server Error',
        message: 'An internal server error occurred',
        statusCode: 500,
      },
      status: 500,
    });
  });

  it('handles validation errors', async () => {
    const ctx: Koa.Context = {} as any;

    const next: Koa.Next = () => {
      const e1 = new ValidationError();
      e1.toString = () => 'Some Field';
      return Promise.reject(e1);
    };

    await errorHandler(ctx, next);

    expect(ctx).toEqual({
      body: {
        error: 'Unprocessable Entity',
        message: 'Some Field',
        statusCode: 422,
      },
      status: 422,
    });
  });

  it('handles array of errors', async () => {
    const ctx: Koa.Context = {} as any;

    const next: Koa.Next = () => {
      return Promise.reject([new Error('sad'), new Error('mad')]);
    };

    await errorHandler(ctx, next);

    expect(ctx).toEqual({
      body: {
        error: 'Internal Server Error',
        message: 'An internal server error occurred',
        statusCode: 500,
      },
      status: 500,
    });
  });

  it('handles array of validation errors', async () => {
    const ctx: Koa.Context = {} as any;

    const next: Koa.Next = () => {
      const e1 = new ValidationError();
      e1.toString = () => 'Some Field';
      const e2 = new ValidationError();
      e2.toString = () => 'Some Other Field';

      return Promise.reject([e1, e2]);
    };

    await errorHandler(ctx, next);

    expect(ctx).toEqual({
      body: {
        error: 'Unprocessable Entity',
        message: 'Some FieldSome Other Field',
        statusCode: 422,
      },
      status: 422,
    });
  });
});
