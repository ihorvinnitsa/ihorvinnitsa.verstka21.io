class ItcTabs {
	constructor(target, config) {
	  const defaultConfig = {};
	  this._config = Object.assign(defaultConfig, config);
	  this._elTabs = typeof target === 'string' ? document.querySelector(target) : target;
	  this._elButtons = this._elTabs.querySelectorAll('.tabs__btn');
	  this._elPanes = this._elTabs.querySelectorAll('.tabs__pane');
	  this._eventShow = new Event('tab.itc.change');
	  this._init();
	  this._events();
	}
	_init() {
	  this._elTabs.setAttribute('role', 'tablist');
	  this._elButtons.forEach((el, index) => {
		el.dataset.index = index;
		el.setAttribute('role', 'tab');
		this._elPanes[index].setAttribute('role', 'tabpanel');
	  });
	}
	show(elLinkTarget) {
	  const elPaneTarget = this._elPanes[elLinkTarget.dataset.index];
	  const elLinkActive = this._elTabs.querySelector('.tabs__btn_active');
	  const elPaneShow = this._elTabs.querySelector('.tabs__pane_show');
	  if (elLinkTarget === elLinkActive) {
		return;
	  }
	  elLinkActive ? elLinkActive.classList.remove('tabs__btn_active') : null;
	  elPaneShow ? elPaneShow.classList.remove('tabs__pane_show') : null;
	  elLinkTarget.classList.add('tabs__btn_active');
	  elPaneTarget.classList.add('tabs__pane_show');
	  this._elTabs.dispatchEvent(this._eventShow);
	  elLinkTarget.focus();
	}
	showByIndex(index) {
	  const elLinkTarget = this._elButtons[index];
	  elLinkTarget ? this.show(elLinkTarget) : null;
	};
	_events() {
	  this._elTabs.addEventListener('click', (e) => {
		const target = e.target.closest('.tabs__btn');
		if (target) {
		  e.preventDefault();
		  this.show(target);
		}
	  });
	}
  }

// инициализация .tabs как табов
  new ItcTabs('.tabs');





/* 
sendmail розібратися

"use strict"

document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('form');
	form.addEventListener('submit', formSend);

	async function formSend(e) {
		e.preventDefault();

		let error = formValidate(form);

		let formData = new FormData(form);
		formData.append('image', formImage.files[0]);

		if (error === 0) {
			form.classList.add('_sending');
			let response = await fetch('sendmail.php', {
				method: 'POST',
				body: formData
			});
			if (response.ok) {
				let result = await response.json();
				alert(result.message);
				formPreview.innerHTML = '';
				form.reset();
				form.classList.remove('_sending');
			} else {
				alert("Ошибка");
				form.classList.remove('_sending');
			}
		} else {
			alert('Заполните обязательные поля');
		}

	}


	function formValidate(form) {
		let error = 0;
		let formReq = document.querySelectorAll('._req');

		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];
			formRemoveError(input);

			if (input.classList.contains('_numeric')) {
				if (emailTest(input)) {
					formAddError(input);
					error++;
				}
			} else {
				if (input.value === '') {
					formAddError(input);
					error++;
				}
			}
		}
		return error;
	}
	function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}
	//Функция теста email
	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}

});

*/




"use strict"

const isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows());
	}
};

if (isMobile.any()) {
	document.body.classList.add('_touch');

	let menuArrows = document.querySelectorAll('.menu__arrow');
	if (menuArrows.length > 0) {
		for (let index = 0; index < menuArrows.length; index++) {
			const menuArrow = menuArrows[index];
			menuArrow.addEventListener("click", function (e) {
				menuArrow.parentElement.classList.toggle('_active');
			});
		}
	}

} else {
	document.body.classList.add('_pc');
}

// Меню бургер
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
	iconMenu.addEventListener("click", function (e) {
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	});
}


// Прокрутка при клике
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
		const menuLink = e.target;
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

			if (iconMenu.classList.contains('_active')) {
				document.body.classList.remove('_lock');
				iconMenu.classList.remove('_active');
				menuBody.classList.remove('_active');
			}

			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
			e.preventDefault();
		}
	}
}