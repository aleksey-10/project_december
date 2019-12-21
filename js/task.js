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

    this.setLcl();

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

      $editSubmit.onclick = $textAreaEdit.onchange = $textAreaEdit.onblur = function () {
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

  return obj.count++;
}

// let events = function () {
//   const idAttach = '#out', idForm = '#formTask', idText = '#textInput', idClear = '#clearTask' ;

// }

document.querySelector(idForm).onsubmit = function () {
  printItem(document.querySelector(idText).value);
  document.querySelector(idText).value = "";
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
