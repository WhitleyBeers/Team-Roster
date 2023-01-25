import Head from 'next/head';
import React from 'react';
import TeamForm from '../components/Forms/TeamForm';

export default function NewTeam() {
  return (
    <>
      <Head>
        <title>Quidditch Keeper</title>
      </Head>
      <TeamForm />
    </>
  );
}
