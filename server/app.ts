const express = require('express')
const cors = require('cors')
const app = express()
const routerRegister = require('./router/index');
const path = require('path');
const port = process.env.PORT || 3000;

// 允许跨域
app.use(cors())
app.use(express.json())

app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});

routerRegister.register(app);

// app.listen(port);
app.listen('3000', async (req, res) => {
  console.log("http://localhost:3000")
})
console.log(`app started at port ${port}...`);