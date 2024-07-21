import React, { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import useGetCodeBlocks from '../../hooks/useGetCodeBlocks.js';
import { Card, Container } from './styles.jsx';


const Home = () => {
    const {loading, codeBlocks} = useGetCodeBlocks();
    const [placeholder, setPlaceholder] = useState("Choose Code Block");
    const [currCodeBlock, setCurrCodeBlock] = useState(null);
    const handleSelect = (e) => {
        setPlaceholder(e.title);
        setCurrCodeBlock(e);
        console.log(e);
    }
    return (
        <Container>
        <h3>Choose Code Block: </h3>
              
        <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
            {placeholder}
        </Dropdown.Toggle>

        <Dropdown.Menu>

        {codeBlocks.map((codeBlock, idx) => (
				<Dropdown.Item key={codeBlock._id} onClick={() => handleSelect(codeBlock)}> {codeBlock.title} </Dropdown.Item> 
			))}
        
        </Dropdown.Menu>
        </Dropdown>

        <Card>
            {currCodeBlock?.code}
        </Card>
        
        </Container>
    )
}

export default Home;
