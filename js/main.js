
const drag = new DragnDrop("item", "target");

const itemSet = document.querySelectorAll(".item");

for(let item of itemSet){

  const rand = parseInt(Math.random() * 10000000);
  const url = `https://source.unsplash.com/featured/110x110/?modern,architecture`
  item.style.backgroundImage = `url("${ url },${ rand }")`;

}
