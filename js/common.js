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
 	var k1 = 0;                              			  // счетчик общего кол-ва ячеек в таблице месяца
	const board = document.getElementById('board');
	const stattabli = document.getElementById('stattabli');
	for (n=0; n<=5; n++) {                  		  	  // цикл на кол-во строк для формирования таблицы месяца   
		for (i=0; i<=6; i++) {	             		  	  // цикл на кол-во столбцов(дней в неделе) для формирования таблицы месяца
        	k1++;                             			  // увеличиваем счетчик ячеек
        	var cell = document.createElement('div');     // создаем DIV в переменную cell
        	cell.className = 'ter';                       // устанавливаем этому DIV класс ter
       		cell.innerHTML = "<div class='cir'></div>";   // значение блоку DIV блок отображения количества записей 
        	board.appendChild(cell);                      // добавляем в DIV board созданную клетку!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        	cell.addEventListener('click',myClik, false); // вешаем событие click на созданную клетку, при клике вызываем функцию myClik()
        } // цикл i
   	} // цикл n
            
	for (n=0; n<=64; n++) { 
		var stat = document.createElement('div');       // создаем DIV в переменную stat
		stat.className = 'stattabl';                    // устанавливаем этому DIV класс
		stattabli.appendChild(stat);                    // добавляем в DIV stattabli созданную 
	} // цикл n
			
	//***создаем еще один блок он будет подсвечивать активную ячейку
	cell = document.createElement('div'); 		 // создаем DIV в переменную cell
	cell.className = 'ter';              		 // устанавливаем этому DIV класс ter
	cell.classList.add('cir1');          		 // добавляем клетке класс  cir1
	cell.innerHTML = "<div id='cir2'></div>"; 	 // значение блоку DIV блок отображения количества записей 
	board.appendChild(cell);              		 // добавляем в DIV board созданную клетку!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	
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
  	var z=0;                     // счетчик ячеек таблицы
  	var zpr=0;                   // счетчик непустых ячеек в строке
  	var obj = {                  // создаем объек - пустую запись дня
	 	item1: [0,0],               // колличество записей(строк) в таблице(день)
		item2: [['', "", "",""],['', "", "",""],['', "", "",""],['', "", "",""]]
	};
  		
        for (ii=0; ii<=3; ii++) {
   			for (nn=0; nn<=3; nn++) {
      			if ((ter1[z].value) !== '') {           // если в ячейки есть запись
        			obj.item2[ii][nn] = ter1[z].value;   // сохраняем в объект данные из таблицы
        			zpr++;
        			if (nn == 3)  {obj.item1[1]++;}       // счетчик по количеству оплаченных записей в день
       			}
      			z++;
     		} // nn
    		if (zpr>0) {obj.item1[0]++;}                // сохраняем в объект признах наличия(колличество) записей в столбцах - строки
    		zpr=0;
   		} // ii

  			//      //  сохраняем объект
  	var serialObj = JSON.stringify(obj);         // сериализуем  объект
    		
	try {	
		localStorage.setItem(vidcodmed[jacheka][0], serialObj); // запишем его в хранилище по ключу "jacheka"
	} 
	catch (e) {
		if (e == QUOTA_EXCEEDED_ERR) {
			alert('Превышен лимит памяти');
		}
	}
	if (obj.item1[0]===0) {localStorage.removeItem(vidcodmed[jacheka][0]);}
	var date2 = new Date(vidcodmed[jacheka][1],vidcodmed[1][2],vidcodmed[jacheka][3]);  // переопределяем месяц с минусом в месяц
	begin(date2.getFullYear(),date2.getMonth(),date2.getDate(),jacheka);     // обращение к ф-ии для обновления данных месяца
      
}   //************************  окончание ф-ия сохранения записи 

	//************************  ф-ия удаления записи
function delzapbegin(){
}   //************************  окончание ф-ии удаления записи

	//************************  ф-ия клика по значку статисти
