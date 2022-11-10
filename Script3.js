use mflix

/*
1-Especificar en la colección users las siguientes reglas de
 validación: El campo name (requerido) debe ser un string con 
 un máximo de 30 caracteres, email (requerido) debe ser un }
 string que matchee con la expresión regular: "^(.*)@(.*)\\.(.{2,4})$" ,
  password (requerido) debe ser un string con al menos 50 caracteres.
*/
db.runCommand({
    collMod:"users",
    validator:{$jsonSchema:{
        bsonType:"object",
        required:["name","email","password"],
        properties:{
            name:{
                bsonType:"string",
                maximum: 30,
                description:"name must be a string and is required"
            },
            email:{
                bsonType:"string",
                pattern:"^(.*)@(.*)\\.(.{2,4})$", 
                description:"email must be a string and is required"
            },
            password:{
                bsonType:"string",
                maximum:80,
                description:"password must be a string and is required"
                
            }
        }
       }
    }
})

db.users.insertOne({"name":"Joa", "email":"jajaja", "password":"asdf"})
db.users.insertOne( {"email":"joa@gm.com", "password":"asdf"})
db.users.insertOne( {"name":"pedro","email":"jpedro@gm.com", "password":1222})
db.users.insertOne( {"name":"pedro", "password":"1222"})
db.users.insertOne( {"name":"pedro", "email":"pedro@gmail.com"})

db.users.insertMany([
    {"name":"juan","email":"juan@gm.com","password":"1222"},
    {"name":"pedro","email":"pedro@gm.com", "password":"1222"},
    {"name":"paul","email":"p@gm.com", "password":"1222"},
    {"name":"john","email":"john@gm.com","password":"1222"},
    {"name":"ds","email":"ds@gm.com", "password":"1222"},
    
])




/*
2-Obtener metadata de la colección users que garantice que las
 reglas de validación fueron correctamente aplicadas.
*/

db.getCollectionInfos({"name":"users"})


/*
3-Especificar en la colección theaters las siguientes reglas de validación: El campo theaterId (requerido) debe ser un int y location (requerido) debe ser un object con:
a) un campo address (requerido) que sea un object con campos street1, city, state y zipcode todos de tipo string y requeridos
b) un campo geo (no requerido) que sea un object con un campo type, con valores posibles “Point” o null y coordinates que debe ser una lista de 2 doubles
Por último, estas reglas de validación no deben prohibir la inserción o actualización de documentos que no las cumplan sino que solamente deben advertir.
*/

db.runCommand({
    collMod:"theaters",
    validator:{$jsonSchema:{
        bsonType:"object",
        required:["theaterId", "location"],
        properties:{
            theaterId:{
                bsonType:"int",
            },
            location:{
                bsonType:"object",
                required:["address"],
                properties:{
                    address:{
                        bsonType:"object",
                        required:["street1","city","state","zipcode"],
                        properties:{
                            street1:{
                                bsonType:"string",
                            },
                            city:{
                                bsonType:"string",
                                
                            },
                            state:{
                                bsonType:"string",
                       
                            },
                            zipcode:{
                                bsonType:"string",
                            },
                            geo:{
                                bsonType:"object",
                                properties:{
                                    type:{
                                     enum:["Point","null"],
                                    },
                                    coordinates:{
                                         bsonType:["double"],
                                         minimum:2,
                                         maximum:2,
                                    },
                                }
                            }
                        }
                    }
                }
                 
            },
        }
    }},
    validationLevel:"strict",
    validationAction:"warn"
})
db.getCollectionInfos({"name":"theaters"})
/*
4-
Especificar en la colección movies las siguientes reglas de validación: El campo title (requerido) 
es de tipo string, year (requerido) int con mínimo en 1900 y máximo en 3000, 
y que tanto cast, directors, countries, como genres sean arrays de strings sin duplicados.
Hint: Usar el constructor NumberInt() para especificar valores enteros a la hora
de insertar documentos. Recordar que mongo shell es un intérprete 
javascript y en javascript los literales numéricos son de tipo Number (double).

*/
db.runCommand({
    collMod:"movies",
    validator:{$jsonSchema:{
        bsonType:"object",
        required:["title", "year"],
        properties:{
            title:{
                bsonType:"string",
                description:"title must be a string and is required",
            },
            year:{
                bsonType:"int",
                minimum:1900,
                maximum:3000,
            },
            cast:{
                bsonType:["string"],
                uniqueItems:true,
                
            },
            directors:{
                bsonType:["string"],
                uniqueItems:true,
            
            },
            countries:{
                bsonType:["string"],
                uniqueItems:true,
            },
            genres:{
                bsonType:["string"],
                uniqueItems:true,
            }
        
        }
    
    }}
})


/*
Crear una colección userProfiles con las siguientes reglas de validación: 
Tenga un campo user_id (requerido) de tipo “objectId”,
un campo language (requerido) con alguno de los siguientes valores 
[ “English”, “Spanish”, “Portuguese” ] y un campo favorite_genres (no requerido)
 que sea un array de strings sin duplicados.

*/

db.createCollection("userProfiles",
{
    validator:{
        $jsonSchema:{
            bsonType:"object",
            required:["user_id", "language"],
            properties:{
                user_id:{
                    bsonType:"objectId",
                    
                },
                language:{
                    enum:["English","Spanish","Portuguese"],
                
                },
                favorite_genres:{
                    bsonType:["string"],
                    uniqueItems:true,
                }                

            }
        
        }
        
    }
})

db.getCollectionInfos({"name":"userProfiles"})

db.movies.find()
db.comments.find({})
/*
6- movies: 
    one to many- cast, directors, countries, genres  .
    one to one - imdb
  
  comments: 
      one to many referencias movie_id
*/


/*
 queries:
    1- listar el id , titulo , y precio de los libros y sus categorias de un autor en particular
     entidad: books y categories
     relacion: one to one
     estrategia: documentos anidados
     
    2-Cantidad de libros por categorías.
     entidad: books y categories.
     relacion: one to one entre books y category . 
     estrategia: Documentos anidados
     
    3-Listar el nombre y dirección entrega y el monto total 
      (quantity * price) de sus pedidos para un order_id dado.
      entidad : orders, order_details.
      relacion : one to many entre orders y order_details.
      estrategia: modelado con referencia de documentos.
      
      
    
*/