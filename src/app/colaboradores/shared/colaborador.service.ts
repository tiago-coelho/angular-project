import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ColaboradorService {

  colaborador: any;

  constructor(private http: HttpClient) { }

  getColaborador(name, callback) {
    this.http.get(`http://localhost:3000/v1/users?name=${name}`)
    .subscribe(
      (data: any[]) => {
        callback(data);
      }
    );
  }

  verificaEmail(email, callback) {
    this.http.get(`http://localhost:3000/v1/users?email=${email}`)
      .subscribe(
        (data: any[]) => {
          callback(data);
        }
      );
  }

  getColaboradores(callback) {
    this.http.get(`http://localhost:3000/v1/users`)
      .subscribe(
        (data: any[]) => {
          callback(data);
        }
      );
  }

  postColaborador(form) {
    if (form.status === 'VALID') {
      this.http
      .post(`http://localhost:3000/v1/users`, form.value)
      .subscribe(data => {
      },
      err => {
        alert('Algum erro ocorreu. Tente novamente.');
      },
      () => {
        alert('Usuário cadastrado com sucesso');
      }
      );
    } else {
      alert('Formulario Invalido. Preencha os campos corretamente');
    }
  }

  excluirColaborador(id): Observable<any> {
    return this.http.delete(`http://localhost:3000/v1/users/${id}`).map((res: Response) => {});
  }

  alterarColaborador(id, form, cadastro): Observable<any> {
    console.log(cadastro);
    form.cadastro = cadastro;
    console.log('teste');
    return this.http.put(`http://localhost:3000/v1/users/${id}`, form).map((res: Response) => {});
  }

  getColab() {
    return this.colaborador;
  }
  setColaborador(colaborador) {
    this.colaborador = colaborador;
    console.log(this.colaborador);
  }
}
