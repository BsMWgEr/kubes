function ClearAll() {
    document.getElementById('quiz-score').innerHTML = ''
    document.getElementById('main_button_group').innerHTML = `
        <button type="button" onclick="ClearAll();StartQuiz()">Quiz</button>
        <button type="button" onclick="ClearAll();viewMenu()">View Menu</button>
        <button type="button" onclick="ClearAll();viewDrinks()">View Drink Menu</button>
        `
    document.getElementById('div_div').innerHTML = '<div></div>'
    document.getElementById('change-question').innerHTML = '<div></div>'
    document.getElementById('button_group').innerHTML = '<div></div>'
    window.scrollTo(0, 0)
}

function FirstCheck() {
    document.getElementById('change-question').innerHTML = '<div></div>'
    if (!document.getElementById('main_div')) {
        let new_item = document.createElement('ol')
        new_item.setAttribute('id', 'main_div')
        document.getElementById('div_div').appendChild(new_item)
    }
}

function ScrollTo() {
    let y = document.getElementById('nav').offsetHeight
    console.log(y)
    let yy = document.getElementById('main_button_group').offsetHeight
    console.log(yy)
    let yyy = document.getElementById('button_group').offsetHeight
    console.log(yyy)
    let total = yy + yyy

    console.log(total)
    window.scrollBy(0, total)
}

function OpenEntrees() {
    FirstCheck()
    const xhr = new XMLHttpRequest()
    const method = 'GET'
    const url = '/api?item=entrees'
    const responseType = 'json'
    xhr.responseType = responseType
    xhr.open(method, url)
    xhr.onload = function () {
        let entrees = xhr.response.response
        let ingredients = xhr.response.ingredients
        let sides = xhr.response.sides
        let return_string = ''

        for (let p = 0; p < entrees.length; p++) {
            let new_str = ''
            if (ingredients.length > 0) {
                for (let i=0; i<ingredients.length; i++) {
                    for (let q in ingredients[i]) {
                        if (q === entrees[p].id.toString()) {
                            new_str += ingredients[i][entrees[p].id] + ' | '
                        }
                    }
                }
            } else new_str = 'No Ingredients'

            let second_str = ''
            if (sides.length > 0) {
                for (let i=0; i<sides.length; i++) {
                    for (let q in sides[i]) {
                        if (q === entrees[p].id.toString()) {
                            console.log(sides[i][entrees[p].id])
                            second_str += sides[i][entrees[p].id] + ' | '
                        }
                    }
                }
            }
            if (second_str === '') {
                second_str = 'No Sides'
            }

            return_string += `<li><ul>
                        <li><span class="title-color">${entrees[p].name}</span></li>
                        <li><span class="title-color">Description: </span>${entrees[p].description}</li>
                        <li><span class="title-color">Options/Mods: </span>${entrees[p].options_mods}</li>
                        <li><span class="title-color">Ingredients: </span>${new_str}</li>
                        <li><span class="title-color">Sides: </span>${second_str}</li>
                    </ul></li>`
        }
        document.getElementById('main_div').innerHTML = return_string
        ScrollTo()
    }
    xhr.send()
}

function OpenApps() {
    FirstCheck()
    const xhr = new XMLHttpRequest()
    const method = 'GET'
    const url = '/api?item=apps'
    const responseType = 'json'
    xhr.responseType = responseType
    xhr.open(method, url)
    xhr.onload = () => {
        let apps = xhr.response.response
        let ingredients = xhr.response.ingredients
        console.log(ingredients)
        let return_string = ''
        for (let p = 0; p < apps.length; p++) {
            let new_str = ''
            if (ingredients.length > 0) {
                for (let i = 0; i < ingredients.length; i++) {
                    for (let q in ingredients[i]) {
                        if (q === apps[p].id.toString()) {
                            new_str += ingredients[i][apps[p].id] + ' | '
                        }
                    }
                }
            }
            if (new_str === '') {
                new_str = 'No Ingredients'
            }

            return_string += `
                    <li><ul>
                        <li><span class="title-color">${apps[p].name}</span></li>
                        <li><span class="title-color">Description: </span>${apps[p].description}</li>
                        <li><span class="title-color">Ingredients: </span>${new_str}</li>
                        <li><span class="title-color">Options or Modifications: </span>${apps[p].options_mods}</li>
                    </ul></li>`

        }
        document.getElementById('main_div').innerHTML = return_string
        ScrollTo()
    }
    xhr.send()
}

