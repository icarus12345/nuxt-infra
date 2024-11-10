"use client"
import React from 'react';
import Link from 'next/link'
import { Button, Container, Flex } from '@radix-ui/themes';
import * as CRUD from '@ui/components/crud';
import { CommentAdapter, MemberAdapter, PermissionAdapter, PostAdapter, RoleAdapter } from '@/ui/adapter';

export default function Home() {

  return (
    <Container className='min-h-dvh rt-Page' align="center">
      <Link href="/login">Dashboard</Link>
      <CRUD.Table adapter={MemberAdapter} />
      <CRUD.Table adapter={RoleAdapter} />
      <CRUD.Table adapter={PermissionAdapter} />
      {/* <CRUD.Table adapter={PostAdapter} /> */}
      {/* <CRUD.Table adapter={CommentAdapter} /> */}
    </Container>
  );
}
