const recipe = require('../models/privateRecipeModel')
const chef = require('../models/chefsModel')
module.exports = {
    index(req,res){
        chef.allChefs(function(datas){
            recipe.indexRecipes(function(data){
                return res.render("admin/recipes/recipes",{chef:datas,indexRecipes:data})
            })
        })
    },
    create(req,res){ 
        chef.allChefs(function(options){
            return res.render('admin/recipes/createRecipe',{chef,chefOptions:options})
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
            
            return res.render('admin/recipes/showRecipe',{recipe})
        })
    },
    edit(req,res){
        recipe.find(req.params.id, function(recipe){
            if(!recipe) return res.send("recipe not found!")

            chef.allChefs(function(options){
                return res.render("admin/recipes/editRecipe", {recipe,chefOptions:options})
            })
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
        recipe.update(req.body, function(){
            return res.redirect(`/admin/recipes/${req.body.id}`)
        })
    },
    delete(req, res){
        recipe.delete(req.body.id, function(){
                return res.redirect(`/admin/recipes`)
            })  
    },
}