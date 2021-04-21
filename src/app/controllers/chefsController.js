const Chef = require('../models/chefsModel');
const recipe = require('../models/privateRecipeModel')
const File = require('../Models/fileModel');

module.exports = {
    async  index(req,res){
        let results = await Chef.allChefs()
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

        return res.render('admin/chefs/chefs',{chefs:lastAdded})
       
    },
    async show(req,res){
        let results = await Chef.find(req.params.id)
        const chefs = results.rows[0]

        if(!chefs) return res.send("chef not found!")

        results = await recipe.findByChef(chefs.id)
        const recipeData = results.rows

        async function getImage(recipeId){
            let results = await recipe.files(recipeId)
            const files = results.rows.map(file =>(`${req.protocol}://${req.headers.host}${file.path.replace("public","")}`))
            let file = files[0]
            return file
        }

        const recipesPromisse = recipeData.map(async recipeData =>{
            recipeData.img = await getImage(recipeData.id)
            return recipeData
        })
        const lastAdded = await Promise.all(recipesPromisse)


        results = await Chef.files(chefs.file_id)
        let files = results.rows
        files = files.map(file =>({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`
        }))
        

        return res.render('admin/chefs/showChef',{chefs,files, recipeData:lastAdded})
    
    },
    create(req,res){ 
            return res.render('admin/chefs/createchef')
    },
    async post(req,res){
        const keys= Object.keys(req.body) // retorna chave de todos vetores

        for(key of keys){
            if(req.body[key] == ""){ // Verifica se tem campos vazios
                return res.send("Please, fill all fields!")
            }
        }
        if(req.files.length == 0)
            return res.send('please, send at least one image!')

        const file = await File.create({
            filename: req.files[0].filename,
            path: req.files[0].path
        })
        file_id = file.rows[0].id
        
        
        let results = await Chef.create(req.body.name,file_id)
        const chefId = results.rows[0].id

        return res.redirect(`/admin/chefs/${chefId}`)
    },
    async edit(req,res){
        let results =  await Chef.find(req.params.id);
        const chef = results.rows[0]

        results =  await Chef.files(chef.file_id)
        let Files = results.rows
        Files = Files.map(file =>({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`
        }))
        
        return res.render("admin/chefs/editChef", {chef,Files})
    },
    async put(req,res){
        const keys= Object.keys(req.body) // retorna chave de todos vetores

        for(key of keys){
            //req.body.key == ""
            if(req.body[key] == ""){ // Verifica se tem campos vazios
                return res.send("Please, fill all fields!")
            }
        }
        //console.log(req.files[0])
        if(req.files[0]){

            const file = await File.create({
                filename: req.files[0].filename,
                path: req.files[0].path
            })
            file_id = file.rows[0].id
            await Chef.update(req.body, file_id)
            await File.delete(req.body.old_file)
        }else{
            await Chef.update(req.body, req.body.old_file)
        }

        return res.redirect(`/admin/chefs/${req.body.id}`)
    },
    async delete(req, res){
        await Chef.delete(req.body.id,req.body.file_id)
        return res.redirect(`/admin/chefs`) 
    },
}