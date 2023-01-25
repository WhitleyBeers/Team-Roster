/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getAllMembers } from '../api/memberData';
import MemberCard from '../components/Cards/MemberCards';

const getFilteredItems = (query, items) => {
  if (!query) {
    return items;
  }
  return items.filter((item) => (item.name.toLowerCase().includes(query) || item.role.toLowerCase().includes(query)));
};

export default function MemberView() {
  const [members, setMembers] = useState([]);
  const { user } = useAuth();
  const [searchInput, setSearchInput] = useState('');

  const displayMembers = () => {
    getAllMembers(user.uid).then(setMembers);
  };

  useEffect(() => {
    displayMembers();
  }, []);

  const filteredItems = getFilteredItems(searchInput, members);

  return (
    <div className="text-center my-4">
      <Head>
        <title>Quidditch Keeper</title>
      </Head>
      <h1>Member View</h1>
      <h5>Each quidditch team has at least three <span className="role-type">Chasers</span>, two <span className="role-type">Beaters</span>, one <span className="role-type">Keeper</span>, and one <span className="role-type">Seeker</span>.</h5><hr />
      <Link href="/member/new" passHref>
        <Button className="btn-add mb-3">Add A Member</Button>
      </Link>
      <div>
        <input type="text" placeholder="&#x1F50E;&#xFE0E; Start typing to search..." onChange={(e) => setSearchInput(e.target.value.toLowerCase())} />
      </div>
      <div className="d-flex flex-wrap">
        {filteredItems.map((member) => (
          <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={displayMembers} />
        ))}
      </div>
    </div>
  );
}
