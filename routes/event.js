var express = require('express');
var router = express.Router();
var eventQueries = require('../queries/eventQueries');

router.post('/', function(req, res, next) {
    console.log('req: ' + JSON.stringify(req.body));
    eventQueries.createEvent(req.body, res);
});

router.get('/', function(req, res, next) {
    console.log('req: ' + JSON.stringify(req.body));
    eventQueries.listEvent(req.body, res);
});

router.put('/', function(req, res, next) {
    console.log('req: ' + JSON.stringify(req.body));
    eventQueries.updateEvent(req.body, res);
});

router.post('/buyTicket', function(req, res, next) {
    console.log('req: ' + JSON.stringify(req.body));
    eventQueries.buytTicket(req.body, res);
});
router.get('/ticket', function(req, res, next) {
    console.log('req: ' + JSON.stringify(req.query));
    eventQueries.listEventByUser(req.query, res);
});
module.exports = router;



