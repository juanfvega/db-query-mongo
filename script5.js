use test2

/*
to replace a typo field error, for example 'dalte' for 'date' inside array object
use aggregate pipeline with $unwind , $match , and $replaceWith.
for example: 
*/
db.articles.insertOne({
    user_id:"",
    title:"title",
    date:ISODate(),
    text:"lorem ipsum",
    url:"",
    comments:[
        {
            date:ISODate(),
            text:"this is a text"
        },
        {
            dalte:ISODate("2021-01-01"),
            text:"this comment was write in 2021"
            
        },
        {
            dalte:ISODate("2001-01-01"),
            text:"this comment was write in 2001"
            
        }
    ],
    categories:[
        {
            name:"cat"
        }
    ],
    tags:[
    
        {
            name:"tag"
        }
    ]
})

/*
extract each comments object from the array , use $match to filter objects we want
use $replaceWitch with all data except we wanna change, in this case comments.dalte
to comments.date
*/
db.articles.aggregate([
    {
        $unwind:"$comments"
    },
    {
        $match:{"comments.dalte":{$exists:true}}
    },
    {
        $replaceWith:{
                _id:"$id",
                user_id:"$user_id",
                title:"$title", 
                date:"$date",
                text:"$text",
                url:"$url",
                categories:"$categories",
                tags:"$tags",
                comments:[{date:"$comments.dalte",text:"$text"}]
        }
    }
])