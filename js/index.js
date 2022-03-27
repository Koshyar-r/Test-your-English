const CrimesButton = document.querySelector(".topic__btns .crimes__btn")
const FamilyButton = document.querySelector(".topic__btns .family__btn")
const VechilesButton = document.querySelector(".topic__btns .vechiles__btn")
const CountriesButton = document.querySelector(".topic__btns .countries__btn")
const RuleBox = document.querySelector(".rule__box")
const ExitButton = RuleBox.querySelector(".buttons .exit")
const ContinueButton = RuleBox.querySelector(".buttons .continue")
const QuizBox = document.querySelector(".quiz__box")
const TimeCounter = QuizBox.querySelector(".timer .timer__sec")
const TimeLine = QuizBox.querySelector("header .time__line")
const CrimesOptionList = document.querySelector(".options")
const FamilyOptionList = document.querySelector(".options")
const VechileOptionList = document.querySelector(".options")
const CountriesOptionList = document.querySelector(".options")
const CrimeNextButton = document.querySelector(".next__btn")
const FamilyNextButton = document.querySelector(".next__btn")
const VechileNextButton = document.querySelector(".next__btn")
const CountryNextButton = document.querySelector(".next__btn")
const ResultBox = document.querySelector(".result__box")
const RestartQuiz = ResultBox.querySelector(".result__box__buttons .result__box__restart")
const QuitQuiz = ResultBox.querySelector(".result__box__buttons .result__box__exit")

RestartQuiz.onclick = () => {
    ResultBox.classList.remove("activeResult")
    ShowCrimeQuestions(QuestionCount)
    CrimeQuestionCounter(QuestionNumb)
    clearInterval(Counter)
    StartTimer(TimeValue)
    clearInterval(CounterLine)
    StartTimerLine(WidthValue)
    let QuestionCount = 0
    let QuestionNumb = 1
    let TimeValue = 30
    let WidthValue = 0
    let UserScore = 0
}

QuitQuiz.onclick = () => {
    window.location.reload()
}

let QuestionCount = 0
let QuestionNumb = 1
let Counter
let TimeValue = 30
let WidthValue = 0
let UserScore = 0

function StartTimer(Time) {
    Counter = setInterval(Timer, 1000)
    function Timer() {
        TimeCounter.textContent = Time
        Time--
        if(Time < 9) {
            let AddZero = TimeCounter.textContent
            TimeCounter.textContent = "0" + AddZero
        }
        if(Time < 0) {
            clearInterval(Counter)
            TimeCounter.textContent = "00"

            /*let CrimeCorrectAnswer = CrimeQuestions[QuestionCount].answer
            let CrimeAllOptions = CrimesOptionList.children.length

            for (let i = 0; i < CrimeAllOptions; i++) {
                if(CrimesOptionList.children[i].textContent == CrimeCorrectAnswer) {
                    CrimesOptionList.children[i].setAttribute("class", "option correct")
                    CrimesOptionList.children[i].insertAdjacentHTML("BeforeEnd", TickIcon)
                }
            }
            for (let i = 0; i < CrimeAllOptions; i++) {
                CrimesOptionList.children[i].classList.add("disabled")
            }*/
            
        }
    }
}

function StartTimerLine(Time) {
    CounterLine = setInterval(Timer, 57)
    function Timer() {
        Time += 1
        TimeLine.style.width = Time + "px"
        if(Time > 555) {
            clearInterval(CounterLine)
        }
    }
}


CrimesButton.onclick = () => {
    RuleBox.classList.add("activeRule")
    ShowCrimeQuestions(0)
    CrimeNextButton.onclick = () => {
    if(QuestionCount < CrimeQuestions.length - 1) {    
        QuestionCount++
        ShowCrimeQuestions(QuestionCount)
        QuestionNumb++
        CrimeQuestionCounter(QuestionNumb)
        clearInterval(Counter)
        StartTimer(TimeValue)
        clearInterval(CounterLine)
        StartTimerLine(WidthValue)
        CrimeNextButton.style.display = "none"
    } else {
        console.log("Questions Completed!!")
        CrimeShowResultBox()
    }
    }
}

function CrimeQuestionCounter(index) {
    const QuestionCounter = QuizBox.querySelector(".total__questions")    
    let TotalQuestionTag = '<span><p>' + index + '</p>of<p>' + CrimeQuestions.length + '</p>Questions</span>'
    QuestionCounter.innerHTML = TotalQuestionTag
}

