let microbit_selected = "NONE"
let player_selected = "NONE"
let player_select = 0
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
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    
    if (player_selected == "NONE") {
        player_select -= 1
        if (player_select == -1) {
            player_select = 2
        }
        
    }
    
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    
    if (player_selected == "NONE") {
        player_select += 1
        if (player_select == 3) {
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
basic.forever(function on_forever() {
    if (player_selected == "NONE") {
        select(player_select)
    }
    
})
