import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Form, Button, Col, Row, Card } from 'react-bootstrap';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      locationResult: {},
      showLocationInfo: false,
    }
  }

  LocationInfo = async (event) => {
    event.preventDefault();

    await this.setState({
      searchQuery: event.target.city.value
    });

    let reqURL = `https://city-explorer-mohammad-bader.herokuapp.com/getLocation?q=${this.state.searchQuery}`;
    let result = await axios.get(reqURL);
    this.setState({
      locationResult: result.data[0],
      showLocationInfo: true,
    });
    console.log(this.state.locationResult);

  }

  render() {
    return (
      <>
        <Form onSubmit={this.LocationInfo} style={{margin:'50px'}} >
          <Row className='align-items-center'>
            <Col xs="auto">
             
              <Form.Control name='city' placeholder="Enter City Name" />
            </Col>
            <Col xs="auto">
              <Button type="submit" > Explore!</Button>
            </Col>
          </Row>
        </Form>

        {this.state.showLocationInfo &&
          <>
            <Card style={{ width: '18rem', backgroundColor:'#6D9E85', margin:'50px' }}>
              <Card.Img variant="top"src={`https://maps.locationiq.com/v3/staticmap?key=f5de8e48adbdc6&center=${this.state.locationResult.lat},${this.state.locationResult.lon}&zoom=10`} alt="city"/>
              <Card.Body>
                <Card.Title>City Name: {this.state.searchQuery}</Card.Title>
                <Card.Text>
                 Display Name: {this.state.locationResult.display_name}
                 <br></br>
                 type: {this.state.locationResult.type}
                 <br></br>

                 Lat: {this.state.locationResult.lat}
                 <br></br>

                 Lon: {this.state.locationResult.lon}



                </Card.Text>
              </Card.Body>
            </Card>
          </>
        }
      </>
    )
  }
}
export default App;
