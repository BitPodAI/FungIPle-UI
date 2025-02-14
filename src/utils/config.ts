export const isWeb = (): boolean => {
  return import.meta.env.VITE_MODE_WEB === '1'
}