import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getAllTeams } from '../api/teamData';
import TeamCard from '../components/Cards/TeamCards';
import { useAuth } from '../utils/context/authContext';

const getFilteredItems = (query, items) => {
  if (!query) {
    return items;
  }
  return items.filter((item) => (item.team_name.toLowerCase().includes(query)));
};

export default function TeamsView() {
  const [teams, setTeams] = useState([]);
  const { user } = useAuth();
  const [searchInput, setSearchInput] = useState('');

  const displayTeams = () => {
    getAllTeams(user.uid).then(setTeams);
  };

  useEffect(() => {
    displayTeams();
  }, []);

  const filteredItems = getFilteredItems(searchInput, teams);

  return (
    <div className="text-center my-4">
      <Head>
        <title>Quidditch Keeper</title>
      </Head>
      <h1>Team View</h1><hr />
      <Link href="/new" passHref>
        <Button className="btn-add mb-3">Add A Team</Button>
      </Link>
      <div>
        <input type="text" placeholder="&#x1F50E;&#xFE0E; Start typing to search..." onChange={(e) => setSearchInput(e.target.value.toLowerCase())} />
      </div>
      <div className="d-flex flex-wrap">
        {filteredItems.map((team) => (
          <TeamCard key={team.firebaseKey} teamObj={team} onUpdate={displayTeams} />
        ))}
      </div>
    </div>
  );
}
