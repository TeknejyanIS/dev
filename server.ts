const http = require('http')
const fs = require('fs')
const path = require('path')

let contType
let format
let count = 0
http.createServer((req, res) => {

    if (req.url === '/') {
        req.url = '/html/index.html'
        contType = 'text/html'
    }
    count += 1
    format = path.extname(req.url)
    switch (format) {
        case '.html':
            contType = 'text/html'
            break
        case '.css':
            contType = 'text/css'
            break
        case '.jpg':
            contType ='image/jpg'
            break
        case '.jpeg':
            contType = 'image/jpeg'
            break
        case '.webp':
            contType = 'image/webp'
            break
        case '.png':
            contType = 'image/png'
            break
        case '':
            contType = 'text/plain'
            break
        default : contType = 'text/html'
    }

    if ( fs.existsSync(process.cwd()+req.url) && path.extname(process.cwd()+req.url) == '' ) {
        fs.readdir(process.cwd() + req.url, 'utf-8', (err, files) => {
            if (err) console.log('ERROR = ', err)
            files.forEach(file => res.write(file + '\n'))
            res.end()
        })
    } 
    else 
    fs.readFile(process.cwd() + req.url, (err, data) => {
        if (err)
            fs.readFile(process.cwd() + '/html/404.html', 'utf8', (err, data) => {
                if (err) throw err
                res.writeHead(404, { 'Content-type': 'text/html' })
                res.end(data, 'utf-8')
            })
        else {
            if (err) throw err
            res.writeHead(200, { 'Content-type': contType })
            res.end(data)
        }
    })
    console.log('============REQUEST №',count,'============')
    console.log(req.url)
    console.log('===================================')
    console.log('============CONTENT №',count,'============')
    console.log(contType)
    console.log('===================================')
}).listen(3000, ()=>{
    console.log("Сервер запущен по http://localhost:3000");
})