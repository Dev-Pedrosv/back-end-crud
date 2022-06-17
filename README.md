# back-end-test

baseUrl : https://test-crud-users.herokuapp.com

Middleware : Que não deixam cadastrar usuários com o mesmo nome de usuário ou e-mail e que a senha não possa ser menor do que 6 digitos.
Middleware: Para me trazer o indice do usuário para deletar ou fazer uma atualização dos dados.

Rotas:
  - POST: baseUrl/createUser : Cada usuário tem nome, e-mail, senha e nome de usuário. As senhas precisam ter pelo menos 6 caracteres.
  - GET: baseUrl/getUsers: Lista todos os usuários, com os dados : userId, nome, e-mail e nome de usuário.
  - DELETE: baseUrl/deleteUser/:id : Delete o usuário com o mesmo ID enviado pela query params
  - PUT: baseUrl/updateUsers/:id : Atualiza os dados do usuário com o mesmo ID enviado pela query params
