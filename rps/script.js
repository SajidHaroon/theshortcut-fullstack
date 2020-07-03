const selectionButtons = document.querySelectorAll('[data-selection]')
const finalColumn = document.querySelector('[data-final-column]')
const computerScorespan = document.querySelector('[data-computer-score]')
const yourScorespan = document.querySelector('[data-your-score]')
const SELECTIONS = [
    {
        name: 'rock',
        emoji: '✊',
        beats:'scissors'
    },
    {
        name: 'paper',
        emoji: '✋',
        beats:'rock'
    },
    {
        name: 'scissors',
        emoji: '🤞',
        beats:'paper'
    }
]

selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', e => {
        const selectionName = selectionButton.dataset.selection
        const selection = SELECTIONS.find(selection => selection.name === selectionName)
        // console.log(selection.name) // .beats
        makeSelection(selection) 
    })
})

function makeSelection(selection){
    const computerSelection = randomSelection()
    const yourWinner = isWinner(selection, computerSelection)
    const computerWinner = isWinner(computerSelection, selection)
    //console.log(selection)
    console.log(computerSelection)

    addSelectionResult(computerSelection, computerWinner) // Adding computer first is just to putting computer's data first
    addSelectionResult(selection, yourWinner)             // and then player's since bcuz of grid the former is pushed to the end one 
                                                         // one player's data appears so making data in each one's column nicely
    if (yourWinner) incrementScore(yourScorespan)
    if (computerWinner) incrementScore(computerScorespan)
}

function incrementScore(scorespan){
    scorespan.innerText = parseInt(scorespan.innerText) + 1 // incrementing scores
}

function addSelectionResult(selection, Winner){
    const div = document.createElement('div')
    div.innerText = selection.emoji
    div.classList.add('result-selection')
    if (Winner) div.classList.add('winner')
    finalColumn.after(div)
}

function isWinner(selection, opponnentSelection){
    return selection.beats === opponnentSelection.name
}

function randomSelection(){
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length)
    return SELECTIONS[randomIndex]
}