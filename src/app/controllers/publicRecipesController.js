const data = require('../models/publicRecipeModel')

module.exports={
    index(req,res){
        const {filter} = req.query
        if(filter){
            data.findBy(function(RecipeData){
                console.log(recipeData)
                return res.render("publicRecipes/index",{RecipeData})
            })
        } else{
            data.indexRecipes(function(RecipeData){
                return res.render("publicRecipes/index",{RecipeData})
            }) 
        }
            
    },
    about(req,res){
        return res.render("publicRecipes/about")
    },
    recipes(req,res){
        data.allRecipes(function(RecipeData){
            return res.render("publicRecipes/recipes-list",{RecipeData})
        })
    },
    show(req,res){
        data.findRecipe(req.params.id, function(recipe){
            if(!recipe) return res.send("recipe not found!")
                
            return res.render('publicRecipes/recipe',{recipe})
        })
    },
    chefs(req,res){
        data.allChefs(function(chefs){
                return res.render('publicRecipes/chefs',{chefs})
            })
    }, 
}