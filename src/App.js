import React,{Component} from 'react';
import './App.css';
import { InventarioService } from './service/InventarioService';
import {DataTable} from 'primereact/datatable'
import {Column} from 'primereact/column';
import { Panel } from 'primereact/panel';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

import 'primeflex/primeflex.css';
import 'primereact/resources/themes/nova/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default class App extends Component{
  constructor(){
    super();
    this.state = {visible: false,
      inventario:{
        idMedicamento:0,
        nombreMed:'',
        sustanciaAct:''
      },selectedInventario: {

      }
    }

    this.items = [
      {
        label : 'Nuevo',
        icon : 'pi pi-fw pi-plus',
        command : () => {this.showSaveDialog()}
      },
      {
        label : 'Editar',
        icon : 'pi pi-fw pi-pencil',
        command : () => {this.showEditDialog()}
      },
      {
        label : 'Eliminar',
        icon : 'pi pi-fw pi-trash',
        command : () => {this.delete()}
      }
    ];
    this.inventarioService = new InventarioService();
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.footer = (
      <div>
        <Button label="Guardar" icon = "pi pi-check" onClick={this.save}/>
      </div>
    )
  }
  
  componentDidMount(){
    this.inventarioService.getAll().then(data => this.setState({inventarios: data}));
    this.setState({
      visible:false,
    });
  }

  save(){
    this.inventarioService.save(this.state.inventario).then(data => {
      this.setState({
        visible: false,
        inventario:{
          idMedicamento:null,
          nombreMed:null,
          sustanciaAct:null
        }
      });
      this.inventarioService.getAll().then(data => this.setState({ inventarios: data }));
    })
  }

  delete() {
    if(window.confirm("¿Realmente desea eliminar el registro?")) {
      this.inventarioService.delete(this.state.selectedInventario.idMedicamento).then(data => {
        this.inventarioService.getAll().then(data => this.setState({inventarios: data}));
      });
    }
  }

  render(){
    return (
    <div style={{widht:'80%', marginTop: '20px', margin: '0 auto'}}>
      <Menubar model={this.items}/>
      <Panel header="Inventario">
          <DataTable value ={this.state.inventarios} selectionMode="single" selection={this.state.selectedInventario} onSelectionChange={e => this.setState({ selectedInventario: e.value })}>
            <Column field="idMedicamento"></Column>
            <Column field="nombreMed"></Column>
            <Column field="sustanciaAct"></Column>
          </DataTable>
      </Panel>
      <Dialog header="Registrar cambios" visible = {this.state.visible} style={{width:'400px'}} footer={this.footer} modal={true} onHide={() => this.setState({visible: false})}>
          <br/>
          <span className="p-float-label">
            <InputText style={{width:"100%"}} value={this.state.nombreMed} id="nombreMed" onChange={(e) => {
              let val=e.target.value;
              this.setState(prevState => {
                let inventario = Object.assign({}, prevState.inventario)
                inventario.nombreMed = val;
              
                return {inventario};
            })
          }
          }/>
            <label htmlFor="nombreMed">Nombre del medicamento</label>
          </span>
          <br/>
          <span className="p-float-label">
            <InputText style={{width:"100%"}} value={this.state.sustanciaAct} id="sustanciaAct" onChange={(e) => {
              let val=e.target.value;
              this.setState(prevState => {
              let inventario = Object.assign({}, prevState.inventario)
              inventario.sustanciaAct = val;
              
              return {inventario};
          })}}/>
            <label htmlFor="sustanciaAct">Sustancia Activa</label>
          </span>
          <br/>
        </Dialog>
    </div>
    )
  }
  showSaveDialog() {
    this.setState({
      visible: true,
      inventario:{
        idMedicamento:null,
        nombreMed:null,
        sustanciaAct:null
      }
    });
  }
  showEditDialog() {
    this.setState({
      visible: true,
      inventario:{
        idMedicamento:this.state.selectedInventario.idMedicamento,
        nombreMed:this.state.selectedInventario.nombreMed,
        sustanciaAct:this.state.selectedInventario.sustanciaAct
      }
    })
  }
}
