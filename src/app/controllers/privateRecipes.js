const {date} = require('../../lib/utils') 
const db = require('../../config/db')
module.exports = {
    index(req,res){
        return
    },
    create(req,res){ 
        return res.render('admin/recipes/createRecipe')
    },
    post(req,res){
        const keys= Object.keys(req.body) // retorna chave de todos vetores

        for(key of keys){
            if(req.body[key] == ""){ // Verifica se tem campos vazios
                return res.send("Please, fill all fields!")
            }
        }
        const query = `
            INSERT INTO recipes(
               image,
               title,
               igredients,
               preparation,
               information,
               created_at 
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `
        const values = [ 
            req.body.image,
            req.body.title,
            req.body.igredients,
            req.body.preparation,
            req.body.information,
            date(Date.now).iso
        ]
        db.query(query,values, function(err, results){
            console.log(err)
            console.log(results)
            return
        })
    },
    show(req,res){
        return
    },
    edit(req,res){
        return
    },
    
    put(req,res){
        return
    },
    delete(req,res){
        return
    }
}