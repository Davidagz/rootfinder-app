import React from 'react';
import Card from 'react-bootstrap/Card'
var Latex = require('react-latex');

class Result extends React.Component {

    render() {
        const resultsStyle = {
            textAlign: 'center',
            maxWidth: '1200px',
            margin: 'auto',
            paddingTop: '30px'
        };
        return(
        <div style={ resultsStyle }>
            <Card border={this.props.error ? 'danger' : 'success'}  text={'black'}>
                <Card.Header>
                    Results
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        {this.props.waitingOnUser ? '' :  this.props.solutionString} 
                        <br />
                        <Latex>{this.props.waitingOnUser ? '' : this.props.result}</Latex>
                        <p>{this.props.error ? this.props.errorString : ''}</p>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
        )
    }
}

export default Result;