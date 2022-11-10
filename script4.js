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
         
*/
use local

db.books.insertOne({
    book_id: 1,
    title:"martin fierro",
    author:"jose hernandez",
    price:200,
    "categories":{
        category_name:"poem"
    }
    
})

db.books.find({"author":"jose hernandez"},{book_id:1, price:1, "categories.category_name":1, _id:0})

db.books.aggregate([
{
    $group:{
        _id:"$categories.category_name",
        count:{$sum:1}
           
    }
}
])

/*
    3-Listar el nombre y dirección entrega y el monto total 
      (quantity * price) de sus pedidos para un order_id dado.
      entidad : orders, order_details.
      relacion : one to many entre orders y order_details.
      estrategia: modelado con referencia de documentos.

*/

db.orders.insertOne({
    order_id:1,
    delivery_name:"jose",
    delivery_address:"sinver",
    cc_name:"",
    cc_number:20,
    cc_expiry:"",    
    order_details:[
        {
            book_id:1,
            title:"martin fierro",
            quantity:1,
            price:200
        }
    ]
})   



db.orders.aggregate([
    
    {
        $match:{order_id:1}
    },
    {
        $project:{
            delivery_name:1,
            delivery_address:1,
            total:{$multiply:[{$arrayElemAt:["$order_details.price", 0]} , {$arrayElemAt:["$order_details.quantity",0]}]}
            } 
     
    }        

])