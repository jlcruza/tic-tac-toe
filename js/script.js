function Player(name, mark, isCPU) {
    this.name = name;
    this.mark = mark;
    this.isCPU = isCPU;
    return { name, mark, isCPU };
}

const Gameboard = (function () {

    let blocks = document.getElementsByClassName("play-block");

    return blocks;

})();


const CoreLogic = (function () {

    // Private function attributes
    let _player1 = undefined;
    let _player2 = undefined;
    let _activePlayer = undefined;
    let _isOver = false;

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
            const name = (document.getElementById('P1Name').value != "") ? document.getElementById('P1Name').value : "Player1";
            const mark = "X";
            const isCPU = false;
            _player1 = Player(name, mark, isCPU);
        } else {
            const name = "CPU 1";
            const mark = "X";
            const isCPU = true;
            _player1 = Player(name, mark, isCPU);
        }
        console.log("Player 1 set: ", _player1);

        // Set Player 2
        if (document.getElementById('P2CheckBox').checked) {
            const name = (document.getElementById('P1Name').value != "") ? document.getElementById('P1Name').value : "Player2";
            const mark = "O";
            const isCPU = false;
            _player2 = Player(name, mark, isCPU);
        } else {
            const name = "CPU 2";
            const mark = "O";
            const isCPU = true;
            _player2 = Player(name, mark, isCPU);
        }
        console.log("Player 2 set: ", _player2);

        _activePlayer = _player1;
        document.getElementById("now-playing").innerText = "Player Turn: " + _activePlayer.name;
        hideModal();
    }

    let switchTurn = () => {
        if (_activePlayer.mark == "X") {
            _activePlayer = _player2;
        } else {
            _activePlayer = _player1;
        }

        console.log("Active player: ", _activePlayer);
        document.getElementById("now-playing").innerText = "Player Turn: " + _activePlayer.name;
    }

    let checkDiv = (div) => {

        console.log("checkDiv is running");
        if (div == undefined || _activePlayer == undefined) return;

        console.log("Selected DIV: ", div);

        if (div.target.innerText == "") {
            div.target.innerText = _activePlayer.mark;
            div.target.classList.add((div.target.innerText == "X") ? "x-mark" : "o-mark");
            switchTurn();
            return true;
        }
        return false;
    };


    let _blocks = Gameboard;
    for (let i = 0; i < _blocks.length; i++) {
        _blocks[i].classList.add("white-text");
        _blocks[i].addEventListener("click", checkDiv);
        console.log("Added event to: ", _blocks[i]);
    }

    let getBlocks = () => {
        return _blocks;
    }

    let moveCPU = function () {

        if (_activePlayer == undefined) return;

        console.log("CPU moving: ", _activePlayer)
        const index = Math.round(Math.random() * 9);
        _blocks[index].click();
    };


    let getActivePlayer = () => {
        return _activePlayer;
    }

    let isFull = () => {
        for (let i = 0; i < _blocks.length; i++) {
            if (_blocks[i].innerText == "") {
                return false;
            }
        }
        _isOver = true;
        return true;
    };

    let isWon = () => {
        return false;
    };



    return { showModal, readPlayers, switchTurn, checkDiv, getBlocks, getActivePlayer, moveCPU, isFull, isWon }

})();


const gameHandler = (function () {
    core = CoreLogic;

    // 1- Ask for Players
    window.onload = core.showModal();


    let startGame = () => {
        core.readPlayers;

        //TODO: Break checkDiv

        if(core.getActivePlayer.isCPU){
            core.moveCPU;
        }
    }

    // 2- Register those players
    let _playBtn = document.getElementById('PlayButton');
    _playBtn.addEventListener('click', startGame);

    



})();