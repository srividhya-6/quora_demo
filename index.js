const express=require("express");
const app=express();
const {v4:uuidv4}=require("uuid");
const methodoverride=require("method-override");

const port=8080;

app.use(methodoverride("_method"));
let posts=[
    {
        id:uuidv4(),
        username:"vidhya",
        content:"Iam from CVR college of engineering"
    },
    {
        id:uuidv4(),
        username:"swathi",
        content:"Iam from MallaReddy institute of technology and science"
    },
    {
        id:uuidv4(),
        username:"jin",
        content:"Iam from seoul national university"
    }
];
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("form.ejs");
});

app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p) => id===p.id);
    // console.log(post);
    res.render("show.ejs",{post});
})
app.patch("/post/:id",(req,res)=>{
    let {id}=req.params;
    let content=req.body.content;
    let post=posts.find((p)=> p.id===id);
    post.content=content;
    res.redirect("/posts");
})
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> p.id===id);
    res.render("edit.ejs",{post});
})
app.delete("/post/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>p.id!=id);
    res.redirect("/posts");
})
app.listen(port,() => {
    console.log("listening to port : 8080");
});
