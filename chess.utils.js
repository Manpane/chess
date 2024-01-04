function isUpperCase(str) {
  return str === str.toUpperCase();
}

function convertPositionToIndex(position) {
  return [
    parseInt(position.substring(1)) - 1,
    position.substring(0, 1).charCodeAt(0) - 97,
  ];
}

function copyBoard(boardToCopy) {
  let newBoard = [];
  for (let row of boardToCopy) {
    let currentRowToAdd = [];
    for (let value of row) {
      currentRowToAdd.push(value.toString());
    }
    newBoard.push(currentRowToAdd);
  }
  return newBoard;
}

function validatedPossibleMoves(currentBoard, possibleMoves, whiteTurn) {
  let possiblePositions = [];
  for (let i = 0; i < possibleMoves.length; i++) {
    let [currentRow, currentColumn] = possibleMoves[i];
    if (
      currentRow >= 0 &&
      currentRow < 8 &&
      currentColumn >= 0 &&
      currentColumn < 8
    ) {
      if (
        currentBoard[currentRow][currentColumn] === " " ||
        isUpperCase(currentBoard[currentRow][currentColumn]) !== whiteTurn
      ) {
        possiblePositions.push([currentRow, currentColumn]);
      }
    }
  }
  return possiblePositions;
}

function possibleKnightMoves(currentBoard, currentPosition, whiteTurn) {
  let [row, col] = currentPosition;
  let possibleMoves = [
    [row + 2, col + 1],
    [row + 2, col - 1],
    [row - 2, col + 1],
    [row - 2, col - 1],
    [row + 1, col + 2],
    [row + 1, col - 2],
    [row - 1, col + 2],
    [row - 1, col - 2],
  ];
  return validatedPossibleMoves(currentBoard, possibleMoves, whiteTurn);
}

function possibleRookMoves(currentBoard, currentPosition, whiteTurn) {
  let [row, col] = currentPosition;
  let possibleMoves = [];
  for (let i = row + 1; i < row + 8; i++) {
    if (
      validatedPossibleMoves(currentBoard, [[i, col]], whiteTurn).length === 0
    ) {
      break;
    }
    possibleMoves.push([i, col]);
    if (currentBoard[i][col] !== " ") {
      break;
    }
  }
  for (let i = row - 1; i > row - 8; i--) {
    if (
      validatedPossibleMoves(currentBoard, [[i, col]], whiteTurn).length === 0
    ) {
      break;
    }
    possibleMoves.push([i, col]);
    if (currentBoard[i][col] !== " ") {
      break;
    }
  }
  for (let i = col + 1; i < col + 8; i++) {
    if (
      validatedPossibleMoves(currentBoard, [[row, i]], whiteTurn).length === 0
    ) {
      break;
    }
    possibleMoves.push([row, i]);
    if (currentBoard[row][i] !== " ") {
      break;
    }
  }
  for (let i = col - 1; i > col - 8; i--) {
    if (
      validatedPossibleMoves(currentBoard, [[row, i]], whiteTurn).length === 0
    ) {
      break;
    }
    possibleMoves.push([row, i]);
    if (currentBoard[row][i] !== " ") {
      break;
    }
  }
  return possibleMoves;
}

function possibleBishopMoves(currentBoard, currentPosition, whiteTurn) {
  let [row, col] = currentPosition;
  let possibleMoves = [];
  for (let i = row + 1, j = col + 1; i < row + 8, j < col + 8; i++, j++) {
    if (
      validatedPossibleMoves(currentBoard, [[i, j]], whiteTurn).length === 0
    ) {
      break;
    }
    possibleMoves.push([i, j]);
    if (currentBoard[i][j] !== " ") {
      break;
    }
  }
  for (let i = row - 1, j = col - 1; i > row - 8, j > col - 8; i--, j--) {
    if (
      validatedPossibleMoves(currentBoard, [[i, j]], whiteTurn).length === 0
    ) {
      break;
    }
    possibleMoves.push([i, j]);
    if (currentBoard[i][j] !== " ") {
      break;
    }
  }
  for (let i = row - 1, j = col + 1; i > row - 8, j < col + 8; i--, j++) {
    if (
      validatedPossibleMoves(currentBoard, [[i, j]], whiteTurn).length === 0
    ) {
      break;
    }
    possibleMoves.push([i, j]);
    if (currentBoard[i][j] !== " ") {
      break;
    }
  }
  for (let i = row + 1, j = col - 1; i < row + 8, j > col - 8; i++, j--) {
    if (
      validatedPossibleMoves(currentBoard, [[i, j]], whiteTurn).length === 0
    ) {
      break;
    }
    possibleMoves.push([i, j]);
    if (currentBoard[i][j] !== " ") {
      break;
    }
  }
  return possibleMoves;
}

