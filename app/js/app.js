// // Import jQuery module (npm i jquery)
// import $ from 'jquery'
// window.jQuery = $
// window.$ = $

// // Import vendor jQuery plugin example (not module)
// require('~/app/libs/mmenu/dist/mmenu.js')

document.addEventListener('DOMContentLoaded', () => {
  function mobNenu() {
    function addMobMenu() {
      const box = document.querySelector('.header__inner');
      const logo = document.querySelector('.header-top__logo').cloneNode(true);
      const addCompanyBlock = document.querySelector('.add-company').cloneNode(true);
      const menu = document.querySelector('.menu').cloneNode(true);

      const mobMenu = document.createElement('div');
      mobMenu.classList.add('mobile-menu');

      mobMenu.insertAdjacentHTML('afterbegin', '<button class="btn-close"></button>');
      mobMenu.append(logo, addCompanyBlock, menu);
      box.append(mobMenu);
    }
    addMobMenu();

    const btnMobMenu = document.querySelector('.btn-mob-menu');
    const mobMenu = document.querySelector('.mobile-menu');
    const mobMenuClose = document.querySelector('.mobile-menu .btn-close');

    document.addEventListener('click', toggleMenu);

    function toggleMenu(e) {
      const path = e.path || (e.composedPath && e.composedPath());
      if (e.target === btnMobMenu) {
        mobMenu.classList.toggle('mobile-menu--show');
      } else if (e.target === mobMenuClose || !path.includes(mobMenu)) {
        mobMenu.classList.remove('mobile-menu--show');
      }
    }
  }
  mobNenu();

  function mobSearch() {
    const btnSearch = document.querySelector('.btn-mob-search');
    const formSearch = document.querySelector('.header-top__search');
    const formClose = document.querySelector('.search-form__close');

    document.addEventListener('click', toggleForm);

    function toggleForm(e) {
      const path = e.path || (e.composedPath && e.composedPath());
      if (e.target === btnSearch) {
        formSearch.classList.toggle('header-top__search--show');
      } else if (e.target === formClose || !path.includes(formSearch)) {
        formSearch.classList.remove('header-top__search--show');
      }
    }
  }
  mobSearch();

  function slideInput() {
    let ploshadRang = document.getElementById('ploshadR')
    let polshVanRang = document.getElementById('polshVanR')

    ploshadRang.addEventListener('input', slide1)
    polshVanRang.addEventListener('input', slide2)

    function slide1() {
      let ploshad = document.getElementById('ploshadI');
      ploshad.value = ploshadRang.value + ' ??????.';
    }
    function slide2() {
      let ploshad = document.getElementById('polshVanI');
      if(ploshad.disabled) return
      ploshad.value = polshVanRang.value + ' ??????.';
    }
  }
  slideInput()

  //???????????? ????????????????????????
  function produceCalc() {
    const calcForm = document.querySelector('.calc__form');
    const cost = document.getElementById('money');

    calcForm.addEventListener('change', calc);

    function calc(e) {
      let isRedy = 1;
      let rezult = null;

      //???????????????? ???????? ??????????
      const tipRoom = calcForm.querySelector('[name="tipRoom"]'), //?????? ??????????????????
        ploshad = calcForm.querySelector('[name="ploshad"]'), //?????????????? ??????????????
        electro = calcForm.querySelector('[name="electro"]'), //??????????????????
        perim = calcForm.querySelector('[name="perim"]'), //?????????? ???????????????? ????????
        tipRemont = calcForm.querySelector('[name="tipRemont"]'), //?????? ??????????????
        potolok = calcForm.querySelector('[name="potolok"]'), //??????????????
        vanna = calcForm.querySelector('[name="vanna"]'), //???????????? ??????????????
        polshVan = calcForm.querySelector('[name="polshVan"]'), //?????????????? ??????????????
        teplPol = calcForm.querySelector('[name="teplPol"]'), //???????????? ????????
        dor = calcForm.querySelector('[name="dor"]'), //??????????
        enterDor = calcForm.querySelector('[name="enterDor"]'); //?????????????? ??????????

      //?????????????????? ???????? ?????????????? ??????????????
      if (!Number(vanna.value)) {
        polshVan.disabled = true;
        polshVan.placeholder = '???????? ??????????????????????';
        polshVan.classList.remove('alert');
        polshVan.value = '';
      } else {
        polshVan.disabled = false;
        polshVan.placeholder = '0 ????.??';
      }

      //???????????????? ???????????????????????? ???? ???????????? ????????
      function emptyField(field) {
        if (!field || field.disabled) return;
        if (!field.value) {
          isRedy = 0;
          field.classList.add('alert');
          return;
        } else {
          isRedy = 1;
          field.classList.remove('alert');
        }
      }
      [ploshad, perim, polshVan].forEach(emptyField);

      const formData = {
        tipRoom: Number(tipRoom.value),
        ploshad: parseInt(ploshad.value, 10),
        electro: Number(electro.value),
        perim: parseInt(perim.value, 10),
        tipRemont: Number(tipRemont.value),
        potolok: Number(potolok.value),
        vanna: Number(vanna.value),
        polshVan: parseInt(polshVan.value, 10),
        teplPol: Number(teplPol.value),
        dor: Number(dor.value),
        enterDor: !enterDor.checked,
      };

      console.log(formData.vanna);
      console.log(formData.polshVan);
      //?????????????????? ????????????????????
      if (isRedy) {
        rezult =
          (formData.tipRoom +
            formData.electro +
            formData.tipRemont +
            formData.potolok +
            formData.teplPol) *
            formData.ploshad +
          formData.dor * 8500 +
          formData.vanna * formData.polshVan;

        if (formData.enterDor) rezult = rezult * 1.05;

        cost.innerHTML = rezult + ' ??????.';
      } else {
        cost.innerHTML = '';
      }
    }
  }
  produceCalc();
});
