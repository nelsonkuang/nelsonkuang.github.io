const http = require('http')
const fs = require('fs')
const xml2js = require('xml2js')

var urls = []
const parser = new xml2js.Parser()
fs.readFile('./public/baidusitemap.xml', 'utf-8', (error, data) => {
    if (error) {
        console.log(error)
    } else {
        parser.parseString(data, (err, result) => {
            urls = result.urlset.url.map(obj => obj.loc)
            const reqData = urls.join('\n')
            const postOptions = {
                host: 'data.zz.baidu.com',
                path: '/urls?site=www.kuangzen.com&token=qe2EhYj9DJgZZvaN',
                port: '80',
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain',
                    'Content-Length': reqData.length
                }
            }
            postData(reqData, postOptions)

        })
    }

})

function postData(reqData, postOptions) {
    const postReq = http.request(postOptions, response => {
    	response.setEncoding('utf8')
        response.on('data', data => {
        	data = JSON.parse(data)
            if (data.success)
                console.log('post data success!')
            else
                console.log(data.error)
        })
    })

    postReq.on('error', e => {
        console.log('problem with request: ' + e.message);
    })

    // post the data
    postReq.write(reqData)
    postReq.end()
}
