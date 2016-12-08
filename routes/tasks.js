var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://kishore9:kishore9@ds127998.mlab.com:27998/mytasklist_kishore',['tasks']);

//-- Get All tasks
router.get('/tasks', function(req , res , next) {

db.tasks.find( function(err , tasks) {
    if(err) {
        res.send(err);
    }
    else {
        res.json(tasks);
    }
})

});

//-- Get single task
router.get('/task/:id', function(req , res , next) {
//-- Get All tasks
db.tasks.findOne( {_id: mongojs.ObjectId(req.params.id)} ,function(err , task) {
    if(err) {
        res.send(err);
    }
    else {
        res.json(task);
    }
})

});

//-- Save a task
router.post('/tasks' , function(req , res , next) {

var task = req.body;

if(!task.title || !(task.isDone + '')) {
    res.status = 400;
    res.json({
        "error":"Bad Data"
    })
}else {
    db.tasks.save(task , function(err , task) {
        if(err) {
            res.send(err);
        }
        else {
             res.send(task);
        }
    });
}

})

//-- Delete a task
router.delete('/task/:id' , function(req , res , next) {

db.tasks.remove({_id: mongojs.ObjectId(req.params.id)} , function(err , task) {

    if(err) {
        res.send(err);
    }
    else {
        res.json(task);
    }

});

})

//-- Update task
router.put('/task/:id', function(req , res , next) {
    var task = req.body;
    var updTask = {};

    if(task.isDone) {
        updTask.isDone = task.isDone;
    }

     if(task.title) {
        updTask.title = task.title;
    }

    if(!updTask) {
        res.status = 400;
        res.json({
            "error": "Bad Data"
        })
    } else {

        db.tasks.update({_id: mongojs.ObjectId(req.params.id)} , updTask , {} , function(err , task) {

            if(err) {
                res.send(err);
            }
            else {
                res.json(task);
            }
        })
    }
})

module.exports = router;