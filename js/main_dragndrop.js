
var drag = new DragnDrop("item", "target");

var itemSet = document.querySelectorAll(".item");

for(var i = 0; i < itemSet.length; i++){
  
  var rand = parseInt(Math.random() * 10000000);
  var urlPicsum = 'https://picsum.photos/seed/' + rand + '/110.jpg?blur=1';
  itemSet[i].style.backgroundImage = 'url("' + urlPicsum + '")';

}
