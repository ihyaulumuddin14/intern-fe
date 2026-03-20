import { ReadonlyURLSearchParams } from "next/navigation";

export const getSafeCallback = (searchParams: ReadonlyURLSearchParams) => {
  const url = searchParams.get('callbackUrl');
  
  if (!url || url.startsWith('http')) return '/';
  
  return url;
};