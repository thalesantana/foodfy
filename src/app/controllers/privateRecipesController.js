const Recipes = require('../models/privateRecipeModel')
const chef = require('../models/chefsModel')
const File = require('../Models/fileModel')


module.exports = {
    async index(req,res){
        let results =  await Recipes.indexRecipes()
        const indexRecipes = results.rows
        
        results = await chef.allChefs()
        const chefs = results.rows

        return res.render("admin/recipes/recipes",{chefs,indexRecipes})
    },
    async create(req,res){ 
        let results = await chef.allChefs()
        const chefOptions = results.rows
        
        return res.render('admin/recipes/createRecipe',{chefOptions})
        
    },
    async post(req,res){
        const keys= Object.keys(req.body) // retorna chave de todos vetores
        
        for(key of keys){
            if(req.body[key] == ""){ // Verifica se tem campos vazios
                return res.send("Please, fill all fields!")
            }
        }

        if(req.files.length == 0){
            return res.send('please, send at least one image!')
        } 


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
         
        if(!recipe) return res.send("Recipe not found!")
        
        results = await Recipes.files(recipe.id)
        let files = results.rows
        files = files.map(file =>({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`
        }))

        return res.render('admin/recipes/showRecipe',{recipe, files})
    },
    async edit(req,res){
        let results = await Recipes.find(req.params.id)
        const  recipe = results.rows[0]   

        if(!recipe) return res.send("Recipes not found!")
        
        //get chefs
        const result =  await chef.allChefs()
        const chefOptions = result.rows
        
        // get images
        results = await Recipes.files(recipe.id)
        let files = results.rows
        files = files.map(file =>({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`
        }))
        
        return res.render("admin/recipes/editRecipe", {recipe,chefOptions,files})      
    },
    
    async put(req,res){
        const keys= Object.keys(req.body) // retorna chave de todos vetores
        
        for(key of keys){
            if(req.body[key] == "" && key != "removed_files" && key != "photos"){ // Verifica se tem campos vazios
                return res.send("Please, fill all fields!")
            }
        }
       if (req.files.length != 0) {
            const newFilesPromise = req.files.map(file =>
                File.create({filename: file.filename, path: file.path}))

             await Promise.all(newFilesPromise)
        }
   
        if (req.body.removed_files) {
            const removedFiles = req.body.removed_files.split(",")
            const lastIndex = removedFiles.length - 1
            removedFiles.splice(lastIndex,1)

            const removedFilesPromise = removedFiles.map(id => File.delete(id))

            await Promise.all(removedFilesPromise)
        } 

        await Recipes.update(req.body)
           
        return res.redirect(`/admin/recipes/${req.body.id}`)
       
    },
    delete(req, res){
        Recipes.delete(req.body.id, function(){
                return res.redirect(`/admin/recipes`)
            })  
    },
}