'use strict'

//data in localStorage steken 
const form=document.getElementById('form');

form.addEventListener('submit',function(e){
    e.preventDefault();
    let quizname=document.getElementById('quizname').value;

    if  (quizname==""){
        quizname="Quiz"
    }

    let questionNumber=document.getElementById('questionNumber').value;
    let difficulty= document.querySelector('fieldset .difficulty:checked').value
    let category=document.getElementById('category').value;
    let method= document.querySelector('fieldset .method:checked').value

    localStorage.setItem("quizname", quizname);
    localStorage.setItem("questionNumber", questionNumber);
    localStorage.setItem("difficulty", difficulty);
    localStorage.setItem("category", category);
    
    console.log(questionNumber,difficulty,category,method)
  
    if(method=='preMade'){
        window.open('preMade.html','_self')
    }else if(method=='tailorMake'){
        window.open('tailorMake.html','_self');
    }
})


