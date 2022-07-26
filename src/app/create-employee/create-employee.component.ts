import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  isExist = false;
  existMsg = ''
  constructor(private employeeService: EmployeeService, private router: Router, private formBuilder: FormBuilder) { }

  employee: Employee = new Employee();
  // myForm!: FormGroup;
  submitted = false;


  myForm: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    emailId: new FormControl('', [Validators.required, Validators.email]),
    
  });

  ngOnInit(): void {

    // this.myForm = this.formBuilder.group({
    //   firstName: ['', Validators.required],
    //   lastName: ['', Validators.required],
    //   emailId: ['', Validators.required]
    //   });
  }

  saveEmployee () {
    this.employeeService.createEmployee(this.employee).subscribe(data =>{
      // console.log("data "+data)
    });
   
    this.employeeList();
  }

  employeeList() {
    this.router.navigate(['/employees']);
  }

  onSubmit() {
    
    this.myForm.markAllAsTouched();
    this.employeeService.getEmployeeByEmail(this.employee.emailId).
    toPromise()
    .then((data)=>{  
      if (data) {
        this.existMsg =  'This email already exist!';
        return
      } else {
        this.submitted = true;
        if(this.myForm.invalid) {
          return
        } 
        this.saveEmployee();
      }
    
    })
  
  }
}
