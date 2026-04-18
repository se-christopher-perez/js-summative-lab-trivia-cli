
import chalk from 'chalk';
import { select, input, Separator } from '@inquirer/prompts';
import { triviaQuestions } from './triviaQuestions.js';
import { stats } from './stats.js';

let data = triviaQuestions
let record = stats
const gameMode = {

    mode: "Easy",
    time: 3000

}

///////////MAIN MENU///////////

export async function mainMenu() {

    console.clear()

    const selectAction = await select({

        message: "Trivia: Main Menu",

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

    };

    const gameTimer = setTimeout(() => {

        if (!endGame) {

            endGame = true

            console.log("\n\n ⏰ TIME IS UP! ⏰ Press Enter to return to menu.")

        }
    }, gameMode["time"]);

    for (const element of data) {

        if (endGame) break

        const answer = await input({

            message: element["question"]

        });

        if (endGame) {

            console.clear()

            break

        }

        if (answer.toLowerCase() === element["answer"].toLowerCase()) {

            record["right"] += 1

            roundRecord["right"] += 1

            console.log(chalk.green("\n\n ✅ CORRECT"))

        } else {

            record["wrong"] += 1

            roundRecord["wrong"] += 1

            console.log(chalk.red("\n\n ❌ WRONG"))

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

    console.log(`Total Games Played: ${record["gamesPlayed"]}`)

    console.log(`Right Answers: ${record["right"]}`)

    console.log(`Wrong Answers: ${record["wrong"]}`)

    const selectAction = await select({

        message: "Your Stats",

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

    });

    if (selectAction === "back") {

        console.clear()

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

        console.clear()

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

        console.clear()

        await settingsMenu()

    } else if (selectAction === "easy") {

        gameMode["mode"] === "Easy"
        gameMode["time"] === 30000

        console.clear()

        await settingsMenu()

    } else if (selectAction === "medium") {

        gameMode["mode"] === "Medium"
        gameMode["time"] === 20000

        console.clear()

        await settingsMenu()

    } else if (selectAction === "hard") {

        gameMode["mode"] === "Hard"
        gameMode["time"] === 10000

        console.clear()

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

        console.clear()

        await settingsMenu()

    } else if (selectAction === "all") {

        data = triviaQuestions

        console.clear()

        await settingsMenu()

    } else if (selectAction === "movies/television") {

        data = triviaQuestions.filter((element) => element["topic"] === "movies/television")

        console.clear()

        await settingsMenu()

    } else if (selectAction === "geography") {

        data = triviaQuestions.filter((element) => element["topic"] === "geography")

        console.clear()

        await settingsMenu()

    } else if (selectAction === "history") {

        data = triviaQuestions.filter((element) => element["topic"] === "history")

        console.clear()

        await settingsMenu()

    } else if (selectAction === "science") {

        data = triviaQuestions.filter((element) => element["topic"] === "science")

        console.clear()

        await settingsMenu()

    }

}

///////////SETTINGS///////////


// Initializes Game
mainMenu()