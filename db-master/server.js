const express = require('express');
const bodyParser = require('body-parser');
const ejs=require('ejs')
const methodOverride = require('method-override')
const app = express();
//const port = 3000
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(methodOverride('_method'))

const UserRoute = require('./routes/User')
app.use('/user',UserRoute)

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const {router} = require("express/lib/application");
const path = require("path");
const UserController = require("./controllers/User");
const multer = require("multer");

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Database Connected Successfully!!");
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});


app.get("/", (req, res) => res.render(path.resolve("./views/create.ejs")))
app.get("/find", (req, res) => res.render(path.resolve("./views/find.ejs")))
app.get("/update", (req, res) => res.render(path.resolve("./views/update.ejs")))
app.get("/all", (req, res) => res.render(path.resolve("./views/all.ejs")));
app.get("/delete", (req, res) => res.render(path.resolve("./views/delete.ejs")))
app.get("/uploads", (req, res) => res.render(path.resolve("./views/uploads.ejs")))
app.get("/login", (req, res) => res.render(path.resolve("./views/login.ejs")))
let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}`);
});

/*const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images')
    },
    filename: (req, file, cb) => {
        {
            cb(null, Date.now() + "--" + file.originalname);
        }
    }
})
const upload = multer({ storage: fileStorageEngine });
app.post("/single", upload.single("image"), (req, res) => {
    console.log(req.file);
    res.send("Single FIle upload success");
});
const blogRouter = require('./routes/Pic');
const Blog = require('./models/pic');


app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
//route for the index
app.get('/', async (request, response) => {
    let blogs = await Blog.find().sort({ timeCreated: 'desc' });

    response.render('index', { blogs: blogs });
});

app.use(express.static('public'));
app.use('/blogs', blogRouter);*/