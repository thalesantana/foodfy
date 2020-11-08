const data = require('../data.json')

server.get("/", function(req,res){
    return res.render("main", {items: data})
})

server.get("/about.njk", function(req,res){
    return res.render("about")
})

server.get("/recipes.njk", function(req,res){
    return res.render("recipes", {items: data})
})

server.get("/detail/:index", function (req, res) {
    const recipedata = req.params.index
  
    return res.render("detail",{ items : data[recipedata] });
})