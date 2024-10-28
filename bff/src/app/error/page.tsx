// import { useRouter } from "next/router";

export default function ErrorPage() {
  // const router = useRouter();
  const error = '';//router.query; // Lấy thông báo lỗi từ query

  return (
    <div>
      <h1>Error</h1>
      <p>{error || "An unknown error occurred."}</p>
    </div>
  );
}