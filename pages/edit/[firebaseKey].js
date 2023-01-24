import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { getSingleMember } from '../../api/memberData';
import MemberForm from '../../components/Form';

export default function EditMember() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleMember(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>Edit {editItem.name}</title>
      </Head>
      <MemberForm obj={editItem} />
    </>
  );
}
