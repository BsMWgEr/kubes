

function closeDiv(div_id, num) {
    if (num === 1 ) {
        document.getElementById(`x${div_id}`).innerHTML = ''
    } else document.getElementById(div_id).innerHTML = ''
    document.getElementById('user_dropdown').value = ''
}


function viewSpecificQuiz(quiz_number, num) {
    console.log(quiz_number)
    const xhr = new XMLHttpRequest()
    const method = 'GET'
    const url = `/results?quiz_number=${quiz_number}`
    const responseType = 'json'
    xhr.responseType = responseType
    xhr.open(method, url)
    xhr.onload = ()=> {
        let quiz_results = xhr.response.response
        console.log(quiz_results)
        let return_str;
        if (num === 0) {
            return_str = `<ol id="answer_attempts_div"><button type="button" onclick="closeDiv('${quiz_number}', 0)">Close ${quiz_number} Results</button><h1>${quiz_results[0].quiz_number}</h1>`
        } else return_str = `<ol id="answer_attempts_div"><button type="button" onclick="closeDiv('${quiz_number}', 1)">Close ${quiz_number} Results</button><h1>${quiz_results[0].quiz_number}</h1>`

        for (let i = 0; i < quiz_results.length; i++) {
            let quiz_answer;
            if (quiz_results[i].answer_correct === true) {
                quiz_answer = 'CORRECT'
            } else quiz_answer = 'WRONG'
            return_str += `<li>
                <ul>
                    <li>${quiz_answer}</li>
                    <li>${quiz_results[i].question}</li>
                    <li>${quiz_results[i].answer}</li>
                </ul>
            </li>`
        }
        return_str += '</ol>'
        if (num === 0) {
            document.getElementById(quiz_number).innerHTML = return_str
        } else {
            document.getElementById(`x${quiz_number}`).innerHTML = return_str
        }
    }
    xhr.send()
}

function searchForQuiz() {
    let user = document.getElementById('user_dropdown').value
    console.log(user)
    const xhr = new XMLHttpRequest()
    const method = 'GET'
    const url = `/results?search_for=${user}`
    const responseType = 'json'
    xhr.responseType = responseType
    xhr.open(method, url)
    xhr.onload = ()=> {
        let results = xhr.response.response
        let users = xhr.response.users
        console.log(results)
        console.log(users)
        let return_str = `<button id="clear_all_results" type="button" onclick="closeDiv('change_div', 0)">Clear Results</button><ol>`
        for (let i = 0; i < results.length; i++) {
            return_str += `<li><ul onclick="viewSpecificQuiz('${results[i].quiz_number}', 0)">
                <li>${results[i].id}</li>
                <li>${results[i].user}</li>
                <li>${results[i].quiz_number}</li>
                <li>${results[i].correct}</li>
                <li>${results[i].incorrect}</li>
                <li>${results[i].score}</li>
            </ul></li><div id="${results[i].quiz_number}"></div>`
        }
        return_str += '</ol>'
        document.getElementById('change_div').innerHTML = return_str
    }
    xhr.send()
}