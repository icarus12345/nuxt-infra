export default function (value: any, format?: string): string {
  if (value === '' || value === undefined) return ''
  if (!format) {
    return value
  }
  // Nếu giá trị là số
  if (!isNaN(value)) {
    const match = format.match(/([a-zA-Z]+)(\d*)/);
    if (!match) return value.toString();

    const [_, formatType, precision] = match;
    const decimals = precision ? parseInt(precision, 10) : 2; // Mặc định 2 chữ số thập phân

    switch (formatType) {
      case "d": // Decimal numbers (không có số thập phân)
        return Math.round(value).toString();
      case "f": // Floating-point numbers
        return value.toFixed(decimals);
      case "n": // Integer numbers
        return Math.round(value).toLocaleString();
      case "c": // Currency
        return `$${value.toFixed(decimals)}`;
      case "p": // Percentage
        return `${(value * 100).toFixed(decimals)}%`;
      default:
        return value.toString();
    }
  }
  if (!isNaN(Date.parse(value))) {
    const date = new Date(value)
    switch (format) {
      case "d":
        return date.toLocaleDateString("en-US");
      case "D":
        return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
      case "t":
        return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
      case "T":
        return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      case "f":
        return `${date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })} ${date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`;
      case "F":
        return date.toLocaleString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" });
      case "M":
        return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
      case "Y":
        return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
      case "S":
        return date.toISOString();
      default:
        return date.toLocaleString();
    }
  }
  return ''
}