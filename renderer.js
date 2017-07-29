// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const ipc = require('electron').ipcRenderer

const printPDFBtn = document.getElementById('print-pdf')
const test = document.getElementById('test')
const db = document.getElementById('db')



// modelPDFBtn.addEventListener('click', function (event) {
//
//     const uniqueID = document.getElementById('uniqueID')
//
//     let formData = uniqueID
//
//     ipcRenderer.send('submitForm', formData);
// })



printPDFBtn.addEventListener('click', function (event) {
  this.style.visibility = 'hidden'
  ipc.send('print-to-pdf')
})

test.addEventListener('click', function (event) {
    ipc.send('test')
})

ipc.on('wrote-pdf', function (event, path) {
  const message = `Wrote PDF to: ${path}`
  document.getElementById('pdf-path').innerHTML = message
})
