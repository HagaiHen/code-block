import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Card, Container } from './styles';
import { useState } from 'react';
import useLogin from '../../hooks/useLogin.js';
import 'bootstrap/dist/css/bootstrap.min.css';


const Login = () => {

  const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const {loading, login} = useLogin();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await login(username, password);
	}
  return (
    <Container>
    <Card>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="username" placeholder="Enter username" 
        value={username} onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control type="password" placeholder="Enter password" 
        value={password} onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </Card>
    </Container>
  );
}

export default Login;