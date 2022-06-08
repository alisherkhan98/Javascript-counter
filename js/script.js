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
  value.textContent = counterValue;
}

function substractOne() {
  counterValue--;
  value.textContent = counterValue;
}

container.onclick = function (event) {
  let target = event.target;
  let closestButton = target.closest('button');
  if(!container.contains(closestButton)) return;
  event.preventDefault();

  switch (closestButton) {
    case minusButton:
      substractOne();
      break;

    case plusButton:
      addOne();
      break;

  }

  closestButton.style.transform = 'scale(.9)'
  setTimeout(() => (
    closestButton.style.transform = 'scale(1)'
  ), '200')

}