function OpenSandwiches() {
    FirstCheck()
    const xhr = new XMLHttpRequest()
    const method = 'GET'
    const url = '/api?item=sandwiches'
    const responseType = 'json'
    xhr.responseType = responseType
    xhr.open(method, url)
    xhr.onload = ()=> {
        let sandwiches = xhr.response.response
        let ingredients = xhr.response.ingredients
        console.log(ingredients)
        let return_string = ''
        for (let p = 0; p < sandwiches.length; p++) {
            let new_str = ''
            if (ingredients.length > 0) {
                for (let i = 0; i < ingredients.length; i++) {
                    for (let q in ingredients[i]) {
                        if (q === sandwiches[p].id.toString()) {
                            new_str += ingredients[i][sandwiches[p].id] + ' | '
                        }
                    }
                }
            }
            if (new_str === '') {
                new_str = 'No Ingredients'
            }

            return_string += `
                    <li><ul>
                        <li><span class="title-color">${sandwiches[p].name}</span></li>
                        <li><span class="title-color">Description: </span>${sandwiches[p].description}</li>
                        <li><span class="title-color">Ingredients: </span>${new_str}</li>
                        <li><span class="title-color">Options or Modifications: </span>${sandwiches[p].options_mods}</li>
                    </ul></li>`

        }
        document.getElementById('main_div').innerHTML = return_string
        ScrollTo()

    }
    xhr.send()

}

function OpenBurgers() {
    FirstCheck()
    const xhr = new XMLHttpRequest()
    const method = 'GET'
    const url = '/api?item=burgers'
    const responseType = 'json'
    xhr.responseType = responseType
    xhr.open(method, url)
    xhr.onload = ()=> {
        let burgers = xhr.response.response
        let ingredients = xhr.response.ingredients
        console.log(ingredients)
        let return_string = ''
        for (let p = 0; p < burgers.length; p++) {
            let new_str = ''
            if (ingredients.length > 0) {
                for (let i = 0; i < ingredients.length; i++) {
                    for (let q in ingredients[i]) {
                        if (q === burgers[p].id.toString()) {
                            new_str += ingredients[i][burgers[p].id] + ' | '
                        }
                    }
                }
            }
            if (new_str === '') {
                new_str = 'No Ingredients'
            }

            return_string += `
                    <li><ul>
                        <li><span class="title-color">${burgers[p].name}</span></li>
                        <li><span class="title-color">Description: </span>${burgers[p].description}</li>
                        <li><span class="title-color">Ingredients: </span>${new_str}</li>
                    </ul></li>`
        }
        document.getElementById('main_div').innerHTML = return_string
        ScrollTo()
    }
    xhr.send()
}

function OpenSalads() {
    FirstCheck()
    const xhr = new XMLHttpRequest()
    const method = 'GET'
    const url = '/api?item=salads'
    const responseType = 'json'
    xhr.responseType = responseType
    xhr.open(method, url)
    xhr.onload = ()=> {
        let salads = xhr.response.response
        let ingredients = xhr.response.ingredients
        console.log(ingredients)
        let return_string = ''
        for (let p = 0; p < salads.length; p++) {
            let new_str = ''
            if (ingredients.length > 0) {
                for (let i = 0; i < ingredients.length; i++) {
                    for (let q in ingredients[i]) {
                        if (q === salads[p].id.toString()) {
                            new_str += ingredients[i][salads[p].id] + ' | '
                        }
                    }
                }
            }
            if (new_str === '') {
                new_str = 'No Ingredients'
            }

            return_string += `
                    <li><ul>
                        <li><span class="title-color">${salads[p].name}</span></li>
                        <li><span class="title-color">Description: </span>${salads[p].description}</li>
                        <li><span class="title-color">Ingredients: </span>${new_str}</li>
                    </ul></li>`
        }
        document.getElementById('main_div').innerHTML = return_string
        ScrollTo()
    }
    xhr.send()
}

