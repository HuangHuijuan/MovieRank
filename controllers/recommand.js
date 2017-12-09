var pg = require('pg');
var db = require('../db');

var client = new pg.Client({
	connectionString: process.env.HEROKU_POSTGRESQL_BLACK_URL || db.connectionString,
  ssl: true
});

client.connect();

function _credence_recommand(param, callback)  
{  
    console.log("run credence");  
    const credenceQuery = {
        text: 'with myVote(movieid, rating) as \n' + 
                  '(select movieid, rating from ratings where userid = $1),\n' + 
              'movieCount(mCount) as (select count(*) from myVote),\n' +
              'otherVote(userid, movieid, rating) as \n' + 
                  '(select userid, movieid, rating from ratings \n' + 
                        'where movieid in (select movieid from myVote) and userid <> $1),\n' + 
              'tmpCorr(userid, movieid, singleCorr) as \n' + 
                  '(select userid, otherVote.movieid, ' + 
                      'CASE ' +  
                          'WHEN myVote.rating > otherVote.rating ' + 
                          'THEN ' + 
                                 'otherVote.rating/myVote.rating ' + 
                          'ELSE ' + 
                                 'myVote.rating/otherVote.rating ' + 
                      'END ' + 
                      'AS singleCorr\n' +
                          'from myVote, otherVote where myVote.movieid = otherVote.movieid),\n' +
              'corr(userid, correlation) as \n' + 
                  '(select userid, sum(SingleCorr)/count(SingleCorr) as correlation \n' + 
                      'from tmpCorr group by userid having' + 
                          '(count(SingleCorr) > (select mCount from movieCount) / 4 and count(SingleCorr) > 2)),\n' + 
              'movieIdList(movieid, score) as \n' + 
                  '(select movieid, (sum(rating * correlation) / sum(correlation)) as score \n' + 
                      'from ratings, corr where ratings.userid = corr.userid \n' + 
                          'group by movieid having count(correlation) > 3 and' + 
                              ' movieid not in (select movieid from myVote))\n' +
              'select title from movies, movieIdList \n' + 
                  'where movies.movieid = movieIdList.movieid order by score desc limit 5;'
    }
    client.query(credenceQuery, [param], function selectCb(error, results, fields)  
    {  
        if (error)  
        {  
        	console.log("ClientReady Error: " + error.message),  
            client.end();  
        }  
        //console.log('Get ' + results.rowCount + ' results.');  
        callback(error ? [] : results.rows);
    });  
}

module.exports = {
	_credence_recommand
};
