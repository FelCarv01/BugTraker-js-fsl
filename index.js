const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const { promisify } = require('util')

const GoogleSpreadsheet = require('google-spreadsheet')
const credentials = require('./bugtracker.json')


//config
const docId = '1rvhTdY88uhobELd9Ws-eTuLQ5Qnp4KMaz3CFuJaJe58'
const worksheetIndex = 0


app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'views'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('home')
})

app.post("/", async (req, res) => {
  try {
    const doc = new GoogleSpreadsheet(docId);
    await promisify(doc.useServiceAccountAuth)(credentials);
    console.log("planilha aberta");
    const info = await promisify(doc.getInfo)();
    const worksheet = info.worksheets[worksheetIndex];
    await promisify(worksheet.addRow)({
      name: req.body.name,
      email: req.body.email,
      issueType: req.body.issueType,
      howToReproduce: req.body.howToReproduce,
      expectedOutput: req.body.expectedOutput,
      receivedOutput: req.body.receivedOutput,
      userAgent: req.body.userAgent,
      userDate: req.body.userDate,
      source: req.query.source || 'direct'
    })
    res.render('sucesso')

  } catch (err) {
    res.send('Erro ao enviar o formulário.')
    console.log(err)
  }
});


app.listen(3000, (err) => {
  if (err) {
    console.log('aconteceu um erro', err)
  } else {
    console.log('bugtracker rodando em http://localhost:3000')
  }
})