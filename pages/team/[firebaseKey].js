import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getMembersByTeam, getSingleTeam } from '../../api/teamData';
import MemberCard from '../../components/Cards/MemberCards';
import { useAuth } from '../../utils/context/authContext';

export default function ViewTeam() {
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [members, setMembers] = useState([]);
  const [team, setTeam] = useState([]);
  const { user } = useAuth();

  const displayTeamMembers = () => {
    getSingleTeam(firebaseKey).then(setTeam);
    getMembersByTeam(firebaseKey).then(setMembers);
  };

  useEffect(() => {
    displayTeamMembers();
  }, []);

  return (
    <div className="text-center my-4">
      <Head>
        <title>Viewing {team.team_name}</title>
      </Head>
      <h1>
        {team.team_name}
        {team.public && team.uid === user.uid && <span>&#128275;</span>}
      </h1>
      {team.uid !== user.uid && <h6>Created by {team.username}</h6>}
      {team.uid === user.uid && (
        <Link href={`/team/edit/${team.firebaseKey}`} passHref>
          <Button className="custom-btn m-2">EDIT TEAM</Button>
        </Link>
      )}

      <hr />
      <h3>Team Roster</h3>
      <div className="d-flex flex-wrap">
        {members.map((member) => (
          <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={displayTeamMembers} />
        ))}
      </div>
    </div>
  );
}
