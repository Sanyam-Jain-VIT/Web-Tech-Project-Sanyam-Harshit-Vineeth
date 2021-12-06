var data = '';
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4) {
        for(i of xhttp.responseText){
            data = JSON.parse(xhttp.responseText);
        }
        $(".date")[0].innerHTML = "Updated on: " + data[data.length - 1].updated_on;
        console.log(data[data.length - 1].updated_on);
    }
};
xhttp.open("GET", "Casesdata.json", true);
xhttp.send();


var x = $(".desc")[0];
var seen = $("#seen");
var v = 0;
var color = [];

function mouseover(event, alt){
    var r = (event.clientX) + "px";
    var d = (event.clientY) + "px";
    if(alt.toString() === "Delhi"){
        r = "245px";
        d = "200px";
    }
    for(var i of data){
        if(i.state === alt.toString()){
            $(".desc").empty();
            var p = document.createElement("p");
            p.innerHTML = i.state;
            x.append(p);
            var p1 = document.createElement("p");
            p1.innerHTML = "Active cases : " + i.activecases;
            x.append(p1);
            var p2 = document.createElement("p");
            p2.innerHTML = "Deaths : " + i.deaths;
            x.append(p2);
            x.style.backgroundColor = color[data.indexOf(i)];
            break;
        }
    }
    x.style.visibility = "visible";
    x.style.padding = "10px 15px";
    x.style.transform = "translate3d(" + r + "," + d + ", 0px)";
    x.style.transition = "transform 4s ease"; 
    var flag = true;
    var f = document.getElementsByTagName("span").length;
    for(let i=0;i<f;i++){
            var s = document.getElementsByTagName("span")[i];
            if(s.children[0].innerHTML === x.children[0].innerHTML){
                flag = false;
                break;
            }
        }
    if(flag){
        v++;
        var span = document.createElement("span");
        span.innerHTML = x.innerHTML;
        span.style.backgroundColor = x.style.backgroundColor;
        if(v%2 !== 0){
            span.classList.add("run1");
        }
        else{
            span.classList.add("run2")
        }
        seen.append(span);
    }
}
function mouseout(){
    x.style.transform = "translate3d(10px, 5px, 0px)";
}

$(document).ready(function(){
    for(var i of data){
        if(i.updated_on === undefined){
            if(i.activecases[i.activecases.length - 1] === "L"){
                var temp = parseFloat(i.activecases.substring(0, i.activecases.length));
                if(temp <= 5){
                    color.push("hsl(120,100%,25%)");
                }
                else if(temp<=10 && temp>5){
                    color.push("hsl(16,100%,66%)");
                }
                else if(temp<=15 && temp>10){
                    color.push("hsl(33,100%,50%)");
                }
                else{
                    color.push("hsl(0,100%,50%)");
                }
            }
            else{
                color.push("hsl(120,100%,25%)");
            }
        }
        
    }
    // console.log(color);
});
