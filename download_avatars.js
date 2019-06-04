var request = require('request');
var secrets = require('./secrets');
var fs = require('fs');
var repoOwner = process.argv[2];
var repoName = process.argv[3];


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
    // for(contributor of data){
      cb(err, data)
      // console.log(contributor.avatar_url)
    // }
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
    console.log('Download completed.')
  })
  .pipe(fs.createWriteStream(filepath));
}

getRepoContributors(repoOwner, repoName, function(err, result) {
  if(err){
  console.log("Errors:", err);
  } else {
  for(contributor of result){
  // console.log(contributor.avatars);
  downloadImageByURL(contributor.avatar_url, "./avatars/"+ contributor.login + ".png" )
  }// console.log("Result:", result);
  }
});

  // downloadImageByURL(result.avatar_url, "./avatars/"+ result.login + ".jpg" )

