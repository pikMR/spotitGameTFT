import React from 'react';

import '../css/Modal.css';
let id = new Date();

const modal = (props) => {
    //const vacio = props.items.every((el) =>(el === undefined || el.length == 0));
    //const vacio = ((props.items === undefined || props.items.length == 0));
    return (
        <div>
            <div className="modal-wrapper">
                <div className="modal-header">
                    <h3>Congrats!</h3>
                </div>
                <div className="modal-body">
                    <p>
                        {props.children}
                    </p>
                        <ul>
                                  { props.selecteds && Array.from(new Set(props.selecteds)).map(
                                  (elemento,index) => (
                                        <li key={id++}><img src={elemento.imagen} />
                                        <div className="contentFlex">
                                            <div className={'contentFlexNum' + ((elemento.puntos === 2) ? ' contentFlexNum_orange' : (elemento.puntos > 2) ? ' contentFlexNum_red':'')}>
                                                {elemento.puntos}
                                            </div>
                                        </div>
                                        </li>)
                                    )}
                        </ul>
                </div>
                <div className="modal-footer">
                    <button className="btn-cancel" onClick={props.close}>COMPARTIR</button>
                    <button className="btn-continue">REPETIR PARTIDA</button>
                </div>
            </div>
        </div>
    )
}

export default modal;
