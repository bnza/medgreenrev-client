const generatePassword = (length = 10) => {
  const shuffleArray = <T>(array: Array<T>): Array<T> => {
    const _array = [...array]
    for (let i = _array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = _array[i]
      _array[i] = _array[j]
      _array[j] = temp
    }
    return _array
  }

  const randomIndex = (array: Array<any> | string) =>
    Math.floor(Math.random() * array.length)

  const randomItem = (indexed: Array<string> | string) => {
    const rIndex = randomIndex(indexed)
    return Array.isArray(indexed) ? indexed[rIndex] : indexed.charAt(rIndex)
  }

  length = length < 8 ? 8 : length
  const digits = '0123456789'
  const uppercases = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowercases = 'abcdefghijklmnopqrstuvwxyz'
  const nonWords = '!@#$%^&*()'

  const types = [digits, uppercases, lowercases, nonWords]

  const randomChar = (typeIndex: number) => randomItem(types[typeIndex])

  const generateRandomTypeIndexes = () => {
    const typeIndexes: number[] = []

    for (let i = 0; i < length - types.length; i++) {
      typeIndexes.push(randomIndex(types))
    }

    for (let i = 0; i < types.length; i++) {
      typeIndexes.push(i)
    }

    return shuffleArray(typeIndexes)
  }

  return generateRandomTypeIndexes().map(randomChar).join('')
}

export default generatePassword
