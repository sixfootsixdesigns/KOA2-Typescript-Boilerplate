export interface IJsonResponseBody {
  data: any;
}

export const jsonResponseBody = (data: any): IJsonResponseBody => {
  return {
    data
  };
};
