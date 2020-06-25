var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose = require('mongoose');
var flash=require("connect-flash");
var passport=require("passport");
var LocalStrategy=require("passport-local");
var Campground=require("./models/campground");
var User=require("./models/user");
var seedDB=require("./seeds");
var methodOverride=require("method-override");
var commentRoutes=require("./routes/comments"),
    campgroundRoutes=require("./routes/campgrounds"),
    indexRoutes=require("./routes/index")
var Comment=require("./models/comment");
mongoose.connect('mongodb://localhost:27017/yelp_camp_v11',{useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();

app.use(require("express-session")({
    secret:"hare krishna",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
})
//Campground.create(
//   {
//            name:"Granite Hill", 
//        image:"https://pixabay.com/get/52e5d7414355ac14f1dc84609620367d1c3ed9e04e507440752e79d59048c4_340.jpg",
//        description:"This is a huge hill",

//    },
//    function(err,campground){
//        if(err){
//      console.log(err);}
//        else{
//            console.log("NEWLY CREATED CAMPGROUND");           
//            console.log(campground);
//        }

//});
app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.listen(3000,function(){
    console.log("JAI MAATA DI");
});