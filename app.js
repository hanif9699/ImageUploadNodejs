const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const storage = multer.diskStorage({
    destination: './public/upload/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({
    storage, limits: { fileSize: 100000000 },
    fileFilter: (req, file, cb) => {
        checktype(file, cb);
    }
}).single('myImage');

function checktype(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('./public'));

app.get('/', (req, res) => { res.render('index') });
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.render('index', {
                msg: err
            });
        }
        else {
            if (req.file == undefined) {
                res.render('index', {
                    msg: ' No File Selected!'
                });
            }
            else {
                res.render('index', {
                    msg: 'Image uploaded successfully',
                    file: `upload/${req.file.filename}`
                });
            }
        }
    })

});




const PORT = 3000;
app.listen(PORT, () => { console.log(`Server is listen on port ${PORT}`) });