export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    img.src = src
    img.onload = () => resolve()
    img.onerror = reject
  })
}
