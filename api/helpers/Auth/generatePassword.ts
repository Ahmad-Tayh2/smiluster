export function generatePassword (): string {
    const symbols = '!@#$%^&*()_+-={}[]\\|;:\'",.<>?/~`';
    const length = Math.floor(Math.random() * (20 - 12 + 1)) + 12;
    let password = '';
  
    for (let i = 0; i < length; i++) {
      const type = Math.floor(Math.random() * 3);
  
      if (type === 0) {
        password += String.fromCharCode(Math.floor(Math.random() * 26) + 97);
      } else if (type === 1) {
        password += String.fromCharCode(Math.floor(Math.random() * 26) + 65);
        password += Math.floor(Math.random() * 10);
      }
  
      if (i < length - 1) {
        password += symbols[Math.floor(Math.random() * symbols.length)];
      }
    }
  
    return password;
  }
