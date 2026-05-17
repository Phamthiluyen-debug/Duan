export const convertPrice = (price) => {
  if (!price) return '30000 VNĐ'
  return `${price.toLocaleString()} VNĐ`
}

export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

export const renderOptions = (arr) => {
  return arr?.map(item => ({
    label:
      item === 'coffee' ? 'Cà phê' :
      item === 'tea' ? 'Trà' :
      item,
    value: item // 👈 giữ nguyên để gửi backend
  }))
}

export const getItem = (label, key, icon, children) => {
  return {
    key,
    icon,
    children,
    label,
  }
}
