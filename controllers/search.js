const db_accessor = require(__dirname + '/db_accessor.js');

function keyWordSearch()
{
	//const keyword = request.body.keyword;
	const keyword = 'Tom';

	const query = {
		text: `SELECT * FROM Movies where LOWER(title) LIKE LOWER(\'%${keyword}%\');`,
	};

	db_accessor._select(query, res => {
		console.log(res);
	});
}

function tagSearch()
{
	//const tag = request.body.tag;
	const tag = 'comedy';

	const query = {
		text: `SELECT * FROM Movies where LOWER(genres) LIKE LOWER(\'%${tag}%\');`,
	};

	db_accessor._select(query, res => {
		console.log(res);
	});
}

module.exports = {
	keyWordSearch,
	tagSearch
};