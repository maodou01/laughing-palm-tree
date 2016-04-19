var express=require('express'),
    app=express(),
    xlsx = require("node-xlsx"),
    fs=require("fs"),
    http=require("http"),
    formidable=require("formidable"),
    fss = require('fs-extra');

app.get('/excel',function(req,res,next){

    var callback=req.query.callback || '',
        ext_name=req.query.ext || 'xlsx';

    if(ext_name!='xlsx' && ext_name!='xls'){
        ext_name='xlsx';
    }
/*excel转换并输出json文件 */
var list = xlsx.parse("output."+ext_name);
list.map(function(obj,index){
    //console.log(obj);
    //console.log(index);
    //console.log(obj.data);
});
//console.log(JSON.stringify(list));
fs.writeFileSync("output.json",JSON.stringify(list));
    res.writeHead(200, {"content-type": "text/json;charset=utf-8"});
    res.end(callback+'('+JSON.stringify(list)+')');

/*json转换并输出excel
var json=fs.readFileSync('output.json','utf8'),
    excel=xlsx.build(JSON.parse(json));
fs.writeFileSync("output.xlsx",excel);
console.log(json);
 */

});

app.get('/upload',function(req,res){
    fs.readFile('index.html', function readData(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
});

app.post('/data',function(req,res){

    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {

        console.log('文件名字：'+ files.file.name);
        console.log('文件大小：'+ files.file.size + '字节');
        console.log('临时路径：'+ files.file.path);
        console.log('文件类型：'+ files.file.type);
        console.log('最后修改日期：'+ files.file.lastModifiedDate);

        res.writeHead(200, {"content-type": "text/json;charset=utf-8"});
        res.write('{"status":"success","excel":');

        var ext_name=files.file.name.slice(files.file.name.indexOf('.')+1);
        switch(ext_name){
            case 'xls':
                fss.removeSync('output.xls');
                fss.move(files.file.path, 'output.xls', function (err) {
                    if (err) return console.error(err)
                    console.log("-----移动文件成功！临时路径已删除。-----");

                    var list = xlsx.parse("output.xls");
                    res.end(JSON.stringify(list)+'}');
                });
                break;
            case 'xlsx':
                fss.removeSync('output.xlsx');
                fss.move(files.file.path, 'output.xlsx', function (err) {
                    if (err) return console.error(err)
                    console.log("-----移动文件成功！临时路径已删除。-----");

                    var list = xlsx.parse("output.xlsx");
                    res.end(JSON.stringify(list)+'}');
                });
                break;
        }
    });



});

http.createServer(app).listen(5000,function(){
    console.log('开始侦听5000端口。');
});
