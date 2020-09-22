export class ValidationService {


    static getValidatorErrorMessage(validatorName: string) {
      let config = {
        'invalidMail': ' \n Invalid email address ',
        'invalidPassword': ' \nInvalid password ',
        'confirmPassword' : ' \n Password doesnt match',
        'invalidJMBG' : ' \n Invalid JMBG',
        'invalidMojBroj' : ' \n Invalid MojBroj'
      };
      return config[validatorName];
    }
  
    
  
    static emailValidator(control) {
     
      if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
        return null;
      } else {
        return { 'invalidEmailAddress': true };
      }
    }
  
    static passwordValidator(control) {
      if (control.value.match(/^(?=.{8,12}$)([A-z])(?=.*[a-z].*[a-z].*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)(?:([\w\d*?!@#$%:;])\2?(?!\2))+$/)) {
        return null;
      } else {
        return { 'invalidPassword': true };
      }
    }
    static mojBrojValidator(control) {
      if(control.value.match(/^[0-9()+\-*/.\s]+$/)){
        return null;
    }else{
        return{'invalidMojBroj':true};
    }
    }
    static anagramValidator(control) {
      if(control.value.match(/^[a-zA-Z\s]+$/)){
        return null;
    }else{
        return{'invalidMojBroj':true};
    }
    }

    static jmbgValidator(control){
        if(control.value.match(/^[0-9]{13}$/)){
            return null;
        }else{
            return{'invalidJMBG':true};
        }
    }
    
  }