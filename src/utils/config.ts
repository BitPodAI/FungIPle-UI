export const isWeb = (): Boolean => {
  return import.meta.env.VITE_MODE_WEB === '1'
}