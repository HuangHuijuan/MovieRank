var pg = require('pg');

var client = new pg.Client({
	connectionString: process.env.DATABASE_URL
});

client.connect();

function _insert(insertQuery, value) {
	console.log("Log: insert");  
    client.query(insertQuery,  function(error, results)  
    {  
        if(error)  
        {  
            console.log("Insert Error: " + error.message),  
            client.end();  
            return;  
        }  
        console.log('Inserted: ' + results.affectedRows + ' row.'),  
        console.log('insert success...\n');  
    });  
}

function _select(selectQuery, callback)  
{  
    console.log("Log: select");  
    client.query(selectQuery,  function selectCb(error, results, fields)  
    {  
        if (error)  
        {  
        	console.log("ClientReady Error: " + error.message),  
            client.end();  
        }  
        console.log('Get ' + results.rowCount + ' results.');  
        callback(error ? [] : results.rows);
    });  
}

function _update(updateQuery)  
{  
    console.log("Log: update");  
    client.query(updateQuery,function(error, results)  
    {  
        if(error)  
        {  
            console.log("Update Error: " + error.message),  
            client.end();  
            return;  
        }  
        console.log('update success...\n');  
    });  
}  
  
function _delete(deleteQuery)  
{  
    console.log("Log: delete");  
    client.query(deleteQuery,  function(error, results)  
    {  
        if(error)  
        {  
            console.log("Delete Error: " + error.message),  
            client.end();  
            return;  
        }  
        console.log('delete success...\n');  
    });  
}  

module.exports = {
	_select,
	_update,
	_delete,
	_insert
};