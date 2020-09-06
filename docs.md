<h1 align="center">
  :rocket: Aftersale - Teste Backend | Docs
</h1>

Esse projeto é um serviço que faz a integração com uma loja [Shopify](https://www.shopify.com.br/) e permite os usuários favoritar e desfavoritar produtos. Os usuários também podem ver a sua lista de favoritos. Para isso o usuário deve se cadastrar e se autenticar no serviço.

Esse projeto foi desenvolvido durante o processo seletivo da [Aftersale](https://after.sale/).

## EndPoints

- **POST v1/users**: Cria um novo usuário

Request:

```json
{
  "name": "Danilo",
  "email": "danilo@gmail.com",
  "password": "123123"
}
```

Response 201:

```json
{
  "id": 1
}
```

Response 400:

```json
{
  "statusCode": 400,
  "message": "User with same email already exists",
  "error": "Bad Request"
}
```

- **POST v1/auth**: Login

Request:

```json
{
  "email": "danilo@gmail.com",
  "password": "123123"
}
```

Response 200:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiY2FybG9zQGdtYWlsLmNvbSIsImlhdCI6MTU5OTQyMTA0MiwiZXhwIjoxNTk5NTA3NDQyfQ.v-2aNBobZWtTdx_-_GvFYBEkQWkjSLKoeRXK5fqVNTo"
}
```

Response 401:

```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

- **POST v1/products/:productId**: Adiciona produto nos favoritos

Headers

- Authorization: Bearer token

Response 200:

```json
{
  "productId": 4543367512203,
  "title": "Boné preto",
  "userId": 1,
  "id": 1,
  "createdAt": "2020-09-06T20:11:52.109Z",
  "updatedAt": "2020-09-06T20:11:52.109Z"
}
```

Response 400:

```json
{
  "statusCode": 400,
  "message": "This product is already in favorites",
  "error": "Bad Request"
}
```

Response 404:

```json
{
  "statusCode": 404,
  "message": "Product not found",
  "error": "Not Found"
}
```

- **DELETE v1/products/:productId**: Remove produto dos favoritos

Headers

- Authorization: Bearer token

Response 204:

No body returned for response

Response 404:

```json
{
  "statusCode": 404,
  "message": "Product not found",
  "error": "Not Found"
}
```

- **GET v1/products**: Lista os produtos favoritos

Headers

- Authorization: Bearer token

Response 200:

```json
{
  "total": 1,
  "favorites": [
    {
      "id": 1,
      "productId": "4543367512203",
      "title": "Boné preto",
      "userId": 1,
      "createdAt": "2020-09-06T20:19:12.194Z",
      "updatedAt": "2020-09-06T20:19:12.194Z"
    }
  ]
}
```