function OpenDesserts() {
    FirstCheck()
    const xhr = new XMLHttpRequest()
    const method = 'GET'
    const url = '/api?item=desserts'
    const responseType = 'json'
    xhr.responseType = responseType
    xhr.open(method, url)
    xhr.onload = ()=> {
        let desserts = xhr.response.response
        let ingredients = xhr.response.ingredients
        console.log(ingredients)
        let return_string = ''
        for (let p = 0; p < desserts.length; p++) {

            return_string += `
                    <li><ul>
                        <li><span class="title-color">${desserts[p].name}</span></li> 
                    </ul></li>`
        }
        document.getElementById('main_div').innerHTML = return_string
        ScrollTo()
    }
    xhr.send()
}

function OpenSides() {
    FirstCheck()
    const xhr = new XMLHttpRequest()
    const method = 'GET'
    const url = '/api?item=sides'
    const responseType = 'json'
    xhr.responseType = responseType
    xhr.open(method, url)
    xhr.onload = ()=> {
        let sides = xhr.response.response
        let return_string = ''
        for (let p = 0; p < sides.length; p++) {
            return_string += `
                    <li><ul>
                        <li><span class="title-color">${sides[p].name}</span></li>
                    </ul></li>`
        }
        document.getElementById('main_div').innerHTML = return_string
        ScrollTo()
    }
    xhr.send()
}

function OpenIngredients() {
    FirstCheck()
    const xhr = new XMLHttpRequest()
    const method = 'GET'
    const url = '/api?item=ingredients'
    const responseType = 'json'
    xhr.responseType = responseType
    xhr.open(method, url)
    xhr.onload = ()=> {
        let ingredient = xhr.response.response
        let return_string = ''
        for (let p = 0; p < ingredient.length; p++) {
            return_string += `
                    <li><ul>
                        <li><span class="title-color">${ingredient[p].ingredient}</span></li>
                    </ul></li>`
        }
        document.getElementById('main_div').innerHTML = return_string
        ScrollTo()
    }
    xhr.send()
}

function OpenDressing() {
    FirstCheck()
    const xhr = new XMLHttpRequest()
    const method = 'GET'
    const url = '/api?item=dressing'
    const responseType = 'json'
    xhr.responseType = responseType
    xhr.open(method, url)
    xhr.onload = ()=> {
        let dressings = xhr.response.response
        let return_string = ''
        for (let p = 0; p < dressings.length; p++) {
            return_string += `
                    <li><ul>
                        <li><span class="title-color">${dressings[p].dressing}</span></li>
                        <li><span class="title-color">${dressings[p].description}</span></li>
                    </ul></li>`
        }
        document.getElementById('main_div').innerHTML = return_string
        ScrollTo()
    }
    xhr.send()
}

function OpenSoups() {
    FirstCheck()
    const xhr = new XMLHttpRequest()
    const method = 'GET'
    const url = '/api?item=soups'
    const responseType = 'json'
    xhr.responseType = responseType
    xhr.open(method, url)
    xhr.onload = ()=> {
        let soups = xhr.response.response
        let ingredients = xhr.response.ingredients
        console.log(ingredients)
        let return_string = ''
        for (let p = 0; p < soups.length; p++) {
            let new_str = ''
            if (ingredients.length > 0) {
                for (let i = 0; i < ingredients.length; i++) {
                    for (let q in ingredients[i]) {
                        if (q === soups[p].id.toString()) {
                            new_str += ingredients[i][soups[p].id] + ' | '
                        }
                    }
                }
            }
            if (new_str === '') {
                new_str = 'No Ingredients'
            }

            return_string += `
                    <li><ul>
                        <li><span class="title-color">${soups[p].name}</span></li>
                        <li><span class="title-color">Description: </span>${soups[p].description}</li>
                        <li><span class="title-color">Ingredients: </span>${new_str}</li>
                    </ul></li>`
        }
        document.getElementById('main_div').innerHTML = return_string
        ScrollTo()
    }
    xhr.send()
}

