## Endpoints

List of Available Endpoints:
- `POST /login`
- `POST /register`


### POST /login
#### Description
- Login
#### Request
- Body
    ```json
    {
      "email": String,
      "password": String,
    }
    ```
#### Response
_200 - OK_

    ```json
    {
        statusCodes: 200,
        access_token,
        username: data.username
    }
    ```

### POST /register
#### Description
- Create new user

#### Request
- Body
    ```json
    {
      "username": String,
      "email": String,
      "password": String,
      "phoneNumber": String,
      "address": String
    }
    ```
#### Response
_201 - Created_

    ```json
    {
        statusCode: 201,
        message: `User has been created`
    }
    ```

### Error
#### Response
_500 - Internal Server Error_
- Body
    ```json
    {
      "statusCode": 500,
      "error": {
        "message": "Internal Server Error"
      }
    }
    ```
_401 - Token Invalid_
- Body
    ```json
    {
        statusCode: 401,
        message: err.name
    }
    ```
_404 - Not Found_
- Body
    ```json
    {
        statusCode: 404,
        message: err.name
    }
    ```
_403 - Forbidden_
- Body
    ```json
    {
        statusCode: 403,
        message: err.name
    }
    ```
_400 - SequelizeValidationError / SequelizeUniqueConstraintError_
- Body
    ```json
    {
        statusCode: 400,
        message: errors
    }
    ```
_401 - Email or Username and Password is Invalid_
- Body
    ```json
    {
        statusCode: 401,
        message: err.name
    }
    ```
_400 - Input Invalid_
- Body
    ```json
    {
        statusCode: 400,
        message: err.name
    }
    ```