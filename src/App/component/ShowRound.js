import React, {Component, PropTypes} from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import { UtilShuffleArray } from '../logic/utils';
import Contador from './Contador';

let id = new Date();

class ShowRound extends Component {
    constructor(props) {
      super(props);
      this.state = this.handleGetRandomRounds();
    }

    handleGetRandomRounds() 
    {
        if(this.props.items.length > 1)
        {
                return ({
                    round: this.props.items[0],
                    roundrival: this.props.items[1],
                    loading: false
                }); 
        }
    }

    render(){
        const { loading,round,roundrival } = this.state;
        return (
        <div className="container">
          {(!round && !roundrival) ? <h3> WELLCOME </h3> : 
            <Contador seconds={3} parentCallbackTimer={this.nextRound} ref="contador"/>
          }
          
            {
                <ListGroup className="output-section">
                    {!round ? <div> Cargando ... </div> :
                        <ListGroupItem key={id++} className="result-array">
                            {round.map(
                                (elemento, index) => (
                                    <img src={elemento.imagen} alt={elemento.id} key={id++} width="100" height="100" className="result-array-item third-item morph" onClick={this.nextRound}/>
                                )
                            )}
                        </ListGroupItem>
                        }
    
                    {!roundrival ? <div> Cargando ... </div> :
                        <ListGroupItem key={id++} className="result-array">
                            {roundrival.map(
                                (elemento, index) => (
                                    <img src={elemento.imagen} alt={elemento.id} key={id++} width="100" height="100" className="result-array-item third-item"/>
                                )
                            )}
                        </ListGroupItem>
                    }
                </ListGroup>

            }
        </div>
        );
    }

    nextRound = (e) => {
        let _activo = this.props.parentCallbackSelected(e);
        if(_activo){
            this.setState({ round: _activo[0] , roundrival: _activo[1] });
            if(this.refs.contador){
                this.refs.contador.reset(e);
            }
        }else if(e){
            e.preventDefault();
        }
        return _activo;
    }
}

ShowRound.propTypes = {
    items: PropTypes.array.isRequired
}

export default ShowRound;