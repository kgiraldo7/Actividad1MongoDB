// creamos una red para que nuestros nodos puedan comunicarse
docker network create mongoCluster

// creamos nuestros nodos
docker run -d --rm -p 27017:27017 --name mongo1 --network mongoCluster mongo:5 mongod --replSet myReplicaSet --bind_ip localhost,mongo1

docker run -d --rm -p 27018:27017 --name mongo2 --network mongoCluster mongo:5 mongod --replSet myReplicaSet --bind_ip localhost,mongo2

docker run -d --rm -p 27019:27017 --name mongo3 --network mongoCluster mongo:5 mongod --replSet myReplicaSet --bind_ip localhost,mongo3

//revisamos que estén corriendo 
docker ps 

// Ingresamos a la consola del primer nodo
docker exec -ti mongo1 sh

// iniciamos el mongo shell
mongosh

//iniciamos nuestro Replica Set
rs.initiate({_id:"myReplicaSet",members:[{_id: 0, host:"mongo1"},{_id: 1, host:"mongo2"},{_id: 2, host:"mongo3"}]})

//Verificamos el estado 
rs.status()

// Caso de prueba
/*
en nuestro nodo principal insertamos la siguiente info
*/

// ejemplos de arbitros
const documents = [
    { name: "Carlos", lastName: "Ramos", experience: 10 },
    { name: "Eva", lastName: "Asderaki-Moore", experience: 15 },
    { name: "Stefan", lastName: "Oderstedt", experience: 8 },
    { name: "Mariana", lastName: "de Almeida", experience: 12 },
    { name: "James", lastName: "Southworth", experience: 5 },
  ];
  
// Insertamos los documentos
db.referees.insertMany(documents)

// Abrimos una nueva terminal e ingresamos a la consola de un nodo secundario (mongo3)
docker exec -ti mongo3 sh
mongosh

// Ahora ejecutamos el siguiente comando para validar que los datos fueron replicados

db.referees.find()

// Si el proceso se hizo correctamente, deben de tener la misma información ambos nodos

