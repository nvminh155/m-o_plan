
export const objToQueryParams = (obj: Record<string, any>) => {
  const queryParams = new URLSearchParams();

  Object.entries(obj).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams.append(key, value.toString());
    }
  });

  return queryParams.toString();
}