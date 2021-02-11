import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import '../styles.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CardDeck from 'react-bootstrap/CardDeck';


const Search = () => {
    const [data, setData] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [cards, setCards] = useState([]);
    const [results, setResults] = useState([]);
    const rec_link = "https://www.recreation.gov/camping/campgrounds/"

    useEffect(() => {
        if (data) {
            setResults(data.results);
        } else {
            setResults([]);
        }

    },[data]);

    const DisplayCards = () => {
        // ..
        return (
            <Row xs={1} sm={2} md={3} lg={4} xl={5}>
                { data && 
                    results.map( result => {
                        return (
                            <Col>
                            <Card style={{ marginBottom: '1rem' }} >
                                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                                <Card.Header style={{ fontWeight: 'bold'  }}> {result.entity_type} </Card.Header>
                                <Card.Body>
                                    <Card.Title> {result.name} </Card.Title>
                                    <Card.Text>
                                    
                                    entity_type: {result.entity_type}  
                                    <br/>
                                    entity_id: {result.entity_id}  
                                    <br/>
                                    
                                    {/* {Object.keys(result).join(" \n ")} */}


                                    {/* {JSON.stringify(result)} */}
                                    </Card.Text>
                                    <Button href={rec_link + result.entity_id} target="blank"> Book </Button>
                                </Card.Body>
                            </Card>
                            
                            </Col>
                        )
                    })
                    
                }
            </Row> 
            
        )

    };

    const InputForm = () => {
        const [queryTerm, setQueryTerm] = useState('')
      
        const handleSubmit = event => {
          event.preventDefault()
      
          axios.get(`https://www.recreation.gov/api/search?inventory_type=camping&q=${queryTerm}`).then(resp => {
            setData(resp.data);
            setQueryTerm('')
          })
        }
      
        return (
            <> 
          <Form inline onSubmit={handleSubmit}>
            <FormControl
              className="mr-sm-2"
              type="text"
              value={queryTerm}
              onChange={event => setQueryTerm(event.target.value)}
              placeholder='ex. "Moab"'
              required
            />
            <Button type="submit"> Search </Button>
          </Form>
          </>
        )
    };

    return (
        <Container fluid>
            <Jumbotron>
                <h1>Recreation.gov API</h1>
                <h2>Search for campgrounds</h2>
                <p>
                    Search for campgrounds
                </p>
                <p>
                    <InputForm/>
                </p>
            </Jumbotron>

            <DisplayCards/>

        </Container>
    );
};

export default Search;