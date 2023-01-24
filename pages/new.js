import React from 'react';
import Head from 'next/head';
import MemberForm from '../components/Form';

export default function NewMember() {
  return (
    <>
      <Head>
        <title>Quidditch Keeper</title>
      </Head>
      <MemberForm />
    </>
  );
}
