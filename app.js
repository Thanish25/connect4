var row = 0
var col = 0
var colour = "red"
var className = ""
var bottom = ""
var gameWon = false


$(document).ready(function () {
    
    console.log('ready')


    $( ".cell" ).hover(
            function() {

                if (gameWon === false) {
                    className = $(this).attr("class");

                    bottom = findBottom (className)

                    $(bottom).addClass(colour + "tint");

                }
            }, function() {

                if (gameWon === false) {
                    $(bottom).removeClass(colour + "tint");
                
                }
            }
    );


    $(".cell").click(function() {

        if (gameWon === false) {

            className = $(this).attr("class");

            bottom = findBottom (className)

            if (!bottom.includes('dne')) {
                     
                $(bottom).addClass(colour).removeClass(colour + "tint").removeClass("empty");

                checkWin()

                if (gameWon === true) {
                    console.log(colour + ' won')

                }
                else {
                    colour = (colour === 'red') ? 'yellow' : 'red';

                    bottom = findBottom(bottom)
                    $(bottom).addClass(colour + "tint");
                }
                
            }
            
        }
        
    });
    
})


function findBottom(className) {
    if (className.includes('col-0')) {
        col = 0
    }
    else if (className.includes('col-1')) {
        col = 1
    }
    else if (className.includes('col-2')) {
        col = 2
    }
    else if (className.includes('col-3')) {
        col = 3
    }
    else if (className.includes('col-4')) {
        col = 4
    }
    else if (className.includes('col-5')) {
        col = 5
    }
    else if (className.includes('col-6')) {
        col = 6
    }
    else {
        col= 'dne'
    }
    

    row = "dne"

    for (var i = 5; i >= 0; i--) {

        row = i;

        if ($(".row-" + row + ".col-" + col + ".empty")[0]) {
            break
        }

        row = "dne"
    }

    return ".row-" + row + ".col-" + col;
}


function checkWin() {
    
    for (let i = 0; i < 6; i++) {

        for (let j = 0; j < 7; j++) {

            checkFour(i, j, +1, 0)
            checkFour(i, j, -1, 0)
            checkFour(i, j, 0, +1)
            checkFour(i, j, 0, -1)
            checkFour(i, j, +1, +1)
            checkFour(i, j, +1, -1)
            checkFour(i, j, -1, +1)
            checkFour(i, j, -1, -1)

        }
    }
   
}


function checkFour(rowNum, colNum, rowDirn, colDirn) {

    if (gameWon === false) {

        if ($(".row-" + (rowNum) + ".col-" + (colNum) + "." + colour)[0]) {

            if ($(".row-" + (rowNum + rowDirn) + ".col-" + (colNum + colDirn) + "." + colour)[0]) {
                
                if ($(".row-" + (rowNum + 2 * rowDirn) + ".col-" + (colNum + 2 * colDirn) + "." + colour)[0]) {
                    
                    if ($(".row-" + (rowNum + 3 * rowDirn) + ".col-" + (colNum + 3 * colDirn) + "." + colour)[0]) {
                        
                        gameWon = true
        
                        $( ".row-" + (rowNum) + ".col-" + (colNum) ) .addClass(colour + "win")
                        $( ".row-" + (rowNum + rowDirn) + ".col-" + (colNum + colDirn) ) .addClass(colour + "win")
                        $( ".row-" + (rowNum + 2 * rowDirn) + ".col-" + (colNum + 2 * colDirn) ) .addClass(colour + "win")
                        $( ".row-" + (rowNum + 3 * rowDirn) + ".col-" + (colNum + 3 * colDirn) ) .addClass(colour + "win")
        
        
                        title.innerHTML = colour.toUpperCase() + " WON!";

                    }
                }
            }
        }
    }
}


function reset() {
    console.log('resetting')
    gameWon = false
    colour = "red"
    
    for (var i = 0; i <= 5; i++) {
        
        for (var j = 0; j <= 6; j++) {

            $( ".row-" + i + ".col-" + j) .removeClass("red yellow redtint yellowtint redwin yellowwin empty") .addClass("empty")

        }
    }

    title.innerHTML = "Connect 4";

}