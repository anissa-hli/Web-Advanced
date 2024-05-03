'use strict'
const form=document.getElementById('form');

form.addEventListener('submit',function(e){
    e.preventDefault();
    console.log(e)
    // if(e.submitter.id='tailorMake'){
    //     window.open('tailorMake.html','_self');
    // }
    // if(e.submitter.id='preMade'){
    //     window.open('preMade.html','_self') //https://developer.mozilla.org/en-US/docs/Web/API/Window/open
    // }

    let quizname=document.getElementById('quizname').value;
    if  (quizname==""){
        quizname="Quiz"
    }

    let questionNumber=document.getElementById('questionNumber').value;
    let difficulty= document.querySelector('fieldset .difficulty:checked').value
    let category=document.getElementById('category').value;



    let method= document.querySelector('fieldset .method:checked').value

    console.log(quizname+questionNumber+difficulty+category+method)
    localStorage.setItem("quizname", quizname);
    localStorage.setItem("questionNumber", questionNumber);
    localStorage.setItem("difficulty", difficulty);
    localStorage.setItem("category", category);
    

    if(method=='preMade'){
        window.open('preMade.html','_self')
    }else if(method=='tailorMake'){
        window.open('tailorMake.html','_self');
    }

})