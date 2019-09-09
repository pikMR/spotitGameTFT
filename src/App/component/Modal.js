import React from 'react';

import '../css/Modal.css';
let id = new Date();

const modal = (props) => {
    //const vacio = props.items.every((el) =>(el === undefined || el.length == 0));
    //const vacio = ((props.items === undefined || props.items.length == 0));
    //const clases = Array.from(new Set(props.selecteds)).map(function(){ return this.clase });
    //console.dir(clases);
    var _elementos = props.selecteds && Array.from(new Set(props.selecteds));
    var _clases = props.selecteds && Array.from(new Set(_elementos.map(function(elemento){ return elemento.clase })));
    var _puntos = props.selecteds && Array.from(new Set(_elementos.map(function(elemento){ return elemento.puntos })));
        console.log("-> clases: ");
        console.dir(_clases);
        console.log("-> puntos: ");
        console.dir(_puntos);

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
                    {
                        props.selecteds &&
                            _puntos.map(function(comparapunto){ return
                                _elementos.filter(x=>x.puntos === comparapunto).map((elemento,nindex)=>(
                                        
                                            <li key={id++}>"---- " {elemento.id}
                                            </li>
                                        )
                                )
                            })
                    }
                    </ul>

                    <ul>
                    {
                    props.selecteds && Array.from(new Set(props.selecteds)).map(function(elemento,index){ return <div>
                                            <li key={id++}>{elemento.clase}
                                            </li>
                                        </div> })
                    }
                    </ul>
                    <ul>
                              { 
                                props.selecteds && Array.from(new Set(props.selecteds)).map(
                              (elemento,index) => (
                                    <div>
                                        <li key={id++}><img src={elemento.imagen} />
                                        </li>
                                    </div>
                                )
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
