const abbreviator = (phrase) => {
  return phrase
    .trim()
    .split(' ')
    .filter(word => word.length > 0)
    .reduce((y, x) => y + x.charAt(0).toUpperCase(), '');
}

const capitalizeInitials = (phrase) => {
  return phrase
    .trim()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.toLowerCase().substring(1))
    .join(' ');
}

export {
  abbreviator,
  capitalizeInitials,
}