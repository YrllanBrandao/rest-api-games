const express = require("express");
const Game = require("./games/game");
const app = new express();

app.use(express.urlencoded({extended:false}));
app.use(express.json())
app.use(express.static('public'));




app.get("/",(req,res)=>{

    res.send("on")
})


app.get("/games",(req,res)=>{
    
    Game.findAll().then((game)=>{
        
        if(game !== undefined)
        {
            res.status(200)
            res.json(game);
            
        }
        else{
            res.status(404)
            res.send("not found 404");
        }
    })
    .catch(err =>{
        res.status(400)
    })


})

app.get("/game/:id",(req,res)=>{
    const id =req.params.id;

    if(isNaN(id))
    {
        res.status(400).send("bad request")
    }
    else{
        Game.findOne({where:{id: id}}).then((game)=>{
        
            if(game === undefined || game === null)
            {
                res.status(404).send("not found 404");
                
            }
            else{
                res.status(200);
                res.json(game);
            }
        })
    }

})

app.post("/game",(req,res)=>{

    const {title, price, year} = req.body;

    if(title === undefined || price === undefined || year === undefined)
    {
        res.status(400);
        
    }
    else{
        Game.create({
            title: title,
            price:price,
            year: year
        }).then(()=>{
            res.status(201)
            res.send("OK")
        })
    }
    

})


app.delete("/game/:id",(req,res)=>{
    const id = req.params.id;


    if(isNaN(id))
    {
        res.status(400).send("bad request")
    }
    else{
        Game.destroy({where:{id: id}}).then(()=>{
        
            
                res.status(200).send("OK")
        })
    }
})

app.put("/game/:id",(req,res)=>{
    const id = req.params.id;
    
    const {title, price, year} = req.body;

    if(isNaN(id))
    {
        res.status(400).send("bad request")
    }
    else{
       
       Game.findByPk(id).then((element)=>{


        if(element !== null)
        {

            
            if(title !== undefined)
        {
            Game.update({
                title: title
            },{
                where:{id:id}
            })
        if(year !== undefined)
        {
            Game.update({
                year:year
            },{
                where:{id:id}
            }) 
        }
        if(price !== undefined )
        {
            Game.update({
                price: price
            },{
                where:{id:id}
            })
            
        }
        res.status(200).send("edited")
        }
       
        
        }
        else{
            res.status(406).send("not Acceptable")
        }



       })
       
        
       
    
        
    }
    
})

app.listen(8080, () => console.log("api is on"))