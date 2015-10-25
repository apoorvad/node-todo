var Todo = require('./models/todo');
var Filter = require('./models/filter');

function getTodos(res){
	Todo.find(function(err, todos) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(todos); // return all todos in JSON format
		});
};
function getFilters(res){
	Filter.find(function(err, filters) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(filters); // return all todos in JSON format
		});
};


module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all todos
	app.get('/api/todos', function(req, res) {

		// use mongoose to get all todos in the database
		getTodos(res);
	});

	// create todo and send back all todos after creation
	app.post('/api/todos', function(req, res) {

		// create a todo, information comes from AJAX request from Angular
		Todo.create({
			text : req.body.text,
			done : false
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			getTodos(res);
		});

	});

	// delete a todo
	app.delete('/api/todos/:todo_id', function(req, res) {
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo) {
			if (err)
				res.send(err);

			getTodos(res);
		});
	});

	// create filters and send back all filters after creation
	app.post('/filters', function(req, res) {

		// create a filter, information comes from AJAX request from Angular
		Filter.create({
			name : req.body.name,
			partNo : req.body.partNo,
			description : req.body.description
			// done : false
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			getFilters(res);
		});

	});

	// delete a filter
	app.delete('/filters:filter_id', function(req, res) {
		Filter.remove({
			_id : req.params.filter_id
		}, function(err, todo) {
			if (err)
				res.send(err);

			getFilters(res);
		});
	});

	// Edit the filter
	app.put('/filters:filter_id',function(req,res){
		Filter.findById(req.params.id,function(err,doc){
			if(err)
			res.send(err);

			doc.name = req.body.name,
			doc.partNo = req.body.partNo,
			doc.description = req.body.description
			doc.save();
		});});


	// application -------------------------------------------------------------
	app.get('/', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});


	app.get('/filters',function(req,res){
	  console.log("I recieved a get request")
		getFilters(res);
	});

	app.get('/filters:filter_id',function(req,res){
		console.log("send to populate in Edit box")
		console.log(req.params.id);
		Filter.findById(req.params.id,function(err,doc){
			if(err)
				res.send(err);
			res.json(doc);
		});
	});
};
