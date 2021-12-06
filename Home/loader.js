const degreeToRadian = (angle) => {
    return angle * (Math.PI / 180);
};

const radius = 100;
const diameter = radius * 2;

const circle = document.querySelector("#circular-text");
circle.style.width = `${diameter+20}px`;
circle.style.height = `${diameter+20}px`;

const text = circle.innerText;
const characters = text.split("");
circle.innerText = null;

const startAngle = -90;
const endAngle = 270;
const angleRange = endAngle - startAngle;

const deltaAngle = angleRange / characters.length;
let currentAngle = startAngle;

characters.forEach((char, index) => {
    const charElement = document.createElement("span");
    charElement.innerText = char;
    const xPos = radius * (1 + Math.cos(degreeToRadian(currentAngle)));
    const yPos = radius * (1 + Math.sin(degreeToRadian(currentAngle)));

    const transform = `translate(${xPos}px, ${yPos}px)`;
    const rotate = `rotate(${index * deltaAngle}deg)`;
    charElement.style.transform = `${transform} ${rotate}`;

    currentAngle += deltaAngle;
    circle.appendChild(charElement);
});

var start = Date.now();
$('body>*:not(#loader)').not('script').css('display', 'none');
$('#loader').css('visibility', 'visible');
var time = setInterval(function(){
    var timepassed = Date.now() - start;
    if(timepassed >= 2000){
        $('body>*:not(#loader)').not('script').css('display', 'block');
        $('#loader').css('display', 'none');
        clearInterval(time);
    }
});