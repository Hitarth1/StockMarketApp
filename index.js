var express = require('express')
var app = express();
var path = require('path')
var exphbs = require('express-handlebars');

const PORT = process.env.PORT || 5000;

//set handelbar middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render("home", {
        stuff: 'Hey his is stuff'
    })
})


app.use(express.static(path.join(__dirname, 'public')))


app.listen(PORT, () => {
    console.log('Server is running');
})