import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { getPublicTeams } from '../api/teamData';
import PublicCard from '../components/Cards/PublicCards';

export default function PublicView() {
  const [teams, setTeams] = useState([]);

  const viewTeams = () => {
    getPublicTeams().then(setTeams);
  };

  useEffect(() => {
    viewTeams();
  });

  return (
    <div className="text-center my-4">
      <Head>
        <title>Public Teams</title>
      </Head>
      <h1>Public Teams</h1><hr />
      <div className="d-flex flex-wrap">
        {teams.map((team) => (
          <PublicCard key={team.firebaseKey} teamObj={team} onUpdate={viewTeams} />
        ))}
      </div>
    </div>
  );
}
