import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { tradeResponse } from '../../api/tradeData';
import { getSingleTeam, updateTradeTeam } from '../../api/teamData';
import { useAuth } from '../../utils/context/authContext';

export default function TradeCards({ tradeObj, onUpdate }) {
  const { user } = useAuth();
  const [teamOffer, setTeamOffer] = useState([]);
  const [teamRequest, setTeamRequest] = useState([]);

  const checkTrade = () => {
    getSingleTeam(tradeObj.team_offer_id).then(setTeamOffer);
    getSingleTeam(tradeObj.team_request_id).then(setTeamRequest);
  };

  useEffect(() => {
    checkTrade();
  }, []);

  const rejectThisTrade = () => {
    if (window.confirm('Reject this trade?')) {
      const payload = { statusOpen: false };
      tradeResponse(tradeObj.firebaseKey, payload).then(() => onUpdate());
    }
  };

  const acceptThisTrade = () => {
    if (window.confirm('Accept this trade?')) {
      const payload = { statusOpen: false };
      tradeResponse(tradeObj.firebaseKey, payload).then(() => {
        const myNewTeam = { uid: user.uid, username: user.username };
        updateTradeTeam(teamOffer.firebaseKey, myNewTeam).then(() => {
          const formerTeam = { uid: tradeObj.uid_offer, username: tradeObj.username_offer };
          updateTradeTeam(teamRequest.firebaseKey, formerTeam).then(() => onUpdate());
        });
      });
    }
  };

  return (
    <Card className="card-style" style={{ width: '25rem', margin: '10px' }}>
      <Card.Title><h4 className="trade-title">{tradeObj.statusOpen ? 'Open' : 'Closed'} Trade Request</h4></Card.Title>
      <h6>{tradeObj.username_offer} would like to trade you their team:</h6>
      <h5>{teamOffer.team_name}</h5>
      <h6>in exchange for your team:</h6>
      <h5>{teamRequest.team_name}</h5>
      {tradeObj.statusOpen && (
        <>
          <Button className="btn-add m-2" onClick={acceptThisTrade}>
            ACCEPT
          </Button>
          <Button className="btn-red m-2" onClick={rejectThisTrade}>
            REJECT
          </Button>
        </>
      )}
    </Card>
  );
}

TradeCards.propTypes = {
  tradeObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    team_request_id: PropTypes.string,
    uid_request: PropTypes.string,
    team_request: PropTypes.string,
    uid_offer: PropTypes.string,
    team_offer_id: PropTypes.string,
    username_offer: PropTypes.string,
    statusOpen: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
