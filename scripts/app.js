// change that to _this on bundle.js after building

import PokeService from './poke-service';
import ListService from './list-service';

let listFilter = '';
const listElement = document.querySelector('#pokeList'),
  inputElement = document.querySelector('#pokeFilter');

inputElement.addEventListener('keyup', (event) => {
  listFilter = event.target.value;
  setList();
});

function setList() {
  PokeService.listAll()
    .then(filterList)
    .then(ListService.createList)
    .then((template) => (listElement.innerHTML = template));
}

function filterList(pkmList) {
  return pkmList.filter((pkm) => pkm.name.includes(listFilter.toLowerCase()));
}

setList();
