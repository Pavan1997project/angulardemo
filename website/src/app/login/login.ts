import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true, // ✅ optional but recommended
  imports: [],
  templateUrl: './login.html',
  styleUrls: ['./login.css'] // ✅ fixed
})
export class Login {}
