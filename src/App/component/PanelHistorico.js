import React, { Component, PropTypes } from 'react';
import {GetImageChamp} from './Champsvg';
import { IsEmptyJson } from '../logic/utils';

let id = new Date();
const IDCOMODIN = 52;

class PanelHistorico extends Component {
  seleccionadosClass = [];
	constructor(props) 
  {
     super(props);
     this.state = { seleccionadosClass: [],puntuacion: 0, finish: false}
  }

  puntuaRepetido = (_puntuacion) => (_puntuacion * _puntuacion); 

  componentWillReceiveProps(nextProps) {
    if(!nextProps.stop){
      let sumapuntuacion = 0;
      let elemento = nextProps.item;
    if(elemento && !IsEmptyJson(elemento))
    {          
     let _num_elemento_repetido = elemento.puntos + 1;
    if(_num_elemento_repetido === 1)
    {
      // primer +1 de elemento
      if(elemento.id!=IDCOMODIN)
      {
        sumapuntuacion++;
        if(this.seleccionadosClass[elemento.clase[0]]){
          sumapuntuacion++;
          this.seleccionadosClass[elemento.clase[0]]++;
        }else{ 
          this.seleccionadosClass[elemento.clase[0]] = 1;
        }
      }
    }else{
      // siguientes +1 del elemento
      if(elemento.id!=IDCOMODIN)
      {
        let _valor_para_restar = this.puntuaRepetido(elemento.puntos);
        sumapuntuacion = sumapuntuacion - _valor_para_restar;
        sumapuntuacion += this.puntuaRepetido(_num_elemento_repetido); 
      }else{
        if(_num_elemento_repetido === 3)
        {
          sumapuntuacion += 15;
        }
      }
    }
      //let _arrayChamps = [...nextProps.arrayChamps],  _repetido = _arrayChamps.find(champ => champ.id === elemento.id);
      let _repetido = nextProps.arrayChamps.find(champ => champ.id == elemento.id);
      if(_repetido)
        _repetido.puntos++;
         this.setState((prevState) => 
         {
             return { puntuacion: (prevState.puntuacion + sumapuntuacion) };
         }
       );
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