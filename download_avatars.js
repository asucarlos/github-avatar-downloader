var request = require('request');
var secret = require('./secrets')

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
  url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
  headers: {
    'user-Agent': 'request'
    'Authorization':
  }

};

request(options, function(err, res, body){
    var data = JSON.parse(body)
    // console.log(data)
    for(i in data){
      console.log(data[i].avator_url)
    }
    cb(err, data)
  })
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});
