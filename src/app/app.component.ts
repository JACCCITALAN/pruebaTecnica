import { Component } from '@angular/core';
import axios, { AxiosResponse } from "axios";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'pruebaTecnica';
  public  ocultaInicio:Boolean = false;
  public listProveedorGap: Array<any> = [];
  
  fnOcultarBienvenida = (): void => {
    this.fnGetLisProv();
    this.ocultaInicio = true;    
};

fnGetLisProv = () => {
  this.getListProveedoresService()
      .then((response: AxiosResponse) => {
        if (this.isValidResponse(response)) {
          this.listProveedorGap = response.data;
        }
         console.log(response);
      })
      .catch((err: any) => {
        console.log(err);
      });
}

getListProveedoresService = async (): Promise<AxiosResponse> => {
  const urlGetProveedor = "http://localhost:8080/api/getProveedores";
  return await axios({
    method: "GET",
    data: [],
    url: urlGetProveedor
}).catch((errorService: any) => {
      let errorResponse: AxiosResponse;
      errorResponse = errorService.response;
      return errorResponse;
  });
};

isValidResponse = (response: AxiosResponse): Boolean => {
  let isValidResponse: Boolean = false;
  if (response) {
      if (response.status === 200) {
          if (response.data) {
              isValidResponse = true;
          }
      }
  }
  return isValidResponse;
};

}

