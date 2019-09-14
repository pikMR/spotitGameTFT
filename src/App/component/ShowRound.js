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
        const { puntosA, puntosB, mostrarPanel, selectedsUserToModal } = this.props;

        return (
        <div className="container">
          {(!round && !roundrival) ? <h3> Fin de la partida </h3> : 
            <Contador seconds={3} parentCallbackTimer={this.nextRound} ref="contador"/>
          }
          
            {
                <ListGroup className="output-section">
                    {!round ?     
    <div className="row cf"><div className="col"><a href="#" className="button" id="button-15">Puntuación Player A</a></div></div> :
                        <ListGroupItem key={id++} className="result-array">
                            {round.map(
                                (elemento, index) => (
                                    <img src={elemento.imagen} alt={elemento.id} key={id++} width="100" height="100" className="result-array-item third-item morph" onClick={this.nextRound}/>
                                )
                            )}
                        </ListGroupItem>
                        }
    
                    {!roundrival ? 
    <div className="row cf"><div className="col"><a href="#" className="button" id="button-15">Puntuación Player B</a></div></div> :
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
              selecteds = {selectedsUserToModal}
              puntosA = {puntosA}
              puntosB = {puntosB}
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