const db = require('../../config/db')

module.exports={
    index(callback){
        db.query(`SELECT recipes.*,
        FROM recipes
        ORDER BY title DESC`function(err,results){
            if(err) throw(`Database Error!${err}`)

            callback(results.rows)
        })
    }
};