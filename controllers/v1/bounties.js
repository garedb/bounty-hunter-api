// Create router and reference the models
let db = require('../../models')
let router = require('express').Router()

// GET /v1/bounties - Retrieve all bounties in the DB
router.get('/', (req, res) => {
	db.Bounty.find()
	.then(bounties => {
		res.send(bounties)
	})
	.catch(err => {
		console.log('Error in index route', err)
		res.status(500).send({ message: 'Oops?' })
	})
})

// POST /v1/bounties - Create a new bounty
router.post('/', (req, res) => {
	db.Bounty.create(req.body)
	.then(newBounty => {
		res.status(201).send(newBounty)
	})
	.catch(err => {
		console.log('Error creating a bounty', err)
		if (err.name == 'ValidationError') {
			res.status(406).send({ message: 'Validation error'})
		}
		else {
			res.status(503).send({ message: 'Server or database error' })
		}	
	})
})

// PUT /v1/bounties - Bulk update bounties
router.put('/updateAll', (req, res) => {
    db.Bounty.updateMany({},
        req.body 
    )
    .then(bounty => {
        res.send(bounty)
    })
    .catch(err => {
        console.log("update all error", err)
        res.status(500).send({message: 'oopsies'})
    })   
})

// GET /v1/bounties/:id - Retrieve a single bounty by its id
router.get('/:id', (req, res) => {
	db.Bounty.findById(req.params.id)
	.then(bounty => {
		res.send(bounty)
	})
	.catch(err => {
		console.log(err)
		res.status(500).send({ message: 'Oops?' })
	})
})

// DELETE /v1/bounties - Delete ALL bounties
router.delete('/', (req, res) => {
    db.Bounty.deleteMany()
    .then(bounty => {
        res.send(bounty)
    })
    .catch(err => {
        console.log("error in Id route", err)
        res.status(500).send({message: 'oopsies'})
    })
})

// PUT /v1/bounties/:id - Update a single bounty
router.put('/:id', (req, res) => {
    db.Bounty.updateOne({
        _id: req.params.id
    },
    req.body 
    )
    .then(bounty => {
        res.send(bounty)
    })
    .catch(err => {
        console.log('you made a boo boo', err)
    })
})

// DELETE /v1/bounties/:id - Delete a single bounty
router.delete('/:id', (req, res) => {
	db.Bounty.findByIdAndDelete(req.params.id)
	.then(bounty => {
		res.send(bounty)
	})
	.catch(err => {
		console.log(err)
		res.status(500).send({ message: 'Oops?' })
	})
})

// Export the router object and the routes attached to it
module.exports = router
