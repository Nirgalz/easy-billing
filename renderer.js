// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const ipc = require('electron').ipcRenderer
const Datastore = require('nedb')
const db = new Datastore({ filename: 'data/savefile', autoload: true });

const printPDFBtn = document.getElementById('print-pdf')
const test = document.getElementById('test')


printPDFBtn.addEventListener('click', function (event) {
  this.style.visibility = 'hidden'

    db.insert(data, function (err, newDoc) {
        console.log(newDoc)
    });
  // ipc.send('print-to-pdf')
})

test.addEventListener('click', function (event) {
    ipc.send('test')
})

ipc.on('wrote-pdf', function (event, path) {
  const message = `Wrote PDF to: ${path}`
  document.getElementById('pdf-path').innerHTML = message
})
