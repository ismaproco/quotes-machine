# Quotes Machine app

App Folder Structure
- app: Backend of the application
- web: web application
- client: Service to load quotes into the app


For DB is recommended to use the following docker image:
```
docker run -p 5432:5432 --name postgres-db -d postgres:latest
```

A blank postgres server will start with credentials
```
user: posgres
password: posgres
```

Then run the scripts that are located in ***/db_scripts***