function ShowCrimeQuestions(index) {
    const CrimesQuestionText = document.querySelector(".que__text")
    let CrimeQuestionTag = '<span>' + CrimeQuestions[index].numb + ". " + CrimeQuestions[index].question + '</span>'
    let CrimeOptionTag = '<div class="option"><span>'+ CrimeQuestions[index].options[0] +'</span></div>' 
                        + '<div class="option"><span>'+ CrimeQuestions[index].options[1] +'</span></div>'
                        + '<div class="option"><span>'+ CrimeQuestions[index].options[2] +'</span></div>'
                        + '<div class="option"><span>'+ CrimeQuestions[index].options[3] +'</span></div>'
    CrimesQuestionText.innerHTML = CrimeQuestionTag
    CrimesOptionList.innerHTML = CrimeOptionTag
    const CrimeOption = CrimesOptionList.querySelectorAll(".option")
    for (let i = 0; i < CrimeOption.length; i++) {
        CrimeOption[i].setAttribute("onclick", "CrimeOptionSelected(this)")
    }
}

let TickIcon = '<div class="icon tick"><i class="uil uil-check-circle"></i></div>'
let CrossIcon = '<div class="icon tick"><i class="uil uil-times-circle"></i></div>'

function CrimeOptionSelected(answer) {
    clearInterval(Counter)
    clearInterval(CounterLine)
    let CrimeUserAnswer = answer.textContent
    let CrimeCorrectAnswer = CrimeQuestions[QuestionCount].answer
    let CrimeAllOptions = CrimesOptionList.children.length
    if(CrimeUserAnswer == CrimeCorrectAnswer) {
        UserScore += 1
        console.log(UserScore)
        answer.classList.add("correct")
        console.log("Correct!")
        answer.insertAdjacentHTML("BeforeEnd", TickIcon)
    } else {
        answer.classList.add("incorrect")
        console.log("Incorrect!")
        answer.insertAdjacentHTML("BeforeEnd", CrossIcon)

        for (let i = 0; i < CrimeAllOptions; i++) {
            if(CrimesOptionList.children[i].textContent == CrimeCorrectAnswer) {
                CrimesOptionList.children[i].setAttribute("class", "option correct")
                CrimesOptionList.children[i].insertAdjacentHTML("BeforeEnd", TickIcon)
            }
        }
    }
    for (let i = 0; i < CrimeAllOptions; i++) {
        CrimesOptionList.children[i].classList.add("disabled")
    }
    CrimeNextButton.style.display = "block"
}

function CrimeShowResultBox() {
    RuleBox.classList.remove("activeRule")
    QuizBox.classList.remove("activeQuiz")
    ResultBox.classList.add("activeResult")
    const ScoreIcon = ResultBox.querySelector(".icon")
    const ScoreText = ResultBox.querySelector(".score")
    if(UserScore == 0) {
        let ScoreTag = '<span>Bruh :/ , You got <p>' + UserScore + '</p> out of <p>' + CrimeQuestions.length + '</p> Study more. fr.</span>'
        ScoreText.innerHTML = ScoreTag
        let ScoreIconTag = '<i class="uil uil-confused"></i>'
        ScoreIcon.innerHTML = ScoreIconTag
    }
    else if(UserScore > 1 || UserScore == 1) {
        let ScoreTag = '<span>You can do better! , You got <p>' + UserScore + '</p> out of <p>' + CrimeQuestions.length + '</p> .</span>'
        ScoreText.innerHTML = ScoreTag
        let ScoreIconTag = '<i class="uil uil-smile-squint-wink"></i>'
        ScoreIcon.innerHTML = ScoreIconTag
    }
    else if(UserScore > 3 || UserScore == 3) {
        let ScoreTag = '<span>Good job! , You got <p>' + UserScore + '</p> out of <p>' + CrimeQuestions.length + '</p> .</span>'
        ScoreText.innerHTML = ScoreTag
        let ScoreIconTag = '<i class="uil uil-smile-squint-wink"></i>'
        ScoreIcon.innerHTML = ScoreIconTag
    }
}

FamilyButton.onclick = () => {
    RuleBox.classList.add("activeRule")
    ShowFamilyQuestions(0)
    FamilyNextButton.onclick = () => {
    if(QuestionCount < FamilyQuestions.length - 1) {    
        QuestionCount++
        ShowFamilyQuestions(QuestionCount)
        QuestionNumb++
        FamilyQuestionCounter(QuestionNumb)
        clearInterval(Counter)
        StartTimer(TimeValue)
        clearInterval(CounterLine)
        StartTimerLine(WidthValue)
        FamilyNextButton.style.display = "none"
    } else {
        console.log("Questions Completed!!!")
        FamilyShowResultBox()
    }   
    }
}