function StartQuiz() {
    document.getElementById('main_button_group').innerHTML = ``
    const xhr = new XMLHttpRequest()
    const method = 'GET'
    const url = `/quiz-id?quiz_number=new_quiz&correct=none&incorrect=none&total=none&score=none`
    const responseType = 'json'
    xhr.responseType = responseType
    xhr.open(method, url)
    xhr.onload = ()=> {
        let serverResponse = xhr.response
        let score = serverResponse.response
        console.log(serverResponse)
        console.log(score)
        localStorage.setItem('quiz', score)
        localStorage.setItem('correct', 0)
        localStorage.setItem('question_count', 0)
        localStorage.setItem('incorrect', 0)
        Questions()
    }
    xhr.send()
}

function Questions() {
    localStorage.setItem('question_attempt', '1')
    const xhr = new XMLHttpRequest()
    const method = 'GET'
    const url = '/api?item=questions'
    const responseType = 'json'
    xhr.responseType = responseType
    xhr.open(method, url)
    xhr.onload = ()=> {
        let count = localStorage.getItem('question_count')
        let incorrect_ = localStorage.getItem('incorrect')
        let correct = localStorage.getItem('correct')
        let total_score = (correct / count) * 100
        let quiz_id = localStorage.getItem('quiz')
        document.getElementById('quiz-score').innerHTML = `
        Current Score: ${total_score.toPrecision(3)}% -- Correct Answers: ${correct} -- Wrong Answers: ${incorrect_} -- Total Questions: ${count}`
        count++
        localStorage.setItem('question_count', count)

        let serverResponse = xhr.response
        let question = xhr.response.question
        let answer = xhr.response.answer
        let incorrect = xhr.response.incorrect
        let answer_description = xhr.response.answer_description
        console.log(serverResponse)
        let str_2 = ''
        let str_3 = ''
        let str_5 = ''
        let question_other = question[0].split('?')
        question_other = question_other[0].split(' ')
        for (let x = 4; x < question_other.length; x++) {
            str_5 += `${question_other[x]}`
            if (x !== question_other.length - 1) {
                str_5 += ' '
            }
        }
        let str_1 = question[0]

        let i_0 = Math.floor(Math.random() * 4)
        let i_1 = Math.floor(Math.random() * 4)
        let i_2 = Math.floor(Math.random() * 4)
        let i_3 = Math.floor(Math.random() * 4)

        for (let q = 0; q < 20; q++) {
            if (i_0 === i_1 || i_0 === i_2 || i_0 === i_3) {
                i_0 = Math.floor(Math.random() * 4)
            }
        }
        for (let q = 0; q < 20; q++) {
            if (i_1 === i_0 || i_1 === i_2 || i_0 === i_3) {
                i_1 = Math.floor(Math.random() * 4)
            }
        }
        for (let q = 0; q < 20; q++) {
            if (i_2 === i_0 || i_2 === i_1 || i_0 === i_3) {
                i_2 = Math.floor(Math.random() * 4)
            }
        }
        for (let q = 0; q < 20; q++) {
            if ( i_3 === i_0 || i_3 === i_1 || i_3 === i_2) {
                i_3 = Math.floor(Math.random() * 4)
            }
        }
        console.log(i_3)
        let array_ = ['','','','']
        array_[i_0] = `<label for="${0}">${incorrect[0]}</label>
            <input type="radio" name="${0}" value="${incorrect[0]}" onclick="clearRadioButton(${0})">`
        array_[i_1] = `<label for="${1}">${incorrect[1]}</label>
            <input type="radio" name="${1}" value="${incorrect[1]}" onclick="clearRadioButton(${1})">`
        array_[i_2] = `<label for="${2}">${incorrect[2]}</label>
            <input type="radio" name="${2}" value="${incorrect[2]}" onclick="clearRadioButton(${2})">`
        array_[i_3] = `<label for="${3}">${answer[0]}</label>
            <input type="radio" name="${3}" value="${answer[0]}" onclick="clearRadioButton(${3})">`
        console.log(array_)

        for (let i = 0; i < array_.length; i++) {
            str_3 += array_[i]
        }

        document.getElementById('change-question').innerHTML = `
            <button id="clear-button" onclick="ClearAll()">End Quiz</button>
            <h1>${str_1}</h1>
            <fieldset>
                <input id="question" type="text" name="question" value="${str_5}" hidden>
                <input id="answer" type="text" name="answer" hidden>
                <input id="item_type" type="text" name="type" value="${question[1]}" hidden>
                ${str_3}
                <button type="button" onclick="CheckQuestion()">Submit Answer</button>
            </fieldset>
            
            <button id="next-question" type="button" onclick="Questions()">Next Question</button>
            `
    }
    xhr.send()
}

