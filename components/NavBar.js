/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
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
            <Link passHref href="/team">
              <Nav.Link>Team View</Nav.Link>
            </Link>
            <Link passHref href="/new">
              <Nav.Link>New Member</Nav.Link>
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
