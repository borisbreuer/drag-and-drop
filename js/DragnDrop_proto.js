// Source: https://github.com/borisbreuer/drag-and-drop
/**
 * At least workink with IE11 or higher.
 * @author    Boris Breuer <mail@borisbreuer.de>
 * @copyright Released under the MIT License <https://opensource.org/licenses/MIT>
 * @version   1.0
 */

function DragnDrop(_item, _target) {

    this.item = _item;
    this.target = _target;

    this.dragItems = document.querySelectorAll( "." + this.item );
    this.overItems = document.querySelectorAll( "." + this.target );

    this.registerDragables();
    this.preventImageDrag();

  }

  DragnDrop.prototype.down = function(event) {

    this.dragTarget = event.target;

    this.offsetX = parseInt(getComputedStyle(this.dragTarget).marginTop);
    this.offsetY = parseInt(getComputedStyle(this.dragTarget).marginLeft);

    this.offsetBorder = parseInt(getComputedStyle(this.dragTarget.parentNode).borderTopWidth);

    this.rect = this.dragTarget.getBoundingClientRect();
    this.rectParent = this.dragTarget.parentNode.getBoundingClientRect();

    this.originX = event.clientX;
    this.originY = event.clientY;

    this.dragTarget.classList.add("draging");
    
    this.moveBind = this.move.bind(this);
    this.upBind = this.up.bind(this);

    this.moveBind(event);
    
    window.addEventListener("mousemove", this.moveBind);
    window.addEventListener("mouseup", this.upBind);

  }

  DragnDrop.prototype.move = function(event) {

    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
    
    this.targetX = this.originX - event.clientX;
    this.targetY = this.originY - event.clientY;

    this.dragTarget.style.left = Math.round(this.rect.left - this.targetX - this.rectParent.left - this.offsetX - this.offsetBorder) + "px";
    this.dragTarget.style.top = Math.round(this.rect.top - this.targetY - this.rectParent.top - this.offsetY - this.offsetBorder) + "px";

    this.over(true);

  }

  DragnDrop.prototype.over = function(isMoving) {

    for(var i = 0; i < this.overItems.length; i++){

      this.overTarget = this.overItems[i].getBoundingClientRect();
      this.isOver = this.mouseX > this.overTarget.left && this.mouseX < this.overTarget.right && this.mouseY > this.overTarget.top && this.mouseY < this.overTarget.bottom;

      if(this.isOver && isMoving){
        this.overItems[i].classList.add('hover');
      } else if(this.isOver && !isMoving){

        this.dragTarget.dataset.val = this.overItems[i].dataset.val;
        this.dragTarget.textContent = this.overItems[i].dataset.val;
        this.overItems[i].classList.remove('hover');
        this.overItems[i].appendChild(this.dragTarget);

      } else {

        this.overItems[i].classList.remove('hover');

      }

    }

  }

  DragnDrop.prototype.up = function() {

    this.over(false);

    this.dragTarget.classList.remove("draging");
    this.dragTarget.style.removeProperty('top');
    this.dragTarget.style.removeProperty('left');

    window.removeEventListener("mousemove", this.moveBind);
    window.removeEventListener("mouseup", this.upBind);

  }

  DragnDrop.prototype.registerDragables = function(){
    
    this.downBind = this.down.bind(this);

    for(var i = 0; i < this.dragItems.length; i++){

      this.dragItems[i].addEventListener("mousedown", this.downBind);

    }

  }

  DragnDrop.prototype.preventImageDrag = function(){

    var images = document.getElementsByTagName('img');

    for(var i = 0; i < images.length; i++){

      images[i].addEventListener("dragstart", function(event) {
        event.preventDefault() 
      });

    }

  }

