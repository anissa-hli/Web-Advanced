'use strict'

if(localStorage.getItem('AllQuizzes')){
 let AllQuizzes=JSON.parse(localStorage.getItem('AllQuizzes'));

 for(let quiz of AllQuizzes){
    let container=document.getElementById('quizzes')

    let div = document.createElement('div');
    div.classList.add('quiz');
    container.appendChild(div);

    let h2=document.createElement('h2');
    h2.textContent=quiz.name;
    div.appendChild(h2)

    let pDiff=document.createElement('p');
    pDiff.textContent='Difficulty: ' + quiz.difficulty;
    div.appendChild(pDiff)

    let pCat=document.createElement('p');
    pCat.textContent='Category: ' + quiz.category;
    div.appendChild(pCat)

    let pQuestions=document.createElement('p');
    pQuestions.textContent='Questions: ' + quiz.questions.length;
    div.appendChild(pQuestions)

    let divButtons = document.createElement('div');
    divButtons.id='buttons';
    div.appendChild(divButtons);

    let buttonEdit=document.createElement('button');
    buttonEdit.textContent="Edit";
    divButtons.appendChild(buttonEdit)

    let buttonSave=document.createElement('button');
    buttonSave.textContent="Save";
    divButtons.appendChild(buttonSave)

    console.log(quiz)
 }



























}