# graphql-sample
GraphQL by example

The purpose of this is nothing more than a reference for my GQL learning and will evolve it as I find best practices in working with the technology. Being a late-joiner in this technology, there may have been more updated methods that I might have not used or understood so this is not a best practice sample and more a personal learn as you go kind of documentation.

# Sample App
The sample app assumes a GQL service that provides stock market information. We will utilize the current tools recommended by GraphQL like Apollo Client and Server and not delve much into rewriting what already exists. The code base is split off into 2 separate project folders namely 'client' and  'server' which can be ran using npm run start. 

# How it works

## Apollo server express middleware
We utilize the apollo server middleware and retrieve the req + res in the context.
https://www.apollographql.com/docs/apollo-server/api/apollo-server/#middleware-specific-context-fields

## GraphQL Tools (@graphql-tools)
We utilize the garphql-tool's merge and load-files to ease and improve the readability and segragation of our codes. https://www.graphql-tools.com/

## JWT for Authentication
express-jwt

## NotARealDB for data source 
In order to mock a real database, we utilize the notarealdb module.

# Runing the server only with GrahQL Browser Tool or Postman
Execute using 'npm run start' and go to 'localhost:8080/graphql'. perform simple queires like the following
```
query {
  stock(id: 1){
		id
    symbol
    title
    industry{
      id
      title
    }
  }
}
```

```
query {
  industries{
		id
    title
    stocks{
      id
      symbol
      title
    }
  }
}
```

```
mutation CreateStock($input: CreateStockInput!){
  createStock(input: $input){
		id
    title
  }
}
```

! Note: The these will fail if you have not yet logged the user and received the JWT token, you can use POSTMAN and send a POST request to http://localhost:8080/login first with a JSON body like so
```
{
    "email": "admin@stocks.com",
    "password": "admin123"
}
```

you will receive a JWT token code which you need to attach to the mutation request like so
```
{
    "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTYxNDIzNzU4M30.QBqlQ1OEVeoNmYlt2ErYJGOPS1llmpn-vW_BaFQdFiXwc35pu9PnX9lwjrBHALz1mZW-JRJ-qDFGk1KbHxBl9Csbs8ZsZC4WnH3u8I_A2KxlSZw0OUJ66x1IPfCQQa0krK72DKiOHTB4lHdaIo50KTK-nds_buTaizBWBGw4Iipns_Qq4zEroio8TebZgQ9t4eESAmCV4sxdYpBmOqxIg2fSxJOAstkxLYsLvZXsw3Cx4GSB0KJnsmPre8C9pNmAqd-3zotauG2ln419PMxsOVlivgmSZcvta8IEHL3q8_jvEHvszlnEakIOlLqmvZJp1xhfnwXUmfXw9XZAuN_j_Q"
}
```

Going back to your GraphQL tool, enter the Authorization token using the Bearer format in the HTTP Headers 
```
{
	"Authorization": "Bearer <add token value here>"
}
```


# RSA Keys for JWT
As we use RSA, we need to generate and store the public and private keys to use.
to generate just run the following inside the keys folder
```
ssh-keygen -t rsa -b 2048 -m PEM -f jwtRS256.key
# Don't add passphrase
openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
```
for this guide, we share the generated keys in the repo. replace these in a real system

# Using the client sample app
Sample client app is based on ReactJS and utilizes the apollo-client to perform the GQL resuests.
Just use 'npm run start' under the 'client' folder and go to 'localhost:3000' 