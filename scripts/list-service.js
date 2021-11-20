const ListService = {
  createList(pkmList) {
    return pkmList
      .map((pokemon) => {
        return `
        <div class="poke-list-item card p-3 mb-5">
          <img
            class="card-img-top"
            src="${pokemon.image}"
            alt="${pokemon.name}"
          />
          <p class="poke-list-number">${pokemon.number}</p>
          <h5 class="poke-list-title card-title">${pokemon.name}</h5>
        </div>
      `;
      })
      .join('');
  },
};

export default ListService;
