import React from 'react';
import Link from 'next/link'
import { Button, Container, Flex } from '@radix-ui/themes';
import * as CRUD from '@/ui/Common/components/crud';

export default function Home() {
  return (
    <Container className='min-h-dvh' align="center">
      <Link href="/login">Dashboard</Link>
      <Flex gap="3">
        <Button color="indigo" variant="soft" size="1">
          Edit profile
        </Button>
        <Button color="cyan" variant="soft">
          Edit profile
        </Button>
        <Button color="orange" variant="soft">
          Edit profile
        </Button>
        <Button color="crimson" variant="soft">
          Edit profile
        </Button>
      </Flex>
      <CRUD.Table />
    </Container>
  );
}
