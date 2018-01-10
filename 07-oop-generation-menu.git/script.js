'use strict'

//***************************//
//JS2, Вебинар №1 , ООП в JS //
//***************************//
//родительский класс Container
function Container() {
	//эти свойства будут у всех детей свои
	this.id = '';
	this.className = '';
	this.htmlCode = '';
}
//для экономии памятти выносим метод в прототип
//этот метод (это поведение) по умолчанию будет
//у всех детей и мы сможем им как то пользоваться
Container.prototype.render = function () {
	return this.htmlCode;
}
//нужен общий для всех метод, который удаляет
//контейнер, здесь его просто обозначим
Container.prototype.remove = function () {

}
//1-ый шаг наследования
//наследуем поведение для Menu от Container,
//добавив уникальное items
function Menu(myParentId, myId, myClass, myItems) {
	//вызываем функцию Container и при этом
	//this будет ссылаться на текущий Menu,
	//что бы в Menu создались такие же свойства
	//как в Container
	Container.call(this);
	this.id = myId;
	this.parentId = myParentId;
	this.className = myClass;
	//items нужен для элементов меню
	this.items = myItems;
}
//2-ой шаг наследования
//что бы у меню появился метод render, т.е.
//создать у Menu такой прототип, скопировав
//его из prototype Container
Menu.prototype = Object.create(Container.prototype);
//значению constructor свойства protoype
//объекта Menu присваиваем Menu,
//что бы он не был просто копией, но был
//самостоятельным, что бы создании меню
//вызывался конструктор function Menu
//, а не function Container
Menu.prototype.constructor = Menu;
//переопределяем поведение render для menu
//подстраивая под наши задачи
Menu.prototype.render = function () {
	var parent = document.getElementById(this.parentId);
	console.log(this.parentId);
	console.log(parent);
	var newUl = document.createElement('ul');
	newUl.className = this.className;
	newUl.id = this.id;
	parent.appendChild(newUl);
	//последовательно перебираем элементы полученного
	//массива пунктов меню, что бы из них создавать
	//соответсвуюшие узлы в DOM
	for (var i = 0; i < this.items.length; i++) {
		//проверим, является ли полученный item экземпляром
		//класса MenuItem
		if (this.items[i] instanceof MenuItem) {
			//вызываем метод render для каждого такого item
			this.items[i].render();
		}
	}
}
//научим сущность Menu удалять какие то
//элементы внутри себя по id
Menu.prototype.remove = function (IdremoveElement) {
	var removeElement = document.getElementById(IdremoveElement);
	removeElement.parentNode.removeChild(removeElement);
}

function MenuItem(myHref, myLabel, myParentId, myId) {
	Container.call(this);
	this.className = 'menu-item';
	this.href = myHref;
	this.label = myLabel;
	this.id = myId;
	this.parentId = myParentId;
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;

MenuItem.prototype.render = function () {
	//надо найти родительский ul с нужным классом
	//или идентификатором и в него построить элемент
	// меню li
	var parent = document.getElementById(this.parentId);
	console.log(parent);
	var newLi = document.createElement('li');
	var newA = document.createElement('a');
	newLi.className = 'li-class';
	newLi.id = this.id;
	newA.className = 'a-class';
	newA.href = this.href;
	var text = this.label;
	var textNode = document.createTextNode(text);
	newA.appendChild(textNode);
	newLi.appendChild(newA);
	parent.appendChild(newLi);
}

/**
 *Задание №2 - научить код добавлять подменю
 */

//Soli Deo Gloria
