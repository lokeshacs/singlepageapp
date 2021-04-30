import { CompanyService } from './../company.service';
import { Subscription } from 'rxjs';
import { Employee } from './../employee';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-get-company',
  templateUrl: './get-company.component.html',
  styleUrls: ['./get-company.component.css']
})
export class GetCompanyComponent implements OnInit {
  public templateList: Employee[];

  private subscriptionGetAllEmp$: Subscription;

  constructor(private company: CompanyService) { }

  ngOnInit() {
    this.getAllEmployee();
    this.company.eventEmmiter.addListener('created' , (data) => {
        this.getAllEmployee();
    });
  }

  getAllEmployee() {
    this.subscriptionGetAllEmp$ = this.company.getAllEmployee().subscribe(
      (data: Employee[]) => {
        
        console.log(data)
        this.templateList = data;
      },
      (error) => {
        alert('faliled to get employee');
      }
    );
  }

  deleteEmployee(id : number){
      this.company.deleteEmployee(id).subscribe(
        (data) => {
          
          this.getAllEmployee();
          alert('deleted successfully')
        },
        (error) => alert('failed to delete')
      );
  }

  editEmployee(data , id){
      this.company.eventEmmiter.emit('editemp' , data , id);
  }

  ngOnDestroy() {
    this.subscriptionGetAllEmp$.unsubscribe();
  }

}
