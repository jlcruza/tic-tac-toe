function Player(name, mark, isCPU, isActive) {
    this.name = name;
    this.mark = mark;
    this.isCPU = isCPU;
    this.isActive = isActive
    return { name, mark, isCPU, isActive };
}

const Gameboard = (function () {

    const blocks = document.getElementsByClassName("play-block");

    return blocks;

})();


const CoreLogic = (function () {

    // Private function attributes
    let _player1 = undefined;
    let _player2 = undefined;
    let _activePlayer = undefined;

    // 1 - Ask for Players
    let showModal = () => {
        $('#exampleModalCenter').modal('show');
    }

    let hideModal = () => {
        $('#exampleModalCenter').modal('hide');
    }

    // 2 - Create Players
    let readPlayers = () => {

        // Set Player 1
        if (document.getElementById('P1CheckBox').checked) {
            const name = document.getElementById('P1Name').value;
            const mark = "X";
            const isCPU = false;
            const isActive = true;
            _player1 = Player(name, mark, isCPU, isActive);
        } else {
            const name = "CPU 1";
            const mark = "X";
            const isCPU = true;
            const isActive = true;
            _player1 = Player(name, mark, isCPU, isActive);
        }
        console.log("Player 1 set: ", _player1);

        // Set Player 2
        if (document.getElementById('P2CheckBox').checked) {
            const name = document.getElementById('P2Name').value;
            const mark = "O";
            const isCPU = false;
            const isActive = false;
            _player2 = Player(name, mark, isCPU, isActive);
        } else {
            const name = "CPU 2";
            const mark = "O";
            const isCPU = true;
            const isActive = false;
            _player2 = Player(name, mark, isCPU, isActive);
        }
        console.log("Player 2 set: ", _player2);

        _activePlayer = _player1;
        hideModal();
    }

    let switchTurn = () => {
        if(_activePlayer.mark == "X"){
            _activePlayer = _player2;
        } else {
            _activePlayer = _player1;
        }

        console.log("Active player: ", _activePlayer);
    }

    let checkDiv = (div) => {
        console.log("Selected DIV: ", div)
        if(div.target.innerText == ""){
            div.target.innerText = _activePlayer.mark;
            switchTurn();
            return true;
        } 
        
        return false;
    }

    // Preparations 
    let _playBtn = document.getElementById('PlayButton');
    _playBtn.addEventListener('click', readPlayers);

    

    let _blocks = Gameboard;
    for(let i = 0; i<_blocks.length; i++){
        _blocks[i].addEventListener('click', checkDiv)
    }

    // Return Public
    return { showModal, hideModal };
})();


// Game Main
let play = CoreLogic;
play.showModal();