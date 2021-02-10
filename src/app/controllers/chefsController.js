const chef = require('../models/chefsModel');
const recipe = require('../models/privateRecipeModel');
const { show } = require('./privateRecipesController');

module.exports = {
    index(req,res){
        chef.chefsSelectOptions(function(data){
            return res.render("admin/chefs/chefs",{chef:data})
        })
    },
    create(req,res){ 
            return res.render('admin/chefs/createchef')
    },
    post(req,res){
        const keys= Object.keys(req.body) // retorna chave de todos vetores

        for(key of keys){
            if(req.body[key] == ""){ // Verifica se tem campos vazios
                return res.send("Please, fill all fields!")
            }
        }
        
        chef.create(req.body, function(chef){
            return res.redirect(`/admin/chefs/${chef.id}`)
        })
        
    },
    show(req,res){
        chef.find(req.params.id, function(chef){
            if(!chef) return res.send("chef not found!")
            
            recipe.recipeData(function(data){
                    return res.render('admin/chefs/showChef',{chef,recipeData:data})
                })           
        })
    },
    edit(req,res){
        chef.find(req.params.id, function(chef){
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
        chef.update(req.body, function(){
            return res.redirect(`/admin/chefs/${req.body.id}`)
        })
    },
    delete(req, res){
        chef.delete(req.body.id, function(){
                return res.redirect(`/admin/chefs`)
            })  
    },
}