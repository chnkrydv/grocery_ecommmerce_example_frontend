const abbreviator = (phrase) => {
  return phrase.trim().split(' ').filter(word => word.length > 0).reduce((y, x) => y + x.charAt(0).toUpperCase(), '');
}

export {
  abbreviator,
}