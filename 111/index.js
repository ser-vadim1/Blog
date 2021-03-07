const express = require('express'),
	bodyParser = require('body-parser'),
	posts = require('./router/posts'),
	users = require('./router/users'),
	auth = require('./router/auth'),
	app = express(),
	swaggerUi = require('swagger-ui-express'),
	swaggerDocument = require('./swagger.json'),
	mongoose = require('mongoose')

mongoose.Promise = Promise
mongoose.connect('mongodb://127.0.0.1:27017/students', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', '*')
	res.header('Access-Control-Allow-Credentials', true)
	res.header('Access-Control-Allow-Methods', '*')

	req.header('Access-Control-Allow-Origin', '*')
	req.header('Access-Control-Allow-Headers', '*')
	req.header('Access-Control-Allow-Credentials', true)
	req.header('Access-Control-Allow-Methods', '*')
	next()
})

app.use(express.static('public'))

app.use('/api/v1/posts', posts)
app.use('/api/v1/users', users)
app.use('/api/v1/auth', auth)

app.use((err, req, res, next) => res.status(500).send({ error: err }))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use('/*', function(req, res) {
	res.status(404).send({
		message: 'Not found such route. Please read API documentation'
	})
})

const server = app.listen(3001, function() {
	console.log('app running on port.', server.address().port)
})