function FamilyQuestionCounter(index) {
    const QuestionCounter = QuizBox.querySelector(".total__questions")    
    let TotalQuestionTag = '<span><p>' + index + '</p>of<p>' + FamilyQuestions.length + '</p>Questions</span>'
    QuestionCounter.innerHTML = TotalQuestionTag
}

function ShowFamilyQuestions(index) {
    const FamilyQuestionText = document.querySelector(".que__text")
    let FamilyQuestionTag = '<span>' + FamilyQuestions[index].numb + ". " + FamilyQuestions[index].question + '</span>'
    let FamilyOptionTag = '<div class="option">'+ FamilyQuestions[index].options[0] +'<span></span></div>'
                       + '<div class="option">'+ FamilyQuestions[index].options[1] +'<span></span></div>'
                       + '<div class="option">'+ FamilyQuestions[index].options[2] +'<span></span></div>'
                       + '<div class="option">'+ FamilyQuestions[index].options[3] +'<span></span></div>'
    FamilyQuestionText.innerHTML = FamilyQuestionTag
    FamilyOptionList.innerHTML = FamilyOptionTag
    const FamilyOption = FamilyOptionList.querySelectorAll(".option")
    for (let i = 0; i < FamilyOption.length; i++) {
        FamilyOption[i].setAttribute("onclick", "FamilyOptionSelected(this)")
    }
}

function FamilyOptionSelected(answer) {
    clearInterval(Counter)
    clearInterval(CounterLine)
    let FamilyUserAnswer = answer.textContent
    let FamilyCorrectAnswer = FamilyQuestions[QuestionCount].answer
    let FamilyAllOptions = FamilyOptionList.children.length
    if(FamilyUserAnswer == FamilyCorrectAnswer) {
        UserScore += 1
        answer.classList.add("correct")
        console.log("Correct!")
        answer.insertAdjacentHTML("BeforeEnd", TickIcon)
    } else {
        answer.classList.add("incorrect")
        console.log("Incorrect!")
        answer.insertAdjacentHTML("BeforeEnd", CrossIcon)

        for (let i = 0; i < FamilyAllOptions; i++) {
            if(FamilyOptionList.children[i].textContent == FamilyCorrectAnswer) {
                FamilyOptionList.children[i].setAttribute("class", "option correct")
                FamilyOptionList.children[i].insertAdjacentHTML("BeforeEnd", TickIcon)
            }
        }
    }
    for (let i = 0; i < FamilyAllOptions; i++) {
        FamilyOptionList.children[i].classList.add("disabled")
    }
    FamilyNextButton.style.display = "block"
}

function FamilyShowResultBox() {
    RuleBox.classList.remove("activeRule")
    QuizBox.classList.remove("activeQuiz")
    ResultBox.classList.add("activeResult")
    const ScoreText = ResultBox.querySelector(".score")
    if(UserScore > 0) {
        let ScoreTag = '<span>Bruh <i class="uil uil-confused"></i>, You got <p>' + UserScore + '</p> out of <p>' + FamilyQuestions.length + '</p> Study more.</span>'
        ScoreText.innerHTML = ScoreTag
    }
    else if(UserScore > 2) {
        let ScoreTag = '<span>Good but you can do better <i class="uil uil-smile-squint-wink"></i>, You got <p>' + UserScore + '</p> out of <p>' + FamilyQuestions.length + '</p> .</span>'
        ScoreText.innerHTML = ScoreTag
    }
    else if(UserScore > 3) {
        let ScoreTag = '<span>Nice! <i class="uil uil-smile"></i>, You got <p>' + UserScore + '</p> out of <p>' + FamilyQuestions.length + '</p> Questions.</span>'
        ScoreText.innerHTML = ScoreTag
    }
    else if (UserScore == 5) {
        let ScoreTag = '<span>Booyah!! <i class="uil uil-grin-tongue-wink"></i>, You got <p>' + UserScore + '</p> out of <p>' + FamilyQuestions.length + '</p> Questions.</span>'
        ScoreText.innerHTML = ScoreTag
    }
}

VechilesButton.onclick = () => {
    RuleBox.classList.add("activeRule")
    ShowVechileQuestions(0)
    const VechileNextButton = document.querySelector(".next__btn")
    VechileNextButton.onclick = () => {
        if(QuestionCount < CrimeQuestions.length - 1) {    
            QuestionCount++
            ShowVechileQuestions(QuestionCount)
            QuestionNumb++
            VechileQuestionCounter(QuestionNumb)
            clearInterval(Counter)
            StartTimer(TimeValue)
            clearInterval(CounterLine)
            StartTimerLine(WidthValue)
            VechileNextButton.style.display = "none"
        } else {
            console.log("Questions Completed!!!")
            VechileShowResultBox()
        }   
    }
}

