
import chalk from 'chalk'
import { select, input } from '@inquirer/prompts'
import { triviaQuestions } from './triviaQuestions.js'
import { stats } from './stats.js'


//Global Variables to mimic my database
let data = triviaQuestions
let record = stats
const gameModeSetting = {

    mode: "Easy",
    time: 30000,
    topic: "All"

}

///////////MAIN MENU///////////

export async function mainMenu() {

    //Console clear is used to give the user a clean game space at all time
    console.clear()

    //This section is a summary of the games rules
    const timeLimit = gameModeSetting["time"] / 1000
    const numberQuestions = data.length

    console.log(`Mode: ${chalk.yellow(gameModeSetting["mode"])} Time Limit: ${chalk.yellow(timeLimit + " seconds")} \n Topics: ${chalk.yellow(gameModeSetting["topic"])} Total Questions: ${chalk.yellow(numberQuestions)}`)

    // first Selection, allowing users to navigate through the game interface, also the use of async javascript
    const selectAction = await select({

        message: "Trivia Mania: Main Menu",

        choices: [

            { name: "Play Game", value: "start" },
            { name: "Stats", value: "stats" },
            { name: "See Questions", value: "questions" },
            { name: "Settings", value: "settings" },
            { name: "Quit", value: "quit" }

        ],

        // use of loop to prevent future large lists or options from endlessly looping 
        loop: false
    })

    //Each selection leads the user to a unique menu
    if (selectAction === "start") { //play!

        console.clear()

        playGame()

    } else if (selectAction === "stats") { //view you progress

        console.clear()

        statMenu()

    } else if (selectAction === "questions") { // explore questions 

        console.clear()

        questionMenu()

    } else if (selectAction === "settings") { //customizes game

        console.clear()

        settingsMenu()


    } else if (selectAction === "quit") { // exits game

        console.clear()

        console.log("Thank you, goodbye!")

    }

}

///////////MAIN MENU///////////

///////////PLAY GAME///////////

export async function playGame() {

    console.clear()

    // a boolean to check if the game is in progress or not
    let endGame = false

    //function scope variable to keep track of users game results
    const roundRecord = {

        right: 0,
        wrong: 0

    }

    //a timer is set to execute the code ending the game if the user hasnt completed the game
    const gameTimer = setTimeout(() => {

        if (!endGame) {

            endGame = true

            console.log(`\n\n ⏰ TIME IS UP! ⏰ \n\n Round Over!\n\n Correct: ${chalk.green(roundRecord["right"])} Incorrect: ${chalk.red(roundRecord["wrong"])} \n\n Press Enter to return to main menu\n\n`)

        }

    }, gameModeSetting["time"])


    //use of loops to navigate through the question database
    for (const element of data) {

        if (endGame) break

        const answer = await input({

            message: element["question"]

        })

        if (endGame) {

            break

        }

        //here the game provides feedback for the user
        if (answer.toLowerCase() === element["answer"].toLowerCase()) {

            //keeping track of the users record in a global database
            record["right"] += 1

            //keeping track of the users record in a function scope database
            roundRecord["right"] += 1

            console.log(chalk.green("\n✅ CORRECT\n"))

        } else {

            //keeping track of the users record in a global database
            record["wrong"] += 1

            //keeping track of the users record in a function scope database
            roundRecord["wrong"] += 1

            console.log(chalk.red("\n❌ INCORRECT\n"))

        }
    }

    // endint the execution of the set timer
    clearTimeout(gameTimer)

    //keeping track of the users record in a global database
    record["gamesPlayed"] += 1

    console.log(`Completed! Correct: ${chalk.green(roundRecord["right"])} Incorrect: ${chalk.red(roundRecord["wrong"])} \n\n`)

    
    // if user completes the quiz it will guide them out with results
    if (!endGame) {

        await input({ message: `Press Enter to return to main menu` })

    }

    // ending the game in progress at the end if user completes quiz
    endGame = true

    // return to main menu
    await mainMenu()

}

///////////PLAY GAME///////////

///////////STATS///////////

export async function statMenu() {

    // showcasing global datbase of all games
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

    // use of array interation to get needed data
    let dataMap = data.map((element) => {

        return { name: element["question"], value: element["answer"] }

    })

    // printing all quistion available in the database allowing users to choose and see answers
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

        // shows answer
        console.log(selectAction)

        await questionMenu()

    }

}

///////////QUESTIONS///////////

///////////SETTINGS///////////

export async function settingsMenu() {

    // a sub menu for users to customize their games
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

    // users change the conditions of the game based on the selections
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

        // use of another array iteration to properly filter desired questions based on selection
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