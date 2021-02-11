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
    chefs(req,res){
        data.chefsSelectOptions(function(options){
            data.find(req.params.id, function(recipe){
                return res.render('publicRecipes/chefs',{recipe,chefs:options})
            })
        })
    },
    recipes(req,res){
        const{filter} = req.query
        console.log(req.query)
        if(filter){
            data.findBy(filter, function(datas){
                console.log(datas)
                return res.render("publicRecipes/recipes-list",{datas,RecipeData,chef})
            })
        } else{
            data.recipeData(function(RecipeData){
                data.chefsSelectOptions(function(chef){
                    return res.render("publicRecipes/recipes-list",{RecipeData,chef})
                })
            })
        }
        
    },
    show(req,res){
        data.findRecipe(req.params.id, function(recipe){
            if(!recipe) return res.send("recipe not found!")

            data.chefsSelectOptions(function(options){
                
                return res.render('publicRecipes/recipe',{recipe,chefOptions:options})
            })
        })
    },
}