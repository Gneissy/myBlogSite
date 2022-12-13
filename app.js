
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
const postSchema = new mongoose.Schema({ // This allows us to record posts in database
  postTitle: String,
  postContent: String,
});

// Creating the Collection
const Post = mongoose.model("post", postSchema); // "posts" collection is created.

// Random inputs
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "You're visiting Ahmet Serteser's blog. I'm not that much interested in sharing my daily stuff, just trying to improve and learn about how to be a better programmer. It requires lots of practise, and this is the way i practise. I'm 24 years old and i'll be coming, to destroy the universe. Take a seat, be patient and get ready for the show.";
const contactContent = "You can reach me from here:";

// Main post array
// let posts = [];

// ________________________________________________________________Get Requests
app.get("/", function(req, res) { // on home route,
  Post.find({}, function(err, posts){ // Find Post objects having "" properties (all)
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

app.get("/posts/:postId", function(req, res) { // on inputted post ID route,
  const requestedPostId = req.params.postId; // This is needed constant to store postId parameter value
  Post.findById(requestedPostId, function(err, posts){
        res.render("post", { // send "post.ejs"
          posts: posts // "posts" in post.ejs is "posts" in app.js
        });
      });
});

// ______________________________________________________________Post Requests
app.post("/compose", function(req,res){ // Post request of compose,
    let post = { // Create an object having 2 properties:
      titlePost: req.body.titleInput,
      bodyPost: req.body.textArea
    };

    // Sending obtained data to database
    const newPost = new Post({
      postTitle: post.titlePost,
      postContent: post.bodyPost
    }); // This is a Post object

    newPost.save(function(err){ // Save the object on database
      if(!err){ // If there is no error,
        res.redirect("/"); // Redirect us to home route
      }else{
        console.log(err);
      }
    });

    // console.log(post);
    // posts.push(post); // Add this object to posts array

});


// Running the server
app.listen(process.env.PORT || 3000, function() {
  console.log("Server is ready to roll baby!");
});
