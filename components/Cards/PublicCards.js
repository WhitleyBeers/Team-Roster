import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteTeamMembers } from '../../api/mergedData';
import { useAuth } from '../../utils/context/authContext';

export default function PublicCard({ teamObj, onUpdate }) {
  const { user } = useAuth();
  const deleteThisTeam = () => {
    if (window.confirm(`Delete ${teamObj.team_name}?`)) {
      deleteTeamMembers(teamObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card className="card-style" style={{ width: '20rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>
          {teamObj.team_name}
        </Card.Title>
        <p className="card-text">
          Created by {teamObj.username}
        </p>
        <Link href={`/team/${teamObj.firebaseKey}`} passHref>
          <Button className="btn-add m-2">VIEW</Button>
        </Link>
        {teamObj.uid === user.uid && (
          <>
            <Link href={`/team/edit/${teamObj.firebaseKey}`} passHref>
              <Button className="custom-btn m-2">EDIT</Button>
            </Link>
            <Button className="btn-red m-2" onClick={deleteThisTeam}>
              DELETE
            </Button>
          </>
        )}
        {teamObj.uid !== user.uid && (
          <>
            <Link href={`/publicTeams/trade/${teamObj.firebaseKey}`} passHref>
              <Button className="custom-btn m-2">TRADE</Button>
            </Link>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

PublicCard.propTypes = {
  teamObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    team_name: PropTypes.string,
    uid: PropTypes.string,
    public: PropTypes.bool,
    username: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
