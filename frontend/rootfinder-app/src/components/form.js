import React from 'react';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

class InputForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(event){
        const target = event.target;
        const value = target.value; 
        const name = target.name;
        this.props.onInputChange(name, value)
      }

    render() {
        return (
        <Form onkeydown="return even.key != 'Enter';">
            <Row>
                <Col>
                    <Form.Label>Equation</Form.Label>
                    <Form.Control name="equation" value={this.value} placeholder="10x^2 - 3x^3" 
                    onChange={this.handleChange} />
                </Col>
                <Col>
                    <Form.Label>Variable</Form.Label>
                    <Form.Control name="variable" value={this.value} placeholder="x" 
                    onChange={this.handleChange} />
                    <Form.Text>Only works with alphabetic variables (a-z)</Form.Text>
                </Col>
            </Row>
            <Button block size="sm" variant="outline-primary" onClick={this.props.handleSubmit}>
                Submit
            </Button>
        </Form>
        );

    }

}

export default InputForm;