import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-test-user',
  templateUrl: './test-user.component.html',
  styleUrls: ['./test-user.component.css']
})
export class TestUserComponent implements OnInit {

  registerForm: FormGroup

  constructor() { }

  ngOnInit() {
  }
  onSubmit(){
    
  }

}
