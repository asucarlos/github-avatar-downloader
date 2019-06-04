var request = require('request');
var secrets = require('./secrets');
var fs = require('fs');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'user-Agent': 'request',
      Authorization: 'token ' + secrets.GITHUB_TOKEN

    }
  }

request(options, function(err, res, body){
    var data = JSON.parse(body)
    // console.log(data)
    for(contributor of data){
      console.log(contributor.avatar_url)
    }
    cb(err, data)
  })
}

function downloadImageByURL(url, filepath) {
  request
  .get(url)
  .on('error', function(err){
    console.log('error occured')
    throw err;
  })
  .on('response', function(response){
    console.log('Downloading image...')
    console.log(response.statusMessage, response.headers['content-type'])
  })
  .on('end', function(){
    console.log('Download completed.');
  })
  .pipe(fs.createWriteStream('./avatar_img.jpg'))
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  // console.log("Result:", result);
});


downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")