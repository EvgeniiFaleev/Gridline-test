# Тестовое задание для компании Gridline

В проекте использовал:
### `React`
### `Webpack`
### `TypeScript`
### `sass`


# Чтобы запустить в Docker 
1) создайте образ.  в корне приложения(где находится Dockerfile)
`docker build -t imageName .`
2) запустите  `docker run -it -p 3000:3000 imageName`

Приложение должно запуститься на http://localhost:3000 

# Чтобы запустить через Webpack dev server
1) `nom i`
2) `npm run start`

# Ответы на Вопросы: 

Ф.И.О. 

Фалеев Евгений Евгеньевич 

Javascript 

В чем разница между операторами "==" и "==="? 

Нестрогое равенство преобразует операнды к числу. Строгое равенсто будет false если операнды принадлежат разным типам. 

Что такое область видимости (Scope)? 

Это область в которой компилятор ищет функции и переменные, когда они ему нужны. 

 В каких ситуациях следует использовать ключевые слова let и const? 

Всегда использовать const. Использовать let только в случае если нужно переприсваивать переменную. 

Что такое прототип объекта? 

Прототип - это обьект(свойство функции конструктора) на которое ссылается свойство obj.__proto__.  По цепочке прототипов мы можем получить доступ к методам или свойствам родителей. 

Какое значение имеет this? 

This это контекст выполнения функции. Значение зависит от того кто вызывает функцию, в случае если функция вызывается не через call, apply или bind и не как метод обекта, значение this в строгом режиме будет равно undefined, в нестрогом глобальному обьекту. 

Какими способами можно клонировать объект? 

const obj = { a, b }; const cloned = Object.assign({},obj); 

const cloned1 = {...obj}. 

Для глубокой копии можно изпользовать Lodash 

 

Или вариант похуже:  

const cloned = JSON.parse(JSON.stringify(obj))  

 

Что такое XMLHttpRequest и зачем он нужен? 

Обьект в JS который позволяет делать запросы на сервер без перезагрузки страницы. 

Разное 

Что такое cookies? 

Это небольшой фргамент данных чаще всего отправляемый с сервера, хранящийся в браузере.  

В своем проекте использовал cookies для сессий. 

В чем разница между padding и margin? 

Padding это отступ от контента до границы, margin это внешний отступ. Padding не схлопывается. 

Что такое сессии и зачем они используются? 

Сессии это механизм который используется для опознавания клиента на сервере. Идентификатор сессии как правило хранится в cookies. Информация о пользователе хранится на сервере и ассоциируется с идентификатором. Таким образом сервер может понять аутентифицирован ли пользователь. 

Опишите что будет происходить «под капотом» после ввода адреса сайта в браузере и нажатия Enter? 

1.Браузер ищет Dns сервер 

2.Браузер находит Dns шлет запрос и получает IP адресс. 

3.Браузер шлет Get запрос на сервер. 

4.Сервер обрабатывает запрос посылает ответ. 

5. Браузер получает ответ и рендерит его в случае успеха. 



