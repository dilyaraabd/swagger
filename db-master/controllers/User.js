const UserModel = require('../models/user')

exports.create = async (req, res) => {
    if (!req.body.email && !req.body.username && !req.body.password) {
        res.status(400).send({ message: "Content can not be empty!" });
    }

    const user = new UserModel({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    await user.save(function(err){
        if (err) {
            console.log(err);
        } else {
            res.render("profile");
        }
    });
};

exports.login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    UserModel.findOne({email: username}, function(err, foundUser){
        if (err) {
            res.send("404")
        } else {
            if (foundUser) {
                if (foundUser.password === password) {
                    res.render("profile");
                }
            }
        }
    });
};
exports.findAll = async (req, res) => {
    try {
        const user = await UserModel.find();
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};
exports.findOne = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.params.email}).exec();
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};
exports.update = async (req, res) => {
    if (!req.body.newEmail || !req.body.newUsername || !req.body.newPassword) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const query = req.body.id;

    await UserModel.findByIdAndUpdate({_id: query}, {
        username:req.body.newUsername,
        email:req.body.newEmail,
        password:req.body.newPassword
    }).then(data => {
        console.log(data)
        if (!data) {
            res.status(404).send({
                message: `User not found.`
            });
        }else{
            res.send({ message: "User updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.delete = async (req, res) => {
    const currentId = req.params.id;
    await UserModel.findOneAndDelete({id: req.params.id}).then(data => {
        if (!data) {
            res.status(404).send({
                message: `User not found.`
            });
        } else {
            res.send({
                message: "User deleted successfully!"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};