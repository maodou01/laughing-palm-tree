function point(num){
    var str_num=num.toString(),
        str_int=str_num.indexOf('.')>-1?str_num.slice(0,str_num.indexOf('.')):str_num,
        int_int_len=str_int.length,
        decimal=str_num.indexOf('.')>-1?str_num.slice(str_num.indexOf('.')):'.00';

    var output='';
    for(var i=1;i<=Math.ceil(int_int_len/3);i++){
        var j=3,start=int_int_len-3*i;
        if(Math.ceil(int_int_len/3)===i){
            j=int_int_len%3;
        }
        if(start<0){
            start=0;
        }
        if(i!==1){
            output = str_int.substr(start,j) + ',' + output;
        }else{
            output = str_int.substr(start,j);
        }
    }
    return output+decimal;
}
