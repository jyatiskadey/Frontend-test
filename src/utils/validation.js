export const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
  export const isValidContact = (contact) =>
    /^[0-9]{10}$/.test(contact);
  