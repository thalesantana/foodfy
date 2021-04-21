const data = require('../Models/publicRecipeModel')
const Recipes = require('../models/privateRecipeModel')
const Chef = require('../models/chefsModel');

module.exports={
    async home(req,res){
        const { filter } = req.query

        if(filter){
            let results = await data.findBy(filter)
            const RecipeData = results.rows

            return res.render('publicRecipes/recipes-list',{ filter,RecipeData})

        } else{
            let results = await data.indexRecipes()
            const RecipeData = results.rows

            async function getImage(recipeId){
                let results = await Recipes.files(recipeId)
                const files = results.rows.map(file =>(`${req.protocol}://${req.headers.host}${file.path.replace("public","")}`))
                let file = files[0]
                return file
            }
    
            const recipesPromisse = RecipeData .map(async RecipeData  =>{
                RecipeData.img = await getImage(RecipeData.id)
                return RecipeData 
            })
            const lastAdded = await Promise.all(recipesPromisse)
            return res.render('publicRecipes/index',{ RecipeData:lastAdded })
            
        }     
    },
    about(req,res){
        return res.render("publicRecipes/about")
    },
    async recipes(req,res){
        const { filter } = req.query

        if(filter){
            let results = await data.findBy(filter)
            const RecipeData = results.rows

            async function getImage(recipeId){
                let results = await Recipes.files(recipeId)
                const files = results.rows.map(file =>(`${req.protocol}://${req.headers.host}${file.path.replace("public","")}`))
                let file = files[0]
                return file
            }
    
            const recipesPromisse = RecipeData.map(async RecipeData  =>{
                RecipeData.img = await getImage(RecipeData.id)
                return RecipeData 
            })
            const lastAdded = await Promise.all(recipesPromisse)
            console.log(lastAdded)
            return res.render('publicRecipes/recipes-list',{ filter,RecipeData:lastAdded })
        } else{
            let results = await data.indexRecipes()
            const RecipeData = results.rows

            async function getImage(recipeId){
                let results = await Recipes.files(recipeId)
                const files = results.rows.map(file =>(`${req.protocol}://${req.headers.host}${file.path.replace("public","")}`))
                let file = files[0]
                return file
            }
    
            const recipesPromisse = RecipeData.map(async RecipeData  =>{
                RecipeData.img = await getImage(RecipeData.id)
                return RecipeData 
            })
            const lastAdded = await Promise.all(recipesPromisse)
 
            return res.render('publicRecipes/recipes-list',{ RecipeData:lastAdded })
            
        }  
    },
    async show(req,res){
        let results = await data.findRecipe(req.params.id)
        const recipe =  results.rows[0]

        if(!results) return res.send("recipe not found!")

        results = await Recipes.files(recipe.id)
        let files = results.rows
        
        files = files.map(file =>({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`
        }))

        console.log(files)
        return res.render('publicRecipes/recipe',{recipe, files})
        
    },
    async chefs(req,res){
        let results = await data.allChefs()
        const chefs = results.rows

        async function getImage(chefId){
            let results = await Chef.files(chefId)
            const files = results.rows.map(file =>(`${req.protocol}://${req.headers.host}${file.path.replace("public","")}`))
            let file = files[0]
            return file
        }

        const chefsPromisse = chefs.map(async chefs =>{
            chefs.img = await getImage(chefs.file_id)
            return chefs
        })
        const lastAdded = await Promise.all(chefsPromisse)

        return res.render('publicRecipes/chefs',{chefs:lastAdded})       
    }, 
}