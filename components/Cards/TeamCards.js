import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteTeamMembers } from '../../api/mergedData';

export default function TeamCard({ teamObj, onUpdate }) {
  const deleteThisTeam = () => {
    if (window.confirm(`Delete ${teamObj.team_name}?`)) {
      deleteTeamMembers(teamObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card className="card-style" style={{ width: '20rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{teamObj.team_name} {teamObj.public && (
          <span>&#128275;</span>
        )}
        </Card.Title>
        <Link href={`/team/${teamObj.firebaseKey}`} passHref>
          <Button className="btn-add m-2">VIEW</Button>
        </Link>
        <Link href={`/team/edit/${teamObj.firebaseKey}`} passHref>
          <Button className="custom-btn m-2">EDIT</Button>
        </Link>
        <Button className="btn-red m-2" onClick={deleteThisTeam}>
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

TeamCard.propTypes = {
  teamObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    team_name: PropTypes.string,
    uid: PropTypes.string,
    public: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
