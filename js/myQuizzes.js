'use strict'

if(localStorage.getItem('AllQuizzes') && JSON.parse(localStorage.getItem('AllQuizzes')).length>0){
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
    buttonEdit.id='edit'
    buttonEdit.textContent="Edit quiz";
    divButtons.appendChild(buttonEdit)

    let buttonTake=document.createElement('button');
    buttonTake.textContent="Take quiz";
    divButtons.appendChild(buttonTake)

    let deleteImg=document.createElement('img');
    deleteImg.src='../images/x-delete.svg';
    deleteImg.classList.add("verwijder");
    deleteImg.id=quiz.name; // to be able to delete it quickly
    divButtons.appendChild(deleteImg)
 }


 //edit quiz
document.addEventListener('click',function(e){
    if(e.target.id=="edit"){
        window.open('preMade.html','_self')
    }
})

 //delete quiz
 document.addEventListener('click',function(e){
    if(e.target.classList.contains('verwijder')){
    AllQuizzes=AllQuizzes.filter((quiz) => quiz.name != e.target.id); //callback?
    console.log(AllQuizzes);     
    localStorage.setItem('AllQuizzes',JSON.stringify(AllQuizzes));
    location.reload();
    }
})


}else{

    let h2=document.createElement('h2');
    h2.id="Oops"
    h2.innerHTML="Oops, looks like you haven't made any quizzes yet. <a href='../html/quizForm.html'>Let's get started.</a> "
    document.getElementById('quizzes').appendChild(h2)

    let catImg=document.createElement('img');
    catImg.id='catImg'
    catImg.src='../images/cat.PNG';
    document.getElementById('quizzes').appendChild(catImg)

}