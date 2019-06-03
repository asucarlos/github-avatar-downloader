var request = require('request');
var secret = require('./secrests')

console.log('Welcome to the GitHub Avatar Downloader!');
function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
  request('https://api.github.com/repos/jquery/jquery/contributors' + repoOwner + '/' + repoName + '/contributors',
  headers: {
    'user-Agent': 'request'
    'Authorization':
  }
};

request(options, function(err, res, body){
    cb(err, body)
  })
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});
