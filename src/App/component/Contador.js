import React, {Component, PropTypes} from 'react';

class Contador extends Component {

  constructor(props){
    super(props)
    this.tick = this.tick.bind(this)
    this.state = {seconds: props.seconds}
  }

  componentDidMount(){
    this._ismounted = true;
    this.timer = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    this._ismounted = false;
    clearInterval(this.timer);
  }

  reset(e){
      if(e && this._ismounted){
        clearInterval(this.timer);
        this.setState({seconds: 3})      
        this.timer = setInterval(this.tick, 1000);
        e.preventDefault();  
      }
      
  }

  tick(){
    if (this.state.seconds > 0) {
      this.setState({seconds: this.state.seconds - 1})
    } else {
      clearInterval(this.timer);
      this.setState({seconds: 3})
      let _activo = this.props.parentCallbackTimer();

      if(_activo && _activo.length > 0)
        this.timer = setInterval(this.tick, 1000);
      else
        return;
    }
  }
  render(){
    return <div id="contador" style={{width: "100%", textAlign: "center"}}>
      <h3>{this.state.seconds}...</h3>
    </div>
  }
}

export default Contador;