function VechileQuestionCounter(index) {
    const QuestionCounter = QuizBox.querySelector(".total__questions")    
    let TotalQuestionTag = '<span><p>' + index + '</p>of<p>' + VechileQuestions.length + '</p>Questions</span>'
    QuestionCounter.innerHTML = TotalQuestionTag
}

function ShowVechileQuestions(index) {
    const VechileQuestionText = document.querySelector(".que__text")
    let VechileQuestionTag = '<span>' + VechileQuestions[index].numb + ". " + VechileQuestions[index].question + '</span>'
    let VechileOptionTag = '<div class="option">'+ VechileQuestions[index].options[0] +'<span></span></div>'
                        + '<div class="option">'+ VechileQuestions[index].options[1] +'<span></span></div>'
                        + '<div class="option">'+ VechileQuestions[index].options[2] +'<span></span></div>'
                        + '<div class="option">'+ VechileQuestions[index].options[3] +'<span></span></div>'
    VechileQuestionText.innerHTML = VechileQuestionTag
    VechileOptionList.innerHTML = VechileOptionTag
    const VechileOption = VechileOptionList.querySelectorAll(".option")
    for (let i = 0; i < VechileOption.length; i++) {
        VechileOption[i].setAttribute("onclick", "VechileOptionSelected(this)")
    }
}

function VechileOptionSelected(answer) {
    clearInterval(Counter)
    clearInterval(CounterLine)
    let VechileUserAnswer = answer.textContent
    let VechileCorrectAnswer = VechileQuestions[QuestionCount].answer
    let VechileAllOptions = VechileOptionList.children.length
    if(VechileUserAnswer == VechileCorrectAnswer) {
        UserScore += 1
        answer.classList.add("correct")
        console.log("Correct!")
        answer.insertAdjacentHTML("BeforeEnd", TickIcon)
    } else {
        answer.classList.add("incorrect")
        console.log("Incorrect!")
        answer.insertAdjacentHTML("BeforeEnd", CrossIcon)

        for (let i = 0; i < VechileAllOptions; i++) {
            if(VechileOptionList.children[i].textContent == VechileCorrectAnswer) {
                VechileOptionList.children[i].setAttribute("class", "option correct")
                VechileOptionList.children[i].insertAdjacentHTML("BeforeEnd", TickIcon)
            }
        }
    }
    for (let i = 0; i < VechileAllOptions; i++) {
        VechileOptionList.children[i].classList.add("disabled")
    }
    VechileNextButton.style.display = "block"
}

function VechileShowResultBox() {
    RuleBox.classList.remove("activeRule")
    QuizBox.classList.remove("activeQuiz")
    ResultBox.classList.add("activeResult")
    const ScoreText = ResultBox.querySelector(".score")
    if(UserScore > 0) {
        let ScoreTag = '<span>Bruh <i class="uil uil-confused"></i>, You got <p>' + UserScore + '</p> out of <p>' + VechileQuestions.length + '</p> Study more.</span>'
        ScoreText.innerHTML = ScoreTag
    }
    else if(UserScore > 2) {
        let ScoreTag = '<span>Good but you can do better <i class="uil uil-smile-squint-wink"></i>, You got <p>' + UserScore + '</p> out of <p>' + VechileQuestions.length + '</p> .</span>'
        ScoreText.innerHTML = ScoreTag
    }
    else if(UserScore > 3) {
        let ScoreTag = '<span>Nice! <i class="uil uil-smile"></i>, You got <p>' + UserScore + '</p> out of <p>' + VechileQuestions.length + '</p> Questions.</span>'
        ScoreText.innerHTML = ScoreTag
    }
    else if (UserScore == 5) {
        let ScoreTag = '<span>Booyah!! <i class="uil uil-grin-tongue-wink"></i>, You got <p>' + UserScore + '</p> out of <p>' + VechileQuestions.length + '</p> Questions.</span>'
        ScoreText.innerHTML = ScoreTag
    }
}

CountriesButton.onclick = () => {
    RuleBox.classList.add("activeRule")
    ShowCountryQuestions(0)
    const CountryNextButton = document.querySelector(".next__btn")
    CountryNextButton.onclick = () => {
        if(QuestionCount < CountryQuestions.length - 1) {    
            QuestionCount++
            ShowCountryQuestions(QuestionCount)
            QuestionNumb++
            CountryQuestionCounter(QuestionNumb)
            clearInterval(Counter)
            StartTimer(TimeValue)
            clearInterval(CounterLine)
            StartTimerLine(WidthValue)
            CountryNextButton.style.display = "none"
        } else {
            console.log("Questions Completed!!!")
            CountryShowResultBox()
        }   
    }
}

