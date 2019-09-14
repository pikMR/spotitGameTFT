import React, {Component} from 'react';
import Spinner from './Spinner';
import Warning from './Warning';
import PostData from '../../data/items.json';
import { UtilShuffleArray , PasarElementos, BuscaElementoArrayPorId, ObtieneElementoRandom} from '../logic/utils';
import ShowRound from './ShowRound';
import PanelHistorico from './PanelHistorico';

class ListApp extends Component {
    resSeleccionadosUser = [];
    resSeleccionadosAdversario = [];
    cuentaActivo = 0;
    resParte:[];
    resActivoUser:[];
    resActivoAdversario:[];

    constructor(props) {
        super(props);

        this.state = {
            loading:true,
            resActivo:[],
            showError: false,
            errorMessage: '',
            showSpinner: false,
            finish:false,
            seleccionadoUser:{},
            seleccionadoAdversario:{},
            selectedArrayUser:[],
            selectedArrayAdversario:[],
            puntosUsuario : 0,
            puntosAdversario: 0,
            noHistorico : false,
            ultimoRound: false
        };
    }

    /*
        #### Loader ####
    */

  ObtenerParte(data){
     return UtilShuffleArray(data.map(json=>{
        let _req = require(`./../../imagenes/${json.path}`);
        let newItem = 
        {
          imagen: _req,
          id: json.id,
          clase: json.class,
          puntos:0
        } 
        return newItem;
      })
     );
  }

  /*
    Cuando se monta el componente, 
    1) obtenemos datos del json
    2) dividimos en 4 partes aleatorias el json, con los elementos de la forma : [image,id,clase]
    3) llamada a handleGenerate para ejecutar script spotit y render.
  */
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

     /*
    Forma los elementos [image,id,clase] de 4 en 4 (round), en 4 arrays.
    resParte contiene los 4 arrays.
    empezamos por el primer array obteniendo el round (2 selecciones: user y adversario),
     y seguiremos el orden 1, 2, 3, 4 a sacar elementos según vayamos quemando rounds.
   */
  handleGenerate = (parteUno,parteDos,parteTres,parteCuatro) => 
  {
    this.setState({showSpinner: true});
    setTimeout(()=>{
      let resultadoUno = UtilShuffleArray(window.spotIt(parteUno));
      let resultadoDos = UtilShuffleArray(window.spotIt(parteDos));
      let resultadoTres = UtilShuffleArray(window.spotIt(parteTres));
      let resultadoCuatro = UtilShuffleArray(window.spotIt(parteCuatro));
      this.resParte = [resultadoUno,resultadoDos,resultadoTres,resultadoCuatro];
      let activo = this.GetPairRound(resultadoUno);
      this.setState({
        resActivo: activo,
        showSpinner: false,
        loading:false
      });
    }, 0);
  }

  /*
      #### Logica ####
  */

  /*
    Función ejecutada para actualizar la puntuación desde PanelHistorico,
    asignación desde el render parent (este mismo)
    para uso como prop desde el hijo. ( en este caso desde componentWillReceiveProps)
  */
  formPanelHistoricoUsuario(params) {
     this.setState({
        puntosUsuario : params,
        noHistorico : true
      })
  }
    formPanelHistoricoAdversario(params) {
     this.setState({
        puntosAdversario : params,
        noHistorico : true
      })
  }

  /*
     algoritmo quemador de rounds,
     quema rounds en 4 arrays hasta llegar a 3 elementos en cada array
     luego agrupa en uno, y los va cogiendo de ese en concreto, 
     a partir de ese momento el spotit ya no funciona como tal, 
     ya que en ese array podemos sacar parejas mezcladas.
  */
  callBackSelectedChamp = (selected) => {
    if(this.cuentaActivo === -1)
    {
      this.RenderHistoricoAlPasarDeRound(selected,this.resParte.length);
      return this.GetPairRound(this.resParte);
    }
      
    let cactivo = (this.cuentaActivo+1) % 4;
    let anterior_cactivo = this.cuentaActivo;
    if(this.resParte[cactivo].length!=3)
    {
      this.cuentaActivo = cactivo;
      this.RenderHistoricoAlPasarDeRound(selected,this.resParte[cactivo].length);
      return this.GetPairRound(this.resParte[cactivo]);
    }else{
      let i = cactivo;
      for (; i < this.resParte.length; i++) 
      {
          if(this.resParte[i].length!=3){
            this.cuentaActivo = i;
            this.RenderHistoricoAlPasarDeRound(selected,this.resParte[i].length);
            return this.GetPairRound(this.resParte[i]);
          }
      }
      this.resParte = PasarElementos([...this.resParte]);
      this.cuentaActivo = -1;
      this.RenderHistoricoAlPasarDeRound(selected,this.resParte.length);
      return this.GetPairRound(this.resParte);
    }
  }

