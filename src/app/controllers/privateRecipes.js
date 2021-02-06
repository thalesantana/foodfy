const {date} = require('../../lib/utils')
const recipe = require('../models/privateRecipe')
const chef = require('../models/chef')
module.exports = {
    index(req,res){
        return res.render("admin/recipes/recipes")
    },
    create(req,res){ 
        chef.chefsSelectOptions(function(options){
            return res.render('admin/recipes/createRecipe',{chefOptions:options})
        })
    },
    post(req,res){
        const keys= Object.keys(req.body) // retorna chave de todos vetores

        for(key of keys){
            if(req.body[key] == ""){ // Verifica se tem campos vazios
                return res.send("Please, fill all fields!")
            }
        }
        
        recipe.create(req.body, function(recipe){
            return res.redirect(`/admin/recipes/${recipe.id}`)
        })   
    },
  
    show(req,res){
        recipe.find(req.params.id, function(recipe){
            if(!recipe) return res.send("recipe not found!")

            recipe.ingredients = recipe.ingredients.split(',')
            recipe.preparation= recipe.preparation.split(',')
            console.log(recipe.ingredients)
            console.log(recipe.preparation)
            
            chef.chefsSelectOptions(function(options){
                return res.render('admin/recipes/showRecipe',{recipe,chefOptions:options})
            })
        })
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