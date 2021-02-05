const chef = require('../models/chef');

module.exports = {
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
        
        chef.create(req.body, function(){
            console.log(chef)
            return res.redirect(`/admin/chefs/${chefs.id}`)
        })
        
    }
}