# backend sprint 15 v.1.6.2

## Практическая работа №15

Изучение серверного программирования на node.js с использованием express.js.
Добавлена поддержка авторизации, mongo.db, helmet, express-rate-limit, celebrate, winston

#### Backend развернут по IP- адресу 84.201.173.157 [тут](http://84.201.173.157/)
#### Также доступен на домене [https://api.mesto.tonyhat.site/](https://api.mesto.tonyhat.site/)
#### Фронт доступен по адресу [https://mesto.tonyhat.site/](https://mesto.tonyhat.site/)
  
### Функционал:
```
POST /signup - регистрация нового пользователя
 формат:
{
	"name": "Anton",
	"about":"about",
	"avatar":"https://stackoverflow.com/questions/18022365/mongoose...validate-email-syntax",
	"email": "ya3@mail.ru",
	"password": "12345678"
}
в ответ придет объект пользователя
```
POST /signin - авторизация
 формат:
{
	"email": "ya3@mail.ru",
	"password": "12345678"
}
 в ответ придет cookie s jwt
```
GET /users - возвращает всеx пользователей
```
```
GET /users/id - возвращает пользователя по id, и сообщение об ошибке, если user не найден
```
```
POST /users - создает нового пользователя на запрос формата {"name": "...","about":"...","avatar":"url"} 
```
```
PATCH /users/me - обновляет имя и описание пользователя на запрос формата {"name": "...","about":"..."} 
```
```
PATCH /users/me/avatar - обновляет аватар пользователя на запрос формата {"avatar": "url"} 
```
```
GET /cards - возвращает все карточки
```
```
POST /cards - создает карточку на запрос формата {"name": "...","link":"url"}
```
```
DELETE /cards/id - удаляет карточку по id
```
```
PUT /cards/id/likes - добавляет лайк по id
```
```
DELETE /cards/id/likes - удаляет лайк по id
```
```
GET /someOtherPath - сообщение об ошибке, если путь не найден
```


## Установка

Для установки необходимо наличие Node.js и npm

Сохраните проект у себя на компьютере:
```
git clone https://github.com/t0nyhat/back_12.git
```

В корне проекта через консоль/терминал запустите команду:
``` 
npm install
```

#### Доступные команды:  
Запуск локального сервера с хот релоудом:  
```
npm run dev
```  
Запуск продакшн сервера:  
```
npm run start
```
