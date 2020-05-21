//var newP = $("<p>");
//newP.text("Hello World");
//$(".test").append(newP);
//var newS = $("<p>");
//newS.text("Hello World");
//$(".test").append(newS);

var deckArray = [
  {
    image: 'assets/imgs/AC.svg',
    value: 11,
  },
  {
    image: 'assets/imgs/2C.svg',
    value: 2,
  },
  {
    image: 'assets/imgs/3C.svg',
    value: 3,
  },
  {
    image: 'assets/imgs/4C.svg',
    value: 4,
  },
  {
    image: 'assets/imgs/5C.svg',
    value: 5,
  },
  {
    image: 'assets/imgs/6C.svg',
    value: 6,
  },
  {
    image: 'assets/imgs/7C.svg',
    value: 7,
  },
  {
    image: 'assets/imgs/8C.svg',
    value: 8,
  },
  {
    image: 'assets/imgs/9C.svg',
    value: 9,
  },
  {
    image: 'assets/imgs/10C.svg',
    value: 10,
  },
  {
    image: 'assets/imgs/JC.svg',
    value: 10,
  },
  {
    image: 'assets/imgs/QC.svg',
    value: 10,
  },
  {
    image: 'assets/imgs/KC.svg',
    value: 10,
  },
  {
    image: 'assets/imgs/AD.svg',
    value: 11,
  },
  {
    image: 'assets/imgs/2D.svg',
    value: 2,
  },
  {
    image: 'assets/imgs/3D.svg',
    value: 3,
  },
  {
    image: 'assets/imgs/4D.svg',
    value: 4,
  },
  {
    image: 'assets/imgs/5D.svg',
    value: 5,
  },
  {
    image: 'assets/imgs/6D.svg',
    value: 6,
  },
  {
    image: 'assets/imgs/7D.svg',
    value: 7,
  },
  {
    image: 'assets/imgs/8D.svg',
    value: 8,
  },
  {
    image: 'assets/imgs/9D.svg',
    value: 9,
  },
  {
    image: 'assets/imgs/10D.svg',
    value: 10,
  },
  {
    image: 'assets/imgs/JD.svg',
    value: 10,
  },
  {
    image: 'assets/imgs/QD.svg',
    value: 10,
  },
  {
    image: 'assets/imgs/KD.svg',
    value: 10,
  },
  {
    image: 'assets/imgs/AH.svg',
    value: 11,
  },
  {
    image: 'assets/imgs/2H.svg',
    value: 2,
  },
  {
    image: 'assets/imgs/3H.svg',
    value: 3,
  },
  {
    image: 'assets/imgs/4H.svg',
    value: 4,
  },
  {
    image: 'assets/imgs/5H.svg',
    value: 5,
  },
  {
    image: 'assets/imgs/6H.svg',
    value: 6,
  },
  {
    image: 'assets/imgs/7H.svg',
    value: 7,
  },
  {
    image: 'assets/imgs/8H.svg',
    value: 8,
  },
  {
    image: 'assets/imgs/9H.svg',
    value: 9,
  },
  {
    image: 'assets/imgs/10H.svg',
    value: 10,
  },
  {
    image: 'assets/imgs/JH.svg',
    value: 10,
  },
  {
    image: 'assets/imgs/QH.svg',
    value: 10,
  },
  {
    image: 'assets/imgs/KH.svg',
    value: 10,
  },
  {
    image: 'assets/imgs/AS.svg',
    value: 11,
  },
  {
    image: 'assets/imgs/2S.svg',
    value: 2,
  },
  {
    image: 'assets/imgs/3S.svg',
    value: 3,
  },
  {
    image: 'assets/imgs/4S.svg',
    value: 4,
  },
  {
    image: 'assets/imgs/5S.svg',
    value: 5,
  },
  {
    image: 'assets/imgs/6S.svg',
    value: 6,
  },
  {
    image: 'assets/imgs/7S.svg',
    value: 7,
  },
  {
    image: 'assets/imgs/8S.svg',
    value: 8,
  },
  {
    image: 'assets/imgs/9S.svg',
    value: 9,
  },
  {
    image: 'assets/imgs/10S.svg',
    value: 10,
  },
  {
    image: 'assets/imgs/JS.svg',
    value: 10,
  },
  {
    image: 'assets/imgs/QS.svg',
    value: 10,
  },
  {
    image: 'assets/imgs/KS.svg',
    value: 10,
  },
];

