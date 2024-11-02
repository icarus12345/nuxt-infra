'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/compat/router'
// import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const AuthenticationProvider = ({ children }: Props) => {
  const router = useRouter();
  const isAuthenticated = () => {
    console.log('tokentokentokentoken')
    // Bạn có thể kiểm tra token trong localStorage hoặc cookie
    const token = localStorage.getItem('access_token'); 
    // Ví dụ token lưu trữ ở localStorage
    console.log('useEffect:isAuthenticated', token, router);
    return !!token; // Trả về true nếu có token
  };
  useEffect(() => {
    // Kiểm tra xác thực
    if (!isAuthenticated()) {
      // Nếu không xác thực, redirect về trang đăng nhập
      // if (router) {
      //   console.log(router,'routerrouterrouter');
        
      //   router.push('/login');
      // }
    }
  }, [router]);
  return <>
  {children}
  </>;
};