function clearRadioButton(selection) {
    let all_radios = document.querySelectorAll('input')
    for (let x = 0; x < all_radios.length; x++) {
        if (all_radios[x].getAttribute('name') !== selection.toString()) {
            all_radios[x].checked = false
        } else document.getElementById('answer').setAttribute('value', all_radios[x].getAttribute('value'))
    }
}

function CheckQuestion() {
    let question = document.getElementById('question').getAttribute('value')
    let answer = document.getElementById('answer').getAttribute('value')
    let item = document.getElementById('item_type').getAttribute('value')
    let quiz_number = localStorage.getItem('quiz')
    let q_count = localStorage.getItem('question_attempt')
    const xhr = new XMLHttpRequest()
    const method = 'GET'
    const url = `/question?item=${item}&question=${question}&answer=${answer}&quiz_number=${quiz_number}&q_count=${q_count}`
    const responseType = 'json'
    xhr.responseType = responseType
    xhr.open(method, url)
    xhr.onload = ()=> {
        let serverResponse = xhr.response.response
        console.log(serverResponse)
        if (serverResponse === 'success') {
            if (localStorage.getItem('question_attempt') === '1') {
                let score = localStorage.getItem('correct')
                score++
                localStorage.setItem('correct', score)
            }
            Questions()
        } else {
            if (localStorage.getItem('question_attempt') === '1') {
                let score = localStorage.getItem('incorrect')
                score++
                localStorage.setItem('incorrect', score)
                localStorage.setItem('question_attempt', '2+')
            }
            window.alert('Incorrect Try Again')
        }
    }
    xhr.send()
}

function viewMenu() {
    document.getElementById('quiz-score').innerHTML = ''
    document.getElementById('main_button_group').innerHTML = `
        <button type="button" onclick="ClearAll();StartQuiz()">Quiz</button>
        <button type="button" onclick="ClearAll();viewDrinks()">View Drink Menu</button>`
    document.getElementById('button_group').innerHTML = `
        <button type="button" onclick="OpenEntrees()">Entrees</button>
        <button type="button" onclick="OpenApps()">Apps</button>
        <button type="button" onclick="OpenSandwiches()">Sandwiches</button>
        <button type="button" onclick="OpenBurgers()">Burgers</button>
        <button type="button" onclick="OpenSalads()">Salads</button>
        <button type="button" onclick="OpenDressing()">Dressings</button>
        <button type="button" onclick="OpenDesserts()">Desserts</button>
        <button type="button" onclick="OpenSoups()">Soups</button>
        <button type="button" onclick="OpenIngredients()">Ingredients</button>
        <button type="button" onclick="OpenSides()">Sides</button>
        <button id="clear-button" onclick="ClearAll()">Clear Selection</button>
    `
}

function viewDrinks() {
    document.getElementById('quiz-score').innerHTML = ''
    document.getElementById('main_button_group').innerHTML = `
        <button type="button" onclick="ClearAll();StartQuiz()">Quiz</button>
        <button type="button" onclick="ClearAll();viewMenu()">View Menu</button>
        `
    document.getElementById('button_group').innerHTML = `
        <button type="button" onclick="OpenDrinks('cocktails')">Specialty Drinks</button>
        <button type="button" onclick="viewBeer();OpenBeer('all')">Beer</button>
        <button type="button" onclick="viewWine()">Wine</button>
        <button id="clear-button" onclick="ClearAll()">Clear Selection</button>`
}

