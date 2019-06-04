var request = require('request');
var secrets = require('./secrets');
var fs = require('fs');
var repoOwner = process.argv[2];
var repoName = process.argv[3];

//higher function
function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'user-Agent': 'request',
      Authorization: 'token ' + secrets.GITHUB_TOKEN
    }
  }

//pasing from JSON to Object and calling the calling back function
request(options, function(err, res, body){
    var data = JSON.parse(body)
    cb(err, data)
  })
}

//downloads image from url and stores in filepath
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
      console.log('Download completed.')
    })
    .pipe(fs.createWriteStream(filepath));
}

//calling the funtion and Callback function
getRepoContributors(repoOwner, repoName, function(err, result) {
  if(!err && repoOwner && repoName){
    for(contributor of result){
      downloadImageByURL(contributor.avatar_url, "./avatars/"+ contributor.login + ".png" )
    }
  } else {
      console.log("Errors:", err);
  }
  });


