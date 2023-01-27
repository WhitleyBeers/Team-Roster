/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { signOut } from '../utils/auth';
import { getAllTrades } from '../api/tradeData';

export default function NavBar() {
  const { user } = useAuth();
  const [trades, setTrades] = useState([]);

  const checkTrades = () => {
    getAllTrades(user.uid).then(setTrades);
  };

  useEffect(() => {
    checkTrades();
  });

  return (
    <Navbar collapseOnSelect expand="lg" className="color-nav" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>
            <img alt="NavBar logo" src="/Logo.png" />Quidditch Keeper
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/teams">
              <Nav.Link>Your Teams</Nav.Link>
            </Link>
            <Link passHref href="/new">
              <Nav.Link>Create A Team</Nav.Link>
            </Link>
            <Link passHref href="/members">
              <Nav.Link>Your Members</Nav.Link>
            </Link>
            <Link passHref href="/member/new">
              <Nav.Link>Create A Member</Nav.Link>
            </Link>
            <Link passHref href="/publicTeams">
              <Nav.Link>Public Teams</Nav.Link>
            </Link>
            <Link passHref href="/trades">
              <Nav.Link>
                Trade Requests {trades.length >= 1 && <span>&#10071;</span>}
              </Nav.Link>
            </Link>
          </Nav>
          <Nav className="ms-auto">
            <Link passHref href="/">
              <Button type="button" className="btn-red ms-4" onClick={signOut}>Sign Out</Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
