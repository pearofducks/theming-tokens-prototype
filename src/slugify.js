const decamelize = string => {
  return string
    // Separate capitalized words.
    .replace(/([A-Z]{2,})(\d+)/g, '$1 $2')
    .replace(/([a-z\d]+)([A-Z]{2,})/g, '$1 $2')

    .replace(/([a-z\d])([A-Z])/g, '$1 $2')
    // `[a-rt-z]` matches all lowercase characters except `s`.
    // This avoids matching plural acronyms like `APIs`.
    .replace(/([A-Z]+)([A-Z][a-rt-z\d]+)/g, '$1 $2')
}

export default (string) => decamelize(string).toLowerCase().replace(/[^a-z\d_]+/g, '-')
