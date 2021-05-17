import { Component, OnInit } from '@angular/core';
import { GardenService } from '../garden.service'; 
import { ApplicationUser } from '../login/applicationUser';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  constructor(private gardenService: GardenService) { }

  fullname = "";
  username = "";
  email = "";
  password = "";
  applicationUser!: ApplicationUser;
  errorMessage = "";
  

  ngOnInit(): void {
  }

  onSubmit() {
    this.gardenService.createAccount({'fullname': this.fullname, 'email': this.email, 'username': this.username,  'password': this.password})
      .subscribe(
        user => this.applicationUser = user,
        error => this.errorMessage = <any>error
        );
  }

}
