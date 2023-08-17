let score = JSON.parse(localStorage.getItem('score'));

            if(score === null)
            {
                score = {
                    wins: 0,
                    losses: 0,
                    tie: 0,
                    count: 0
                };
            }

            updateScoreElement();

            let isAutoPlay = false;
            let intervalID;

            function autoPlay(){
                if(!isAutoPlay)
                {
                    intervalID = setInterval(function() {
                        playerMove = pickComputerMove();
                        playGame(playerMove);
                    }, 1000);

                    isAutoPlay = true
                }
               else{
                clearInterval(intervalID);
                isAutoPlay = false;
               }
            }

            document.querySelector('.js-rock-button')
                .addEventListener('click', () => {
                    playGame('rock');
                })

            document.querySelector('.js-paper-button')
                .addEventListener('click', () => {
                    playGame('paper');
                })

            document.querySelector('.js-scissors-button')
                .addEventListener('click', () => {
                    playGame('scissors');
                })

            document.querySelector('.js-reset-score-button')
                .addEventListener('click', () => {
                    score.wins = 0;
                    score.losses = 0;
                    score.tie = 0;
                    score.count = 0;
                    localStorage.removeItem('score');
                    updateScoreElement();
                })
            
            document.querySelector('.js-auto-play-button')
                .addEventListener('click', () => {
                    autoPlay();
                })

            document.body.addEventListener('keydown', (event) => {
                if(event.key === 'r'){
                    playGame('rock');
                }
                else if(event.key === 'p')
                {
                    playGame('paper');
                }
                else if(event.key === 's')
                {
                    playGame('scissors');
                }

            })
            
            function playGame(playerMove)
            {
                const computerMove = pickComputerMove();
                let result = '';
                if(playerMove === 'scissors')
                {
                    if(computerMove === 'rock')
                    {
                        result = 'You lose.';
                        score.losses++;
                        score.count++;
                    }
                    else if(computerMove === 'paper')
                    {
                        result = 'You won.';
                        score.wins++;
                        score.count++;
                    }
                    else
                    {
                        result = 'Tie.';
                        score.tie++;
                        score.count++;
                    }
                }
                else if(playerMove === 'paper')
                {
                    if(computerMove === 'rock')
                    {
                        result = 'You won.';
                        score.wins++;
                        score.count++;
                    }
                    else if(computerMove === 'paper')
                    {
                        result = 'Tie.';
                        score.tie++;
                        score.count++;
                    }
                    else
                    {
                        result = 'You lose.';
                        score.losses++;
                        score.count++;
                    }
                }
                else
                {
                    if(computerMove === 'rock')
                    {
                        result = 'Tie.';
                        score.tie++;
                        score.count++;
                    }
                    else if(computerMove === 'paper')
                    {
                        result = 'You lose.';
                        score.losses++;
                        score.count++;
                    }
                    else
                    {
                        result = 'You won.';
                        score.wins++;
                        score.count++;
                    }
                }

                localStorage.setItem('score',JSON.stringify(score)); 

                updateScoreElement();

                document.querySelector('.js-result').innerHTML = result;

                document.querySelector('.js-moves').innerHTML = `You 
            <img src="images/${playerMove}-emoji.png" class="move-icon">
            <img src="images/${computerMove}-emoji.png" class="move-icon">Computer`;
                
            }

            function updateScoreElement(){
                document.querySelector('.js-score')
                    .innerHTML = `Wins: ${score.wins} Losses: ${score.losses} Tie: ${score.tie} Count: ${score.count}`;
            }

            function pickComputerMove()
            {
                let computerMove = '';
                const randomNumber = Math.random()
                if(randomNumber >= 0 && randomNumber < 1/3)
                {
                    computerMove = 'rock';
                }
                else if(randomNumber >= 1/3 && randomNumber < 2/3)
                {
                    computerMove = 'paper';
                }
                else
                {
                    computerMove = 'scissors';
                }

                return computerMove;
            }