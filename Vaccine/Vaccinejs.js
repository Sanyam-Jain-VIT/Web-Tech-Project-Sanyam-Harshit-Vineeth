var data = '';
var details = '';
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4) {
        data = JSON.parse(xhttp.responseText);
        details = data.updated_data;
    }
};
xhttp.open("GET", "Vaccinedata.json", true);
xhttp.send();

function sorting(data){
    for(let i=0; i<data.length-1; i++){
        for(let j=i+1; j<data.length; j++){
            if(data[i].efficacy < data[j].efficacy){
                var temp = data[i];
                data[i] = data[j];
                data[j] = temp;
            }
        }
    }
    return data;
}

function clicked(x){
    $(x).next(".extra").show();
    $(x).next(".extra").addClass("trans");
    $(x).parent().parent().animate({'padding': '40px 0 0'}, 500);
    $(x).parent().get(0).style.setProperty('--trans', '79%');
    $(x).hide();
}

function remclick(x){
    $(x).parent().prev().show();
    $(x).parent().removeClass("trans");
    setTimeout(() => {
        $(x).parent().hide();
    }, 500);
    $(x).parent().parent().parent().animate({'padding': '160px 0 0'}, 500);
    $(x).parent().parent().get(0).style.setProperty('--trans', '70%');
}

$(document).ready(() => {
    var x = $(".imp");
    x[0].innerHTML = "Total doses given in India: " + details[0].given;
    x[1].innerHTML = "People fully vaccinated: " + details[0].vaccinated;
    x[2].innerHTML = "% fully vaccinated: " + details[0].fully;
    x[3].innerHTML = "Updated on: " + details[0].updated;
    data = sorting(data.vaccine);
    for(let i=0; i<data.length; i++){
        var back = $("<div></div>").addClass("back");
        var card = $("<div></div>").addClass("card").css('background-image', 'url(' + data[i].img + ')');
        var inner = $("<div></div>").addClass("inner");
        var title = $("<div></div>").addClass("title");
        var h = $("<h1></h1>").text(data[i].name);
        title.append(h);
        inner.append(title);
        var content = $("<div></div>").addClass("content");
        var p1 = $("<p></p>").text("Developed by " + data[i].developedby + " in " + data[i].madein);
        var p2 = $("<p></p>").text("Efficacy is " + data[i].efficacy);
        content.append(p1);
        content.append(p2);
        inner.append(content);
        var a = $("<a></a>").addClass("btn").text("Know More");
        a.attr('onclick', 'clicked(this)');
        inner.append(a);
        card.append(inner);
        var extra = $("<div></div>").addClass("extra").hide();
        var p3 = $("<p></p>").text(data[i].doses + "dose(s)");
        var p4 = $("<p></p>").text("Age in " + data[i].age);
        var p5 = $("<p></p>").text("Gap between doses is " + data[i].gap);
        var p6 = $("<p></p>").text("Amount is " + data[i].price);
        var a1 = $("<a></a>").addClass("rembtn").text("Show Less");
        a1.attr('onclick', 'remclick(this)');
        extra.append([p3, p4, p5, p6, a1]);
        inner.append(extra);
        back.append(card)
        $(".cards").append(back);
    }
})
  
/*
"name"
"madein"
"developedby"
"url"
"doses"
"age"
"efficacy"
"gap"
"price"
"img"
*/