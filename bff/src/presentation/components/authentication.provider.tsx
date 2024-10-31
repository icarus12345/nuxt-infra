'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/compat/router';
// import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const AuthenticationProvider = ({ children }: Props) => {
  const router = useRouter();
  const isAuthenticated = () => {

    // Bạn có thể kiểm tra token trong localStorage hoặc cookie
    const token = localStorage.getItem('token'); 
    // Ví dụ token lưu trữ ở localStorage
    return !!token; // Trả về true nếu có token
  };
  useEffect(() => {
    // Kiểm tra xác thực
    if (!isAuthenticated()) {
      // Nếu không xác thực, redirect về trang đăng nhập
      if (router) {
        console.log(router);
        
        router.push('/login');
      }
    }
  }, []);
  return <>
  {children}
  </>;
};
