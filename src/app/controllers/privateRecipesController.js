const Recipes = require('../models/privateRecipeModel')
const chef = require('../models/chefsModel')
const File = require('../Models/fileModel')


module.exports = {
    index(req,res){
        chef.allChefs(function(datas){
            Recipes.indexRecipes(function(data){
                    return res.render("admin/recipes/recipes",{chef:datas,indexRecipes:data})
            })
        })
    },
    create(req,res){ 
        chef.allChefs(function(options){
            return res.render('admin/recipes/createRecipe',{chef,chefOptions:options})
        })
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


        const filesPromise = req.files.map( file => File.create({ filename: file.filename, path: file.path }))

        const filesIds = await Promise.all(filesPromise)
        
        const recipe_id = await Recipes.create(req.body)

        const recipeFilesPromise = filesIds.map( file_id => File.createRF(recipe_id, file_id.rows[0].id ))
        await Promise.all(recipeFilesPromise)

        return res.redirect(`/admin/recipes/${recipe_id}`)
 
    },
    
    async show(req,res){
         let results = await Recipes.find(req.params.id)
         const recipe = results.rows[0]
         
        if(!recipe) return res.send("Recipes not found!")
        
        results = await Recipes.files(recipe.id)
        const files = results.rows.map(file =>({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`
        }))

        return res.render('admin/recipes/showRecipe',{recipe, files})
    },
    async edit(req,res){
        let results = await Recipes.find(req.params.id)
        const  recipe = results.rows[0]   

        if(!recipe) return res.send("Recipes not found!")
        
        chef.allChefs(function(options){
            return res.render("admin/recipes/editRecipe", {recipe,chefOptions:options})
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
        Recipes.update(req.body, function(){
            return res.redirect(`/admin/recipes/${req.body.id}`)
        })
    },
    delete(req, res){
        Recipes.delete(req.body.id, function(){
                return res.redirect(`/admin/recipes`)
            })  
    },
}