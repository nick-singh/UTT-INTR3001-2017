### Users API

**Users API documentation**:

Get All Users

> url request     : /users

> method          : get

> response        : [{"id":"127","gender":"female","company":"VENOFLEX","email":"tessaburris@venoflex.com"}...]

> description     : Returns an array containing all users data

Create User

> url request     : /users

> method          : post  

> request body    : {"gender":"female","company":"VENOFLEX","email":"tessaburris@venoflex.com"}

> response        : {"id":"127","gender":"female","company":"VENOFLEX","email":"tessaburris@venoflex.com"}

> description     : When posting a new users, the request needs the user object, the  
                  response contains the complete user object with the id from the db

Get User By Id

> url request       : /users/{id}

> method            : get

> url example       : /users/127

> response          : {"id":"127","gender":"female","company":"VENOFLEX","email":"tessaburris@venoflex.com"}

> description       : Request url requires an "id" after the path to retrieve the
                    user with that "id" from the database

Update User By Id

>url request       : /users/{id}

>method            : put

>url example       : /users/127

>request body      : {"gender":"female","company":"New Company","email":"tessaburris@newcompany.com"}

>response          : {"status":202}

>description       : Request url require an "id" to identify record to be updated
                    from db. The request also requires the updated user object
                    to be saved to the database

Delete User By Id                    

>url request       : /users/{id}

>method            : delete

>url example       : /users/127

>response          : {"status":200}

>description       : Request url requires an "id" to identify the record from the
                    db to be removed