function possibleQueenMoves(currentBoard, currentPosition, whiteTurn) {
  return [
    ...possibleRookMoves(currentBoard, currentPosition, whiteTurn),
    ...possibleBishopMoves(currentBoard, currentPosition, whiteTurn),
  ];
}

function possibleKingMoves(currentBoard, currentPosition, whiteTurn) {
  const [row, col] = currentPosition;
  let possibleMoves = [
    [row - 1, col - 1],
    [row + 1, col + 1],
    [row - 1, col + 1],
    [row + 1, col - 1],
    [row - 1, col],
    [row, col - 1],
    [row + 1, col],
    [row, col + 1],
  ];
  let validatedMoves = validatedPossibleMoves(
    currentBoard,
    possibleMoves,
    whiteTurn
  );
  let nonCheckMoves = [];
  // console.log("getPossibleKingMoves function, currentBoard before:\n",currentBoard)
  for (let move of validatedMoves) {
    let tempBoard = copyBoard(currentBoard);
    tempBoard[row][col] = " ";
    tempBoard[move[0]][move[1]] = whiteTurn ? "K" : "k";
    if (!isChecked(tempBoard, whiteTurn)) {
      nonCheckMoves.push(move);
    }
  }
  // console.log("getPossibleKingMoves function, currentBoard after:\n",currentBoard)

  return nonCheckMoves;
}

function possiblePawnMoves(currentBoard, currentPosition, whiteTurn) {
  const [row, col] = currentPosition;
  let possibleMoves = [];
  if (whiteTurn) {
    try {
      if (
        currentBoard[row - 1][col - 1] !== " " &&
        !isUpperCase(currentBoard[row - 1][col - 1])
      ) {
        possibleMoves.push([row - 1, col - 1]);
      }
    } catch (error) {}
    try {
      if (
        currentBoard[row - 1][col + 1] !== " " &&
        !isUpperCase(currentBoard[row - 1][col + 1])
      ) {
        possibleMoves.push([row - 1, col + 1]);
      }
    } catch (error) {}
    try {
      if (currentBoard[row - 1][col] === " ") {
        possibleMoves.push([row - 1, col]);
      }
    } catch (error) {}
    if (row === 6) {
      try {
        if (currentBoard[row - 2][col] === " ") {
          possibleMoves.push([row - 2, col]);
        }
      } catch (error) {}
    }
  } else {
    try {
      if (
        currentBoard[row + 1][col + 1] !== " " &&
        !isUpperCase(currentBoard[row + 1][col + 1])
      ) {
        possibleMoves.push([row + 1, col + 1]);
      }
    } catch (error) {}
    try {
      if (
        currentBoard[row + 1][col - 1] !== " " &&
        !isUpperCase(currentBoard[row + 1][col - 1])
      ) {
        possibleMoves.push([row + 1, col - 1]);
      }
    } catch (error) {}
    try {
      if (currentBoard[row + 1][col] === " ") {
        possibleMoves.push([row + 1, col]);
      }
    } catch (error) {}
    if (row === 1) {
      try {
        if (currentBoard[row + 2][col] === " ") {
          possibleMoves.push([row + 2, col]);
        }
      } catch (error) {}
    }
  }
  return possibleMoves;
}

