var cellWidth = 80;                 // размер ячеек
var cellHeight = 80;                // размер ячеек
var date1 = new Date();             // текущая дата
var smech = [6, 7, 1, 2, 3, 4, 5];  // смещение дней в предыдущем месяце
var jacheka = 1;  // 
var monthN = {                      // Название месяца
	0: "Январь",
	1: "Февраль",
	2: "Март",
	3: "Апрель",
	4: "Май",
	5: "Июнь",
	6: "Июль",
	7: "Август",
	8: "Сентябрь",
	9: "Октябрь",
	10: "Ноябрь",
	11: "Декабрь"
};                                  // название месяца словами

var monthNN = {                     // Название месяца
  	0: "01",
 	1: "02",
 	2: "03",
	3: "04",
	4: "05",
	5: "06",
	6: "07",
	7: "08",
	8: "09",
	9: "10",
	10: "11",
	11: "12"
};                                  // название месяца цифрами
		
var tabls = {};                     // массив для хранения записей таблицы     
var vidcodmed={};                   // массив для хранения ключей - дат

	//document.addEventListener("DOMContentLoaded", ruready);    // после загрузки дом обращение к функции ruready()

	// ф-ия определения дня на заданное количество дней назад
function getDateAgo(date, days){
 	var dateCopy = new Date(date);
	dateCopy.setDate(date.getDate() - days);
	return dateCopy.getDate();
}
	// ф-ия определения последнего дня месяца
function getLastDayOfMonth(year, month){
	var date2 = new Date(year, month + 1, 0);
	return date2.getDate();
}
	//****************** ф-ия формирования формы при активации документа
window.onload = function () {
	let cul=1;
	
 	const board = document.getElementById('board');
	const stattabli = document.getElementById('stattabli');
	for (n=0; n<=5; n++) {                  		  	  // цикл на кол-во строк для формирования таблицы месяца   
		for (i=0; i<=6; i++) {	             		  	  // цикл на кол-во столбцов(дней в неделе) для формирования таблицы месяца
        	let cell = document.createElement('div');     // создаем DIV в переменную cell
        	cell.className = 'ter';                       // устанавливаем этому DIV класс ter
			cell.setAttribute('data', cul);   
			board.appendChild(cell);                      // добавляем в DIV board созданную клетку
			   
			cell.addEventListener('click', myClik, false); // вешаем событие click на созданную клетку, при клике вызываем функцию myClik()
			cul +=1;
        } // цикл i
   	} // цикл n
	  
	for (n=0; n<=64; n++) { 
		let stat = document.createElement('div');       // создаем DIV в переменную stat
		stat.className = 'stattabl';                    // устанавливаем этому DIV класс
		stattabli.appendChild(stat);                    // добавляем в DIV stattabli созданную 
	} // цикл n
			
	begin(date1.getFullYear(),date1.getMonth(),date1.getDate(),jacheka);  // обращаемся к фун-ии для заполнения месяца данными
}; 	// окончание функции формирования формы при активации документа 

		//****************** ф-ия реакции на изменения размера экрана
		//document.addEventListener("DOMContentLoaded", function(event)
 		//{
		//   window.onresize = function() {
 		//     begin(date1.getFullYear(),date1.getMonth(),date1.getDate());     // обращение к ф-ии для обновления данных месяца
 		//   };
 		// });

	//********************** ф-ия  клик по стрелке назад на окне календаря
function myFuncNaz(){
	var date2 = new Date(date1.getFullYear(),date1.getMonth()-1,1);  // переопределяем месяц с минусом в месяц
	begin(date2.getFullYear(),date2.getMonth(),date2.getDate(),1);     // обращение к ф-ии для обновления данных месяца
}   //****************************************************************

	//************************ ф-ия   клик по стрелке вперед на окне календаря
function myFuncVper(){
 	var date2 = new Date(date1.getFullYear(),date1.getMonth()+1,1); // переопределяем месяц с прибавкой в месяц
  	begin(date2.getFullYear(),date2.getMonth(),date2.getDate(),1);    // обращение к ф-ии для обновления данных месяца
}   //****************************************************************

	//************************  ф-ия сохранения записи
