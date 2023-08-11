# IsAvailable Reservation App
IsAvailable Reservation App is an application to handle reservations from all types of business.
&nbsp;

## RESTful Endpoints
---
### POST /generate-midtrans-token

> Create a midtrans token for payment

_Request Header_
```json
not needed
```

_Request Body_
```json
{
    "productId": "1",
    "email": "example@mail.com"
}
```

_Response (200 - OK)_
```json
{
    "token": "7487325e-1324-45d2-aa66-2d88ebaf3660",
    "redirect_url": "https://app.sandbox.midtrans.com/snap/v3/redirection/7487325e-1324-45d2-aa66-2d88ebaf3660"
}
```

_Response (404 - Not Found)_
```json
{
    "message": "Data not found"
}
```

### GET /availability/:username

> Get all cuisines

_Request Header_
```json
not needed
```

_Request Body_
```
not needed
```

_Request Params_
```
username: <string>
```

_Response (200 - OK)_
```json
{
    "6": [
        {
            "productId": 1,
            "productName": "Studio Lennon",
            "productPrice": 60000,
            "availableSessions": [
                {
                    "sessionId": 1,
                    "sessionName": "13.00 - 17.00"
                },
                {
                    "sessionId": 2,
                    "sessionName": "19.00 - 23.00"
                }
            ]
        },
        {
            "productId": 2,
            "productName": "Studio Koes",
            "productPrice": 80000,
            "availableSessions": [
                {
                    "sessionId": 3,
                    "sessionName": "13.00 - 17.00"
                },
                {
                    "sessionId": 4,
                    "sessionName": "19.00 - 23.00"
                }
            ]
        },
        {
            "productId": 3,
            "productName": "Studio Hardjosoebroto",
            "productPrice": 100000,
            "availableSessions": [
                {
                    "sessionId": 5,
                    "sessionName": "13.00 - 17.00"
                },
                {
                    "sessionId": 6,
                    "sessionName": "19.00 - 23.00"
                }
            ]
        }
    ],
    ...
}
```

---
### POST /register

> Register a new user

_Request Header_
```json
not needed
```

_Request Body_
```json
{
  "username": "theexample",
  "email": "example@mail.com",
  "password": "passwordExample123",
  "pageName": "Example Bussiness",
  "pageDescription": "A good example for a description",
  "imgAttachment": "/example-path"
}
```

_Response (201 - Created)_
```json
{
    "message": "User @theexample registration success"
}
```

_Response (400 - Bad Request)_
> The example below lists all possible messages, the actual message will depend on the violation.
```json
{
    "message": "User.email cannot be null"
}

or

{
    "message": "User.password cannot be null"
}

or

{
    "message": "User.username cannot be null"
}

or

{
    "message": "User.pageName cannot be null"
}


```
---
### POST /login

> Log a user in

_Request Header_
```json
not needed
```

_Request Body_
```json
{
  "email": "example@mail.com",
  "password": "passwordExample123"
}
```

_Response (200 - OK)_
```json
{
  "access_token": "<an access token>"
}
```

_Response (400 - Bad Request)_
```json
{
    "message": "Email is required"
}

or

{
    "message": "Password is required"
}
```

_Response (401 - Unauthorized)_
```json
{
    "message": "Invalid email/password"
}
```

---
### Global Error
_Response (500 - Internal Server Error)_
```json
{
    "message": ["Internal Server Error."]
}
```