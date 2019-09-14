import React from 'react';
import '../css/Modal.css';
import {GetImageChamp} from './Champsvg';

var id_li = new Date();
var id_ul = new Date();
var id_img = new Date();
const modal = (props) => {
    const {selecteds,children,puntosA,puntosB,close } = props; //
    const _elementos = selecteds && Array.from(new Set(selecteds));
    const _clases = selecteds && Array.from(new Set(_elementos.map(function(elemento){ return elemento.clase[0] })));
    const _puntos = selecteds && Array.from(new Set(_elementos.map(function(elemento){ return elemento.puntos })));
    return (
        <div>
            <div className="modal-wrapper">
                <div className="modal-header">
                    <h3>Congrats!</h3>
                </div>
                <div className="modal-body">
                    <p>
                        {children}
                    </p>                    
                    {

                        selecteds &&
                                _puntos.map((puntos)=>{
                                    const _elementos_filter = _elementos.filter(x=>x.puntos === puntos);
                                    return(
                                        <ul key={id_ul++}>
                                        <li key={id_li++}>
                                        {
                                        
                                        _elementos_filter.map((elem)=>{
                                            return (<img key={id_img++} src={elem.imagen} />)
                                        })
                                        }
                                        </li>
                                        <li className="modal-operation-suma">({puntos} X {puntos}) X {_elementos_filter.length} = <strong>{puntos * puntos * _elementos_filter.length}</strong></li>
                                        </ul>
                                    );
                                })
                    }
                    <ul className="clasesSeleccionadas">
                    {

                        selecteds &&
                                _clases.map((clase)=>{
                                    const _elementos_filter_class = _elementos.filter(x=>x.clase[0] === clase);
                                    return(
                                                (_elementos_filter_class.length > 1) &&
                                                <li key={id_li++}>
                                                    {GetImageChamp(clase)}
                                                    <p>+{_elementos_filter_class.length - 1}</p>
                                                </li>
                                    );
                                })
                    }    
                    </ul>

                    <h3>Puntuación Final : {puntosA}</h3>
                </div>
                <div className="modal-footer">
                    <button className="btn-cancel" onClick={close}>COMPARTIR</button>
                    <button className="btn-continue">REPETIR PARTIDA</button>
                </div>
            </div>
        </div>
    )
}

export default modal;
