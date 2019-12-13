const GoogleSpreadsheet = require('google-spreadsheet')
const credentials = require('./bugtracker.json')
const {promisify} = require('util')

const addRowToSheet = async() => {
    const doc = new GoogleSpreadsheet('aqui_vai_o_id_do_doc')
    await promisify(doc.useServiceAccountAuth)(credentials)
    console.log('planilha aberta')
    const info = await promisify(doc.getInfo)()
    const worksheet = info.worksheets[0]
    await promisify(worksheet.addRow)({name: 'Sandro', email: 'teste'})
}

addRowToSheet()


/*
const doc = new GoogleSpreadsheet('aqui_vai_o_id_do_doc')
doc.useServiceAccountAuth(credentials, (err) => {
    if(err) {
        console.log('não foi possível abrir a planilha')
    } else {
        console.log('planilha aberta')
        doc.getInfo((err, info) => {
            console.log(info)
            const worksheet = info.worksheets[0]
            worksheet.addRow({name: 'Sandro', email: 'teste'}, err => {
                console.log('linha inserida')
            })
        })
    }
})
*/