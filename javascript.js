/**
 * ターン数
 * @type {number}
 */
let turn = 0;

/**
 * ゲーム実行中フラグ
 * @type {boolean}
 */
let isRun = false;

/**
 * マスのIDリスト
 * @type {string[][]}
 */
let IDs = [
    ['b1', 'b2', 'b3'],
    ['b4', 'b5', 'b6'],
    ['b7', 'b8', 'b9'],
];

/**
 * 先手のマーク
 * @type {string}
 */
let markFirst = 'o';

/**
 * 後手のマーク
 * @type {string}
 */
let markSecond = 'x';

/**
 * IDから要素を取得する
 * @param id
 * @returns {HTMLElement}
 */
function $(id) {
    return document.getElementById(id);
}

/**
 * 画面読み込み時の処理
 * @type {init}
 */
window.onload = function () {
    // イベントハンドラの登録
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            $(IDs[row][col]).onclick = mark;
        }
    }
    $('reset').onclick = clearBoard;

    clearBoard();
}

/**
 * マスを選択する
 * @param evt
 */
function mark(evt) {
    if (!isRun) {
        alert('ゲームが開始されていません。もう一度遊ぶボタンを押してください。');
        return;
    }

    let id = evt.target.id;
    if ($(id).value !== '') {
        alert('既に登録されています！');
        return;
    }

    if (isFirstMove()) {
        $(id).value = markFirst;
    } else {
        $(id).value = markSecond;
    }
    turn++;

    // ターンを表示
    displayMessage();

    if (5 <= turn) {
        judge();
    }
}

/**
 * 先手ユーザかどうかを判定
 * @returns {number}
 */
function isFirstMove() {
    return !(turn % 2);
}

/**
 * 後手ユーザかどうかを判定
 * @returns {boolean}
 */
function isSecondMove() {
    return !isFirstMove();
}


// 勝敗判定メソッド
function judge() {

    // 横の判定
    for (let row = 0; row < 3; row++) {
        let isWin = true;
        let judgeMark = $(IDs[row][0]).value;
        if (judgeMark == '') {
            continue;
        }
        for (let col = 0; col < 3; col++) {
            let value = $(IDs[row][col]).value;
            if (value == '') {
                isWin = false;
                break;
            }
            if (judgeMark != value) {
                isWin = false;
                break;
            }
        }
        if (isWin) {
            displayResult(judgeMark + 'の勝ち！');
            return;
        }
    }

    // 縦の判定
    for (let col = 0; col < 3; col++) {
        let isWin = true;
        let judgeMark = $(IDs[0][col]).value;
        if (judgeMark == '') {
            continue;
        }
        for (let row = 0; row < 3; row++) {
            let value = $(IDs[row][col]).value;
            if (value == '') {
                isWin = false;
                break;
            }
            if (judgeMark != value) {
                isWin = false;
                break;
            }
        }
        if (isWin) {
            displayResult(judgeMark + 'の勝ち！');
            return;
        }
    }

    // 斜めの判定
    let judgeMark = $('b5').value;
    if (judgeMark != '') {
        if (
            (judgeMark == $('b1').value && judgeMark == $('b9').value)
            && ($('b1').value != '' && $('b9').value != '')
        ) {
            displayResult($('b1').value + 'の勝ち！');
            return;
        }

        if (
            (judgeMark == $('b3').value && judgeMark == $('b7').value)
            && ($('b3').value != '' && $('b7').value != '')
        ) {
            displayResult($('b3').value + 'の勝ち！');
            return;
        }
    }

    // 引き分け
    if (turn == 9) {
        displayResult('引き分け！');
    }
}

/**
 * 結果の表示
 * @param res
 */
function displayResult(res) {
    $('result-message').innerHTML = res;
    isRun = false;
    displayMessage();
    $('reset').style.display = '';
}

/**
 * ターン表示
 */
function displayMessage() {
    if (!isRun) {
        $('display-message').innerHTML = '';
        return;
    }
    if (turn == 9) {
        $('display-message').innerHTML = '';
        return;
    }
    if (isFirstMove()) {
        $('display-message').innerHTML = markFirst + 'の番!';
    } else {
        $('display-message').innerHTML = markSecond + 'の番!';
    }
}

/**
 * 盤面の初期化
 */
function clearBoard() {
    // ターンの初期化
    turn = 0;

    // マスの初期化
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            $(IDs[row][col]).value = '';
        }
    }

    // 結果表示の初期化
    $('result-message').innerHTML = '';

    // 実行中に変更
    if (!isRun) {
        isRun = true;
    }

    $('reset').style.display = 'none';

    // ターンを表示
    displayMessage();
}