const Chef = require('../models/chefsModel');
const recipe = require('../models/privateRecipeModel')
const File = require('../Models/fileModel');

module.exports = {
    async  index(req,res){
        let results = await Chef.allChefs()
        const chefs = results.rows

        return res.render('admin/chefs/chefs',{chefs})
       
    },
    async show(req,res){
        let results = await Chef.find(req.params.id)
        const chefs = results.rows[0]
        //let Chef = await recipe.indexRecipes()

        if(!chefs) return res.send("chef not found!")

        results = await Chef.files(chefs.id)
        const files = results.rows.map(file =>({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`
        }))
        
        return res.render('admin/chefs/showChef',{chefs,files})
    
    },
    create(req,res){ 
            return res.render('admin/chefs/createchef')
    },
    async post(req,res){
        const keys= Object.keys(req.body) // retorna chave de todos vetores

        for(key of keys){
            if(req.body[key] == ""){ // Verifica se tem campos vazios
                return res.send("Please, fill all fields!")
            }
        }
        if(req.files.length == 0)
            return res.send('please, send at least one image!')

        const file = await File.create({
            filename: req.files[0].filename,
            path: req.files[0].path
        })
        file_id = file.rows[0].id
        
        
        let results = await Chef.create(req.body,file_id)
        const chefId = results.rows[0].id

        return res.redirect(`/admin/chefs/${chefId}`)
    },
    edit(req,res){
        Chef.find(req.params.id, function(chef){
            if(!chef) return res.send("chef not found!")

            return res.render("admin/chefs/editChef", {chef})
        })
    },
    put(req,res){
        const keys= Object.keys(req.body) // retorna chave de todos vetores

        for(key of keys){
            //req.body.key == ""
            if(req.body[key] == ""){ // Verifica se tem campos vazios
                return res.send("Please, fill all fields!")
            }
        }
        Chef.update(req.body, function(){
            return res.redirect(`/admin/chefs/${req.body.id}`)
        })
    },
    delete(req, res){
        const id =  req.body.id
        if(req.body.total_recipes == 0){
            Chef.delete(req.body.id, function(){
                    return res.redirect(`/admin/chefs`)
            })  
        }else{
            Chef.find(id, function(chef){
                
                if(!chef) return res.send("chef not found!")
                return res.render("admin/chefs/editChef", {chef})
            })
        }
    },
}