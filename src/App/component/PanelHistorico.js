import React, { Component, PropTypes } from 'react';
import {GetImageChamp} from './Champsvg';
import { IsEmptyJson } from '../logic/utils';

let id = new Date();
const IDCOMODIN = 52;

class PanelHistorico extends Component {
  puntuacion = 0;
  seleccionadosClass = [];
	constructor(props) 
  {
     super(props);
     this.state = { seleccionados : [] , puntuacion: 0, finish: false}
  }

  puntuaRepetido = (_puntuacion) => (_puntuacion * _puntuacion); 

  componentWillReceiveProps(nextProps) {
    // evitamos bucle con stop
    if(!nextProps.stop){

      let elemento = nextProps.item;
    if(elemento && !IsEmptyJson(elemento))
    {          
      let _num_elemento_repetido = elemento.puntos + 1;
      if(_num_elemento_repetido === 1){
        // primer +1 de elemento
        if(elemento.id!=IDCOMODIN)
        {
          this.puntuacion++;
          if(this.seleccionadosClass[elemento.clase[0]]){
            this.puntuacion++;
          }else{
            this.seleccionadosClass[elemento.clase[0]] = 1;
          }
        }
      }else{
        // siguientes +1 del elemento
        if(elemento.id!=IDCOMODIN)
        {
          let _valor_para_restar = this.puntuaRepetido(elemento.puntos);
          this.puntuacion = this.puntuacion - _valor_para_restar;
          this.puntuacion += this.puntuaRepetido(_num_elemento_repetido); 
        }else{
          if(_num_elemento_repetido === 3)
          {
            this.puntuacion += 15;
          }
        }
      }
        //let _arrayChamps = [...nextProps.arrayChamps],  _repetido = _arrayChamps.find(champ => champ.id === elemento.id);
        let _repetido = nextProps.arrayChamps.find(champ => champ.id === elemento.id);
        if(_repetido)
          _repetido.puntos++;


        this.setState(
          {
            seleccionados : [...nextProps.arrayChamps].sort((a,b)=>(a.puntos > b.puntos) ? -1 : 1),
            puntuacion: this.puntuacion
          }, ()=>{nextProps.callback(this.puntuacion)})
      }
    }
  }
    render() {
    	const { className,arrayChamps } = this.props;
      const { seleccionados,puntuacion } = this.state;
        return (
        	<div className={className}>
        		{
        			((seleccionados) && (seleccionados.length>0)) &&
        			<ul>
              <div key="_puntuacion" className="puntuacionFinal">{puntuacion}</div>
        			{Array.from(new Set(seleccionados)).map(
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