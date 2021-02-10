const db = require('../../config/db')
const {date} = require('../../lib/utils')

module.exports = {
    create(data,callback){
        const query = `
        INSERT INTO chefs(
            name,
            avatar,
            created_at
        ) VALUES ($1, $2, $3)
        RETURNING id
    `
    const values = [ 
        data.name,
        data.avatar,
        date(Date.now()).iso
    ]

     db.query(query, values, function(err, results){
        if(err) throw `Database Error!${err}`

        callback(results.rows[0])
    })

    },
    
    update(data, callback){
        const query = `
            UPDATE chefs SET
                name =($1),
                avatar=($2)
            WHERE id = $3
        `
        const values = [
            data.name,
            data.avatar,
            data.id
        ]
        
        db.query(query, values, function(err, results){
            if(err) throw `Database Error!${err}` 
            
            callback()
        })
    }, 
    delete(id, callback){
        db.query(`DELETE FROM chefs WHERE id= $1`, [id],function(err, results){
            if(err) throw `Database Error! ${err}`

            return callback()
        })
    },
    chefsSelectOptions(callback){
        db.query(`SELECT  * FROM chefs`, function(err, results){
            if(err) throw `Database Error! ${err}`
            
            callback(results.rows)
        })
    },
    find(id, callback){
        db.query(`
        SELECT chefs.*, (SELECT count(*) FROM recipes WHERE recipes.chef_id = $1 ) as total_recipes FROM chefs 
        LEFT JOIN recipes 
        ON chefs.id = recipes.chef_id
        WHERE chefs.id = $1
        GROUP BY chefs.id `, [id],function(err,results){
                if(err) throw `Database Error!${err}`
                
                callback(results.rows[0])
        })
    },
}

