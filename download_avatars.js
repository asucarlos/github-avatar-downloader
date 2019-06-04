var request = require('request');
var secrets = require('./secrets')

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'user-Agent': 'request',
      Authorization: 'Token ' + secrets.GITHUB_TOKEN

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


getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});
