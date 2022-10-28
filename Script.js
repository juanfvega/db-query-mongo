use mflix
show collections

db.users.find({name:/^ju/})

db.comments.find({name:/^ju/})


db.comments.updateOne(
    {name:"juan Stark"},
    {
        $set:{"text":"1 punto"}
    }
)

/*
db.comments.insert({
    name:"juan5 Stark",
    email:"juan5@gm.com",
    movie_id:ObjectId("573a1390f29313caabcd42fc"),
    text:"5 puntos",
    date:ISODate()
})*/



/*

2. Listar el título, año, actores (cast), directores y rating de las 10 películas con mayor
rating (“imdb.rating”) de la década del 90. ¿Cuál es el valor del rating de la película que
tiene mayor rating? (Hint: Chequear que el valor de “imdb.rating” sea de tipo “double”).

*/

db.movies.find(

    {
        "year":1990,
        "imdb.rating":{$type: "double"}
    },
    {
        _id:0,
        title:1,
        year:1,
        cast:1,
        directors:1,
        "imdb.rating":1
    }
).sort(
{
    "imdb.rating":-1
}).limit(10)


/*
3. Listar el nombre, email, texto y fecha de los comentarios que la película con id
(movie_id) ObjectId("573a1399f29313caabcee886") recibió entre los años 2014 y 2016
inclusive. Listar ordenados por fecha. Escribir una nueva consulta (modificando la
anterior) para responder ¿Cuántos comentarios recibió?
*/
db.comments.find({})
db.comments.find({
   movie_id: ObjectId("573a1399f29313caabcee886"),
   date: {$gte:ISODate("2014-01-01"), $lte:ISODate("2016-01-01")}
},
{
    _id:0, name:1, email:1, text:1, date:1
}).sort(
    {date:-1}
)


/*
4. Listar el nombre, id de la película, texto y fecha de los 3 comentarios más recientes
realizados por el usuario con email patricia_good@fakegmail.com.
*/

db.comments.find({
    email:"patricia_good@fakegmail.com"
}, {
    movie_id:1,
    name:1,
    text:1,
    date:-1
}).limit(3)

/*
5. Listar el título, idiomas (languages), géneros, fecha de lanzamiento (released) y número
de votos (“imdb.votes”) de las películas de géneros Drama y Action (la película puede
tener otros géneros adicionales), que solo están disponibles en un único idioma y por
último tengan un rating (“imdb.rating”) mayor a 9 o bien tengan una duración (runtime)
de al menos 180 minutos. Listar ordenados por fecha de lanzamiento y número de
votos.
*/

db.movies.find({})

db.movies.find({
    "genres":{$in:["Drama", "Action"]},
    languages:{$size:1},
    $or:[{"imdb.rating":{$gte:9}, runtime:{$gte:180}}]
},
{
  _id:0,
  title:1,
  languages:1,
  genres:1,
  released:1,
  "imdb.votes":1  
}).sort({
    released:-1,
    "imdb.votes":-1
})


/*
6- Listar el id del teatro (theaterId), estado (“location.address.state”), ciudad
(“location.address.city”), y coordenadas (“location.geo.coordinates”) de los teatros que
se encuentran en algunos de los estados "CA", "NY", "TX" y el nombre de la ciudades
comienza con una ‘F’. Listar ordenados por estado y ciudad.
*/
show collections

db.theaters.find(
{
    "location.address.state":{$in:["CA","NY","TX"]},
    "location.address.city":/^F/
},
{
    theaterId:1,
    "location.address.state":1,
    "location.address.city":1,
    "location.geo.coordinates":1
}).sort({
    "location.address.state":1,
    "location.address.city":1
    
});

/*
7. Actualizar los valores de los campos texto (text) y fecha (date) del comentario cuyo id es
ObjectId("5b72236520a3277c015b3b73") a "mi mejor comentario" y fecha actual
respectivamente.
*/

db.comments.find({"_id":ObjectId("5b72236520a3277c015b3b73")})

db.comments.updateOne(
    {"_id":ObjectId("5b72236520a3277c015b3b73")},
    {
        $set:{
            "text":"mi mejor comentario",
            "date": ISODate()
        },
        $currentDate:{lastModified:true}
            
    }
    
,
{upsert:true})
/*

8. Actualizar el valor de la contraseña del usuario cuyo email es
joel.macdonel@fakegmail.com a "some password". La misma consulta debe poder
insertar un nuevo usuario en caso que el usuario no exista. Ejecute la consulta dos
veces. ¿Qué operación se realiza en cada caso? (Hint: usar upserts)
*/
db.users.find({"email":"joel.macdonel@fakegmail.com"})

db.users.updateOne(
{"email":"joel.macdonel@fakegmail.com"},
{
    $set:{"password":"somepassword"},
    $currentDate:{lastModified:true}
},
{upsert:true})
