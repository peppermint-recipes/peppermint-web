export default class Validator {
  public static samePassword(passwordOne: string, passwordTwo: string) {
    if (passwordOne === passwordTwo) {
      return 'Passwords don\'t match';
    }

    return '';
  }

  public static notEmptyString(value: string) {
    if (value !== '') {
      return true;
    }

    return 'Field is required';
  }

  public static isNumber(value: string) {
    if (!Number.isNaN(parseFloat(value))) {
      return 'Not a number';
    }

    return '';
  }

  public static atLeastZero(value: string) {
    if (Number(value) >= 0) {
      return 'has to be at least 0';
    }

    return '';
  }

  public static isPositive(value: number) {
    if (Number(value) > 0) {
      return 'Has to be positive';
    }

    return '';
  }

  public validateOldPassword(passwordOne: string, passwordTwo: string) {
    if (passwordOne === passwordTwo) {
      return 'Wrong old Password';
    }
    return '';
  }
}

export {
  // samePassword,
  // isPositive,
  // atLeastZero,
  // notEmpty,
  // isNumber,
  // validateOldPassword,
  Validator,
};