function OpenDrinks(item) {
    FirstCheck()
    const xhr = new XMLHttpRequest()
    const method = 'GET'
    const url = `/api?item=${item}`
    const responseType = 'json'
    xhr.responseType = responseType
    xhr.open(method, url)
    xhr.onload = ()=> {
        let serverResponse = xhr.response.response
        console.log(serverResponse)
        let return_str = ''
        for (let i = 0; i < serverResponse.length; i++) {
            return_str += `<li><ul><li>
                <h1>${serverResponse[0].id}</h1>
                <h1>${serverResponse[0].name}</h1>
                <h1>${serverResponse[0].description}</h1>
                </li></ul></li>`
        }
        document.getElementById('main_div').innerHTML = return_str
    }
    xhr.send()
}

function viewWine() {
    document.getElementById('quiz-score').innerHTML = ''
    document.getElementById('main_button_group').innerHTML = `
        <button type="button" onclick="ClearAll();StartQuiz()">Quiz</button>
        <button type="button" onclick="ClearAll();viewDrinks()">View Drinks</button>
        <button type="button" onclick="ClearAll();viewMenu()">View Menu</button>
        `
    document.getElementById('button_group').innerHTML = `
        <button type="button" onclick="OpenWine('red')">Red</button>
        <button type="button" onclick="OpenWine('white')">White</button>
        <button type="button" onclick="OpenWine('champagne')">Champagne</button>
        <button type="button" onclick="OpenWine('splits')">Splits</button>
        <button id="clear-button" onclick="ClearAll()">Clear Selection</button>`
}

function OpenWine(type) {
    FirstCheck()
    let item = 'wine'
    const xhr = new XMLHttpRequest()
    const method = 'GET'
    const url = `/api?item=${item}`
    const responseType = 'json'
    xhr.responseType = responseType
    xhr.open(method, url)
    xhr.onload = ()=> {
        let serverResponse = xhr.response.response
        console.log(serverResponse)
        let return_str = ''
        for (let i = 0; i < serverResponse.length; i++) {
            if (type === serverResponse[i].type) {
                return_str += `<li><ul><li>
                    <h1>${serverResponse[i].id}</h1>
                    <h1>${serverResponse[i].name}</h1>
                    <h1>${serverResponse[i].region}</h1>
                    <h1>${serverResponse[i].description}</h1>
                    </li></ul></li>`
            }
        }
        document.getElementById('main_div').innerHTML = return_str
    }
    xhr.send()
}

function viewBeer() {
    document.getElementById('quiz-score').innerHTML = ''
    document.getElementById('main_button_group').innerHTML = `
        <button type="button" onclick="ClearAll();StartQuiz()">Quiz</button>
        <button type="button" onclick="ClearAll();viewDrinks()">View Drinks</button>
        <button type="button" onclick="ClearAll();viewMenu()">View Menu</button>
        `
    document.getElementById('button_group').innerHTML = `
        <button class="beer-selection" type="button" onclick="OpenBeer('draft')">Draft Beer</button>
        <button class="beer-selection" type="button" onclick="OpenBeer('bottle')">Bottled Beer</button>
        <button id="clear-button" onclick="ClearAll()">Clear Selection</button>`
}

function OpenBeer(item) {
    FirstCheck()
    let beer_type = ''
    for (let i = 0; i < item.length; i++) {
        if (i === 0) {
            beer_type += item[i].toUpperCase()
        } else beer_type += item[i]
    }

    const xhr = new XMLHttpRequest()
    const method = 'GET'
    const url = `/api?item=${item}`
    const responseType = 'json'
    xhr.responseType = responseType
    xhr.open(method, url)
    xhr.onload = ()=> {
        let serverResponse = xhr.response.response
        console.log(serverResponse)
        let return_str = `<h1>${beer_type} Beers</h1>`
        for (let i = 0; i < serverResponse.length; i++) {
            return_str += `<li><ul><li>
                <h1>${serverResponse[i].id}</h1>
                <h1>${serverResponse[i].name}</h1>
                <h1>${serverResponse[i].draft}</h1>
                <h1>${serverResponse[i].bottle}</h1>
                <h1>${serverResponse[i].type}</h1>
                <h1>${serverResponse[i].description}</h1>
                </li></ul></li>`
        }
        document.getElementById('main_div').innerHTML = return_str
    }
    xhr.send()
}


