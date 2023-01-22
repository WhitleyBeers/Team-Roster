import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { createMember, updateMember } from '../api/memberData';

const initialState = {
  firebaseKey: '',
  image: '',
  name: '',
  role: '',
};

export default function MemberForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
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
        .then(() => router.push('/team'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createMember(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMember(patchPayload).then(() => {
          router.push('/team');
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
          <option value="">Select a Role</option>
          <option value="Role 1">Role 1</option>
          <option value="Role 2">Role 2</option>
          <option value="Role 3">Role 3</option>
          <option value="Role 4">Role 4</option>
          <option value="Role 5">Role 5</option>
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
  }),
};

MemberForm.defaultProps = {
  obj: initialState,
};
