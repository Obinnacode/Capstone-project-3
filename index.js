import express from "express";
const port = 3000;
const app = express();
let date = new Date().getDate();
let month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let currentMonth = month[new Date().getMonth()];
let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let currentDay = day[new Date().getDay()];
//below for date format Wednesday, October 25 2023 
let currentDate = `${currentDay}, ${currentMonth} ${date}, ${new Date().getFullYear()}`;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get("/", (req, res) => {     
    //clear arrays for this route for new day. 
    if (!(date === new Date().getDate())) {
        workTask = [];
        dailyTask = [];
        date = new Date().getDate();
        currentDay = day[new Date().getDay()];
        currentMonth = month[new Date().getMonth()];
        currentDate = `${currentDay}, ${currentMonth} ${date}, ${new Date().getFullYear()}`;               
    }
    
    res.render("index.ejs", 
    { 
        date: currentDate, 
        radioStatus1: 'checked',
        action: '/addtask',
        taskCategory: dailyTask,
    });
});

app.get("/work", (req, res) => {
    //clear arrays for this route for new day
    if (!(date === new Date().getDate())) {
        workTask = [];
        dailyTask = [];
        date = new Date().getDate();
        currentDay = day[new Date().getDay()];
        currentMonth = month[new Date().getMonth()];
        currentDate = `${currentDay}, ${currentMonth} ${date}, ${new Date().getFullYear()}`;               
    }
    res.render("index.ejs", 
    { 
        date: currentDate, 
        radioStatus2: 'checked',
        action: '/worktask',
        taskCategory: workTask,
    });
});

//the task array with initial placeholders for added task
let dailyTask = [];
let workTask = [];
//post route for adding new task
app.post('/addtask', function (req, res) {
    let newTask = req.body.newtask;
    //add the new task from the post route into the array
    dailyTask.push(newTask);
    //after adding to the array go back to the root route
    res.redirect("/");
});
//render the ejs and display added task, task(index.ejs) = task(array)

app.post('/worktask', function (req, res) {
    let newTask = req.body.newtask;
    //add the new task from the post route into the array
    workTask.push(newTask);
    //after adding to the array go back to the root route
    res.redirect("/work");
});




app.listen(port, () => {
    console.log(`Server running on port ${port}.`)
})

