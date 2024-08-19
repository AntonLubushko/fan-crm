## Description

Move docker-compose.yml to another directroy and in that directory apply:

```bash
$ docker-compose up -d
```

it will run mysql database with proper credentials.

Then go to the root of the project and type:

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```

Then go to jwt.io and compose a token. Make sure, that in a payload
you paste an "expire" field with date in seconds, that greater, than
this date.
Example  
"expire": 1724184622

And do not forget to paste in secret-field below a secret word: secpass

Then your token is ready. Copy it and paste in a header of any request.
It should look like in a header:
Authorization: some_token

Then send requests. First it is better to send post request to create first user.

POST localhost:3000/api/v1/add-user
body {
"name": "Anton",
"email": "anton@gmail.com",
"phone": "+380934463331"
}
headers
Authorization: some_token

And get-request.

GET localhost:3000/api/v1/get-user/:id
headers
Authorization: some_token

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
