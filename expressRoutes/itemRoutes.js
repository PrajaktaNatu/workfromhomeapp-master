var moment =require('moment');
var express = require('express');
var app = express();
var itemRoutes = express.Router();
//var bodyParser = require('body-parser');
//var urlencodedParser = bodyParser.json.urlencoded({ extended: false });

// Require Item model in our routes module
var Item = require('../models/Item');

// Defined store route
itemRoutes.route('/add').post(function (req, res) {
      var item = new Item(req.body);
      console.log("from add " + item.name);
      item.save()
        .then(item => {
          res.status(200).json({'item': 'Item added successfully'});
          })
        .catch(err => {
          res.status(400).send("unable to save to database");
        });
});

//approval method
itemRoutes.route('/approve/:id').post(function (req, res) {
  Item.findById(req.params.id, function(err, item) {
    if (!item)
      return next(new Error('Could not load Document'));
    else {
      item.ApproverComments = req.body.ApproverComments;
      item.reqStatus = 'Approved';
      item.save().then(item => {
          res.json('request approved');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

//rejection method
itemRoutes.route('/reject/:id').post(function (req, res) {
  Item.findById(req.params.id, function(err, item) {
    if (!item)
      return next(new Error('Could not load Document'));
    else {
      item.ApproverComments = req.body.ApproverComments;
      item.reqStatus = 'Rejected';
      item.save().then(item => {
          res.json('request approved');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

itemRoutes.route('/sendMail').post(function(req,res){
  console.log('Inside SendMail route.....');
  var nodemailer = require("nodemailer");
//  var reqData = JSON.parse(req.body);
  var item = new Item(req.body);
//  console.log("from router " + item.name);
  //  var name = JSON.parse(req.body.name);
  var dateString = item.example_date;
  var dateObj = new Date(dateString);
  var momentObj = moment(dateObj);
  var dispDate = momentObj.format('DD-MM-YYYY');

  var transporter = nodemailer.createTransport({
      service:'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      debug: true,
      auth: {
        user: 'prajaktanatu@gmail.com',
        pass: 'kaustubh@22'
        }
      })

    const mailOptions = {
    from: 'prajaktanatu@gmail.com', // sender address
    to: 'kaustub.vaidya@gmail.com,prajaktakvaidya@gmail.com', // list of receivers
    subject: 'Work From Home Request Submitted', // Subject line
  //  html: '<p>Hello '+ req.body.item +'  finally</p>'// plain text body
    html: '<p>Hello Kaustubh, <br/><br/> '+ item.name +'  has submitted a Work From Home Request. <br/> Reason: '+ item.reason +' <br/> Date: '+ dispDate +' <br/>Kindly approve or reject the same.</p>'// plain text body
    };
    transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info + "reached");
    });
    });

// Defined edit route
itemRoutes.route('/edit/:id').get(function (req, res) {
  var id = req.params.id;
  Item.findById(id, function (err, item){
      res.json(item);
  });
});

//  Defined update route
itemRoutes.route('/update/:id').post(function (req, res) {
  Item.findById(req.params.id, function(err, item) {
    if (!item)
      return next(new Error('Could not load Document'));
    else {
      item.name = req.body.name;
      item.reason = req.body.reason;
      item.example_date = req.body.example_date;
      item.save().then(item => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined get data(index or listing) route
itemRoutes.route('/').get(function (req, res) {
//  Item.findOne({name: 'test'},function (err, items){
  Item.find(function (err, items){
    if(err){
      console.log(err);
    }
    else {
      res.json(items);
    }
  });
});

/* don't want to hard delete, just status will be changed to cancelled
itemRoutes.route('/delete/:id').get(function (req, res) {
  Item.findByIdAndRemove({_id: req.params.id}, function(err, item){
		if(err) res.json(err);
		else res.json('Successfully removed');
	});
});  */

itemRoutes.route('/cancel/:id').post(function (req, res) {
  Item.findById(req.params.id, function(err, item) {
    if (!item)
      return next(new Error('Could not load Document'));
    else {
      item.reqStatus = 'Cancelled';
      item.save().then(item => {
          res.json('request cancelled by user');
          console.log('request cancelled by user');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

module.exports = itemRoutes;
