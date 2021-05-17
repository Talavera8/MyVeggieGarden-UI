import { Component, OnInit } from '@angular/core';
import { GardenService } from '../garden.service'; 
import { ApplicationUser } from './applicationUser';
import { Router } from '@angular/router';
//import { UserLogin } from './userLogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = "";
  password: string = "";
  errorMessage = "";
  applicationUser!: ApplicationUser;

  constructor(private gardenService: GardenService, private router: Router) { }

  ngOnInit(): void {

  }

  onSubmit() {

    this.gardenService.logIn({'username': this.username, 'password': this.password})
        .subscribe(
          user => {this.applicationUser = user;
                   sessionStorage.setItem('applicationUserId', user.applicationUserId.toString());
                   this.router.navigate(['/shopping'])},
          error => this.errorMessage = <any>error
          );
  }
  
}
