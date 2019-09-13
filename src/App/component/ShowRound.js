import React, {Component, PropTypes} from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import { UtilShuffleArray } from '../logic/utils';
import Contador from './Contador';
import Modal from './Modal';

let id = new Date();

class ShowRound extends Component {
    
    constructor(props) {
      super(props);
      this.state = {round : props.items[0] , roundrival: props.items[1]}
    }

    render(){
        const { round,roundrival } = this.state;
        const { data , mostrarPanel, selecteds } = this.props;

        return (
        <div className="container">
          {(!round && !roundrival) ? <h3> Fin de la partida </h3> : 
            <Contador seconds={3} parentCallbackTimer={this.nextRound} ref="contador"/>
          }
          
            {
                <ListGroup className="output-section">
                    {!round ? <div> Puntuación total player A : {data} </div> :
                        <ListGroupItem key={id++} className="result-array">
                            {round.map(
                                (elemento, index) => (
                                    <img src={elemento.imagen} alt={elemento.id} key={id++} width="100" height="100" className="result-array-item third-item morph" onClick={this.nextRound}/>
                                )
                            )}
                        </ListGroupItem>
                        }
    
                    {!roundrival ? <div> Puntuación total player B : </div> :
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
            {
                mostrarPanel &&
                <Modal
              className="modal"
              selecteds = {selecteds}
              puntos={data}
              >
              La puntuación se calcula en función de los personajes repetidos (nxn) y +1 por cada clase que consigas repetir.
            </Modal>    
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