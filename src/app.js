//DOM Content Loaded Event listener
document.addEventListener('DOMContentLoaded', () => {

//create card objects - repeats twice because we want to create pairs
//eg: user finds 2 fries = +1 score
  const cardArray = [
    {
      name: 'fries',
      img: 'src/images/fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'src/images/cheeseburger.png'
    },
    {
      name: 'ice-cream',
      img: 'src/images/ice-cream.png'
    },
    {
      name: 'pizza',
      img: 'src/images/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'src/images/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'src/images/hotdog.png'
    },
    {
      name: 'fries',
      img: 'src/images/fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'src/images/cheeseburger.png'
    },
    {
      name: 'ice-cream',
      img: 'src/images/ice-cream.png'
    },
    {
      name: 'pizza',
      img: 'src/images/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'src/images/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'src/images/hotdog.png'
    }
  ]

  //sort array and randomly generate order of cards.
  cardArray.sort(() => 0.5 - Math.random())
  console.log(cardArray);

  //create GRID
  const grid = document.querySelector('.grid')
  const resultDisplay = document.querySelector('#result')
  //create empty array => stores cardsChosen, stores data-id, matching pairs
  let cardsChosen = []
  let cardsChosenIds = []
  let cardsWon = []

  // creates function createBoard => generates cards into grid (blank value)
  // looks for addEventListener(click) then will flipCard.
  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement('img')
      card.setAttribute('src', 'src/images/blank.png')
      card.setAttribute('data-id', i)
      card.addEventListener('click', flipCard)
      grid.appendChild(card)
    }
  }

  // flips card over revealing img - then checksForMatch
  function flipCard() {
    let cardId = this.getAttribute('data-id')
    console.log(cardArray[cardId].name);
    //cardsChosen get pushed into array with name of card image values
    cardsChosen.push(cardArray[cardId].name)
    //cardsChosenIds get pushed into array with data-id values
    cardsChosenIds.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500)
    }
  }

  // checkForMatch => compares 2 cardsChosen and determines true or false
  function checkForMatch() {
    const cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenIds[0]
    const optionTwoId = cardsChosenIds[1]
    //checks if the same card has been clicked twice => prevents cheating system
    if (optionOneId == optionTwoId) {
      alert('You have clicked the same image!')
      cards[optionOneId].setAttribute('src', 'src/images/blank.png')
      cards[optionTwoId].setAttribute('src', 'src/images/blank.png')
    } else if (cardsChosen[0] == cardsChosen[1]) {
      //if 2 cards match => -alert match(found pair)- and set card as white.png
      // also removes addEventListener, so that cards cant be picked again.
      alert('You have found a match!')
      cards[optionOneId].setAttribute('src', 'src/images/white.png')
      cards[optionTwoId].setAttribute('src', 'src/images/white.png')
      cards[optionOneId].removeEventListener('click', flipCard)
      cards[optionTwoId].removeEventListener('click', flipCard)
      cardsWon.push(cardsChosen)
    } else {
      //else => if 2 cards don't match -alert message- and flips cards back to blank.png
      cards[optionOneId].setAttribute('src', 'src/images/blank.png')
      cards[optionTwoId].setAttribute('src', 'src/images/blank.png')
      alert('Sorry! Try again...')
    }
    //If 2 cards that have a pair or dont match... => empty values in arrays
    //eg: cardsChosen['fries', 'fries'] => cardsChosen = []
    cardsChosen = []
    cardsChosenIds = []

    //displays results of matching pairs from cardsWon.length array
    //and adds +1 to score.
    //if all pairs are found => CONGRATULATIONS message is displayed
    resultDisplay.textContent = cardsWon.length
    if (cardsWon.length === cardArray.length /2) {
      resultDisplay.textContent = 'Congratulations! You have won!'
    }
  }

  createBoard()
})