  RenderHistoricoAlPasarDeRound(selected,restante){
    let _elemento_panel_adv = ObtieneElementoRandom(this.resActivoAdversario);
    let _elemento_panel_user;
    this.resSeleccionadosAdversario.push(_elemento_panel_adv);

    if(selected){
      let _id_selected = selected.currentTarget.alt;
      _elemento_panel_user = BuscaElementoArrayPorId(_id_selected,this.resActivoUser);
      this.resSeleccionadosUser.push(_elemento_panel_user);
    }

      this.setState(
        {
          ultimoRound: (restante === 2),
          seleccionadoUser: _elemento_panel_user,
          selectedArrayUser: this.resSeleccionadosUser,
          puntosUsuario: this.puntosUsuario,
          puntosAdversario: this.puntosAdversario,
          seleccionadoAdversario: _elemento_panel_adv,
          selectedArrayAdversario: this.resSeleccionadosAdversario,
          noHistorico: false,
          finish: (restante===0)
        }
      );
  }


  GetPairRound(data){
    return [this.GetRandomRow(data,true),this.GetRandomRow(data,false)];
  }

  /*
    Devuelve un round aleatorimante elegido dado una parteX
    Se almacena en resActivoUser/adversario el round quemado, para luego hacer match con el seleccionado,
    de esta forma obtenemos los datos buscando mediante id en el array de selección y no en uno con todo el contenido.
  */
  GetRandomRow(data,isUser){
    console.log(data);
    let sizeFlock = data.length;
    let resultado = [];
    if(sizeFlock > 0){
        let index = Math.floor(Math.random() * sizeFlock);
        resultado = [...data[index]] 
        if(isUser){
          this.resActivoUser = resultado;  
        }else{
          this.resActivoAdversario = resultado;  
        }
        
        data.splice(index,1); // elimina elemento seleccionado aleatoriamente dentro de resparte(data)
        return resultado; // devolvemos el round seleccionado aleatoriamente dentro de resparte
    }
  }

  render() {
        const { 
          resActivo,finish,seleccionadoUser,selectedArrayAdversario,
          selectedArrayUser,puntosUsuario, noHistorico,ultimoRound,seleccionadoAdversario, puntosAdversario
        } = this.state;

     return (
       <div className="general">
          <PanelHistorico 
          className="panelLeft" 
          item={seleccionadoUser} 
          arrayChamps={selectedArrayUser} 
          callback={this.formPanelHistoricoUsuario.bind(this)} 
          stop={noHistorico} 
          />
          {
            ((resActivo && resActivo.length > 0) || ultimoRound || finish) &&
            <ShowRound 
            items={resActivo} 
            parentCallbackSelected={this.callBackSelectedChamp} 
            puntosA={puntosUsuario}
            puntosB={puntosAdversario} 
            selectedsUserToModal={selectedArrayUser} 
            mostrarPanel={finish} />  
          }
          <Spinner show={this.state.showSpinner} />
          <Warning show={this.state.showError} 
          message={this.state.errorMessage} callbackOwner={()=> this.setState({showError: false,loading:false})}/>
          <PanelHistorico className="panelRight"
              item={seleccionadoAdversario} 
              arrayChamps={selectedArrayAdversario} 
              stop={noHistorico} 
              callback={this.formPanelHistoricoAdversario.bind(this)} 
          />
      </div>
    );
   }
}

export default ListApp;