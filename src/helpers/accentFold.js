const accentMap = {
    á: 'a', ã: 'a', â: 'a', ç: 'c', é: 'e', ê: 'e', í: 'i', ó: 'o', õ: 'o', ô: 'o', ú: 'u'
  };
  
  const accentFold = (s) => {
    if (!s) { return ''; }
    let ret = '';
    for (let i = 0; i < s.length; i += 1) {
      ret += accentMap[s.charAt(i)] || s.charAt(i);
    }
    return ret;
  };
  
  export default accentFold;