use mflix
show collections

/*
1.Cantidad de cines (theaters) por estado.
*/
db.theaters.find({})
db.theaters.aggregate([
    {
        $group:{_id:"$location.address.state",
        count:{$count:{}}
            
        }
    }
])
/*
2. Cantidad de estados con al menos dos cines (theaters) registrados.
*/
db.theaters.aggregate([
    {
        $group:{_id:"$location.address.state",
        count:{$count:{}}
            
        }
    },
    {
        $match:{
            "count":{
                $gte:2
            }
        }
    },
    {
        $sort: {count:1}
    }
])


/*
3. Cantidad de películas dirigidas por "Louis Lumière". Se puede responder sin pipeline de
agregación, realizar ambas queries.
*/
db.movies.find({
    "directors":"Louis Lumière"
}).count()

db.movies.aggregate([
    {
        $match:{"directors":"Louis Lumière"}
        
    },
    {
        $count:"count"
    
    }
])

/*
4. Cantidad de películas estrenadas en los años 50 (desde 1950 hasta 1959). Se puede
responder sin pipeline de agregación, realizar ambas queries.
*/

db.movies.find({
   "year":{$gte:1950, $lte:1959}
})

db.movies.aggregate([
    {
        $match:{"year":{$gte:1950, $lte:1959}}
    }
])

/*
5. Listar los 10 géneros con mayor cantidad de películas (tener en cuenta que las películas
pueden tener más de un género). Devolver el género y la cantidad de películas. Hint:
unwind puede ser de utilidad
*/

db.movies.find({})

db.movies.aggregate([
    {
        $unwind:"$genres"
    },
    {
        $group:{
            _id:"$genres",
            count:{$sum:1},
        
        }
    },
    {
        $sort:{count:-1}
    },
    {
        $limit:10
    }
])


/*
6. Top 10 de usuarios con mayor cantidad de comentarios, mostrando Nombre, Email y
Cantidad de Comentarios.
*/
db.comments.find({})
db.comments.aggregate([
    {
        $group:{
            _id:"$name",
            email:{$first:"$email"},
            count:{$sum:1}
        }
    },
    {
        $sort:{count:-1}
    },
    {
        $limit:10
    }
    ])
/*
7. Ratings de IMDB promedio, mínimo y máximo por año de las películas estrenadas en
los años 80 (desde 1980 hasta 1989), ordenados de mayor a menor por promedio del
año.
*/
db.movies.find({})

db.movies.aggregate([
    {
        $match:{"year":{$gte:1980, $lte:1989}}
    },
    {
        $group:{
            _id:"$year",
            avg:{$avg:"$imdb.rating"},
            min:{$min:"$imdb.rating"},
            max:{$max:"$imdb.rating"}        
        }
    },
    {
        $sort:{avg:-1}
    }
])
/*
8. Título, año y cantidad de comentarios de las 10 películas con más comentarios.
*/


/*9. Crear una vista con los 5 géneros con mayor cantidad de comentarios, junto con la
cantidad de comentarios.
*/


/*10. Listar los actores (cast) que trabajaron en 2 o más películas dirigidas por "Jules Bass".
Devolver el nombre de estos actores junto con la lista de películas (solo título y año)
dirigidas por “Jules Bass” en las que trabajaron.
a. Hint1: addToSet
b. Hint2: {'name.2': {$exists: true}} permite filtrar arrays con al menos 2
elementos, entender por qué.
c. Hint3: Puede que tu solución no use Hint1 ni Hint2 e igualmente sea correcta
*/