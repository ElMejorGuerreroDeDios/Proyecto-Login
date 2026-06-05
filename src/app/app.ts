import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  usuario: string = '';
  password: string = '';
  mensaje: string = '';

  constructor(private http: HttpClient) {}

  register() {
    this.http.post<any>('http://localhost:3000/register', {
      usuario: this.usuario,
      password: this.password
    }).subscribe({
      next: res => {
        this.mensaje = res.message;
        this.usuario = '';
        this.password = '';
      },
      error: err => {
        this.mensaje = 'Error al registrar usuario';
        this.usuario = '';
        this.password = '';
      }
    });
  }

  login() {
  this.http.post<any>('http://localhost:3000/login', {
    usuario: this.usuario,
    password: this.password
  }).subscribe({
    next: (res) => {
      this.mensaje = res.message;

      if (res.success) {
        alert('✅ Login correcto');
      } else {
        alert('❌ ' + res.message);
      }
    },
    error: () => {
      this.mensaje = 'Error en el servidor';
      alert('⚠️ Error en el servidor');
    }
  });
}

}