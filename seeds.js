var mongoose=require('mongoose');
var Campground=require("./models/campground");
var Comment=require("./models/comment");
var data=[
    {name: "Cloud's Rest",
    image:"https://homepages.cae.wisc.edu/~ece533/images/mountain.png",
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."},
    {name: "Desert eagle",
    image:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.booking.com%2Fhotel%2Fin%2Faman-camps.en-gb.html&psig=AOvVaw2vu1EzlugmvI74yyUabO7z&ust=1591027870820000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNi22ey-3ukCFQAAAAAdAAAAABAI",
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."},
    {name: "Kashmir",
    image:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.booking.com%2Fhotel%2Fin%2Fyoyo-39-s-camps.en-gb.html&psig=AOvVaw2vu1EzlugmvI74yyUabO7z&ust=1591027870820000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNi22ey-3ukCFQAAAAAdAAAAABAD",
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}

]
function seedDB(){
Campground.remove({},function(err)
{
    if(err)
    {
        console.log(err);
    }
    console.log("removed");
    data.forEach(function(seed)
{
    Campground.create(seed,function(err,campground)
    {
        if(err)
        {
            console.log(err);
        }
        else{
            console.log("added new campground");
            Comment.create(
                {
                    text: "This place is great but i wish there was internet", 
                    author: "Homer",
                },function(err,comment)
                {
                    if(err)
                    {
                        console.log(err);
                    }
                    else{
                    campground.comments.push(comment);
                    campground.save();
                    console.log("createrd new comment");
                    }
                });
        }
    });
});
});
//add a few campgrounds


}
module.exports=seedDB;