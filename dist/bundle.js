/******/ (() => {
  // webpackBootstrap
  /******/ 'use strict';
  /******/ var __webpack_modules__ = [
    ,
    /* 0 */ /* 1 */
    /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
        /* harmony export */
      });
      var PokeService = {
        get url() {
          return 'https://dev.treinaweb.com.br/pokeapi';
        },

        list: [],
        listAll: function listAll() {
          var _this = this;

          if (this.list.length) {
            return Promise.resolve(this.list);
          } else {
            return fetch(''.concat(this.url, '/pokedex/1/'))
              .then(function (response) {
                return response.json();
              })
              .then(function (response) {
                return response.pokemon;
              })
              .then(function (pkmList) {
                return pkmList
                  .map(function (pokemon) {
                    var number = _this.getNumberFromURL(pokemon.resource_uri);
                    pokemon.number = number;
                    return pokemon;
                  })
                  .filter(function (pokemon) {
                    return pokemon.number < 1000;
                  })
                  .sort(function (a, b) {
                    return a.number > b.number ? 1 : -1;
                  })
                  .map(function (pokemon) {
                    pokemon.number = ('000' + pokemon.number).slice(-3);
                    return pokemon;
                  });
              })
              .then(function (list) {
                _this.list = list;
                return list;
              });
          }
        },
        getNumberFromURL: function getNumberFromURL(url) {
          return parseInt(url.replace(/.*\/(\d+)\/$/, '$1'));
        },
      };
      /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
        PokeService;

      /***/
    },
    /* 2 */
    /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
        /* harmony export */
      });
      var ListService = {
        createList: function createList(pkmList) {
          return pkmList
            .map(function (pokemon) {
              return '\n        <li class="poke-list-item">\n          <img src="//serebii.net/pokedex-xy/icon/'
                .concat(pokemon.number, '.png" />\n          <span>')
                .concat(pokemon.number, ' - ')
                .concat(pokemon.name, '</span>\n        </li>\n      ');
            })
            .join('');
        },
      };
      /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
        ListService;

      /***/
    },
    /******/
  ];
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId](
      module,
      module.exports,
      __webpack_require__
    );
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/define property getters */
  /******/ (() => {
    /******/ // define getter functions for harmony exports
    /******/ __webpack_require__.d = (exports, definition) => {
      /******/ for (var key in definition) {
        /******/ if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          /******/ Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/ (() => {
    /******/ __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/make namespace object */
  /******/ (() => {
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = (exports) => {
      /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, {
          value: 'Module',
        });
        /******/
      }
      /******/ Object.defineProperty(exports, '__esModule', { value: true });
      /******/
    };
    /******/
  })();
  /******/
  /************************************************************************/
  var __webpack_exports__ = {};
  // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
  (() => {
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */ var _poke_service__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(1);
    /* harmony import */ var _list_service__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(2);

    var listFilter = '';
    var listElement = document.querySelector('#pokeList'),
      inputElement = document.querySelector('#pokeFilter'),
      pokeballElement = document.querySelector('#pokeballBack');
    inputElement.addEventListener('keyup', function (event) {
      listFilter = event.target.value;
      setList();
    });
    window.addEventListener('scroll', function () {
      var rotation = 'translateY(-50%) rotateZ('.concat(
        window.scrollY / 15,
        ')deg)'
      );
      pokeballElement.style.transform = rotation;
    });

    function setList() {
      _poke_service__WEBPACK_IMPORTED_MODULE_0__['default']
        .listAll()
        .then(filterList)
        .then(_list_service__WEBPACK_IMPORTED_MODULE_1__['default'].createList)
        .then(function (template) {
          return (listElement.innerHTML = template);
        });
    }

    function filterList(pkmList) {
      return pkmList.filter(function (pkm) {
        return pkm.name.includes(listFilter.toLowerCase());
      });
    }

    setList();
  })();

  /******/
})();
