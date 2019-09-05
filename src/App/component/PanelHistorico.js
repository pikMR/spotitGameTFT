import React, { Component, PropTypes } from 'react';

let id = new Date();
class PanelHistorico extends Component {

	constructor(props) 
  {
     super(props);
     this.state = { seleccionados : [] }
  }

  componentWillReceiveProps(nextProps) {
    this.setState( {seleccionados : [...nextProps.arrayChamps,nextProps.item]} );
  }


    render() {
    	const { className,arrayChamps } = this.props;
      const { seleccionados } = this.state;
        return (
        	<div className={className}>
        		{
        			((seleccionados) && (seleccionados.length>0)) &&
        			<ul>
        			{Array.from(new Set(this.state.seleccionados)).map(
        			(elemento,index) => (<li key={id++}><img src={elemento.imagen} /></li>)
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