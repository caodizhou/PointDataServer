function aShow(){
    var file=document.getElementById("filea").files[0];
    console.log(file.type);
    if(file){
        var reader=new FileReader();
        reader.onload=function(){
            console.log(this.result);
        }
    }
    reader.readAsText(file);
}