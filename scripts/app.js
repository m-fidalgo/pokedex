// change that to _this on bundle.js after building

import PokeService from './poke-service';
import ListService from './list-service';

let listFilter = '';
const listElement = document.querySelector('#pokeList'),
  inputElement = document.querySelector('#pokeFilter'),
  loadingElement = document.querySelector('#loading');

inputElement.addEventListener('keyup', (event) => {
  listFilter = event.target.value;
  setList();
});

function setList() {
  PokeService.listAll()
    .then((loadingElement.style.display = 'flex'))
    .then(filterList)
    .then(ListService.createList)
    .then((template) => (listElement.innerHTML = template))
    .then(() => {
      loadingElement.style.display = 'none';
      listElement.style.display = 'flex';
    });
}

function filterList(pkmList) {
  return pkmList.filter((pkm) => pkm.name.includes(listFilter.toLowerCase()));
}

setList();
