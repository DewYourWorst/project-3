import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';

function GameResult(props) {
  
  const [data, setData] = useState(null);
  
  const fetchData = async () => {
    try {
      const response = await fetch('/cfb-api/new-box-score');
      if (!response.ok) {
        throw new Error(`server status ${response.status}`);
      }
      const responseData = await response.json();
      console.log(responseData
        )
        setData(responseData[0]);
      } catch (error) {
        console.error('error fetching data', error.message);
      }
    };
    useEffect(() => {
      fetchData();
    }, []);
    

return (
  <>
    <Row xs={1} md={2} className="g-4">
      {data &&
        data.teams.map((team, index) => (
          <Card
            className='m-2'
            border={data.teams[0].score < data.teams[1].score ? (index === 0 ? "success" : "danger") : (index === 0 ? "danger" : "success")}
            style={{ width: '18rem' }}
            key={index}
          >
            <Card.Img variant="top" src={props.homeimg} />
            <Card.Body>
              <Card.Title>{team.school}</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Points: {team.points}</ListGroup.Item>
              <ListGroup.Item>Conference: {team.conference}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <Card.Link href="#">View team</Card.Link>
              <Card.Link href="#">View conference</Card.Link>
            </Card.Body>
          </Card>
        ))}
    </Row>
  </>
);
}

export default GameResult;