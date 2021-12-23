const errorHandlers = (err, req, res, next) => {
  let code;
  console.log(err)
  let name = err.name;
  let message;

  switch (name) {
      case 'REQUIRED':
          code = 500;
          message = 'Email or Password Required'
          break;
          case 'LOGIN_FAILED':
          code = 404;
          message = 'Incorrect Email or Password!!'
          break;
      case 'NOT_FOUND':
          code = 404;
          message = 'User Not Found! Please SignUp!'
          break;
      case 'INVALID_TOKEN': 
          code = 401;
          message = 'You dont have access!!'
          break;
      case 'MISSING_TOKEN':
          code = 404;
          message = 'Token is Required'
          break;
      case 'ALREADYEXIST' :
          code = 500;
          message = 'Email Already Exist'
          break;
      case 'VALID' :
          code = 500;
          message = 'fill a valid request'
          break;
      case 'PRODUCTNOTFOUND' :
          code = 404;
          message = 'Product not found'
          break;
      case 'QUANTITYLESS' :
          code = 500;
          message = 'Product Quantity Less'
          break;
      case 'USEREXIST' :
          code = 500;
          message = 'User address already exist'
          break;
      case 'CATEGORYEXIST' :
          code = 500;
          message = 'Category Already Exist'
          break;
      default:
          code = 500;
          message = 'Internal Server Error'
          break;
  }
  res.status(code).json({ success: false, message });
}
module.exports = errorHandlers