function savezapbegin(){
  	var ter1 = document.getElementsByClassName('texti'); // выбираем все DIVы с классом texti в объект ter1
  	var counterCellTable=0;                   		  // счетчик ячеек таблицы
  	var zpr=0;                 		  // счетчик непустых ячеек в строке
  	var obj = {                 	  // создаем объек - пустую запись дня
	 	item1: [0,0],             	  // колличество записей(строк) в таблице(день)
		item2: [['',"","",""],['',"","",""],['',"","",""],['',"","",""]]
	};
  		
    for (ii=0; ii<=3; ii++) {
   		for (nn=0; nn<=3; nn++) {
      		if ((ter1[counterCellTable].value) !== '') {         	  // если в ячейки есть запись
        		obj.item2[ii][nn] = ter1[counterCellTable].value;    // сохраняем в объект данные из таблицы
        		zpr++;
        		if (nn == 3)  {obj.item1[1]++;}       // счетчик по количеству оплаченных записей в день
       		}
			   counterCellTable++;
     	} // nn
    	if (zpr>0) {obj.item1[0]++;}   // сохраняем в объект признах наличия(колличество) записей в столбцах - строки
    	zpr=0;
	   } // ii
	   savelocalStorage(obj);
}

	//************************  ф-ия записи в localStorage
function savelocalStorage(xxx){	   
	let job = xxx; 
	//  сохраняем объект
  	let serialObj = JSON.stringify(xxx);         // сериализуем  объект
    		
	try {	
		localStorage.setItem(vidcodmed[jacheka][0], serialObj); // запишем его в хранилище по ключу "jacheka"
	} 
	catch (e) {
		if (e == QUOTA_EXCEEDED_ERR) {
			alert('Превышен лимит памяти');
		}
	}

	if (xxx.item1[0]===0) {localStorage.removeItem(vidcodmed[jacheka][0]);}

	var date2 = new Date(
		vidcodmed[jacheka][1],
		vidcodmed[1][2],
		vidcodmed[jacheka][3]
	);  // устанавливаем день кликнутой ячейчи
	
	begin(date2.getFullYear(),date2.getMonth(),date2.getDate(),jacheka);     // обращение к ф-ии для обновления данных месяца
      
}   //************************  окончание ф-ия сохранения записи 

	//************************  ф-ия удаления записей в указанный день
function delzapbegin(){
	let dayZap = vidcodmed[jacheka][0];
	let returnObj = JSON.parse(localStorage.getItem(dayZap)); //спарсим в объект значение по ключу даты   
	let obj = {                 	  // создаем объек - пустую запись дня
		item1: [0,0],             	  // колличество записей(строк) в таблице(день)
	   	item2: [['',"","",""],['',"","",""],['',"","",""],['',"","",""]]
	};
	if (returnObj!=null) {
		//if (confirm('Удалить записи?')) {}
		

							
				smoke.ok = 'Да';
				smoke.cancel = 'Нет'
				smoke.confirm("Удалить записи?",
					function (result) {
						//Выбрана отмена. Вызываем диалог "Введите имя сохранения"
						if (result === false) {
							return;
						}
						savelocalStorage(obj);	// нажал "Да" 
						
					})
			
		




	}
}   //************************  окончание ф-ии удаления записей в указанный день
//************************  ф-ия открытия окна расходов
function rashodibegin(){
}   //************************  окончание ф-ии открытия окна расходов

	//************************  ф-ия клика по значку статисти
function statistik(){
	document.getElementById("wrapper1").style.display='none';            // скрываем окно календаря
	document.getElementById("oknostatist1").style.display='block';       // отображаем окно статистики
	statistikOkno(date1.getFullYear());            // обращаемся к функции для формирования данных статистики
}   //************************  окончание ф-ии клика по значку статисти 

	//************************  ф-ия  клик по стрелке назад на окне статистики
function myFuncNazJar(){
  	var nevJar = Number.parseInt(document.getElementById("jarstatist").innerHTML) -1;//уменьшаем год
  	statistikOkno(nevJar);                 // обращаемся к функции для отображения статистики
}   //************************  окончание ф-ии  клик по стрелке назад на окне статистики

	//************************  ф-ия клик по стрелке вперед на окне статистики
function myFuncVperJar(){
	var nevJar = Number.parseInt(document.getElementById("jarstatist").innerHTML) + 1;// увеличиваем год
  	statistikOkno(nevJar);                // обращаемся к функции для отображения статистики
}   //************************  окончание ф-ии клик по стрелке вперед на окне статистики

	//************************  ф-ия отображения окна статистики
