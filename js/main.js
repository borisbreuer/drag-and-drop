class DragnDrop {
  constructor(_item, _target){
    this.item = _item;
    this.target = _target;
    this.dragItems = document.querySelectorAll("." + this.item );
    this.overItems = document.querySelectorAll("." + this.target);
    this.dItem;
    this.oItem;
    this.targetX;
    this.targetY;
    this.mouseX;
    this.mouseY;
    this.originX;
    this.originY;
    this.rect;
    this.rectParent;
    this.dragTarget;
    this.overTarget;
    this.offsetX;
    this.offsetY;
    this.offsetBorder;
    this.value;
    this.isOver = false;

    this.registerDragables();
    this.preventImageDrag();
  }

  over = (isMoving) => {
    for(this.oItem of this.overItems){
      this.overTarget = this.oItem.getBoundingClientRect();
      this.isOver = this.mouseX > this.overTarget.left && this.mouseX < this.overTarget.right && this.mouseY > this.overTarget.top && this.mouseY < this.overTarget.bottom;
      
      if(this.isOver && isMoving){
          this.oItem.classList.add('hover');
      } else if(this.isOver && !isMoving){
        this.oItem.append(this.dragTarget);
        this.dragTarget.dataset.val = this.oItem.dataset.val;
        this.dragTarget.textContent = this.oItem.dataset.val;
        this.oItem.classList.remove('hover');
      } else {
        this.oItem.classList.remove('hover');
      }
    }
  }
  
  move = (event) => {

    this.mouseX = event.clientX;
    this.mouseY = event.clientY;

    this.targetX = this.originX - event.clientX;
    this.targetY = this.originY - event.clientY;

    this.dragTarget.style.left = Math.round(this.rect.left - this.targetX - this.rectParent.x - this.offsetX - this.offsetBorder) + "px";
    this.dragTarget.style.top = Math.round(this.rect.top - this.targetY - this.rectParent.y - this.offsetY - this.offsetBorder) + "px";

    this.over(true);
    
  }
  
  up = () => {
    this.over(false);

    this.dragTarget.classList.remove("draging");
    this.dragTarget.style.removeProperty('top');
    this.dragTarget.style.removeProperty('left');
    
    window.removeEventListener("mousemove", this.move);
    window.removeEventListener("mouseup", this.up);
  }
  
  down = (event) => {
    
    this.dragTarget = event.target;

    this.offsetX = parseInt(getComputedStyle(this.dragTarget).marginTop);
    this.offsetY = parseInt(getComputedStyle(this.dragTarget).marginLeft);

    this.offsetBorder = parseInt(getComputedStyle(this.dragTarget.parentNode).borderTopWidth);

    this.rect = this.dragTarget.getBoundingClientRect();
    this.rectParent = this.dragTarget.parentNode.getBoundingClientRect();
    
    this.originX = event.clientX;
    this.originY = event.clientY;
    
    this.dragTarget.classList.add("draging");
    this.move(event);

    window.addEventListener("mousemove", this.move);
    window.addEventListener("mouseup", this.up);
  }

  registerDragables(){
    for(this.dItem of this.dragItems){
      this.dItem.addEventListener("mousedown", this.down);
    }
  }

  preventImageDrag(){
    const images = document.getElementsByTagName('img');
    for(let image of images){
      image.addEventListener("dragstart", (event) => event.preventDefault() )
    }
  }

}

const drag = new DragnDrop("item", "target");

const itemSet = document.querySelectorAll(".item");
for(let item of itemSet){
  const rand = parseInt(Math.random() * 10000000);
  const url = `https://source.unsplash.com/featured/110x110/?modern,architecture`
  item.style.background = `center center no-repeat url("${ url },${ rand }")`;
}
