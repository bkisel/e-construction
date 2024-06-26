# e-construction

Опис:
Проєкт складається з трьох основних файлів: 
eConstructionPage.js - описує логіку взаємодії із сторінками сайту
searchTest.spec.js - містить кейси для перевірки пошуку на сторінці сайту
searchNumbers.js - містить масив номерів документів (також негативні випадки), які потрібно перевірити.

Особливості реалізації:
Додано таймаут (2 сек) після введення номеру документа. Потрібно зачекати поки зявиться знайдений номер документу
Перевірено також негативні кейси як:
 - пусте значення в пошуку
 - спеціальні символи введені в поле пошуку. Сейт редіректить на службу підтримки і відображає повідомлення про обмеження доступу
 - BP01:8062-4052-4940-2269 - коли номер відсутній, то відображається повідомлення "По вашому запиту нічого не знайдено" відповідно вважаю що система спрацювала коректно і не перевіряю наявність блоку "Земельні ділянки"

Перевірка проводиться тільки в браузері Chrome, можна розширити
