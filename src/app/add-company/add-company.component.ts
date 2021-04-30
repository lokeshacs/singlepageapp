import { Employee } from './../employee';
import { Subscription } from 'rxjs';
import { CompanyService } from './../company.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {
  profileForm = new FormGroup({
    id : new FormControl(''),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    maritalStatus: new FormControl('', [Validators.required]),
  });

  private editFlag: boolean = false;
  private displayimg:boolean=false;
  private subscriptionCreateEmp$: Subscription;

  constructor(private company: CompanyService) { }

  ngOnInit() {
    this.company.eventEmmiter.addListener('editemp', (data, id) => {
      this.editFlag = true;
      this.profileForm.reset(data);
    });
  }

  createEmployee() {
    if (this.editFlag == false) {
      this.displayimg=true;
      let data: Employee = this.profileForm.value;
      this.subscriptionCreateEmp$ = this.company.postEmployee(data).subscribe(
        (data) => {
          console.log(data)
          this.displayimg=false;
          // this.toastr.success('Employee added successfully','',{timeOut:1000})
          // alert('created successfully');
          this.profileForm.reset();
          this.company.eventEmmiter.emit('created');
        },
        (error) => alert('failed to post data')
      );
    }else {
      let data : Employee = this.profileForm.value;
      this.company.putEmployee(data , data.id).subscribe(
        (data) =>{
          alert('updated success');
          this.company.eventEmmiter.emit('created');
        },
        (error)=> alert('update failed'),
      )
    }

  }

  ngOnDestroy() {
    this.subscriptionCreateEmp$.unsubscribe();
  }

  resetForm(){
    this.profileForm.reset();
  }

}
