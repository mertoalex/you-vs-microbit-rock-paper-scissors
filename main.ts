let microbit_selected = "NONE"
let player_selected = "NONE"
let player_select = randint(0, 2)
let win = 1
let drawed = false
let error = images.createImage(`
	0 0 1 1 1
	0 0 1 0 0
	0 0 1 1 1
	0 0 1 0 0
	0 0 1 0 0
`)
let rock = images.createImage(`
	0 0 1 0 0
	0 1 1 1 0
	1 1 1 1 1
	1 1 1 1 0
	0 1 1 0 0
`)
let paper = images.createImage(`
	1 1 1 1 1
	1 1 1 1 1
	1 1 1 1 1
	1 1 1 1 1
	1 1 1 1 1
`)
let scissors = images.createImage(`
	1 0 0 0 1
	0 1 0 1 0
	0 1 1 1 0
	1 0 1 0 1
	0 1 0 1 0
`)
let Xcon = images.createImage(`
	1 0 0 0 1
	0 1 0 1 0
	0 0 1 0 0
	0 1 0 1 0
	1 0 0 0 1
`)
let wincon = images.createImage(`
	0 1 1 1 0
	0 1 1 1 1
	0 1 1 1 1
	0 1 0 0 0
	0 1 0 0 0
`)
let lose = images.createImage(`
	0 1 1 1 0
	1 0 1 0 1
	1 1 0 1 1
	0 1 1 1 0
	0 1 0 1 0
`)
let draw = images.createImage(`
	0 0 0 0 0
	1 1 1 1 1
	0 0 0 0 0
	1 1 1 1 1
	0 0 0 0 0
`)
function restart() {
    
    microbit_selected = "NONE"
    player_selected = "NONE"
    player_select = randint(0, 2)
    win = 1
    drawed = false
}

input.onGesture(Gesture.Shake, restart)
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    
    if (player_selected == "NONE") {
        player_select -= 1
        if (player_select <= -1) {
            player_select = 2
        }
        
    }
    
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    
    if (player_selected == "NONE") {
        player_select += 1
        if (player_select >= 3) {
            player_select = 0
        }
        
    }
    
})
function select(rps: number): string {
    let returnning: string;
    if (rps == 0) {
        rock.showImage(0)
        returnning = "rock"
    } else if (rps == 1) {
        paper.showImage(0)
        returnning = "paper"
    } else if (rps == 2) {
        scissors.showImage(0)
        returnning = "scissors"
    } else {
        error.showImage(0)
        returnning = "ERR"
    }
    
    return returnning
}

function microbit() {
    
    microbit_selected = select(randint(0, 2))
}

input.onButtonPressed(Button.AB, function on_button_pressed_ab() {
    
    if (player_selected == "NONE") {
        player_selected = select(player_select)
    }
    
})
function fight(first_player: string, second_player: string) {
    
    if (!(" rock paper scissors ".indexOf(first_player) >= 0) || !(" rock paper scissors ".indexOf(second_player) >= 0)) {
        error.showImage(0)
        win = -120
    }
    
    // win
    if (first_player == "paper" && second_player == "rock" || first_player == "rock" && second_player == "scissors" || first_player == "scissors" && second_player == "paper") {
        win = 0
    }
    
    // lose
    if (second_player == "paper" && first_player == "rock" || second_player == "rock" && first_player == "scissors" || second_player == "scissors" && first_player == "paper") {
        win = -1
    }
    
    // draw
    if (first_player == second_player) {
        drawed = true
    }
    
}

basic.forever(function on_forever() {
    
    for (let _ = 0; _ < 1; _++) {
        if (player_selected == "NONE") {
            select(player_select)
            continue
        } else if (win == 1) {
            Xcon.showImage(0)
            basic.pause(50)
            microbit()
            fight(player_selected, microbit_selected)
            basic.pause(50)
        } else if (drawed) {
            draw.showImage(0)
            restart()
        } else if (win == 0) {
            wincon.showImage(0)
        } else if (win == -1) {
            lose.showImage(0)
        } else {
            error.showImage(0)
            console.log("ERROR: player_selected or microbit_selected is not rock, paper or scissors!")
        }
        
    }
    
})
