
Minimalistic billing desktop app for freelancers.

Simply keep track of your bills and clients, print them in pdf.

You can change the layout, it's simple html and css (result.html and print.css situated in files/bills/).

To add or remove fields, you just do it in files/bills/newbill.html form and files/bills/result.html layout, the scripts will do the rest.

May not be relevant for all countries, made for a french designer.


Libraries used : 
- electron : https://electron.atom.io/
- nedb : https://github.com/louischatriot/nedb
- jquery
- bootstrap

Features :
- editable personal data
- editable client's list
- bills' data is stored and can be edited
- print to pdf

todo :
- list of bills by client ?

Requires :
- node.js

Installation and usage :

```
npm install                 # installs dependencies
npm start                   # launches the program
```