function statistikOkno(st_year){
  	document.getElementById("jarstatist").innerHTML = st_year;
  	var stter = document.getElementsByClassName('stattabl'); // выбираем все DIVы с классом stattabl в объект stter
  	var stkodmet = '';                      // переменная для даты
  	//let st_year=date1.getFullYear();    // определяем год для статистики
  	var stschet = [0,0,0];
  	var stschet_itig = [0,0,0];
  	for (stmes=0; stmes<12; stmes++){
   		for (stden=1; stden<32; stden++){
			stkodmet ='p'+ st_year+''+monthNN[stmes]+''+stden; // формируем ключ - дату
			var st_returnObj = JSON.parse(localStorage.getItem(stkodmet)); //спарсим в объект значение по ключу даты    
            if(st_returnObj !== null) {
             	for (stzap=0; stzap<3; stzap++) {
					if (st_returnObj.item2[stzap][3] !== '') {
						stschet[0] = Number.parseInt(stschet[0])+Number.parseInt(st_returnObj.item2[stzap][3]);
						stschet[1] ++; //счетчик по оплате
					}
					if (st_returnObj.item2[stzap][1]!=='') {
						stschet[2] ++; //счетчик по колличеству записанных
					}
				}
			}
        }
		stter[stmes*5+5].innerHTML = monthN[stmes];
		stter[stmes*5+6].innerHTML = stschet[0]; 
		stter[stmes*5+7].innerHTML = stschet[2] + " / " + stschet[1];
		stschet_itig[0]=stschet_itig[0]+stschet[0];
		stschet_itig[1]=stschet_itig[1]+stschet[1];
		stschet_itig[2]=stschet_itig[2]+stschet[2];
		stschet=[0,0,0];
  	}
		stter[60].innerHTML = "ИТОГО";
		stter[61].innerHTML = stschet_itig[0];
		stter[62].innerHTML = stschet_itig[2]+ " / "+ stschet_itig[1];
}   //************************  окончание ф-ии статистики 

	//************************  ф-ия закрытия окна  статистики
function zakrstatistik(){
	document.getElementById("oknostatist1").style.display='none';   
	document.getElementById("wrapper1").style.display='block';
}   //************************  окончание ф-ии закрытия окна  статистики

	//************************  ф-ия  обновления данных месяца
function begin(Year,Month,days,Jcheika) {
	
	var ter = document.getElementsByClassName('ter'); // выбираем все DIVы с классом ter в объект ter
	var cir = document.getElementsByClassName('cir'); // выбираем все DIVы с классом cir в объект cir
	var counterCir = 0; // счетчик DIVов с классом cir
	var date3 = new Date();             // текущая дата 
	date1 = new Date(Year,Month,days);  // устанавливаем дату для заполнения календаря
	var date = new Date(date1.getFullYear(),date1.getMonth(),1);    // дата для определения смещения от первого числа
	var kodmet ='p'+ Year+''+monthNN[Month]+''+days; //формируем ключ по дате
	p1.innerHTML = monthN[Month] +' '+Year;   // выводим текущий месяц и год
	var k3 = 0;  // отношение оплата к колличеству записей  в день 
	var recordsDay = 0;  // переменная колличества записей в день   
	var counterCell = 0;  // счетчик ячеек
	var monthEnd = 1;   // признак смены месяца, меняем цвет ячейки
	var perd = getDateAgo(date, smech[date.getDay()]); // смещение даты для заполнения первой строки
	var counterDay = perd-1; // счетчик дней
	var lastDayMonth = getLastDayOfMonth(date.getFullYear(), date.getMonth());    // последний день месяца
	var d1 = getLastDayOfMonth(date.getFullYear(), date.getMonth()-1); // последний день предыдущего месяца
        
  	if (perd==1) {d1 = lastDayMonth; monthEnd = 2;}
    
  	for (n=0; n<=5; n++) {
		for (i=0; i<=6; i++) {	            
			
			counterDay++; counterCell++;
			if (counterDay > d1) { counterDay=1; monthEnd = monthEnd + 1; d1 = lastDayMonth; } 			   // k достигает последнего дня месяца
			kodmet ='p' + Year + '' + monthNN[Month + monthEnd - 2] + '' + counterDay;  // формируем ключ - дату
			vidcodmed[counterCell]=[kodmet,Year,Month + monthEnd - 1,counterDay];       // записываем в массив ключ - дату
			var returnObj = JSON.parse(localStorage.getItem(kodmet)); // спарсим в объект значение по ключу даты
			if (returnObj===null) {recordsDay = 0;}   		// задаем колличество записей в день по значению returnObj.item1
        		else { recordsDay = returnObj.item1[0];}
             
			if (recordsDay > 0) { 
				ter[counterCell-1].innerHTML = counterDay + "<div class='cir1'></div>" + "<div class='cir'>" + recordsDay + "</div>";
				k3 = returnObj.item1[1] / recordsDay;
				switch (k3) {
					case 0:
						cir[counterCir].style.backgroundColor = "#f70f0f";
						break;
					case (1/4):
						cir[counterCir].style.backgroundColor = "#faed52";
						break;
					case (1/3):
						cir[counterCir].style.backgroundColor = "#faed52";
						break;             
					case (1/2):
						cir[counterCir].style.backgroundColor = "#63c944";
						break;
					case (2/3):
						cir[counterCir].style.backgroundColor = "#64d0a6";
						break;
					case (3/4):
						cir[counterCir].style.backgroundColor = "#64d0a6";
						break;             
					case 1:
						cir[counterCir].style.backgroundColor = "#6559f7";
            	} 
				counterCir++; 
        	}// добавляем красный кружок в нем прописываем количество записей в день
				else { ter[counterCell-1].innerHTML = counterDay + "<div class='cir1'></div>"; }            // нет записей в день. прописываем число-дату
                
			if (monthEnd==1 || monthEnd==3) { ter[counterCell-1].style.backgroundColor = "#b7b6b6";}    //блоки дней предшествующего и последующего месяца окрашиваем в серый цвет
				else {ter[counterCell-1].style.backgroundColor = "#f8f7f7";}    //блоки дней текущего месяца окрашиваем в белый цвет
     		if (counterDay==date3.getDate() && monthEnd==2 && Month==date3.getMonth() && Year==date3.getFullYear()) {
				ter[counterCell-1].style.backgroundColor = "#18c4ed";
			} //блок соответствующий текущей дате в синий цвет
                                
			if ( counterDay==days && monthEnd==2) { jacheka=counterCell ;} // переписываем значение ячейки активного дня

			if (counterCell==Jcheika) {   // если обращение к функции заполнения таблицы
				ter[counterCell-1].children[0].classList.add ('cir2');
				
        		tablDen(vidcodmed[counterCell][0]);  //обращение к функции для заполения талицы записей
        	}
		}  // цикл  i
    	ter[counterCell-1].style.color = "#ed2110";  // каждому 7-му блоку устанавливаем цвет шрифта - красный    
	}   // цикл n
   
}   //************************  окончание ф-ии обновления данных месяца
 
	//************************  функция обработки клика по ячейкам календаря
