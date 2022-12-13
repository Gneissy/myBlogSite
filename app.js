
const express = require("express"); // Express is required
const app = express(); // I'll use "app" for accesing express
const https = require("https"); // https is required for get request
app.use(express.urlencoded({extended:true})); // Body-parser
app.use(express.static("public")); // Static method in order to access local files like css and images
app.set("view engine", "ejs"); // EJS is set
var _ = require('lodash'); // Lodash is required
const mongoose = require ("mongoose"); // Mongoose is required
mongoose.connect("mongodb+srv://admin-ahmet:2503199600@cluster0.n8hirrx.mongodb.net/myBlogDB"); // Conecting Mongo Database & Collection

// Creating a DB Schema
const postSchema = new mongoose.Schema({
  postTitle: String,
  postContent: String,
});

// Creating the Collection
const Post = mongoose.model("post", postSchema); // "posts" collection is created.


// Random inputs
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

// Main post array
// let posts = [];

// Root Route get request
app.get("/", function(req, res) { // on home route,
  Post.find({}, function(err, posts){
        res.render("home", { // send "home.ejs"
          posts: posts // "posts" in home.ejs is "posts" in app.js
        });
      });
    });

app.get("/about", function(req,res){ // on /about route,
  res.render("about", { // send "about.ejs"
    aboutContent: aboutContent // "aboutContent" in about.ejs is "aboutContent" in app.js
  });
});

app.get("/contact", function(req,res){ // on /contact route,
  res.render("contact", { // send contact.ejs
    contactContent: contactContent // "contactContent" in contact.ejs is "contactContent" in app.js
  });
});

app.get("/compose", function (req,res){ // on /compose route,
  res.render("compose"); // send compose.ejs
});

app.get("/posts/:postId", function(req, res) { // on inputted route,
  const requestedPostId = req.params.postId; // This is needed constant to store postId parameter value
  Post.findById(requestedPostId, function(err, posts){
        res.render("post", { // send "post.ejs"
          posts: posts
        });
      });
});


app.post("/compose", function(req,res){ // Post request of compose,
    let post = { // Create an object having 2 properties:
      titlePost: req.body.titleInput,
      bodyPost: req.body.textArea
    };

    // Sending obtained data to database
    const newPost = new Post({
      postTitle: post.titlePost,
      postContent: post.bodyPost
    });

    newPost.save(function(err){
      if(!err){
        res.redirect("/"); // Redirect us to home route
      }else{
        console.log(err);
      }
    }); // Saving newPost into database.

    // console.log(post);
    // posts.push(post); // Add this object to posts array

});


// Running the server
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
