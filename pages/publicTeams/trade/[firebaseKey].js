import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { getMyPublicTeams, getSingleTeam } from '../../../api/teamData';
import { useAuth } from '../../../utils/context/authContext';
import { createTrade, updateTrade } from '../../../api/tradeData';

export default function NewTrade() {
  const { user } = useAuth();
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [teamRequest, setTeamRequest] = useState([]);
  const [teams, setTeams] = useState([]);
  const [formInput, setFormInput] = useState({});

  useEffect(() => {
    getSingleTeam(firebaseKey).then(setTeamRequest);
    getMyPublicTeams(user.uid).then(setTeams);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formInput,
      team_request_id: teamRequest.firebaseKey,
      uid_request: teamRequest.uid,
      team_request: teamRequest.team_name,
      uid_offer: user.uid,
      username_offer: user.displayName,
      statusOpen: true,
    };
    createTrade(payload).then(({ name }) => {
      const patchPayload = { firebaseKey: name };
      updateTrade(patchPayload).then(() => {
        router.push('/publicTeams');
      });
    });
  };

  return (
    <div>
      <h2 className="mt-3">Requesting trade from {teamRequest.username}</h2>
      <h4 className="mb-3">You are requesting: {teamRequest.team_name}</h4>
      <Form onSubmit={handleSubmit}>
        <FloatingLabel controlId="floatingSelect1" label="Team">
          <Form.Select aria-label="Team" name="team_offer_id" onChange={handleChange} className="mb-3" value={formInput.team_offer_id} required>
            <option value="">Pick a team to trade</option>
            {teams.map((team) => (
              <option key={team.firebaseKey} value={team.firebaseKey}>
                {team.team_name}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>
        <Button type="submit">Request Trade</Button>
      </Form>
    </div>
  );
}
