// Form options and constants
export const DEPARTMENTS = [
     { value: '', label: 'Select your department' },
     { value: 'CSE', label: 'Computer Science' },
     { value: 'CSAI', label: 'CS(AI)' },
     { value: 'CY', label: 'Cyber' },
     { value: 'AI-DS', label: 'AI and Data Science' },
     { value: 'ECS', label: 'Electronics and Computer' },
     { value: 'ECE', label: 'Electronics and Communication' },
     { value: 'EEE', label: 'Electrical and Electronics' },
     { value: 'MECH', label: 'Mechanical' },
     { value: 'CIVIL', label: 'Civil' }
];

export const SEMESTERS = [
     { value: '', label: 'Select your semester' },
     { value: '1', label: 'First Sem' },
     { value: '2', label: 'Second Sem' },
     { value: '3', label: 'Third Sem' },
     { value: '4', label: 'Fourth Sem' },
     { value: '5', label: 'Fifth Sem' },
     { value: '6', label: 'Sixth Sem' },
     { value: '7', label: 'Seventh Sem' },
     { value: '8', label: 'Eighth Sem' }
];

export const ROLES = [
     { value: 'student', label: 'Student' },
     { value: 'faculty', label: 'Faculty' }
];

export const INITIAL_FORM_DATA = {
     name: '',
     email: '',
     password: '',
     dept: '',
     year: '',
     phone: '',
     role: 'student'
};