function useCache() {
  const setCache = (key: string, data: string) => {
    localStorage.setItem(key, JSON.stringify(data))
  }

  const getCacheData = (token: string) => {
    const ISSERVER = typeof window === 'undefined'

    if (!ISSERVER) {
      const data: string | null = localStorage.getItem(token)
      return data
    }
  }

  return {
    getCacheData,
    setCache
  }
}

export default useCache