/*myClik = function(e) {
	//e.stopPropagation();
	const cir2 = document.getElementsByClassName('cir2');	
	if	(cir2.length != 0){
		cir2[0].classList.remove('cir2'); 
	}  // удаляем круг на старом месте
	
	this.children[0].classList.add ('cir3');            // устанавливаем этому DIV класс 'cir3' для анимации активного дня
	setTimeout(() => this.children[0].classList.remove('cir3'), 200);	// удаляем класс, для повтора анимации
	this.children[0].classList.add ('cir2');            // устанавливаем класс 'cir2', для фиксации круга-подсведки
		
	let tegi = this.parentElement; // определяем родительский элемент
	for (let i = 0; i < tegi.children.length; i++) {
		if ( tegi.children[i] == this ) {
			jacheka = i+1; 
			break;
		}   // определяем номер кликнутого элемента
	}
	tablDen(vidcodmed[jacheka][0]); // обращение к функции заполнения таблицы записей дня
	//jacheka = num;
	console.log(this);
};   //************************  окончание ф-ии обработки клика по ячейкам календаря
*/
//************************  альтернативный  клик по ячейкам календаря
myClik = function (e) {
	//e.stopPropagation();
	const cir2 = document.getElementsByClassName('cir2');	
	if	(cir2.length != 0){
		cir2[0].classList.remove('cir2'); 
	}  // удаляем круг на старом месте
		
	this.children[0].classList.add ('cir3');            // устанавливаем этому DIV класс 'cir3' для анимации активного дня
	setTimeout(() => this.children[0].classList.remove('cir3'), 200);	// удаляем класс, для повтора анимации
	this.children[0].classList.add ('cir2');            // устанавливаем класс 'cir2', для фиксации круга-подсведки
				
	jacheka = this ;

	tablDen(vidcodmed[jacheka][0]); // обращение к функции заполнения таблицы записей дня
	//jacheka = num;
	console.log(jacheka);
};   //************************  окончание ф-ии обработки клика по ячейкам календаря

	//************************  функция заполнения таблички записей дня
function tablDen(metkaData){
	let returnObj = JSON.parse(localStorage.getItem(metkaData)); //спарсим в объект значение по ключу даты   
	let zz = 0;
	let ter1 = document.getElementsByClassName('texti'); // выбираем все DIVы с классом texti в объект ter1     
	if (returnObj===null) {
		//console.log ("246   очищаем таблицу");
		for (ii=0; ii<16; ii++) {
      		ter1[ii].value ='';
		} // ii
	} // if
 	else { 
   		//console.log ("252   заполняем таблицу записями");
		for (ii=0; ii<returnObj.item2.length; ii++) {
			for (nn=0; nn<=3; nn++) {
				ter1[zz].value = returnObj.item2[ii][nn];   // выводим 
				zz++;
			 } // nn
		} // ii
	} // else
}   //************************  окончание ф-ии заполнения таблички записей дня  

