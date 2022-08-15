/**
 * Adds '//' if the given url doesn't starts with href.  
 * @param url {string} the url
 * @returns {string} The url starting with '//'
 */
export const checkHref = (url : string) : string => {
  if (url.indexOf('//') > 0) {
    return url
  }
  return '//' + url;
}


export const truncateAddressString = (address: string, num = 12) => {
  if (!address) {
    return '';
  }
  const first = address.slice(0, num);
  const last = address.slice(-num);
  return `${first}...${last}`;
}