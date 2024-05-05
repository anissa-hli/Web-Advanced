'use strict'

let quizname = localStorage.getItem("quizname");
let questionNumber = localStorage.getItem
    ("questionNumber");
let difficulty = localStorage.getItem("difficulty");
let category = localStorage.getItem("category");
let categorynumber;

if (category == "General Knowledge") {
    categorynumber = 9
} else if (category == "Books") {
    categorynumber = 10
} else if (category == "Movies") {
    categorynumber = 11
} else if (category == "Music") {
    categorynumber = 12
} else if (category == "Art") {
    categorynumber = 25
} else if (category == "Sports") {
    categorynumber = 21
} else if (category == "Geography") {
    categorynumber = 22
} else if (category == "Celebrities") {
    categorynumber = 26
} else if (category == "Vehicles") {
    categorynumber = 28
} else if (category == "Animals") {
    categorynumber = 27
}


// async function getData(){
// let data=await fetch(`https://opentdb.com/api.php?amount=${questionNumber}&category=${categorynumber}&difficulty=${difficulty}`);
// console.log(data)
// return await data.json()
// }

// getData().then(data=>{
//     console.log(data.results);
// });


//quizname
let div = document.getElementById('container')

let h2 = document.getElementById('quizname');
h2.textContent = quizname;

let saveButton = document.createElement('button');
saveButton.textContent = "Save quiz";
saveButton.id = 'saveButton';
saveButton.classList = 'hover'
div.before(saveButton);

//category & difficulty
let pCategory = document.createElement('p');
pCategory.textContent = `Category: ${category}`
div.before(pCategory);

let pDiff = document.createElement('p');
pDiff.textContent = `Difficulty: ${difficulty}`
div.before(pDiff);

//add-question button
let addButton = document.createElement('button');
addButton.id = 'addButton';
addButton.textContent = 'Add a question'
document.body.appendChild(addButton)


async function getData() {
    let data = await fetch('../object.json');
    return await data.json()
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

//edit question function
async function edit(label) {
    let innertext = await label.innerText;
    label.innerHTML = `<input type="text" value="${innertext}" class='editLabels' size='${innertext.length}' style="#32de84">`;
}

let arrayOfQuestions = []

function makeQuestion(question) {
    //questions
    var fieldset = document.createElement('fieldset');
    fieldset.classList = arrayOfQuestions.length - 1;
    div.appendChild(fieldset);

    let legend = document.createElement('legend');
    legend.innerHTML = question.question;
    legend.classList = 'legend'

    fieldset.appendChild(legend);

    //answers
    let arrayOfLabels = []
    //false answers
    for (let answer of question.incorrect_answers) {
        let labelIncorrectAnswer = document.createElement('label');
        labelIncorrectAnswer.classList = 'incorrect'
        labelIncorrectAnswer.innerHTML = `<input type="radio" name='answers'>${answer}`
        arrayOfLabels.push(labelIncorrectAnswer)
    }
    //correct answers
    let labelCorrectAnswer = document.createElement('label');
    labelCorrectAnswer.innerHTML = `<input type="radio" name='answers'>${question.correct_answer}`
    labelCorrectAnswer.classList = 'correct'
    arrayOfLabels.push(labelCorrectAnswer)

    shuffleArray(arrayOfLabels) //randomly ordered - to avoid correct answer always being last !!https://chat.openai.com/c/142f9656-8aba-45ce-ac73-4c154934c1c7 

    for (let label of arrayOfLabels) {
        fieldset.appendChild(label)
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
    saveButton.disabled = false
}

getData().then(questions => {
    for (let question of questions) {
        arrayOfQuestions.push(question);
        makeQuestion(question)
    }

})

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
        let editableLegend = currentFieldset.querySelector('legend');
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

//edit quizname
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('editQuizname')) {
        console.log(e)
        let quizName = e.target.parentElement
        console.log(quizName)
        edit(quizName)
    }
})

//save edited question    
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('buttonSaveQuestion')) {
        e.target.previousSibling.style.display="flex"

        let currentQuestion = e.target.parentElement.parentElement;
        let editedQuestion = {
            question: "Type question",
            correct_answer: "Type correct answer here",
            incorrect_answers: []
        }
        for (let i = 0; i < currentQuestion.children.length; i++) {
            let child = currentQuestion.children[i];
            if (child.className == 'correct') {
                editedQuestion.correct_answer = currentQuestion.children[i].firstChild.value;
                currentQuestion.children[i].innerHTML = `<input type="radio" name="answers">${editedQuestion.correct_answer}`;
            } else if (child.className == 'incorrect') {
                editedQuestion.incorrect_answers.push(currentQuestion.children[i].firstChild.value);
                currentQuestion.children[i].innerHTML = `<input type="radio" name="answers">${currentQuestion.children[i].firstChild.value}`;

            } else if (child.className == 'legend') {
                editedQuestion.question = currentQuestion.children[i].firstChild.value;
                currentQuestion.children[i].innerHTML = editedQuestion.question;
            }
        }

        arrayOfQuestions[currentQuestion.classList.value] = editedQuestion;
        currentQuestion.lastChild.lastChild.remove()
        resetSaveButton()
    }
})

//save quiz       
document.addEventListener('click', function (e) {
    if (e.target.id == 'saveButton') {
        new Promise((resolve, reject) => {
            localStorage.setItem(quizname, arrayOfQuestions)
            resolve('Saved succesfully');
        }).then((result) => {
            saveButton.textContent = result
            saveButton.style.backgroundColor = '#32de84';
            saveButton.disabled=true
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

        //if use doesnt respond to prompt;
        let number = answersNumber == 0 ? 2 : answersNumber
        for (let i = 1; i < number; i++) {
            newQuestion.incorrect_answers.push('Type incorrect answer here')
        }
        arrayOfQuestions.push(newQuestion);
        makeQuestion(newQuestion);
        resetSaveButton()
    }
})







