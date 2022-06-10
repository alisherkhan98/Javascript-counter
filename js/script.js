"use strict";

//Creation of buttons and value
function newElement (tagName, textContent) {
  let elem = document.createElement(tagName);
  elem.textContent = textContent;
  return elem;
}

let minusButton = newElement('button', '-');
let plusButton = newElement('button', '+');
let value = newElement('span', '0');
container.append(minusButton);
container.append(value);
container.append(plusButton);

//adding style to buttons
let buttons = container.querySelectorAll('button');
for (let button of buttons) {
  button.classList.add('btn');
}

//adding style to value
value.classList.add('value');

//function to change value
let counterValue = 0;

function addOne() {
  counterValue++;
}

function substractOne() {
  counterValue--;
}

function changeValue() {
  value.textContent = counterValue;
}

function counterClick(event) {
  let target = event.target;
  let closestButton = target.closest('button');
  if(!closestButton || !container.contains(closestButton)) return;
  event.preventDefault();

  switch (closestButton) {
    case minusButton:
      substractOne();
      changeValue();
      break;

    case plusButton:
      addOne();
      changeValue();
      break;

  }

  closestButton.style.transform = 'scale(.9)';
  setTimeout(() => {
    closestButton.style.transform = 'scale(1)'
  }, '200');

}

document.addEventListener('click', counterClick);


//adding extra actions
//creating Array of values
let values = [];

//function to add zeroes in dates
function addZero(i) {
  if (i < 10) {i = "0" + i}
  return i;
}

//function to close list when click outside of it
function closeList (event) {
  if (valueList.contains(event.target)) {
    return;
   }
   valueList.setAttribute('hidden','true');
   document.removeEventListener('click', closeList);
}

//function to show check mark on click
function showCheck(elem) {
  let coords = elem.getBoundingClientRect();
  let check = document.createElement('span');
  check.innerHTML = '<i class="fa-solid fa-circle-check fa-beat"></i>';
  check.style.position = 'absolute';
  check.style.top = coords.top - 2 + window.pageYOffset + 'px';
  check.style.left = coords.right + window.pageXOffset + 7 + 'px';
  document.body.append(check);
  setTimeout(() => {
    check.remove();
  }, '1000');

}

//function for action buttons
function actionClick(event) {
  let target = event.target;
  let closestButton = target.closest('button');
  if(!closestButton || !actionButtons.contains(closestButton)) return;
  event.preventDefault();
  switch (closestButton) {

    case save:
      if (values.length == 0 ) {
        valueList.innerHTML = '';
      }
      values.push(counterValue);
      if (values.length <= 10) {
        let date = new Date;
        let time = `${addZero(date.getHours())} : ${addZero(date.getMinutes())} : ${addZero(date.getSeconds())}`;
        valueList.insertAdjacentHTML('beforeend', `<li class='list-row'><span>${time}</span><span>${counterValue}</span></li><hr>`);
        showCheck(closestButton);
      } else {
        alert('too many values!')
      }

      break;

    case view:
      valueList.removeAttribute('hidden');
      document.addEventListener('click', closeList);



      break;

    case clear:
      values =[];
      valueList.innerHTML = '<li>Save values to view them here</li>';
      showCheck(closestButton);

      break;

  }
}
document.addEventListener('click', actionClick)
