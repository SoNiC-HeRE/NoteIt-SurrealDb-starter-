# NoteIt-SurrealDb-starter-template

This repo is a starter kit that sets up front-end and back-end of a simple react and node web-app using surrealdb. It is a basic note taking app that supports adding and deleting notes while fetching data from the local surrealdb instance.

<hr>

# How to setup local development environment: 

- Install surreal from official documentation. Refer [here](https://surrealdb.com/install).
  
- Start the server using:
  ```
  surreal start memory -A --auth --user root --pass root
  ```
  
- clone the repository and setup back-end and front-end seperately .

- cd frontend folder use `npm install` & cd backend and use `npm install`.

- type `npm start` in the frontend dir and `node app.js` in the backend dir and the terminals should have the following output:

  ## For frontend
     ![image](https://github.com/SoNiC-HeRE/NoteIt-SurrealDb-starter-/assets/96797205/cdb73ac0-761e-4780-8fd7-885fbbab9ea5)

  ## For backend
     ![image](https://github.com/SoNiC-HeRE/NoteIt-SurrealDb-starter-/assets/96797205/27b46a81-c7b1-4734-b11d-fa8cf449ebd5)

<hr>

## Future Scope:
Many more features can be added such as:
- User Authentication
- Multi User Collaboration

<hr>

## Debugging:
Certain console logs and methods provide comments to enable rapid commenting out, checking of other surrealdb methods, and improved debugging of problems encountered when connecting to surrealdb.

<hr>

## Have ideas or Issues?
Feel free to raise the issue or a pr for improving the starter kit :)
