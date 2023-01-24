/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getAllMembers } from '../api/memberData';
import MemberCard from '../components/MemberCards';

export default function TeamView() {
  const [members, setMembers] = useState([]);
  const { user } = useAuth();

  const getAllTheMembers = () => {
    getAllMembers(user.uid).then(setMembers);
  };

  useEffect(() => {
    getAllTheMembers();
  }, []);

  return (
    <div className="text-center my-4">
      <Head>
        <title>Quidditch Keeper</title>
      </Head>
      <h1>Team View</h1>
      <h5>Each quidditch team has at least three <span className="role-type">Chasers</span>, two <span className="role-type">Beaters</span>, one <span className="role-type">Keeper</span>, and one <span className="role-type">Seeker</span>.</h5><hr />
      <Link href="/new" passHref>
        <Button className="btn-add mb-3">Add A Member</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {members.map((member) => (
          <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={getAllTheMembers} />
        ))}
      </div>
    </div>
  );
}