function statistik(){
	document.getElementById("wrapper1").style.display='none';            // скрываем окно календаря
	document.getElementById("oknostatist1").style.display='block';       // отображаем окно статистики
	statistikOkno(date1.getFullYear());            // обращаемся к функции для отображения статистики
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
function begin(Year,Month,days,Jcheika){
	var blok = document.getElementById('p6');
	cellWidth = blok.offsetWidth;            // задаем ширину ячеек календаря
	cellHeight = blok.offsetWidth;           // задаем высоту ячеек календаря
	var ter = document.getElementsByClassName('ter'); // выбираем все DIVы с классом ter в объект ter
	var cir = document.getElementsByClassName('cir'); // выбираем все DIVы с классом cir в объект cir
	var c = 0; // счетчик DIVов с классом cir
	var date3 = new Date();             // текущая дата 
	date1 = new Date(Year,Month,days);  // устанавливаем дату для заполнения календаря
	var date = new Date(date1.getFullYear(),date1.getMonth(),1);    // дата для определения смещения от первого числа
	var kodmet ='p'+ Year+''+monthNN[Month]+''+days; //формируем ключ по дате
	p1.innerHTML = monthN[Month] +' '+Year;   // выводим текущий месяц и год
	var k3 = 0;  // отношение оплата к колличеству записей  в день 
	var k2 = 0;  // переменная колличества записей в день   
	var k1 = 0;  // счетчик ячеек
	var m = 1;   // признак смены месяца, меняем цвет ячейки
	var perd = getDateAgo(date, smech[date.getDay()]); // смещение даты для заполнения первой строки
	var k = perd-1; // счетчик дней
	var d = getLastDayOfMonth(date.getFullYear(), date.getMonth());    // последний день месяца
	var d1 = getLastDayOfMonth(date.getFullYear(), date.getMonth()-1); // последний день предыдущего месяца
        
  	if (perd==1) {d1 = d; m = 2;}
    
  	for (n=0; n<=5; n++) {
		for (i=0; i<=6; i++) {	            
			ter[k1].style.top = (n*(cellHeight)) + 'px';   // задаем координата по Y
			ter[k1].style.left = (i*(cellWidth)) + 'px';   // задаем координата по X
			k++; k1++;
			if (k > d1) { k=1; m=m+1; d1=d; } 			   // k достигает последнего дня месяца
			kodmet ='p'+ Year+''+monthNN[Month+m-2]+''+k;  // формируем ключ - дату
			vidcodmed[k1]=[kodmet,Year,Month+m-1,k];       // записываем в массив ключ - дату
			var returnObj = JSON.parse(localStorage.getItem(kodmet)); // спарсим в объект значение по ключу даты
			if (returnObj===null) {k2 = 0;}   		// задаем колличество записей в день по значению returnObj.item1
        		else { k2 = returnObj.item1[0];}
             
			if (k2 > 0) { 
				ter[k1-1].innerHTML = k+ "<div class='cir'>" +k2+ "</div>";
				k3 = returnObj.item1[1] / k2;
				switch (k3) {
					case 0:
						cir[c].style.backgroundColor = "#f70f0f";
						break;
					case (1/4):
						cir[c].style.backgroundColor = "#faed52";
						break;
					case (1/3):
						cir[c].style.backgroundColor = "#faed52";
						break;             
					case (1/2):
						cir[c].style.backgroundColor = "#63c944";
						break;
					case (2/3):
						cir[c].style.backgroundColor = "#64d0a6";
						break;
					case (3/4):
						cir[c].style.backgroundColor = "#64d0a6";
						break;             
					case 1:
						cir[c].style.backgroundColor = "#6559f7";
            	} 
         		c++; 
        	}// добавляем красный кружок в нем прописываем количество записей в день
				else { ter[k1-1].innerHTML = k; }            // нет записей в день. прописываем число-дату
                
			if (m==1 || m==3) { ter[k1-1].style.backgroundColor = "#b7b6b6";}    //блоки дней предшествующего и последующего месяца окрашиваем в серый цвет
				else {ter[k1-1].style.backgroundColor = "#f8f7f7";}    //блоки дней текущего месяца окрашиваем в белый цвет
     		if (k==date3.getDate() && m==2 && Month==date3.getMonth() && Year==date3.getFullYear()) {
				ter[k1-1].style.backgroundColor = "#18c4ed";
			} //блок соответствующий текущей дате в синий цвет
                                
			if ( k==days && m==2) { jacheka=k1 ;} // переписываем значение ячейки активного дня

			if (k1==Jcheika) {   // если обращение к функции заполнения таблицы
        		ter[42].style.top = n*cellHeight+"px"; // координата по Y
        		ter[42].style.left = i*cellWidth+"px"; // по X
        		tablDen(vidcodmed[k1][0]);  //обращение к функции для заполения талицы записей
        	}
		}  // цикл  i
    	ter[k1-1].style.color = "#ed2110";  // каждому 7-му блоку устанавливаем цвет шрифта - красный    
	}   // цикл n
   
}   //************************  окончание ф-ии обновления данных месяца
 
	//************************  функция обработки клика по ячейкам календаря
myClik = function(e){
	//e.stopPropagation();
	const btnPressed = e.target.className;
	console.log(btnPressed);
	var ter1 = document.getElementsByClassName('ter');		// выбираем все DIVы с классом ter в объект ter
	console.log ("298   ", this); 
	ter1[42].style.top = this.style.top;   					// координата по Y. ячейке активности задаем координаты кликнутого дня
	ter1[42].style.left = this.style.left; 					// координата по X
	var stattt = document.getElementById('cir2');  
	stattt.className = 'cir3';                  			// устанавливаем этому DIV класс 'cir3' для анимации активного дня
	setTimeout(() => stattt.classList.remove('cir3'), 200);	// удаляем класс, для повтора анимации
 	// вычисляем порядковый номер кликнутой ячейки
	var x = Number.parseInt(this.style.left)/(cellWidth); 
	var y = Number.parseInt(this.style.top)/(cellHeight);
	var num = (y * 7 + x + 1); 								// вычисляем порядковый номер ячейки
	tablDen(vidcodmed[num][0]); 							// обращение к функции заполнения таблицы записей дня
	jacheka = num;
};   //************************  окончание ф-ии обработки клика по ячейкам календаря
 
	//************************  функция заполнения таблички записей дня
function tablDen(metkaData){
	var returnObj = JSON.parse(localStorage.getItem(metkaData)); //спарсим в объект значение по ключу даты   
	var z = 0;
	var ter1 = document.getElementsByClassName('texti'); // выбираем все DIVы с классом texti в объект ter1     
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
				ter1[z].value = returnObj.item2[ii][nn];   // выводим 
				z++;
			 } // nn
		} // ii
	} // else
}   //************************  окончание ф-ии заполнения таблички записей дня  