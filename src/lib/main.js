
import chalk from 'chalk'
import { select, input, Separator } from '@inquirer/prompts'
import { triviaQuestions } from './triviaQuestions.js'
import { stats } from './stats.js'

let data = triviaQuestions
let record = stats
const gameModeSetting = {

    mode: "Easy",
    time: 3000,
    topic: "All"

}

///////////MAIN MENU///////////

export async function mainMenu() {

    console.clear()

    const timeLimit = gameModeSetting["time"] / 1000
    const numberQuestions = data.length

    console.log(`Mode: ${chalk.yellow(gameModeSetting["mode"])} Time Limit: ${chalk.yellow(timeLimit + " seconds")} \n Topics: ${chalk.yellow(gameModeSetting["topic"])} Total Questions: ${chalk.yellow(numberQuestions)}`)

    const selectAction = await select({

        message: "Trivia Mania: Main Menu",

        choices: [

            { name: "Play Game", value: "start" },
            { name: "Stats", value: "stats" },
            { name: "See Questions", value: "questions" },
            { name: "Settings", value: "settings" },
            { name: "Quit", value: "quit" }

        ],

        loop: false
    })

    if (selectAction === "start") {

        console.clear()

        playGame()

    } else if (selectAction === "stats") {

        console.clear()

        statMenu()

    } else if (selectAction === "questions") {

        console.clear()

        questionMenu()

    } else if (selectAction === "settings") {

        console.clear()

        settingsMenu()

    } else if (selectAction === "quit") {

        console.clear()

        console.log("Thank you, goodbye!")

    }

}

///////////MAIN MENU///////////

///////////PLAY GAME///////////

export async function playGame() {

    console.clear()

    let endGame = false

    const roundRecord = {

        right: 0,
        wrong: 0

    }

    const gameTimer = setTimeout(() => {

        const totalWrong = data.length - roundRecord["right"]

        if (!endGame) {

            endGame = true

            console.log(`\n\n ⏰ TIME IS UP! ⏰ \n\n Round Over! Correct: ${chalk.green(roundRecord["right"])} Incorrect: ${chalk.red(roundRecord["wrong"])} \n\n Press Enter to return to menu.`)

        }
    }, gameModeSetting["time"])

    for (const element of data) {

        if (endGame) break

        const answer = await input({

            message: element["question"]

        })

        if (endGame) {

            break

        }

        if (answer.toLowerCase() === element["answer"].toLowerCase()) {

            record["right"] += 1

            roundRecord["right"] += 1

            console.log(chalk.green("\n✅ CORRECT\n"))

        } else {

            record["wrong"] += 1

            roundRecord["wrong"] += 1

            console.log(chalk.red("\n❌ Incorrect\n"))

        }
    }

    clearTimeout(gameTimer)

    endGame = true

    record["gamesPlayed"] += 1

    console.log("\nRound Over!", roundRecord)

    await mainMenu()

}

///////////PLAY GAME///////////

///////////STATS///////////

export async function statMenu() {

    console.log(`Total Games Played: ${chalk.yellow(record["gamesPlayed"])}`)

    console.log(`Right Answers: ${chalk.green(record["right"])}`)

    console.log(`Wrong Answers: ${chalk.red(record["wrong"])}`)

    const selectAction = await select({

        message: 'Your Stats; "Back" to return to Main Menu',

        choices: [

            { name: "Back", value: "back" }

        ],

        loop: false
    })

    if (selectAction === "back") {

        console.clear()

        await mainMenu()

    }

}

///////////STATS///////////


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

    })

    if (selectAction === "back") {

        console.clear()

        await mainMenu()

    } else {

        console.log(selectAction)
        
        await questionMenu()
    
    }

}

///////////QUESTIONS///////////

///////////SETTINGS///////////

export async function settingsMenu() {

    const selectAction = await select({

        message: 'Select Setting; "Back" to return to Main Menu',

        choices: [
            { name: "Difficulty", value: "difficulty" },
            { name: "Question Topics", value: "question topics" },
            { name: "Back", value: "back" }
        ],

        loop: false

    })

    if (selectAction === "back") {

        console.clear()

        await mainMenu()

    } else if (selectAction === "difficulty") {

        console.clear()

        await difficultyMenu()

    } else if (selectAction === "question topics") {

        console.clear()

        await topicMenu()

    }

}

export async function difficultyMenu() {

    const selectAction = await select({

        message: `Select Mode; Current Mode: ${gameModeSetting["mode"]}`,

        choices: [
            { name: "Easy", value: "easy" },
            { name: "Medium", value: "medium" },
            { name: "Hard", value: "hard" },
            { name: "Back", value: "back" }
        ],

        loop: false

    })

    if (selectAction === "back") {

        console.clear()

        await settingsMenu()

    } else if (selectAction === "easy") {

        gameModeSetting["mode"] = "Easy"
        gameModeSetting["time"] = 30000

        console.clear()

        await settingsMenu()

    } else if (selectAction === "medium") {

        gameModeSetting["mode"] = "Medium"
        gameModeSetting["time"] = 15000

        console.clear()

        await settingsMenu()

    } else if (selectAction === "hard") {

        gameModeSetting["mode"] = "Hard"
        gameModeSetting["time"] = 5000

        console.clear()

        await settingsMenu()

    }

}

export async function topicMenu() {

    const selectAction = await select({

        message: `Select Topics; Current Topics: ${gameModeSetting["topic"]}`,

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

        console.clear()

        await settingsMenu()

    } else if (selectAction === "all") {

        data = triviaQuestions

        gameModeSetting["topic"] = "All"

        console.clear()

        await settingsMenu()

    } else if (selectAction === "movies/television") {

        data = triviaQuestions.filter((element) => element["topic"] === "movies/television")
        
        gameModeSetting["topic"] = "Movies/Television"

        console.clear()

        await settingsMenu()

    } else if (selectAction === "geography") {

        data = triviaQuestions.filter((element) => element["topic"] === "geography")

        gameModeSetting["topic"] = "Geography"

        console.clear()

        await settingsMenu()

    } else if (selectAction === "history") {

        data = triviaQuestions.filter((element) => element["topic"] === "history")

        gameModeSetting["topic"] = "History"

        console.clear()

        await settingsMenu()

    } else if (selectAction === "science") {

        data = triviaQuestions.filter((element) => element["topic"] === "science")

        gameModeSetting["topic"] = "Science"

        console.clear()

        await settingsMenu()

    }

}

///////////SETTINGS///////////


// Initializes Game
mainMenu()