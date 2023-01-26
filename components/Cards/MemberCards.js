import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteMember } from '../../api/memberData';
import { getSingleTeam } from '../../api/teamData';
import { useAuth } from '../../utils/context/authContext';

export default function MemberCard({ memberObj, onUpdate }) {
  const deleteThisMember = () => {
    if (window.confirm(`Delete ${memberObj.name}?`)) {
      deleteMember(memberObj.firebaseKey).then(() => onUpdate());
    }
  };
  const { user } = useAuth();
  const [team, setTeam] = useState([]);

  const viewTeam = () => {
    getSingleTeam(memberObj.team_id).then(setTeam);
  };

  useEffect(() => {
    viewTeam();
  }, []);

  return (
    <Card className="card-style" style={{ width: '16rem', margin: '10px' }}>
      <Card.Img variant="top" src={memberObj.image} alt={memberObj.name} style={{ height: '300px' }} />
      <Card.Body>
        <Card.Title>{memberObj.name}</Card.Title>
        <h5 className="card-text bold">{memberObj.role}</h5>
        <h6>{team.team_name}</h6>
        {memberObj.uid === user.uid && (
          <>
            <Link href={`/member/edit/${memberObj.firebaseKey}`} passHref>
              <Button className="custom-btn">EDIT</Button>
            </Link>
            <Button className="btn-red m-2" onClick={deleteThisMember}>
              DELETE
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

MemberCard.propTypes = {
  memberObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    uid: PropTypes.string,
    team_id: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
