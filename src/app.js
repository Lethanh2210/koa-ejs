import Koa from 'koa';
import koaBody from 'koa-body';
import router from "./routes/routes";
const app = new Koa();
const render = require('@koa/ejs');
const path = require('path');
const cors = require('@koa/cors');



app.use(cors());
app.use(koaBody());
app.use(router.routes())
render(app, {
    root: path.join(__dirname, 'view'),
    layout: false,
    viewExt: 'ejs',
    cache: false,
    debug: true
});



app.listen(5000, () => {
    console.log("server is running")
});