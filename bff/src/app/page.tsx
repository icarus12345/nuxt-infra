"use client"
import React from 'react';
import Link from 'next/link'
import { Button, Container, Flex } from '@radix-ui/themes';
import * as CRUD from '@presentation/components/crud';
import { useDialog } from '@presentation/composables/useDialog';
import { useToast } from '@presentation/composables/useToast';
import { MdErrorOutline } from 'react-icons/md';

export default function Home() {
  const dialog = useDialog();
  const toast = useToast();

  return (
    <Container className='min-h-dvh rt-Page' align="center">
      <Link href="/login">Dashboard</Link>
      <CRUD.Table />
    </Container>
  );
}