function getPossibleMoves(currentBoard, peice, position) {
  let whiteTurn = isUpperCase(peice);
  switch (peice.toLowerCase()) {
    case "p":
      return possiblePawnMoves(currentBoard, position, whiteTurn);
    case "r":
      return possibleRookMoves(currentBoard, position, whiteTurn);
    case "n":
      return possibleKnightMoves(currentBoard, position, whiteTurn);
    case "b":
      return possibleBishopMoves(currentBoard, position, whiteTurn);
    case "q":
      return possibleQueenMoves(currentBoard, position, whiteTurn);
    case "k":
      return possibleKingMoves(currentBoard, position, whiteTurn);
  }
  throw Error("Unknown piece character " + peice.toString());
}

function getPossibleMovesOfAll(currentBoard, ofWhite) {
  let possibleMovesOfAllPieces = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (
        currentBoard[row][col] !== " " &&
        isUpperCase(currentBoard[row][col]) === ofWhite
      ) {
        possibleMovesOfAllPieces = possibleMovesOfAllPieces.concat(
          getPossibleMoves(currentBoard, currentBoard[row][col], [row, col])
        );
      }
    }
  }
  return possibleMovesOfAllPieces;
}

function getKingPosition(currentBoard, ofWhite) {
  let position;
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (
        !position &&
        currentBoard[row][col].toLowerCase() === "k" &&
        isUpperCase(currentBoard[row][col]) === ofWhite
      ) {
        position = [row, col];
      }
    }
  }
  return position;
}

function isChecked(currentBoard, checkWhite) {
  let opponentsPossibleMoves = [];
  let positionOfKingBeingChecked;
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (
        !positionOfKingBeingChecked &&
        currentBoard[row][col].toLowerCase() === "k" &&
        isUpperCase(currentBoard[row][col]) === checkWhite
      ) {
        positionOfKingBeingChecked = [row, col];
      }
      if (
        currentBoard[row][col] !== " " &&
        currentBoard[row][col].toLowerCase() !== "k" &&
        isUpperCase(currentBoard[row][col]) !== checkWhite
      ) {
        opponentsPossibleMoves = opponentsPossibleMoves.concat(
          getPossibleMoves(currentBoard, currentBoard[row][col], [row, col])
        );
      }
    }
  }
  const [checkingKingX, checkingKingY] = positionOfKingBeingChecked;
  for (let position of opponentsPossibleMoves) {
    if (checkingKingX === position[0] && checkingKingY === position[1]) {
      return true;
    }
  }
  return false;
}

function isCheckMate(currentBoard, checkWhite) {
  if (!isChecked(currentBoard, checkWhite)) {
    return false;
  }
  let opponentMoves = getPossibleMovesOfAll(currentBoard, !checkWhite);
  let kingPosition = getKingPosition(currentBoard, checkWhite);

  let kingsPossibleMoves = getPossibleMoves(
    currentBoard,
    checkWhite ? "K" : "k",
    kingPosition
  );

  let kingSafeMoves = [];
  for (let i = 0; i < kingsPossibleMoves.length; i++) {
    let currentKingMove = kingsPossibleMoves[i];
    let includes = false;
    for (let j = 0; j < opponentMoves.length; j++) {
      if (
        currentKingMove[0] === opponentMoves[j][0] &&
        currentKingMove[1] === opponentMoves[j][1]
      ) {
        includes = true;
        break;
      }
    }
    if (includes === false) {
      kingSafeMoves.push(currentKingMove);
    }
  }

  if (kingSafeMoves.length > 0) {
    // not mate
    return false;
  }

  let kingSideAllMoves = getPossibleMovesOfAll(
    copyBoard(currentBoard),
    checkWhite
  );
  for (let move of kingSideAllMoves) {
    let tempBoard = copyBoard(currentBoard);
    tempBoard[move[0]][move[1]] = checkWhite ? "P" : "p";
    let stillChecked = isChecked(tempBoard, checkWhite);
    if (!stillChecked) {
      return false;
    }
  }
  return true;
}

let board = [
  ["r", "n", "b", "q", "k", "b", "n", "r"],
  ["p", " ", "p", "p", " ", "p", "p", "p"],
  ["p", "p", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", "B", " ", "Q", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  ["P", "P", "P", "P", " ", "P", "P", "P"],
  ["R", "N", "B", " ", "K", " ", "N", "R"],
];

console.log(isChecked(board, false)); // true

console.log(isCheckMate(board, false)); // false
