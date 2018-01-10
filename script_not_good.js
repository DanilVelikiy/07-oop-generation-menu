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
Container.prototype.render = function(){
	return this.htmlCode;
}
//нужен общий для всех метод, который удаляет
//контейнер, здесь его просто обозначим
Container.prototype.remove = function(){

}
//1-ый шаг наследования
//наследуем поведение для Menu от Container,
//добавив уникальное items
function Menu(myParentId, myId , myChildId ,
						 myClass , myItems ){
	//1-ый шаг наследования
	Container.call(this);
	//инициализация свойств
	this.myParentId = myParentId;
	this.id = myId;
	this.myChildId = myChildId;
	this.className = myClass;
	//items нужен для элементов меню
	this.items = myItems;
}
//2-ой шаг наследования
Menu.prototype = Object.create(Container.prototype);
//переопределяем constructor
Menu.prototype.constructor = Menu;
//переопределяем поведение render для menu
//подстраивая под наши задачи
Menu.prototype.render = function(){
	var parent = document.getElementById(this.myParentId);
	var newUl = document.createElement('ul');
	newUl.className = this.className;
	newUl.id = this.id;
	parent.appendChild(newUl);
	//последовательно перебираем элементы полученного
	//массива пунктов меню, что бы из них создавать
	//соответсвуюшие узлы в DOM
	for(var i = 0 ; i < this.items.length; i++){
		//проверим, является ли полученный item экземпляром
		//класса MenuItem
		if(this.items[i] instanceof MenuItem){
			//вызываем метод render для каждого такого item
			this.items[i].render();
		}
	}
}
//научим сущность Menu удалять какие то
//элементы внутри себя по id
Menu.prototype.remove = function(IdremoveElement){
	var removeElement = document.getElementById(IdremoveElement);
	removeElement.parentNode.removeChild(removeElement);
}

function MenuItem(myParentId, myId ,
									myClass, myItems , myHref , myLabel ){
	Container.call(this);
	this.className = myClass;
	this.href = myHref;
	this.label = myLabel;
	this.myParentId = myParentId;
	this.id = myId;
	//items нужен для элементов меню
	this.items = myItems;
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;

MenuItem.prototype.render = function(){
	//найти родителя в него построить элемент
	var parent = document.getElementById(this.myParentId);
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
	//сделаем обход внутри текущуго MenuItem
	//и если найдём подпункты SubMenuItem ,
	//то их создадим в соответствующем месте
	//DOM
	for(var j = 0 ; j < this.items.lengh; j++){
		//является ли subitems экземпляром класса
		//SubMenuItem
		this.items[j].render();
	}
}
//класс для подпунктов
function SubMenuItem(myParentId, myId ,
									myClass, myItems , myHref , myLabel ){
	Container.call(this);
	this.className = myClass;
	this.href = myHref;
	this.label = myLabel;
	this.myParentId = myParentId;
	this.id = myId;
	//items нужен для элементов меню
	this.items = myItems;
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;

MenuItem.prototype.render = function(){
	//найти родителя в него построить элемент
	var parent = document.getElementById(this.myParentId);
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
	//сделаем обход внутри текущуго MenuItem
	//и если найдём подпункты SubMenuItem ,
	//то их создадим в соответствующем месте
	//DOM
	for(var j = 0 ; j < this.items.lengh; j++){
		//является ли subitems экземпляром класса
		//SubMenuItem
		this.items[j].render();
	}
}
/**
*Задание №2 - научить код добавлять подменю
*/

/**
*надо создать экземпляр с соответствубщим методом
*для генерации элементов под меню
*он должен находить родительсикй элемент меню
*и в нём вставляться
* ?? Где и как он будет вызываться ??
*/
/**
*сущность SubMenu ведёт себя почти идентично Menu
*но её надо научить монтироваться не в body, а
*в указанный по идентификатору элемент меню
*/
function SubMenu(myId , myClass , mySubItems , myParentId ){
	//наследуемся от Container
	Container.call(this);
	this.id = myId;
	this.className = myClass;
	//items нужен для элементов меню
	this.subitems = mySubItems;
	this.parentId = myParentId;
}
//2-ой шаг наследования
//учим рендерить нужным образом
SubMenu.prototype = Object.create(Container.prototype);
SubMenu.prototype.constructor = SubMenu;
SubMenu.prototype.render = function(){
	//находим родителя и сохраняем в parent
	//console.log('parentId for SubMenu=' + this.parentId);
	var parent = document.getElementById(this.parentId);
	//создаём список
	var newUl = document.createElement('ul');
	newUl.className = this.className;
	newUl.id = this.id;
	parent.appendChild(newUl);
	for(var i = 0 ; i < this.subitems.length; i++){
		//проверим, является ли полученный item экземпляром
		//класса MenuItem
		if(this.subitems[i] instanceof SubMenuItem){
			//вызываем метод render для каждого такого item
			this.subitems[i].render();
		}
	}
}
function SubMenuItem(myHref , myLabel , myId , myParentId){
	Container.call(this);
	this.className = 'submenu-item';
	this.href = myHref;
	this.label = myLabel;
	this.id = myId;
	this.parentId = myParentId;
}

SubMenuItem.prototype = Object.create(Container.prototype);
SubMenuItem.prototype.constructor = SubMenuItem;

SubMenuItem.prototype.render = function(){
	//надо найти родительский ul с нужным идентификатором
	//и в него построить элемент подменю li
	var parent = document.getElementById(this.parentId);
	var newLi = document.createElement('li');
	var newA = document.createElement('a');
	newLi.className = 'li-class';
	newA.className = 'a-class';
	newA.href = this.href;
	var text = this.label;
	var textNode = document.createTextNode(text);
	newA.appendChild(textNode);
	newLi.appendChild(newA);
	parent.appendChild(newLi);
}
//Soli Deo Gloria
