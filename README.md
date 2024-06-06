# Web Advanced
Voor mijn portfolio voor het vak Web Advanced heb ik besloten om een quiz-generator te maken. Triviatainment, de naam van mijn applicatie, geeft gebruikers de mogelijkheid om oftewel zelf een quiz te maken oftewel er één te genereren aan de hand van een Quiz-API. 

----------
Onderwerpen: 
quizForm.html + quizForm.js:
Formulier valideren + Event aan een element koppelen + Gebruik van LocalStorage + Gebruiken van een constante:  Op Triviatainment is er een formulier die gebruikers moeten invullen om hen een quiz op maat te kunnen genereren. Vanaf het moment dat het formulier wordt verzonden (gebruik van een submit event + constante voor het formulier om dit op te vangen), wordt de data hiervan gestoken in LocalStorage om het in de volgende page te kunnen gebruiken. 
 
preMade.js: 
Elementen selecteren: lijn 98
Elementen manipuleren: lijn 99 (gebruik van JS om tekst te laten verschijnen)
Gebruiken van template literals: lijn 127
Async & Await: lijn 348
Fetch om data op te halen: lijn 349 (fetch van vragen uit een Trivia Databank adhv een API)
Consumer methods: lijn 354 (als de fetch succesvol is (opgevangen adhv .then), wordt deze weergegeven op de pagina)
Iteration over een array + JSON manipuleren en weergeven: lijn 355
Arrow function: lijn 182 (een functie die veranderingen in vragen van de quiz opvangt en op basis daarvan de stijl + content van een button verandert)
Promise: lijn 273 (promise om de quiz te saven in LocalStorage die, afhankelijk van de response, de content en style van een button gaat wijzigen)

myQuizzes.js:
Callback function: lijn 60 (een callback functie die als argument wordt doorgegeven aan de filter-methode om een array te filteren)
Spread & Rest operator: lijn 57

Self executing function
Destructuring

home.css:
Basis CSS Animatie: lijn 13

preMade.css: 
Gebruiken van een flexbox of CSS grid: lijn 60

----------
Gebruikte bronnen: 
- bug fix in preMade.js: 
https://chatgpt.com/share/a103f4c5-c40a-4a4c-bf9c-e7fa8de18602
https://chatgpt.com/share/b1432eff-89a5-48c3-b447-e4655395ae1e
https://chatgpt.com/share/eafc9fed-a4b8-4b0b-bbed-b3fd49599ac6

- shuffle array function: https://chatgpt.com/share/2d63f8cd-c52b-4457-a51b-14f1ed923853 

- alfabetisch sorteren van options in quizForm.html: https://chatgpt.com/share/ce6e5745-de4d-4d13-a3d3-1b00e1f35c19 

- typing Text Function + blinking bar in home.html: https://chatgpt.com/share/e3963c8c-1902-4dbf-87f4-bfd8198e0db9

- add icon logo to site: https://www.geeksforgeeks.org/how-to-add-icon-logo-in-title-bar-using-html/

- hierarchy in js:
https://chatgpt.com/share/3264044d-4ceb-4e2c-a13e-f7d5648a91be 
https://chatgpt.com/share/09369a72-b684-455b-8f2f-190692009281

- suggesties QUIZ api: https://chatgpt.com/share/ab354e7a-7cd5-40fd-baf2-1bd383f64c73

- gebruikte API: https://opentdb.com/ 