function index(req, res) {
  const data = {
    indexPage: 'yes',
    title: 'Movie Rank'
  };
  res.render('index', data);  
}

module.exports = index;