const data = require('../models/publicRecipeModel')

module.exports={
    index(req,res){
        data.recipeData(function(RecipeData){
            data.chefsSelectOptions(function(chef){
                return res.render("publicRecipes/index",{RecipeData,chef})
            })
        })
    },
    about(req,res){
        return res.render("publicRecipes/about")
    },
    recipes(req,res){
        return res.render("publicRecipes/recipes-list")
    },
    chefs(req,res){
        data.find(req.params.id, function(recipe){
            data.chefsSelectOptions(function(options){
                
                return res.render('publicRecipes/chefs',{recipe,chef:options})
            })
        })
    },
    recipes(req,res){
        data.recipeData(function(RecipeData){
            data.chefsSelectOptions(function(chef){
                
                return res.render("publicRecipes/recipes-list",{RecipeData,chef})
            })
        })
    },
    show(req,res){
        data.find(req.params.id, function(recipe){
            if(!recipe) return res.send("recipe not found!")

            data.chefsSelectOptions(function(options){
                return res.render('admin/recipes/showRecipe',{recipe,chefOptions:options})
            })
        })
    },
}