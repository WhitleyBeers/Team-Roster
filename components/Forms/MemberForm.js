import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createMember, updateMember } from '../../api/memberData';
import { getAllTeams } from '../../api/teamData';

const initialState = {
  firebaseKey: '',
  image: '',
  name: '',
  role: '',
  team_id: '',
};

export default function MemberForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [teams, setTeams] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getAllTeams(user.uid).then(setTeams);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateMember(formInput)
        .then(() => router.push('/members'));
    } else {
      const payload = { ...formInput, uid: user.uid, username: user.displayName };
      createMember(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMember(patchPayload).then(() => {
          router.push('/members');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>

      <h1 className="mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Team Member</h1>

      {/* NAME INPUT */}
      <FloatingLabel controlId="floatingInput1" label="Member Name" className="mb-3">
        <Form.Control
          type="text"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT */}
      <FloatingLabel controlId="floatingInput2" label="Enter an image URL" className="mb-3">
        <Form.Control
          type="url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* ROLE DROP DOWN */}
      <FloatingLabel controlId="floatingSelect" label="Role">
        <Form.Select
          aria-label="Role"
          name="role"
          onChange={handleChange}
          className="mb-3"
          value={formInput.role}
          required
        >
          <option value="">Select a Position</option>
          <option value="Chaser">Chaser</option>
          <option value="Beater">Beater</option>
          <option value="Keeper">Keeper</option>
          <option value="Seeker">Seeker</option>
        </Form.Select>
      </FloatingLabel>

      {/* TEAM DROP DOWN */}
      <FloatingLabel controlId="floatingSelect2" label="Team">
        <Form.Select
          aria-label="Team"
          name="team_id"
          onChange={handleChange}
          className="mb-3"
          value={formInput.team_id}
          required
        >
          <option value="">Assign to a Team</option>
          {
            teams.map((team) => (
              <option
                key={team.firebaseKey}
                value={team.firebaseKey}
              >{team.team_name}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>

      {/* SUBMIT BUTTON */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Member</Button>

    </Form>
  );
}

MemberForm.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    uid: PropTypes.string,
    team_id: PropTypes.string,
  }),
};

MemberForm.defaultProps = {
  obj: initialState,
};
