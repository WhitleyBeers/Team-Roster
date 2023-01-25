import React from 'react';
import Head from 'next/head';
import MemberForm from '../../components/Forms/MemberForm';

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
