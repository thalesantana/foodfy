const data = require('../models/chefsModel');
const recipe = require('../models/privateRecipeModel')

module.exports = {
    index(req,res){
        data.allChefs(function(chefs){
            return res.render('admin/chefs/chefs',{chefs})
        })
    },
    show(req,res){
        data.find(req.params.id, function(chef){
            if(!chef) return res.send("chef not found!")
            recipe.indexRecipes(function(data){
                    return res.render('admin/chefs/showChef',{chef,recipeData:data})
                })           
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
        
        data.create(req.body, function(chef){
            return res.redirect(`/admin/chefs/${chef.id}`)
        })
        
    },
    edit(req,res){
        data.find(req.params.id, function(chef){
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
        data.update(req.body, function(){
            return res.redirect(`/admin/chefs/${req.body.id}`)
        })
    },
    delete(req, res){
        const id =  req.body.id
        if(req.body.total_recipes == 0){
            data.delete(req.body.id, function(){
                    return res.redirect(`/admin/chefs`)
            })  
        }else{
            data.find(id, function(chef){
                
                if(!chef) return res.send("chef not found!")
                return res.render("admin/chefs/editChef", {chef})
            })
        }
    },
}