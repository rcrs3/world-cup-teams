// Get dependencies
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const request = require("request");

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Cross Origin middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

// Set our api routes
app.get('/', (req, res) => {
  res.redirect('/teams');
});

var saved_teams = [];

app.get('/teams', function(req,res){
  if(saved_teams.length === 32) {
    res.send(saved_teams);
  } else {
    var url = 'https://worldcup.sfg.io/teams/results';
    var teams;
    request(url, function(error, response, body) {
        if(!error && response.statusCode == 200) {
          teams = JSON.parse(body);
          saved_teams = teams;
          res.send(teams);
        }
    });
  }
});

app.get('/detail/:id', function(req, res) {
  var id = parseInt(req.params.id)
  if(saved_teams !== []) {
    for(var i = 0; i < saved_teams.length; i++) {
      if(saved_teams[i].id !== id) continue;
      let team = {
        country: saved_teams[i].country,
        id: saved_teams[i].id,
        fifa_code: saved_teams[i].fifa_code,
        group_letter: saved_teams[i].group_letter,
        wins: saved_teams[i].wins,
        draws: saved_teams[i].draws,
        losses: saved_teams[i].losses,
        games_played: saved_teams[i].games_played,
        goals_for: saved_teams[i].goals_for,
        goals_against: saved_teams[i].goals_against
      };
      res.send(team);
    }
  } else {
    var url = 'https://worldcup.sfg.io/teams/results';
    var teams;
    request(url, function(error, response, body) {
        if(!error && response.statusCode == 200) {
          teams = JSON.parse(body);
        
          for(var i = 0; i < teams.length; i++) {
            if(teams[i].id !== id) continue;
            let team = {
              country: teams[i].country,
              id: teams[i].id,
              fifa_code: teams[i].fifa_code,
              group_letter: teams[i].group_letter,
              wins: teams[i].wins,
              draws: teams[i].draws,
              losses: teams[i].losses,
              games_played: teams[i].games_played,
              goals_for: teams[i].goals_for,
              goals_against: teams[i].goals_against
            };
            res.send(team);
          }
        }
    });
  }
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));