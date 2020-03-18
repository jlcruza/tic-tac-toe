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


(function () {

    // Private function attributes
    let _player1 = undefined;
    let _player2 = undefined;
    let _activePlayer = undefined;
    let _isOver = false;

    // All function's names
    let showModal;
    let hideModal;
    let readPlayers;
    let switchTurn;
    let repeatTurn;
    let checkDiv;
    let moveCPU;
    let isFull;
    let isWon;

    // 1 - Ask for Players
    showModal = () => {
        $('#exampleModalCenter').modal('show');
    }

    hideModal = () => {
        $('#exampleModalCenter').modal('hide');
    }

    // 2 - Create Players
    readPlayers = () => {

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

        if (_activePlayer.isCPU) {
            moveCPU();
        }
    }

    switchTurn = () => {

        if (_activePlayer == undefined) return;

        if (_activePlayer.mark == "X") {
            _activePlayer = _player2;
        } else {
            _activePlayer = _player1;
        }

        if (_activePlayer.isCPU) {
            moveCPU();
        }

        document.getElementById("now-playing").innerText = "Player Turn: " + _activePlayer.name;
    }

    repeatTurn = () => {

        if (_activePlayer == undefined) return;

        if (_activePlayer.isCPU) {
            moveCPU();
        }
    }

    checkDiv = (div) => {

        console.log("Called by: ", _activePlayer.name)
        if (_activePlayer == undefined) return;

        console.log(_activePlayer.name + " selected DIV content:", div.target.innerText);

        if (div.target.innerText == "") {
            div.target.innerText = _activePlayer.mark;
            div.target.classList.add((div.target.innerText == "X") ? "x-mark" : "o-mark");
            if (isWon()) {
                //End Game
                return;
            } else if (isFull()) {
                //End Game
                return;
            }
            switchTurn();
            return true;
        }

        console.log("Already selected!");
        repeatTurn()
        return false;
    };


    let _blocks = Gameboard;
    for (let i = 0; i < _blocks.length; i++) {
        _blocks[i].classList.add("white-text");
        _blocks[i].addEventListener("click", checkDiv);
    }

    moveCPU = function () {

        if (_activePlayer == undefined || isFull() || _isOver) return;

        const index = Math.ceil(Math.random() * 9) - 1;
        console.log(_activePlayer.name + " choice: ", index + 1)
        if (_blocks[index].innerText == "") {
            _blocks[index].click();
        } else {
            moveCPU();
        }

    };

    isFull = () => {
        for (let i = 0; i < _blocks.length; i++) {
            if (_blocks[i].innerText == "") {
                return false;
            }
        }
        _isOver = true;
        showVictoryModal("Tie. No more possible moves");
        return true;
    };

    showVictoryModal = (msg) => {
        document.getElementById("victory-modal").innerText = msg;
        $('#exampleModalCenter2').modal('show');
    }

    isWon = () => {

        if (_blocks[0].innerText == _blocks[1].innerText &&
            _blocks[1].innerText == _blocks[2].innerText &&
            _blocks[0].innerText != "") {
            // 1 - First Row
            _isOver = true;
            _blocks[0].classList.add("victory-divs");
            _blocks[1].classList.add("victory-divs");
            _blocks[2].classList.add("victory-divs");

        } if (_blocks[3].innerText == _blocks[4].innerText &&
            _blocks[4].innerText == _blocks[5].innerText &&
            _blocks[3].innerText != "") {
            // 2 - Second Row
            _isOver = true;
            _blocks[3].classList.add("victory-divs");
            _blocks[4].classList.add("victory-divs");
            _blocks[5].classList.add("victory-divs");

        } if (_blocks[6].innerText == _blocks[7].innerText &&
            _blocks[7].innerText == _blocks[8].innerText &&
            _blocks[6].innerText != "") {
            // 3 - Third Row
            _isOver = true;
            _blocks[6].classList.add("victory-divs");
            _blocks[7].classList.add("victory-divs");
            _blocks[8].classList.add("victory-divs");

        } if (_blocks[0].innerText == _blocks[3].innerText &&
            _blocks[3].innerText == _blocks[6].innerText &&
            _blocks[0].innerText != "") {
            // 4 - First Column
            _isOver = true;
            _blocks[0].classList.add("victory-divs");
            _blocks[3].classList.add("victory-divs");
            _blocks[6].classList.add("victory-divs");

        } if (_blocks[1].innerText == _blocks[4].innerText &&
            _blocks[4].innerText == _blocks[7].innerText &&
            _blocks[1].innerText != "") {
            // 5 - Second Column
            _isOver = true;
            _blocks[1].classList.add("victory-divs");
            _blocks[4].classList.add("victory-divs");
            _blocks[7].classList.add("victory-divs");

        } if (_blocks[2].innerText == _blocks[5].innerText &&
            _blocks[5].innerText == _blocks[8].innerText &&
            _blocks[2].innerText != "") {
            // 6 - Third Column
            _isOver = true;
            _blocks[2].classList.add("victory-divs");
            _blocks[5].classList.add("victory-divs");
            _blocks[8].classList.add("victory-divs");

        } if (_blocks[0].innerText == _blocks[4].innerText &&
            _blocks[4].innerText == _blocks[8].innerText &&
            _blocks[0].innerText != "") {
            // 7 - Backslash [\]
            _isOver = true;
            _blocks[0].classList.add("victory-divs");
            _blocks[4].classList.add("victory-divs");
            _blocks[8].classList.add("victory-divs");

        } if (_blocks[2].innerText == _blocks[4].innerText &&
            _blocks[4].innerText == _blocks[6].innerText &&
            _blocks[2].innerText != "") {
            // 8 - Forward Slash [/]
            _isOver = true;
            _blocks[2].classList.add("victory-divs");
            _blocks[4].classList.add("victory-divs");
            _blocks[6].classList.add("victory-divs");

        }

        if (_isOver) {
            showVictoryModal(_activePlayer.name + " has WON!");
        }

        return _isOver;
    };

    let resetGame = () => {

        const classes = ["x-mark", "o-mark", "victory-divs"];

        for (let i = 0; i < _blocks.length; i++) {
            _blocks[i].classList.remove(classes[0]);
            _blocks[i].classList.remove(classes[1]);
            _blocks[i].classList.remove(classes[2]);
            _blocks[i].innerText = "";
        }

        _isOver = false;
        showModal();
    }

    window.onload = showModal();

    let _playBtn = document.getElementById('PlayButton');
    _playBtn.addEventListener('click', readPlayers);

    let _resetBtn = document.getElementById('resetButton');
    _resetBtn.addEventListener('click', resetGame);

})();