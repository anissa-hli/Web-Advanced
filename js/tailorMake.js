'use strict'

let quizname = localStorage.getItem("quizname");
let questionNumber = localStorage.getItem("questionNumber");
let difficulty = localStorage.getItem("difficulty");
let category = localStorage.getItem("category");

//quizname
let div = document.getElementById('container')
let h2 = document.getElementById('quizname');
h2.textContent = quizname;

document.getElementById('chevron-right').style.opacity='0%'

//category & difficulty
let typeText = (typeTextArea, text, speed = 50, index = 0) => {
    if (index < text.length) {
        typeTextArea.textContent += text.charAt(index);
        setTimeout(function () {
            typeText(typeTextArea, text, speed, index + 1);
        }, speed);
    } 
}

let pCategory = document.getElementById('category');
 typeText(pCategory,`Category: ${category}`)

let pDiff = document.getElementById('difficulty',100);
typeText(pDiff,`Difficulty: ${difficulty}`,100)

let saveButton = document.createElement('button');
saveButton.textContent = "Save quiz";
saveButton.id = 'saveButton';
div.before(saveButton);


//edit question function
async function edit(label) {
    let innertext = await label.innerText;
    label.innerHTML = `<input type="text" value="${innertext}" class='editLabels' size='${innertext.length}'>`;
}

let arrayOfQuestions = []

function makeQuestion(question) {
    //questions
    let fieldset = document.createElement('fieldset');
    fieldset.classList = arrayOfQuestions.length - 1;
    div.appendChild(fieldset);

    let quizContainer=document.createElement('div')
    quizContainer.id='quizContainer'
    fieldset.appendChild(quizContainer)

    let legend = document.createElement('h4');
    legend.innerHTML="Type question here.";
    legend.classList = 'legend'
quizContainer.appendChild(legend)

    //answers
    let arrayOfLabels = []
    //false answers
    for (let answer of question.incorrect_answers) {
        let labelIncorrectAnswer = document.createElement('label');
        labelIncorrectAnswer.classList = 'incorrect'
        labelIncorrectAnswer.innerHTML = `<input type="radio" name='answers'>Type incorrect answer here.`
        arrayOfLabels.push(labelIncorrectAnswer)
    }
    //correct answers
    let labelCorrectAnswer = document.createElement('label');
    labelCorrectAnswer.innerHTML = `<input type="radio" name="answers">Type correct answer here`;

    labelCorrectAnswer.classList = 'correct'
    arrayOfLabels.push(labelCorrectAnswer)

    for (let label of arrayOfLabels) {
        quizContainer.appendChild(label)
    }

    let buttons = document.createElement('div');
    buttons.id = 'buttons';
    fieldset.appendChild(buttons);

    //delete-question button
    let deleteButton = document.createElement('img')
    deleteButton.src = '../images/trash.svg'
    deleteButton.classList = 'delete'
    buttons.appendChild(deleteButton)

    let editButton = document.createElement('img')
    editButton.src = '../images/edit-pencil.png'
    editButton.classList = 'edit'
    buttons.appendChild(editButton)
}

let resetSaveButton = () => {
    saveButton.textContent = "Save changes"
    saveButton.style.backgroundColor = '';
    saveButton.disabled = false;
    document.getElementById('chevron-right').style.opacity='0%'
}


// remove a question
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete')) {
        if (confirm('Are you sure you want to delete this question')) {
            arrayOfQuestions.splice(e.target.parentElement.parentElement.classList, 1)

            let fieldsetToRemove = e.target.parentElement.parentElement;
            fieldsetToRemove.remove();

            let remainingFieldsets = document.querySelectorAll('fieldset');
            let index = 0
            remainingFieldsets.forEach((fieldset) => {
                fieldset.classList = index
                index++
            });
        }
        resetSaveButton()
    }
})

//edit a question
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('edit')) {
        let currentFieldset = e.target.parentElement.parentElement;
        let editableLabels = currentFieldset.querySelectorAll('label');
        let editableLegend = currentFieldset.querySelector('.legend'); 
        e.target.style.display='none'

        //save button for question
        let buttonSaveQuestion = document.createElement('button');
        buttonSaveQuestion.textContent = 'OK'
        buttonSaveQuestion.classList = 'buttonSaveQuestion'
        e.target.parentElement.appendChild(buttonSaveQuestion)

        for (let label of editableLabels) {
            edit(label)
        }
        edit(editableLegend)
    }
})


//save edited question     
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('buttonSaveQuestion')) {
        e.target.previousSibling.style.display="flex";

        let currentQuestion = e.target.parentElement.parentElement.children[0];

        let editedQuestion = {
            question: "Type question",
            correct_answer: "Type correct answer here",
            incorrect_answers: []
        }
       
        for (let i = 0; i <currentQuestion.children.length; i++) {
            let child = currentQuestion.children[i];
            if (child.className === 'correct') {
                editedQuestion.correct_answer = child.firstChild.value;
                child.innerHTML = `<input type="radio" name="answers">${editedQuestion.correct_answer}`;
            } else if (child.className == 'incorrect') {
                editedQuestion.incorrect_answers.push(child.firstChild.value);
                child.innerHTML = `<input type="radio" name="answers">${child.firstChild.value}`;
            } else if (child.className == 'legend') {
                editedQuestion.question = child.firstChild.value
                child.innerHTML = editedQuestion.question;
            }
            
        }
      
        arrayOfQuestions[currentQuestion.classList.value] = editedQuestion;
   
        //
      currentQuestion.parentElement.children[1].children[2].remove()
        resetSaveButton()
    }
})

document.addEventListener('click', function (e) {
    if (e.target.id == 'saveButton') {
        new Promise((resolve, reject) => {

            let quizzes = JSON.parse(localStorage.getItem('AllQuizzes')) || [];

            let quizFound = false;

            for (let quiz of quizzes) {
                if (quiz.name == quizname) {
                    let index = quizzes.indexOf(quiz);
                    quizzes[index] = { difficulty: difficulty,category: category, name: quizname, questions: arrayOfQuestions };
                    quizFound = true;
                    break;  
                }
            }
            
            if (!quizFound) {
                quizzes.push({ difficulty: difficulty,category: category, name: quizname, questions: arrayOfQuestions });
            }

            localStorage.setItem('AllQuizzes', JSON.stringify(quizzes));
            console.log(JSON.parse(localStorage.getItem('AllQuizzes')));
            resolve('Saved succesfully');
        }).then((result) => {
            saveButton.textContent = result
            saveButton.style.backgroundColor = '#32de84';
            saveButton.disabled=true;
            document.getElementById('chevron-right').style.opacity='100%';
        },
            () => {
                saveButton.textContent = 'Error. Retry'
                saveButton.style.backgroundColor = 'red'
            })
    }
})


//create questions if chosen option was tailormake
let newQuestion = (quantity) => {
    let quantityInt= parseInt(quantity);
    for(let j=0;j<quantityInt;j++){
    let answersNumber = prompt('How many different answers has your question?')
    let newQuestion = {
        question: "Type question here.",
        correct_answer: "Type correct answer here.",
        incorrect_answers: []
    }

    //if use doesnt respond to prompt;
    let number = answersNumber == 0 ? 2 : answersNumber
    for (let i = 1; i < number; i++) {
        newQuestion.incorrect_answers.push('Type incorrect answer here.')
    }
    arrayOfQuestions.push(newQuestion);
    makeQuestion(newQuestion);
    resetSaveButton()
}
}

// add a question
document.addEventListener('click', function (e) {
    if (e.target.id == 'addButton') {
        newQuestion(1);
    }
})


newQuestion(questionNumber);



