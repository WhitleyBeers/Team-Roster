import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getAllTeams } from '../api/teamData';
import TeamCard from '../components/Cards/TeamCards';
import { useAuth } from '../utils/context/authContext';

export default function TeamsView() {
  const [teams, setTeams] = useState([]);
  const { user } = useAuth();

  const displayTeams = () => {
    getAllTeams(user.uid).then(setTeams);
  };

  useEffect(() => {
    displayTeams();
  }, []);

  return (
    <div className="text-center my-4">
      <Head>
        <title>Quidditch Keeper</title>
      </Head>
      <h1>Team View</h1><hr />
      <Link href="/new" passHref>
        <Button className="btn-add mb-3">Add A Team</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {teams.map((team) => (
          <TeamCard key={team.firebaseKey} teamObj={team} onUpdate={displayTeams} />
        ))}
      </div>
    </div>
  );
}
