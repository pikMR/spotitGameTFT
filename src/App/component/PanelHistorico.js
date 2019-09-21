import React, { Component, PropTypes } from 'react';
import {GetImageChamp} from './Champsvg';
import { IsEmptyJson } from '../logic/utils';
import {IDCOMODIN,TOTAL_CLASES_TIPO1, PUNTUACION_COMODIN} from '../../data/Constantes';

let id = new Date();
const INITIAL_STATE_ARRAY_CLASS = new Array(TOTAL_CLASES_TIPO1).fill(0);

class PanelHistorico extends Component {
	constructor(props) 
  {
     super(props);
     this.state = { seleccionadosClass: INITIAL_STATE_ARRAY_CLASS, puntuacion: 0, finish: false }
  }

  puntuaRepetido = (_puntuacion) => ((_puntuacion * 2) - 1) ; 


  /*
    elemento : ELEMENTO QUE VIENE CON UNAS PROPIEDADES DETERMINADAS. {imagen,id,clase,puntos}
    elemento.puntos : NUMERO DE VECES QUE SE REPITE EL ELEMENTO.
    sumapuntuacion : PUNTUACIÓN QUE DEBE SUMARSE A LA PUNTUACION ACUMULADA.
    state.puntuacion : PUNTUACIÓN ACUMULADA.
    state.seleccionadosClass : Clases acumuladas, por cada una adicional +1
  */
  componentWillReceiveProps(nextProps) {
    if(!nextProps.stop){
      let elemento = nextProps.item;

      if(elemento && !IsEmptyJson(elemento))
        { 
          elemento.puntos++;
          let sumapuntuacion = elemento.id!=IDCOMODIN ? this.puntuaRepetido(elemento.puntos) : PUNTUACION_COMODIN; // acumulado + (2p-1)

        this.setState((prevState) => 
        {
          const _lista_clases_acumuladas = prevState.seleccionadosClass.map((item,j) =>{
              if(elemento.clase[0]===j)
              {
                // por cada clase adicional +1
                if(item>0 && elemento.puntos===1)
                  sumapuntuacion++;

                return item+1;
              }else{
                return item;
              }
          });
          return { 
            puntuacion: (prevState.puntuacion + sumapuntuacion),
            seleccionadosClass: _lista_clases_acumuladas
          };
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(!prevProps.stop)
      prevProps.callback(prevState.puntuacion);
  }

    render() {
    	const { className,arrayChamps } = this.props;
      const { puntuacion } = this.state;

        return (
        	<div className={className}>
        		{
        			((arrayChamps) && (arrayChamps.length>0)) &&
        			<ul>
              <div key="_puntuacion" className="puntuacionFinal">{puntuacion}</div>
        			{Array.from(new Set(arrayChamps.sort((a,b)=>(a.puntos > b.puntos) ? -1 : 1))).map(
        			(elemento,index) => (<li key={id++}><img src={elemento.imagen} />
                <div className="contentFlex">
                  <div className={'contentFlexNum' + ((elemento.puntos === 2) ? ' contentFlexNum_orange' : (elemento.puntos > 2) ? ' contentFlexNum_red':'')}>
                      {elemento.puntos}
                  </div>
                  {
                    (elemento.clase) &&
                    <div key="_clase" className="contentFlexChamp">
                      {GetImageChamp(elemento.clase[0])}
                    </div>  
                  }
                </div>
                </li>)
        			)}
        			</ul>
        		}
          	</div>
        );
    }
}

PanelHistorico.propTypes = {
    arrayChamps: PropTypes.array.isRequired,
    callback : PropTypes.func
}


export default PanelHistorico;