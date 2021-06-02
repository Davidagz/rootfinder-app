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
            <Form.Row>
                <Col>
                    <Form.Label>Equation</Form.Label>
                    <Form.Control name="equation" value={this.value} placeholder="ex: 10x^2 - 3x^3" 
                    onChange={this.handleChange} />
                </Col>
                <Col xs={2}>
                    <Form.Label>Variable</Form.Label>
                    <Form.Control name="variable" value={this.value} placeholder="(a-z)" 
                    onChange={this.handleChange} type="text" maxlength="1"/>
                </Col>
            </Form.Row>
            <Row style={{ marginTop:10 }}>
                <Col>
                    <Button block size="sm" variant="outline-primary" onClick={this.props.handleSubmit}>
                        Submit
                    </Button>
                </Col>
            </Row>
        </Form>
        );

    }

}

export default InputForm;