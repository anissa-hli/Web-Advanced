'use strict'
let arrayOfQuestions = []

let quizname = localStorage.getItem("quizname");
let questionNumber = localStorage.getItem("questionNumber");
let difficulty = localStorage.getItem("difficulty").toLowerCase();
let category = localStorage.getItem("category");
let categorynumber;

switch(category){
    case "General Knowledge":
        categorynumber = 9;
        break;
    case "Books":
        categorynumber = 10;
        break;
    case "Movies":
        categorynumber = 11;
        break;
    case "Music":
        categorynumber = 12;
        break;
    case "Art":
        categorynumber = 25;
        break;
    case "Sports":
        categorynumber = 21;
        break;
    case "Geography":
        categorynumber = 22;
        break;
    case "Celebrities":
        categorynumber = 26;
        break;
    case "Vehicles":
        categorynumber = 28;
        break;
    case "Animals":
        categorynumber = 27;
        break;
    case "Math":
        categorynumber = 19;
        break;
    case "Anime & Manga":
        categorynumber = 31;
        break;
    case "Nature":
        categorynumber = 17;
        break;
    case "History":
        categorynumber = 23;
        break;
    case "Comics":
        categorynumber = 29;
        break;
    case "Mythology":
        categorynumber = 20;
        break;
    case "Politics":
        categorynumber = 24;
        break;
    case "Computers":
        categorynumber = 18;
        break;
    case "Board games":
        categorynumber = 16;
        break;
    case "Video games":
        categorynumber = 15;
        break;
    case "Television":
        categorynumber = 14;
        break;
    case "Cartoon & Animations":
        categorynumber = 32;
        break;
    
}

document.getElementById('chevron-right').style.opacity='0%'

//quizname
let div = document.getElementById('container')

let h2 = document.getElementById('quizname');
h2.textContent = quizname;

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



//FUNCTIONS
function shuffleArray(array) { //randomly ordered - to avoid correct answer always being last !!
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

//edit question function
async function edit(label) {
 
    let innertext = await label.innerText;
    //to avoid input area making fieldset wider
    let length
    if(innertext.length<50){
        length=innertext.length
    }else{
        length=70;
    }
    label.innerHTML = `<input type="text" value="${innertext}" class='editLabels' size='${length}'>`;
}

function makeQuestion(question) {
    //questions
    let fieldset = document.createElement('fieldset');
    fieldset.classList = arrayOfQuestions.length - 1;
    div.appendChild(fieldset);

    let quizContainer=document.createElement('div')
    quizContainer.id='quizContainer'
    fieldset.appendChild(quizContainer)

    let legend = document.createElement('h4');
    legend.innerHTML =question.question;
    legend.classList = 'legend'
quizContainer.appendChild(legend)
   
    //answers
    let arrayOfLabels = []
    //incorrect answers
    for (let answer of question.incorrect_answers) {
        let labelIncorrectAnswer = document.createElement('label');
        labelIncorrectAnswer.classList = 'incorrect'
        labelIncorrectAnswer.innerHTML = `<input type="radio" name='answers'>${answer}`
        arrayOfLabels.push(labelIncorrectAnswer)
    }
    //correct answer
    let labelCorrectAnswer = document.createElement('label');
    labelCorrectAnswer.innerHTML = `<input type="radio" name="answers">${question.correct_answer}`;
    labelCorrectAnswer.classList = 'correct'
    arrayOfLabels.push(labelCorrectAnswer)

    shuffleArray(arrayOfLabels) 

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
        if (confirm('Are you sure you want to delete this question?')) {
            let fieldsetToRemove = e.target.parentElement.parentElement;

            arrayOfQuestions.splice(fieldsetToRemove.classList, 1)         
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
        for (let label of editableLabels) {
            edit(label)
        }

        let editableLegend = currentFieldset.querySelector('.legend');
        e.target.style.display='none'
        edit(editableLegend)

    
        //save button for question
        let buttonSaveQuestion = document.createElement('button');
        buttonSaveQuestion.textContent = 'OK'
        buttonSaveQuestion.classList = 'buttonSaveQuestion'
        e.target.parentElement.appendChild(buttonSaveQuestion)
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
        arrayOfQuestions[currentQuestion.parentElement.classList.value] = editedQuestion;
      currentQuestion.parentElement.children[1].children[2].remove()
        resetSaveButton()
    }
})

//localStorage.removeItem('AllQuizzes');



//save quiz       
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

//add a question
document.addEventListener('click', function (e) {
    if (e.target.id == 'addButton') {
        let answersNumber = prompt('How many different answers has your question?')
        let newQuestion = {
            question: "Type question",
            correct_answer: "Type correct answer here",
            incorrect_answers: []
        }

        //if user doesnt respond to prompt;
        let number = answersNumber == 0 ? 2 : answersNumber
        for (let i = 1; i < number; i++) {
            newQuestion.incorrect_answers.push('Type incorrect answer here')
        }
        arrayOfQuestions.push(newQuestion);
        makeQuestion(newQuestion);
        resetSaveButton()
    }
})


//previously made quiz - user want to edit it
let quizzes = JSON.parse(localStorage.getItem('AllQuizzes')) || [];

let quizEdit = false;

for (let quiz of quizzes) {
    if (quiz.name == quizname) {
        quizEdit = true;
        console.log(quiz)
        for(let question of quiz.questions){
            arrayOfQuestions.push(question);
            makeQuestion(question)
        }
        break;  
    }
}

if (!quizEdit) {//new quiz - fetch API 
async function getData(){
let data=await fetch(`https://opentdb.com/api.php?amount=${questionNumber}&category=${categorynumber}&difficulty=${difficulty}`);
console.log(data)
return await data.json()
}

getData().then(questions => {
    for (let question of questions.results) {
        arrayOfQuestions.push(question);
        makeQuestion(question)
    }
})
}




