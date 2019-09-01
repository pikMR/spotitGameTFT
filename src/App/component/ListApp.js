import React, {Component} from 'react';
import Spinner from './Spinner';
import Warning from './Warning';
import PostData from '../../data/items.json';
import { UtilShuffleArray , PasarElementos, BuscaElementoArrayPorId } from '../logic/utils';
import ShowRound from './ShowRound';
import PanelHistorico from './PanelHistorico';

class ListApp extends Component {
    resParte:[];
    cuentaActivo = 0;

    constructor(props) {
        super(props);

        this.state = {
            selectedChamp:0,
            loading:true,
            resActivo:[],
            showError: false,
            errorMessage: '',
            showSpinner: false,
            finish:false
        };
    }


  callBackSelectedChamp = (roundData) => {

    if(this.cuentaActivo === -1)
    {
      let ultima_tanda = this.GetRandomRounds(roundData,this.resParte);
      if(this.resParte.length>0){
        return ultima_tanda;
      }else{
        this.setState({finish:true});
        return;
      }
    }
      
    let cactivo = (this.cuentaActivo+1) % 4;
    if(this.resParte[cactivo].length!=3)
    {
      this.cuentaActivo = cactivo;
      return this.GetRandomRounds(roundData,this.resParte[cactivo]);
    }else{
      let i = cactivo;
      for (; i < this.resParte.length; i++) 
      {
          if(this.resParte[i].length!=3){
            this.cuentaActivo = i;
            return this.GetRandomRounds(roundData,this.resParte[i]);
          }
      }
      this.resParte = PasarElementos([...this.resParte]);
      this.cuentaActivo = -1;
      return this.GetRandomRounds(roundData,this.resParte);
    }
  }

  GetRandomRow(data){
    let sizeFlock = data.length;
    if(sizeFlock > 0){
        let index = Math.floor(Math.random() * sizeFlock);
        let row = data[index];            
        data.splice(index,1); // eliminamos el elemento.
        return row; // devolvemos el elemento.
    }
  }

  GetRandomRounds(selected,data){

   /*
    let elemento = [];
    if(selected && data)
    {
        elemento = BuscaElementoArrayPorId(selected,data);
    }
  */
    if(!data){
      data = selected;
    }

    let _r1 = this.GetRandomRow(data);
    let _r2 = this.GetRandomRow(data);
    return [_r1,_r2];
  }

  ObtenerParte(data){
     return UtilShuffleArray(data.map(json=>{
        let _req = require(`./../../imagenes/${json.path}`);
        let _time = Date.now();
        let newItem = 
        {
          imagen: _req,
          id: _time+"_"+json.path,
          clase: json.class
        } 
        return newItem;
      })
     );
  }

  componentDidMount() {
    this.setState(
    {
      loading: true,
    },
    ()=>{
      let yourArray = UtilShuffleArray(PostData);
      let halfWayThough = Math.floor(yourArray.length/4);
      let primeraparte = yourArray.slice(0, halfWayThough);
      let segundaparte = yourArray.slice(halfWayThough, halfWayThough*2);
      let terceraparte = yourArray.slice(halfWayThough*2, halfWayThough*3);
      let cuartaparte = yourArray.slice(halfWayThough*3, yourArray.length);
      primeraparte = this.ObtenerParte(primeraparte);
      segundaparte = this.ObtenerParte(segundaparte);
      terceraparte = this.ObtenerParte(terceraparte);
      cuartaparte = this.ObtenerParte(cuartaparte);
      this.handleGenerate(primeraparte,segundaparte,terceraparte,cuartaparte);
    }
    );
  }


  render() {
        const { resActivo,finish } = this.state;
     return (
       
       <div className="general">
          <PanelHistorico className="panelLeft" />
          {finish && <h3> fin del juego </h3>}
          
          {
            resActivo && resActivo.length>1 && !finish &&
              <ShowRound items={resActivo} parentCallbackSelected={this.callBackSelectedChamp} />
          }
          <Spinner show={this.state.showSpinner} />
          <Warning show={this.state.showError} message={this.state.errorMessage} callbackOwner={()=> this.setState({showError: false,loading:false})}/>
          <PanelHistorico className="panelRight" />
      </div>
      
    );
   }

  handleGenerate = (parteUno,parteDos,parteTres,parteCuatro) => 
  {
    this.setState({showSpinner: true});
    setTimeout(()=>{
      let resultadoUno = UtilShuffleArray(window.spotIt(parteUno));
      let resultadoDos = UtilShuffleArray(window.spotIt(parteDos));
      let resultadoTres = UtilShuffleArray(window.spotIt(parteTres));
      let resultadoCuatro = UtilShuffleArray(window.spotIt(parteCuatro));
      this.resParte = [resultadoUno,resultadoDos,resultadoTres,resultadoCuatro];
      let activo = this.GetRandomRounds(resultadoUno);
      this.setState({
        resActivo: activo,
        showSpinner: false,
        loading:false
      });
    }, 0);
  }

}

export default ListApp;