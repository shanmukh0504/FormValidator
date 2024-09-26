export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const validateUsername = (username: string, minLength: number, maxLength: number): {valid: boolean; message: string} => {
    if (minLength && username.length < minLength) {
      return { valid: false, message: `Username must be at least ${minLength} characters.`};
    } if (maxLength && username.length > maxLength) {
      return {valid: false, message: `Username must be no more than ${maxLength} characters.`};
    }
    return {valid: true, message:''};
  };
  
  export const validateNumber = (age: number, min: number, max: number): {valid: boolean; message: string} => {
    if (age < min) {
      return { valid: false, message: `Age must be at least ${min}.`};
    } if (age > max) {
      return {valid: false, message: `Age must be no more than ${max}.`};
    }
    return {valid: true, message:''};
  };

  export const validatePassword = (password: string): { valid: boolean; message: string } => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
    if (password.length < minLength) {
      return { valid: false, message: `Password must be at least ${minLength} characters long.` };
    }
    if (!hasUpperCase) {
      return { valid: false, message: 'Password must contain at least one uppercase letter.' };
    }
    if (!hasLowerCase) {
      return { valid: false, message: 'Password must contain at least one lowercase letter.' };
    }
    if (!hasDigit) {
      return { valid: false, message: 'Password must contain at least one digit.' };
    }
    if (!hasSpecialChar) {
      return { valid: false, message: 'Password must contain at least one special character.' };
    }
  
    return { valid: true, message: '' }; // Return an empty string for a valid password
  };
  