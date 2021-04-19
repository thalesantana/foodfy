const data = require('../Models/publicRecipeModel')

module.exports={
    async home(req,res){
        const { filter } = req.query

        if(filter){
            let results = await data.findBy(filter)
            const RecipeData = results.rows
            return res.render('publicRecipes/recipes-list',{ filter,RecipeData })
        } else{
            let results = await data.indexRecipes()
            const RecipeData = results.rows
            return res.render('publicRecipes/index',{ RecipeData })
            
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
            return res.render('publicRecipes/recipes-list',{ filter,RecipeData })
        } else{
            let results = await data.indexRecipes()
            const RecipeData = results.rows
            return res.render('publicRecipes/recipes-list',{ RecipeData })
            
        }  
    },
    async show(req,res){
        let results = await data.findRecipe(req.params.id)
        const recipe =  results.rows
        
        if(!results) return res.send("recipe not found!")
        
        return res.render('publicRecipes/recipe',{recipe})
        
    },
    async chefs(req,res){
        let results = await data.allChefs()
        const chefs = results.rows
        return res.render('publicRecipes/chefs',{chefs})       
    }, 
}