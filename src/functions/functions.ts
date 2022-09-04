const validateEmail = (email: any) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const validateName = (name: any) => {
    if(name.length === 0){
        return false;
    } else {
        return true;
    }
  }

  const validatePassword = (password: any) => {
    if(password.length < 8){
        return false;
    } else {
        return true;
    }
  }

  export { validateEmail, validateName, validatePassword };