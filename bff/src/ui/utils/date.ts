export const DateFormat = (str: string) => {
  const date = new Date(str);
  // Kiểm tra nếu ngày hợp lệ
  if (isNaN(date.getTime())) {
    return ''; // Nếu không hợp lệ, trả về chuỗi rỗng
  }
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  }).format(date)
}