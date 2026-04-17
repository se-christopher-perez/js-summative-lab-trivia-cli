
import { select, input, Separator } from '@inquirer/prompts';
import { triviaQuestions } from './triviaQuestions.js';

let data = triviaQuestions

///////////MAIN MENU///////////

export async function mainMenu() {

    const selectAction = await select({
        message: "Trivia: Main Menu",
        choices: [
            { name: "Play Game", value: "start" },
            { name: "Stats", value: "stat" },
            { name: "See Questions", value: "questions" },
            { name: "Settings", value: "settings" },
            { name: "Quit", value: "quit" }
        ],
        loop: false
    })

    if (selectAction === "start") {
        playGame()
    } else if (selectAction === "stats") {
        console.log(selectAction)
    } else if (selectAction === "questions") {
        questionMenu()
    } else if (selectAction === "settings") {
        settingsMenu()
    } else if (selectAction === "quit") {
        console.log("Thank you, goodbye!")
    }

}

///////////MAIN MENU///////////

///////////PLAY GAME///////////

export async function playGame() {

    for(const element of data) {

        const answer = await input({

            message: element["question"]

        })

        if (answer.toLowerCase() === element["answer"].toLowerCase()) {
            console.log("+1")
        } else {
            console.log("0")
        }

    }

}

///////////PLAY GAME///////////


///////////QUESTIONS///////////

export async function questionMenu() {

    let dataMap = data.map((element) => {
        return { name: element["question"], value: element["answer"] }
    })

    const selectAction = await select({
        message: 'Select question for answer; "Back" to return to Main Menu',
        choices: [
            ...dataMap,
            { name: "Back", value: "back" }
        ],
        loop: false
    });

    if (selectAction === "back") {
        await mainMenu()
    } else {
        console.log(selectAction)
        await questionMenu()
    };

}

///////////QUESTIONS///////////

///////////SETTINGS///////////

export async function settingsMenu() {

const selectAction = await select({
        message: "Settings",
        choices: [
            { name: "Difficulty", value: "difficulty" },
            { name: "Question Topics", value: "question topics" },
            { name: "Back", value: "back" }
        ],
        loop: false
    })

    if (selectAction === "back") {
        await mainMenu()
    } else if (selectAction === "difficulty") {
        await difficultyMenu()
    } else if (selectAction === "question topics") {
        await topicMenu()
    }

}

export async function difficultyMenu() {

const selectAction = await select({
        message: "Select Topics",
        choices: [
            { name: "Easy", value: "easy" },
            { name: "Medium", value: "medium" },
            { name: "Hard", value: "hard" },
            { name: "Back", value: "back" }
        ],
        loop: false
    })

    if (selectAction === "back") {
        await settingsMenu()
    } 

}

export async function topicMenu() {

const selectAction = await select({
        message: "Select Topics",
        choices: [
            { name: "All", value: "all" },
            { name: "Movies/Television", value: "movies/television" },
            { name: "Geography", value: "geography" },
            { name: "History", value: "history" },
            { name: "Science", value: "science" },
            { name: "Back", value: "back" }
        ],
        loop: false
    })

    if (selectAction === "back") {

        await settingsMenu()

    } else if (selectAction === "all") {

        data = triviaQuestions

        await settingsMenu()

    } else if (selectAction === "movies/television") {

        data = triviaQuestions.filter((element) => element["topic"] === "movies/television")

        await settingsMenu()
        
    } else if (selectAction === "geography") {

        data = triviaQuestions.filter((element) => element["topic"] === "geography")

        await settingsMenu()
        
    } else if (selectAction === "history") {

        data = triviaQuestions.filter((element) => element["topic"] === "history")

        await settingsMenu()
        
    } else if (selectAction === "science") {

        data = triviaQuestions.filter((element) => element["topic"] === "science")

        await settingsMenu()
        
    }

}

///////////SETTINGS///////////

mainMenu()
// displayQuestions()