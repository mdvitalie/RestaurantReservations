var userdb = require('../model/model');

// create and save new user
exports.create = (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }

    // new user
    const user = new userdb({
        id: req.body.id,
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        noGuests: req.body.noGuests,
        date: req.body.date,
        time: req.body.time
    });

    // save user in the database
    user
            .save(user)
            .then(data => {
                res.status(200).send();
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating a create operation"
                });
            });
};

// retrieve and return users
exports.find = (req, res) => {

    if (req.query.id) {
        const id = req.query.id;

        userdb.findById(id)
                .then(data => {
                    if (!data) {
                        res.status(404).send({message: "Not found user with id " + id});
                    } else {
                        res.send(data);
                    }
                })
                .catch(err => {
                    res.status(500).send({message: "Error retrieving user with id " + id});
                });

    } else {
        userdb.find()
                .then(user => {
                    res.send(user);
                })
                .catch(err => {
                    res.status(500).send({message: err.message || "Error Occurred while retriving user information"});
                });
    }
};

// Update a new idetified user by user id
exports.update = (req, res) => {
    if (!req.body) {
        return res
                .status(400)
                .send({message: "Data to update can not be empty"});
    }

    const id = req.params.id;
    userdb.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
            .then(data => {
                if (!data) {
                    res.status(404).send({message: `Cannot Update user with ${id}. Maybe user not found!`});
                } else {
                    res.send(data);
                }
            })
            .catch(err => {
                res.status(500).send({message: "Error Update user information"});
            });
};

// Delete a user with specified user id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    userdb.findByIdAndDelete(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({message: `Cannot Delete with id ${id}. Maybe id is wrong`});
                } else {
                    res.send({
                        message: "User was deleted successfully!"
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Could not delete User with id=" + id
                });
            });
};