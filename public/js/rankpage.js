(function () {
  var search = getParameterByName('search');
  if(search) {
    document.getElementById('search-input').value = search;
  }

  // document.getElementById('refresh').addEventListener('click', onRefreshClick, false);

  var star = document.getElementsByClassName("star");
  for (var i = 0; i < star.length; i++) {
    star[i].addEventListener('click', onStarClick, false);
  }

  var pageItems = document.getElementsByClassName("page-item");
  for (var i = 0; i < pageItems.length; i++) {
    pageItems[i].addEventListener('click', onPageItemClick, false);
  }
})();

function onRefreshClick() {
  window.location.assign(window.location.href);
}

function onStarClick(e) {
  var movieId = e.target.parentNode.getAttribute('movieId');
  var rating = e.target.getAttribute('rating');
  var userid = document.getElementById('user-id').getAttribute('value');
  console.log(userid);
  fetch(`/movies/${movieId}/${rating}`, option('post', {userid})).then(handleRes)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log('error onStarClick');
    })
    updateStars(movieId, rating);
}

function onPageItemClick(e) {
  var search = getParameterByName('search');
  console.log(search)
  var url = window.location.href.split('?')[0];
  url += search ? '?search=' + search + '&' : '?';
  url += 'page=' + e.target.getAttribute('page');
  window.location.assign(url);
}

function updateStars(movieId, rating) {
  var ret = "";
  rating = parseInt(rating);
  for(var i = 1; i <= rating; i++) {
    ret += `<i class="material-icons star" rating=${i}>star</i>`;
  }
  for(var i = rating + 1; i <= 5; i++) {
    ret += `<i class="material-icons star star_border" rating=${i}>star_border</i>`;
  }
  var movieItem = document.getElementById(movieId);
  movieItem.innerHTML = ret;
  var star = movieItem.getElementsByClassName("star");
  for (var i = 0; i < star.length; i++) {
    star[i].addEventListener('click', onStarClick, false);
  }
}

function option(method, req) {
  return {
    method: method,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'x-access-token': localStorage.token || ''
    },
    body: JSON.stringify(req)
  }
}

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function handleRes(res) {
  let json = res.json();
  return res.status < 400 ?
    json :
    json.then(json => {
      throw json;
    });
}