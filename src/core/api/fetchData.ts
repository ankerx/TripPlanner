export const KEY = "gfWzZOqGZJ_sGQ-L-zHN_9CrpD3D6rGn1v65eQW_CPg";

export const localization = (
  street: string,
  number?: string,
  city?: string
) => {
  return `https://geocode.search.hereapi.com/v1/geocode?q=${street}+${number}+${city}&apiKey=${KEY}`;
};

export const route = (start: string, destination: string) => {
  return `https://router.hereapi.com/v8/routes?transportMode=car&origin=${start}&destination=${destination}&return=summary`;
};
