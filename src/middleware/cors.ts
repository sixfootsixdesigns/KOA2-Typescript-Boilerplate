const isAllowedCorsOrigin = (origin: string) => {
  // origins using regex
  const dynamicOrigins: RegExp[] = [];

  // add additional static origin here
  const allowedOrigins: string[] = [];

  const isAllowedDomain = dynamicOrigins.some(
    domain => origin.match(domain) !== null
  );

  if (isAllowedDomain || allowedOrigins.includes(origin)) {
    return true;
  }

  return false;
};

export const corsRules = req => {
  if (isAllowedCorsOrigin(req.headers.origin)) {
    return req.headers.origin;
  }
  return false;
};
