// Source: https://github.com/borisbreuer/drag-and-drop
/**
 * @title     TableSort ES6 Version
 * @author    Boris Breuer <mail@borisbreuer.de>
 * @copyright Released under the MIT License <https://opensource.org/licenses/MIT>
 * @version   1.0
 */

class TableSort{

  constructor(_item, _target){

    this.item = _item;
    this.target = _target;

    this.dragControl = document.querySelectorAll(this.item);
    this.overItems = document.querySelectorAll(this.target);

    this.placeHolder = this.createPlaceHolderElement();

    this.registerDragables();
    this.preventImageDrag();

  }

  over = ({ isMoving }) => {

    for(this.oItem of this.overItems){

      this.overTarget = this.oItem.getBoundingClientRect();
      this.phRect = this.placeHolder.getBoundingClientRect();

      this.isOverPH = this.mouseY > this.phRect.top && this.mouseY < this.phRect.bottom;
      this.isOverAll = this.mouseY > this.overTarget.top && this.mouseY < this.overTarget.bottom;
      this.isOverTop = this.mouseY > this.overTarget.top && this.mouseY < this.overTarget.bottom - this.overTarget.height / 5;
      this.isOverBottom = this.mouseY > this.overTarget.top + (this.overTarget.height / 5) * 4 && this.mouseY < this.overTarget.bottom;

      if(this.isOverAll && isMoving && this.dragTarget != this.oItem ) {

        this.oItem.classList.add('hover');

        if(this.isOverTop) { 
          this.oItem.parentNode.insertBefore(this.placeHolder, this.oItem);
        } 

        if(this.isOverBottom && this.oItem.nextElementSibling) {
          this.oItem.parentNode.insertBefore(this.placeHolder, this.oItem.nextElementSibling);
        }

        if(this.isOverBottom && !this.oItem.nextElementSibling) {
          this.oItem.parentNode.appendChild(this.placeHolder);
        }

      } else if (this.isOverAll && !isMoving) {

        /*
        this.dragTarget.dataset.val = this.oItem.dataset.val;
        this.dragTarget.textContent = this.oItem.dataset.val; 
        */

        this.oItem.classList.remove('hover');

        if(this.placeHolder.parentNode){
          this.oItem.parentNode.insertBefore(this.dragTarget, this.placeHolder);
        }else{
          this.oItem.parentNode.appendChild(this.dragTarget);
        }

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

    this.newPosX = Math.round(this.rect.left - this.targetX - this.rectParent.x - this.offsetX - this.offsetBorder);
    this.newPosY = Math.round(this.rect.top - this.targetY - this.rectParent.y - this.offsetY - this.offsetBorder);

    // this.dragTarget.style.left = this.newPosX + "px";
    this.dragTarget.style.top = this.newPosY + "px";

    this.dragTarget.style.width = Math.round(this.rect.width) + "px";
    this.dragTarget.style.height = Math.round(this.rect.height) + "px";

    this.placeHolder.style.width = Math.round(this.rect.width) + "px";
    this.placeHolder.style.height = Math.round(this.rect.height) + "px";

    this.over({isMoving: true});

  }

  up = () => {

    this.over({isMoving: false});

    this.dragTarget.classList.remove("draging");
    document.body.classList.remove("draging");

    this.dragTarget.style.removeProperty('top');
    this.dragTarget.style.removeProperty('left');

    this.dragTarget.removeAttribute('style');

    if(this.placeHolder.parentNode) this.placeHolder.parentNode.removeChild(this.placeHolder);

    this.setSortingData();

    window.removeEventListener("mousemove", this.move);
    window.removeEventListener("mouseup", this.up);

  }

  down = (event) => {

    this.dragTarget = event.target.closest(this.target);

    this.offsetX = parseInt(getComputedStyle(this.dragTarget).marginTop);
    this.offsetY = parseInt(getComputedStyle(this.dragTarget).marginLeft);

    this.offsetBorder = parseInt(getComputedStyle(this.dragTarget.parentNode).borderTopWidth);

    this.rect = this.dragTarget.getBoundingClientRect();
    this.rectParent = this.dragTarget.parentNode.getBoundingClientRect();

    this.originX = event.clientX;
    this.originY = event.clientY;

    this.dragTarget.classList.add("draging");
    document.body.classList.add("draging");
    this.move(event);

    window.addEventListener("mousemove", this.move);
    window.addEventListener("mouseup", this.up);

  }

  registerDragables(){

    for(this.dItem of this.dragControl){
      this.dItem.addEventListener("mousedown", this.down);
    }

  }

  createPlaceHolderElement(){

    const tdCount = document.querySelector(this.target).querySelectorAll('td');
    const tempEl = document.createElement('tr');

    tempEl.className = "placeholder";

    tdCount.forEach(()=>{
      const tempTd = document.createElement('td');
      tempEl.appendChild(tempTd);
    })
    return tempEl;

  }

  preventImageDrag(){

    const images = document.getElementsByTagName('img');
    for(let image of images){
      image.addEventListener("dragstart", (event) => event.preventDefault() )
    }

  }

  setSortingData(){

    let dataSetObjects = document.querySelectorAll(this.target);
    for(let i = 0; i < dataSetObjects.length; i++){
      dataSetObjects[i].dataset.order = i+1;
    }

  }

}