function CountryQuestionCounter(index) {
    const QuestionCounter = QuizBox.querySelector(".total__questions")    
    let TotalQuestionTag = '<span><p>' + index + '</p>of<p>' + CountryQuestions.length + '</p>Questions</span>'
    QuestionCounter.innerHTML = TotalQuestionTag
}

function ShowCountryQuestions(index) {
    const CountriesQuestionText = document.querySelector(".que__text")
    let CountriesQuestionTag = '<span>' + CountryQuestions[index].numb + ". " + CountryQuestions[index].question + '</span>'
    let CountriesOptionTag = '<div class="option">'+ CountryQuestions[index].options[0] +'<span></span></div>'
                        + '<div class="option">'+ CountryQuestions[index].options[1] +'<span></span></div>'
                        + '<div class="option">'+ CountryQuestions[index].options[2] +'<span></span></div>'
                        + '<div class="option">'+ CountryQuestions[index].options[3] +'<span></span></div>'
    CountriesQuestionText.innerHTML = CountriesQuestionTag
    CountriesOptionList.innerHTML = CountriesOptionTag
    const CountriesOption = CountriesOptionList.querySelectorAll(".option")
    for (let i = 0; i < CountriesOption.length; i++) {
        CountriesOption[i].setAttribute("onclick", "CountriesOptionSelected(this)")
    }
}

function CountriesOptionSelected(answer) {
    clearInterval(Counter)
    clearInterval(CounterLine)
    let CountriesUserAnswer = answer.textContent
    let CountriesCorrectAnswer = CountryQuestions[QuestionCount].answer
    let CountriesAllOptions = CountriesOptionList.children.length
    if(CountriesUserAnswer == CountriesCorrectAnswer) {
        UserScore += 1
        answer.classList.add("correct")
        console.log("Correct!")
        answer.insertAdjacentHTML("BeforeEnd", TickIcon)
    } else {
        answer.classList.add("incorrect")
        console.log("Incorrect!")
        answer.insertAdjacentHTML("BeforeEnd", CrossIcon)

        for (let i = 0; i < CountriesAllOptions; i++) {
            if(CountriesOptionList.children[i].textContent == CountriesCorrectAnswer) {
                CountriesOptionList.children[i].setAttribute("class", "option correct")
                CountriesOptionList.children[i].insertAdjacentHTML("BeforeEnd", TickIcon)
            }
        }
    }
    for (let i = 0; i < CountriesAllOptions; i++) {
        CountriesOptionList.children[i].classList.add("disabled")
    }
    CountryNextButton.style.display = "block"
}

function CountryShowResultBox() {
    RuleBox.classList.remove("activeRule")
    QuizBox.classList.remove("activeQuiz")
    ResultBox.classList.add("activeResult")
    const ScoreText = ResultBox.querySelector(".score")
    if(UserScore > 0) {
        let ScoreTag = '<span>Bruh <i class="uil uil-confused"></i>, You got <p>' + UserScore + '</p> out of <p>' + CountryQuestions.length + '</p> Study more.</span>'
        ScoreText.innerHTML = ScoreTag
    }
    else if(UserScore > 2) {
        let ScoreTag = '<span>Good but you can do better <i class="uil uil-smile-squint-wink"></i>, You got <p>' + UserScore + '</p> out of <p>' + CountryQuestions.length + '</p> .</span>'
        ScoreText.innerHTML = ScoreTag
    }
    else if(UserScore > 3) {
        let ScoreTag = '<span>Nice! <i class="uil uil-smile"></i>, You got <p>' + UserScore + '</p> out of <p>' + CountryQuestions.length + '</p> Questions.</span>'
        ScoreText.innerHTML = ScoreTag
    }
    else {
        let ScoreTag = '<span>Booyah!! <i class="uil uil-grin-tongue-wink"></i>, You got <p>' + UserScore + '</p> out of <p>' + CountryQuestions.length + '</p> Questions.</span>'
        ScoreText.innerHTML = ScoreTag
    }
}

ExitButton.onclick = () => {
    RuleBox.classList.remove("activeRule")
}

ContinueButton.onclick = () => {
    RuleBox.classList.remove("activeRule")
    QuizBox.classList.add("activeQuiz")
    StartTimer(TimeValue)
    StartTimerLine(WidthValue)
}