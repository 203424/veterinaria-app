import axios from 'axios';

export class InventarioService{
    baseURL = "http://localhost:8080/api/inventarios"
    getAll(){
        return axios.get(this.baseURL).then(res => res.data);
    }

    save(inventario){
        return axios.post(this.baseUrl, inventario).then(res => res.data);
      }
  
    delete(idMedicamento) {
      return axios.delete(this.baseUrl+idMedicamento).then(res => res.data); 
    }
}