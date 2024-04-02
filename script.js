var gb = (function() {
    // set gameboard
    var gameboard = [['','',''],
                     ['','',''],
                     ['','','']];
    var turn = 'x'
    var marker;
    const WINNINGCOMBINATIONS = [
        [[0,0],[0,1],[0,2]],
        [[1,0],[1,1],[1,2]],
        [[2,0],[2,1],[2,2]],
        [[0,0],[1,0],[2,0]],
        [[0,1],[1,1],[2,1]],
        [[0,2],[1,2],[2,2]],
        [[0,0],[1,1],[2,2]],
        [[0,2],[1,1],[2,0]]
    ]
    // set marker

    function addMarker(i,j) {

        marker = (turn === 'x') ?  'x' : 'o' 
        if (gameboard[i][j] === '') {
            gameboard[i][j] = marker;
            
            if (checkWin(marker)) {
                return(endGame('Win', marker));
            } 
            else if (checkDraw()){
                return(endGame('Draw', marker));
            }
            else {
                turn = (turn === 'x') ?  'o' :  'x';
            }
        } else {
            console.log('not allowed, spot is already marked')
        }
        
        
        function checkWin(marker) {
            function checkCombo(indicies, marker) {
                return indicies.every(index => gameboard[index[0]][index[1]] === marker);
            }
            return WINNINGCOMBINATIONS.some(combo => checkCombo(combo, marker));
        }
        function checkDraw() {
            return gameboard.every(row => row.every(item => item === 'x' || item === 'o')) 
        }

        
        function endGame(state, marker){
            return {state, marker}
        }
    }
    function getTurn () {
        return marker;
    }
    function newGame() {
        gameboard.forEach(row => row.fill(''))
        turn = 'x';


    }
    return {addMarker, getTurn, newGame, gameboard}
})();

var interface = (function (){
    var cells = document.querySelectorAll('[data-cell]');
    var board = document.querySelector('#board')
    var btn = document.querySelector('#newGame')
    var btn2 = document.querySelector('#newGame2')
    var modal = document.querySelector('#modal')
    var message = document.querySelector('.message h1')
    function newGame() {
        gb.newGame();
        cells.forEach(item => {
            item.classList.remove('x');
            item.classList.remove('o');
            board.classList.remove('o','x');
            board.classList.add('x');
            modal.classList.remove('visible');
            modal.classList.add('hidden')
        })
    }

    
    if (!document.querySelector('#modal').classList.contains('visible')) {
        cells.forEach(function(item, index){
            item.addEventListener('click', function(event){
                var i = Math.floor(index / 3);
                var j = index % 3;
                result = gb.addMarker(i,j);
                if (gb.getTurn() === 'x') {
    
                    item.classList.add('x');
                    board.classList.remove('x');
                    board.classList.add('o');
    
                } else {
    
                    item.classList.add('o');
                    board.classList.remove('o');
                    board.classList.add('x');
                }
                
                if (typeof result === 'object' && result.state === 'Win') {
                    modal.classList.remove('hidden');
                    modal.classList.add('visible')
                    message.innerText = `${result.marker.toUpperCase()}'s Win`
                } else if (typeof result === 'object' && result.state === 'Draw'){
                    modal.classList.remove('hidden');
                    modal.classList.add('visible')
                    message.innerText = 'Draw'
                }
                
                console.log(result);
            })
        })
    }

    btn.addEventListener('click', newGame);
    btn2.addEventListener('click', newGame);
    
})();