import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


const Search = () => {
    const [data, setData] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [cards, setCards] = useState([]);
    const [results, setResults] = useState([]);

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
            <div>
                { data && 
                    results.map( result => {
                        return (
                            <>
                            <Card style={{ width: '18rem' }}>
                                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                                <Card.Header> {result.name} </Card.Header>
                                <Card.Body>
                                    <Card.Title>  </Card.Title>
                                    <Card.Text>
                                    
                                    entity_id: {result.entity_id}
                                    {/* {JSON.stringify(result)} */}

                                    </Card.Text>
                                    {/* <Button >Go somewhere</Button> */}
                                </Card.Body>
                            </Card>
                            
                            </>
                        )
                    })
                    
                }
            </div> 
            
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
          <form onSubmit={handleSubmit}>
            <input
              style={{margin: '5px', background: 'white', color: 'black'}}
              type="text"
              value={queryTerm}
              onChange={event => setQueryTerm(event.target.value)}
              placeholder='ex. "Moab"'
              required
            />
            
            <Button type="submit"> Search </Button>
          </form>
        )
    };

    return (
        <div classname='container'>

            <h1>Recreation.gov API</h1>
            <h2>Search for campgrounds</h2>

            <InputForm/>
            <DisplayCards/>


        </div>
    );
};

export default Search;