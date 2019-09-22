import React from 'react';
import '../css/Modal.css';
import {GetImageChamp} from './Champsvg';
import {IDCOMODIN, PUNTUACION_COMODIN} from '../../data/Constantes';

var id_li = new Date();
var id_ul = new Date();
var id_img = new Date();
const modal = (props) => {
    const {selecteds,children,puntuacionResultado,close,mensaje,restart } = props; //
    const _elementos = selecteds && Array.from(new Set(selecteds)).filter(x=>x.id != IDCOMODIN);
    const _comodines = selecteds && selecteds.filter(x=>x.id === IDCOMODIN);
    const _clases = selecteds && Array.from(new Set(_elementos.map(function(elemento){ return elemento.clase[0] })));
    const _puntos = selecteds && Array.from(new Set(_elementos.map(function(elemento){ return elemento.puntos })));
    return (
        <div>
            <div className="modal-wrapper">
                <div className="modal-header">
                    <h3>{mensaje}</h3>
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
                    {
                        _comodines && _comodines.length > 0 &&
                                        <ul key={id_ul++}>
                                        <li key={id_li++}>

                                        {
                                            _comodines.map((comodin)=>{
                                                return (<img key={id_img++} src={comodin.imagen} />)
                                            })
                                        }
                                        </li>
                                        <li className="modal-operation-suma">({PUNTUACION_COMODIN} X {_comodines.length}) = <strong>{PUNTUACION_COMODIN * _comodines.length}</strong></li>
                                        </ul>

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

                    <h3>Puntuación Final : {puntuacionResultado}</h3>
                </div>
                <div className="modal-footer">
                    <button className="btn-cancel">
                    <a className="resp-sharing-button__link" href={'https://twitter.com/intent/tweet/?text=Me%20ha%20encantado%20la%20aplicaci%C3%B3n%20TFT%20%40pikMR!%2C%20Mi%20puntuaci%C3%B3n%20ha%20sido%20' + puntuacionResultado + '%2C%20puedes%20superarlo%3F&amp;url=https%3A%2F%2Fgithub.com%2FpikMR%2FspotitGameTFT'} target="_blank" rel="noopener" aria-label="Twitter">
                    <div className="resp-sharing-button resp-sharing-button--twitter resp-sharing-button--medium"><div aria-hidden="true" className="resp-sharing-button__icon resp-sharing-button__icon--normal">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.4 4.83c-.8.37-1.5.38-2.22.02.94-.56.98-.96 1.32-2.02-.88.52-1.85.9-2.9 1.1-.8-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.04.7.12 1.04-3.78-.2-7.12-2-9.37-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.73-.03-1.43-.23-2.05-.57v.06c0 2.2 1.57 4.03 3.65 4.44-.67.18-1.37.2-2.05.08.57 1.8 2.25 3.12 4.24 3.16-1.95 1.52-4.36 2.16-6.74 1.88 2 1.3 4.4 2.04 6.97 2.04 8.36 0 12.93-6.92 12.93-12.93l-.02-.6c.9-.63 1.96-1.22 2.57-2.14z"/></svg></div>I Liked!</div>
                    </a>
                    </button>

                    <button className="btn-continue" onClick={props.restart}>
                    <a className="resp-sharing-button__link" href="#" rel="noopener" aria-label="Repeat">
                    <div className="resp-sharing-button resp-sharing-button--repeat resp-sharing-button--medium"><div aria-hidden="true" className="resp-sharing-button__icon resp-sharing-button__icon--normal">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="redo" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="213 0 202 422"><path fill="currentColor" d="M500.33 0h-47.41a12 12 0 0 0-12 12.57l4 82.76A247.42 247.42 0 0 0 256 8C119.34 8 7.9 119.53 8 256.19 8.1 393.07 119.1 504 256 504a247.1 247.1 0 0 0 166.18-63.91 12 12 0 0 0 .48-17.43l-34-34a12 12 0 0 0-16.38-.55A176 176 0 1 1 402.1 157.8l-101.53-4.87a12 12 0 0 0-12.57 12v47.41a12 12 0 0 0 12 12h200.33a12 12 0 0 0 12-12V12a12 12 0 0 0-12-12z"></path></svg></div>Repeat!</div>
                    </a>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default modal;
