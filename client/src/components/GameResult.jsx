import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function GameResult(props) {
  let homeboarder = "primary";
  let awayboarder = "primary";
  if (props.homescore < props.awayscore) {
    homeboarder = "success"
    awayboarder = "danger"
  } else {
    homeboarder = "danger"
    awayboarder = "success"
  }

  return (
    <>
    <Row xs={1} md={2} className="g-4">
      <Card className='m-2' border={homeboarder} style={{ width: '18rem' }}>
        <Card.Img variant="top" src={props.homeimg} />
        <Card.Body>
          <Card.Title>{props.home}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Points: {props.homescore}</ListGroup.Item>
          <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
          <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Card.Link href="#">View team</Card.Link>
          <Card.Link href="#">Another Link</Card.Link>
        </Card.Body>
      </Card>
      <Card className='m-2' border={awayboarder} style={{ width: '18rem' }}>
      <Card.Img variant="top" src={props.homeimg} />
      <Card.Body>
        <Card.Title>{props.away}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Points: {props.awayscore}</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href="#">View team</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>
    </Row>
  </>
  );
}

export default GameResult;