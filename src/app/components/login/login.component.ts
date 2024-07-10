import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | undefined;

  constructor(private employeeService: EmployeeService, private router: Router) { }

  onSubmit() {
    if (this.username && this.password) {
      this.employeeService.authenticate(this.username, this.password).subscribe(
        data => {
          const employee = data.find((emp: any) => emp.employee_name === this.username && emp.id.toString() === this.password);
          if (employee) {
            if (employee.role === "admin") {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/employee']);
            }
          } else {
            this.errorMessage = 'Invalid username or password.';
          }
        },
        error => {
          console.error('Error fetching employee data', error);
          this.errorMessage = 'An error occurred while trying to authenticate.';
        }
      );
    } else {
      this.errorMessage = 'Username and password are required.';
    }
  }

  employees = []

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(
      data => {
        this.employees = data.filter((emp: any) => emp.role !== 'admin');
        console.error(this.employees , 'EMP');

      },
      error => {
        console.error('Error fetching employee data', error);
      }
    );
  }
}
