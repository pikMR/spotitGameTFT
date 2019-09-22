import React, {Component, PropTypes} from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import { UtilShuffleArray } from '../logic/utils';
import Contador from './Contador';
import Modal from './Modal';

let id = new Date();

class ShowRound extends Component {
    
    constructor(props)
    {
      super(props);
      this.state = 
        {
            round : props.items[0],
            roundrival: props.items[1],
            mostrarModal: props.mostrarPanel,
            selecteds: props.selectedsUserToModal,
            PlayerSiguiente: 'B',
            puntosModal: props.puntosA
        }
    }

    componentWillReceiveProps(nextProps) {
        const { mostrarPanel, selectedsUserToModal, puntosA } = nextProps;
        if(mostrarPanel){
            this.setState({
                mostrarModal: mostrarPanel,
                selecteds: selectedsUserToModal,
                puntosModal: puntosA
            })
        }
    }

    render()
    {
        const { round,roundrival,mostrarModal,selecteds,PlayerSiguiente,puntosModal} = this.state;
        const { puntosA, puntosB } = this.props;

        return (
        <div className="container">
          {(!round && !roundrival) ? <div className="row cf"><div className="col"><a href="#" onClick={this.ToggleModel} className="button" id="button-15">Ver Puntuación Player {PlayerSiguiente}</a></div></div> : 
            <Contador seconds={3} parentCallbackTimer={this.nextRound} ref="contador"/>
          }
          {
              <ListGroup className="output-section">
                {round &&     
                    <ListGroupItem key={id++} className="result-array">
                        {round.map(
                            (elemento, index) => (
                                <img src={elemento.imagen} alt={elemento.id} key={id++} width="100" height="100" className="result-array-item third-item morph" onClick={this.nextRound}/>
                            )
                        )}
                    </ListGroupItem>
                }
                {roundrival &&
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
              mostrarModal &&
              <Modal
                  className="modal"
                  selecteds={selecteds}
                  puntuacionResultado={puntosModal}
                  mensaje={this.props.puntosA > this.props.puntosB ? "Has Ganado!" : (this.props.puntosA < this.props.puntosB) ? "Has Perdido" : "Empate"}
                  restart={this.reiniciarJuego}>
                  La puntuación se calcula en función de los personajes repetidos f(pxpxn) y +1 por cada clase que consigas repetir.
              </Modal>
          }
        </div>
        );
    }

    reiniciarJuego = () =>{
        this.props.parentCallbackRestart();
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

    ToggleModel = (e) => {
        e.preventDefault();
        if(e){
            this.setState(prevState => ({
               selecteds: (prevState.selecteds === this.props.selectedsUserToModal) ? this.props.selectedsAdversarioToModal : this.props.selectedsUserToModal,
               mostrarModal: true,
               PlayerSiguiente: (prevState.PlayerSiguiente === 'B') ? 'A' : 'B',
               puntosModal: (prevState.PlayerSiguiente === 'B') ? this.props.puntosB : this.props.puntosA,
            })
            );
        }
    }
}

ShowRound.propTypes = {
    items: PropTypes.array.isRequired
}

export default ShowRound;