//######## Functions #########

function NewGame() {
  if (gameOver) {
    ClearTable();
    deck = [...deckArray];
    gameOver = false;
    Deal(player, '.playerInit', 'up');
    Deal(dealer, '.dealerInit', 'up');
    Deal(player, '.playerInit', 'up');
    Deal(dealer, '.dealerInit', 'down');

    if (BlackJack(dealer) && BlackJack(player)) {
      FlipDealerCard();
      gameOver = true;
      Message('SPLIT');
    } else if (BlackJack(dealer)) {
      FlipDealerCard();
      gameOver = true;
      Message('DEALER GOT BLACKJACK!');
    } else if (BlackJack(player)) {
      FlipDealerCard();
      gameOver = true;
      Message('YOU GOT BLACKJACK!');
    }
    DisplayScore();
  }
}

function Deal(who, where, face) {
  var len = deck.length;
  var ind = Math.floor(Math.random() * len);
  var card = deck[ind];
  deck.splice(ind, 1);
  if (card.value === 11) who.aces++;
  if (face === 'down') {
    faceDownCard = card;
    var cardToDisplay = $("<img class = 'card'>");
    cardToDisplay.attr('src', 'assets/imgs/FD-blue.svg');
    $(where).append(cardToDisplay);
  } else {
    var cardToDisplay = $("<img class = 'card'>");
    cardToDisplay.attr('src', card.image);
    $(where).append(cardToDisplay);
  }
  who.score += card.value;
  if (who.score > 21 && who.aces > 0) {
    who.score -= 10;
    who.aces--;
  }
}

function HitMe() {
  if (!gameOver) {
    var card = Deal(player, '.player', 'up');
    DisplayScore();
    if (player.score > 21) {
      Bust();
    }
  }
}

function Stand() {
  if (!gameOver) {
    FlipDealerCard();
    gameOver = true;
    if (dealer.score < 17) {
      looper();
    } else {
      ender();
    }

    function looper() {
      setTimeout(function () {
        Deal(dealer, '.dealer', 'up');
        DisplayScore();
        if (dealer.score < 17) {
          looper();
        } else {
          ender();
        }
      }, 500);
    }

    function ender() {
      if (dealer.score > 21) {
        Message('DEALER BUSTS! YOU WIN');
      } else {
        DisplayWinner();
      }
    }
  }
}

function BlackJack(who) {
  if (who.score === 21) return true;
  else return false;
}

function Bust() {
  FlipDealerCard();
  gameOver = true;
  Message('PLAYER BUSTED');
}

function FlipDealerCard() {
  $('.dealerInit .card:last-child').remove();
  var cardToDisplay = $("<img class = 'card'>");
  cardToDisplay.attr('src', faceDownCard.image);
  $('.dealerInit').append(cardToDisplay);
  $('.dealerScore').css('color', '#ffffff');
}

function DisplayScore() {
  $('.dealerScore').text('SCORE: ' + dealer.score);
  $('.playerScore').text('SCORE: ' + player.score);
}

function DisplayWinner() {
  if (player.score > dealer.score) {
    Message('YOU WIN');
  } else if (player.score === dealer.score) {
    Message('PUSH');
  } else {
    Message('YOU LOSE');
  }
}

function ClearTable() {
  $('.dealerInit .card').remove();
  $('.playerInit .card').remove();
  $('.dealer .card').remove();
  $('.player .card').remove();
  $('.messageText').text('');
  $('.dealerScore').css('color', 'rgba(0,0,0,0)');
  $('.messageContainer').addClass('hidden');
  dealer.score = 0;
  player.score = 0;
  dealer.aces = 0;
  player.aces = 0;
}

function Message(str) {
  setTimeout(() => {
    $('.messageText').html(str);
    $('.messageContainer').removeClass('hidden');
  }, 500);
}

//##############################################

var deck = [];
var gameOver = true;
var dealer = {
  name: 'dealer',
  score: 0,
  aces: 0,
};
var player = {
  name: 'player',
  score: 0,
  aces: 0,
};
var faceDownCard = {};
NewGame();
