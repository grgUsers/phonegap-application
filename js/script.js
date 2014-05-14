// JavaScript Document
var d = new Date();

var month = d.getMonth()+1;
var day = d.getDate();

var output = d.getFullYear() + '/' +
    ((''+month).length<2 ? '0' : '') + month + '/' +
    ((''+day).length<2 ? '0' : '') + day;


/* detection */
function Validate(objForm) {
    var v1 = objForm.elements['text1'].value;
    var v2 = objForm.elements['text2'].value;
    
	if (v1 == day && v2 == month) {
        alert("Woohoo! Its your birthday! Go get funky.");
    }
    else {
		alert("Darn! Its not your birthday today. Why not try again tomorrow?\n\n(Upgrade to the full app to try again for just £99.99)");
	}
}