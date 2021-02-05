const db = require('../../config/db')

module.exports = {
    create(data,callback){
        const query = `
        INSERT INTO chefs(
        name,
        avatar
        ) VALUES ($1, $2)
        RETURNING id
    `
    const values = [ 
        data.name,
        data.avatar
    ]

        db.query(query,values, function(err, results){
            console.log(err)
            console.log(results)
        })
    },
    chefsSelectOptions(callback){
        db.query(`SELECT  name, id FROM chefs`, function(err, results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    },
    
    
}

