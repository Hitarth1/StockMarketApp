var express = require('express')
var app = express();
var path = require('path')
var request = require('request');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

//Middleware
app.use(bodyParser.urlencoded({extended: false}));

//API KEY    =   pk_a778c55111784e1385443a21838cd069
//call api function
function call_api (finishedAPI, ticker){
    request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_a778c55111784e1385443a21838cd069', {json: true}, (err, res, body) => {
        if(err){
            return console.log(err);
        }
        if(res.statusCode === 200){
            finishedAPI(body)
        }
    })
}


//set handelbar middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Routes
app.get('/', (req, res) => {
    call_api((doneAPI) => {
        // console.log(doneAPI);
        res.render("home", {
            stock: doneAPI
        })
    }, "fb");
})

app.post('/', (req, res) => {
    call_api((doneAPI) => {
        res.render("home", {
            stock: doneAPI
        })
    }, req.body.stock_ticker);
})

app.get('/about-us', (req, res) => {
    res.render("aboutUs")
})

// app.use(express.static(path.join(__dirname, 'public')))


app.listen(PORT, () => {
    console.log('Server is running');
})