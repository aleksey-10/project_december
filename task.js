const idAttach = '#out', idForm = '#formTask', idText = '#textInput', idClear = '#clearTask' ;

let obj = {
  count: 0,
  $elems: [],

  clear(id) {
    document.querySelector(id).classList.add('deleting-item');

    while (document.querySelector(id).firstElementChild)
      document.querySelector(id).lastElementChild.remove();

    document.querySelector(id).classList.remove('deleting-item');

    this.setInitial();
    },

    setInitial() {
      localStorage.clear();
      this.$elems.length = 0;
      this.count = 0;
    }
};


class Str {
  constructor(parentSelector, count) {
    this.$parentSelector = document.querySelector(parentSelector);  
    this.count = count;  
  }

  print(val) {
    let $selector = document.createElement('div');

    $selector.className = 'item';
    
    $selector.append( this.setStr(val) );  
    $selector.append( this.edit() ); 
    $selector.append( this.setDeleteButton() );

    return this.$parentSelector.append($selector);
  }

  setStr(val) {
    this.$elem = document.createElement('div')
    this.$elem.innerText = val;
    return this.$elem;
  }

  edit() {

    let $editForm = document.createElement('form');
    $editForm.className = 'edit';

    let $editSubmit = document.createElement('i');
    $editSubmit.className = 'fas fa-check-circle edit-submit';

    let smbIsVisible = (swt) => (swt) ? $editSubmit.style.visibility = 'visible' : $editSubmit.style.visibility = 'hidden'; 
    smbIsVisible(false);

    $editForm.append($editSubmit);

    let $editButton = document.createElement('i');
    $editButton.className = 'far fa-edit edit-button';
    $editForm.append($editButton);

    let str = this;

    $editButton.onclick = function () {
      $editForm.previousSibling.remove();

      smbIsVisible(true);

      let $textAreaEdit = document.createElement('input');
      $textAreaEdit.type = 'text';
      $textAreaEdit.value = str.$elem.innerText;
      $editForm.parentElement.prepend($textAreaEdit);

      $textAreaEdit.onchange = function () {
        smbIsVisible(false);

        $editForm.parentElement.prepend( str.setStr($textAreaEdit.value) );
        $textAreaEdit.remove();

        str.setLcl();
      }
    }

    return $editForm;
  }

  setDeleteButton() {
    let $deleteButton = document.createElement('i');
    $deleteButton.className = "far fa-trash-alt delete-item";
    
    let str = this;

    $deleteButton.onclick = function () {
      $deleteButton.parentElement.classList.add('deleting-item');
      setTimeout(() => $deleteButton.parentElement.remove(), 250); 
      str.dellLcl();
    }

    return $deleteButton;
  }

  setLcl() {
    localStorage.setItem(`$element${this.count}`, this.$elem.innerText );
  }

  dellLcl() {
    localStorage.removeItem(`$element${this.count}`);
  }
}

function printItem(val) {
  localStorage.setItem('count', obj.count);

  let $item = new Str(idAttach, obj.count);
  obj.$elems.push($item.print(val));

  $item.setLcl();
  
  obj.count++;
}


document.querySelector(idForm).onsubmit = function () {
  printItem(document.querySelector(idText).value);
  return false;
}

document.querySelector(idClear).onclick = function () {
  obj.clear(idAttach);
  return false;
}


if (localStorage.length > 1) {
  let qty = +localStorage.getItem('count')+1;

  let lclArr = [];

  for (let i = 0; i < qty; i++) {
    if ( !localStorage.hasOwnProperty(`$element${i}`) ) {
        continue;
      }

    lclArr.push(localStorage.getItem(`$element${i}`));
  }

  localStorage.clear();

  for (let key of lclArr) printItem(key);
}
















// Task below







































// class Clock {
//   constructor({ template }) {
//     this.template = template;
//   }

//   render() {
//     let date = new Date();

//     let hours = date.getHours();
//     if (hours < 10) hours = '0' + hours;

//     let mins = date.getMinutes();
//     if (mins < 10) mins = '0' + mins;

//     let secs = date.getSeconds();
//     if (secs < 10) secs = '0' + secs;

//     let output = this.template
//       .replace('h', hours)
//       .replace('m', mins)
//       .replace('s', secs);

//     console.log(output);
//   }

//   stop() {
//     clearInterval(this.timer);
//   }

//   start() {
//     this.render();
//     this.timer = setInterval(() => this.render(), 1000);
//   }
// }


// class ExtendedClock extends Clock{
//   start() {
//     super.render();
//     this.timer = setInterval( () => this.render(), +prompt("delay", 1)*1000 )
//   }
// };

// let clock = new ExtendedClock({template: 'h:m:s'});
// clock.start();