import React, { Component, PropTypes } from 'react';

let id = new Date();
class PanelHistorico extends Component {

	constructor(props) 
  {
     super(props);
     this.state = { seleccionados : [], puntuacion: 0 }
  }

  componentWillReceiveProps(nextProps) {
    let _select_elemento = nextProps.arrayChamps.find(champ => champ.id === nextProps.item.id);
    if(_select_elemento){
      _select_elemento.puntos++;
    }
    this.setState(
      {
        seleccionados : [...nextProps.arrayChamps,nextProps.item].sort((a,b)=>(a.puntos > b.puntos) ? -1 : 1)
      }
    );
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
        			(elemento,index) => (<li key={id++}><img src={elemento.imagen} /><div className="puntuacionbox">{elemento.puntos}</div></li>)
        			)}
        			</ul>
        		}
          	</div>
        );
    }
}

PanelHistorico.propTypes = {
    arrayChamps: PropTypes.array.isRequired
}


export default PanelHistorico;