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
import Alert from 'react-bootstrap/Alert';


const Search = () => {
    const [data, setData] = useState(null);
    const [noResultsTerm, setNoResultsTerm] = useState(false);
    const [cards, setCards] = useState([]);
    const [results, setResults] = useState([]);
    const rec_link = "https://www.recreation.gov/camping/campgrounds/"
    const size = 12;

    useEffect(() => {
        if (data && (data.total > 0)) {
            let campgrounds = data.results.filter( result => {
                return result.entity_type == 'campground';
            });
            setResults(campgrounds);
        } else {
            setResults([]);
        }

    },[data]);

    const DisplayCards = () => {
        // ..
        return (
            <>
                <p> 
                    Showing results for "{data.query}"
                    <br/>
                    { (results.length > size) 
                    ? <small> 1 - {size} of {results.length} results</small> 
                    : <small> 1 - {results.length} of {results.length} results</small> }
                </p>
                
                <Row xs={1} sm={2} md={3} lg={4} xl={5}>
                    { results.map( result => {
                        return (
                            <Col>
                            <Card style={{ marginBottom: '1rem' }} >
                            <Card.Img variant="top" src={result.preview_image_url ? result.preview_image_url : "https://via.placeholder.com/700x400"} alt="Preview Image" />
                                {/* <Card.Header style={{ fontWeight: 'bold'  }}> {result.entity_type} </Card.Header> */}
                                <Card.Body>
                                    <Card.Title style={{marginBottom:'0.25rem', textTransform: 'capitalize'}}> {result.name.toLowerCase()} </Card.Title>
                                    {/* <Card.Subtitle style={{color:'gray'}}> {result.parent_name} </Card.Subtitle> */}
                                    <Card.Text>

                                        <p style={{color:'gray'}}>{result.parent_name}</p>

                                        {/* {result.campsites_count} campsites */}
                                    
                                    </Card.Text>
                                    <Button href={rec_link + result.entity_id} target="blank"> Book </Button>
                                </Card.Body>
                            </Card>
                            
                            </Col>
                        )
                    })}
                </Row> 
           
            </>
        );

    };

    const InputForm = () => {
        const [queryTerm, setQueryTerm] = useState('')
      
        const handleSubmit = event => {
          event.preventDefault()
      
          axios.get(`https://www.recreation.gov/api/search?inventory_type=camping&size=${size}&q=${queryTerm}`).then(resp => {
            if (resp.data && (resp.data.total > 0)) {
                setNoResultsTerm('');
                setData(resp.data);
            } else {
                setData(null);
                setNoResultsTerm(queryTerm);
            }
            //setQueryTerm('');
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
              style={{ marginBottom: '0.5rem' }}
            />
            <Button type="submit" style={{ marginBottom: '0.5rem' }}> Search </Button>
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

            { data && <DisplayCards/> }
            { noResultsTerm && <Alert variant='light'> No matching results for "{noResultsTerm}" </Alert>}

        </Container>
    );
};

export default Search;