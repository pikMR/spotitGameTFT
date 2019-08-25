import React, { Component, PropTypes } from 'react';

class PanelHistorico extends Component {

	constructor(props) {
      super(props);
      this.state = {
      	items : []
      }
    }

    componentWillReceiveProps(nextProps) {
    	this.setState((state,props) => ({
    		items: state.items.push(props.item)
    	}));	
    }

    render() {
    	const { items } = this.state;
    	const { className } = this.props;
        return (
        	<div className={className}>
        		{
        			items &&
        			<ul>
        			{items.map(
        			(elemento,index) => (<li key={elemento.id}><img src={elemento.imagen} key={elemento.id + "_img"} /></li>)
        			)}
        			</ul>
        		}
          	</div>
        );
    }
}

export default PanelHistorico;