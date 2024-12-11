export default function (bytes: number): string {
  if (bytes === 0) return "0 B";

  const sizes = ["B", "KB", "MB", "GB", "TB", "PB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024)); // Xác định cấp độ (KB, MB,...)
  const formatted = (bytes / Math.pow(1024, i)).toFixed(2); // Chia cho 1024^i và làm tròn 2 chữ số thập phân

  return `${formatted} ${sizes[i]}`;
}