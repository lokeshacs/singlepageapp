export interface Employee {

  name: string;
  gender: 'Male' | 'Female';
  email: string;
  age: number;
  maritalStatus: 'Married' | 'Unmarried';
  description: string;
  id?: number;
}
