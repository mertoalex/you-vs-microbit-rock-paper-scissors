let microbit_selected = "NONE"
let player_selected = "NONE"
let player_select = 0
function microbit() {
    
    microbit_selected = select(randint(0, 2))
}

function select(rps: number): string {
    let returnning: string;
    if (rps == 0) {
        returnning = "rock"
        basic.showLeds(`
			0 0 1 0 0
			0 1 1 1 0
			1 1 1 1 1
			1 1 1 1 0
			0 1 1 0 0
		`)
    } else if (rps == 1) {
        returnning = "paper"
        basic.showLeds(`
			1 1 1 1 1
			1 1 1 1 1
			1 1 1 1 1
			1 1 1 1 1
			1 1 1 1 1
		`)
    } else if (rps == 2) {
        returnning = "scissors"
        basic.showLeds(`
			1 0 0 0 1
			0 1 0 1 0
			0 1 1 1 0
			1 0 1 0 1
			0 1 0 1 0
		`)
    } else {
        returnning = "ERR"
        basic.showLeds(`
			0 0 1 1 1
			0 0 1 0 0
			0 0 1 1 1
			0 0 1 0 0
			0 0 1 0 0
		`)
    }
    
    return returnning
}

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
input.onButtonPressed(Button.AB, function on_button_pressed_ab() {
    let player_selected2: string;
    if (player_selected2 == "NONE") {
        player_selected2 = select(player_select)
        console.log("player select & selected")
        console.log(player_select)
        console.log(player_selected2)
    }
    
})
//  microbit()
// print(microbit_selected)
basic.forever(function on_forever() {
    if (player_selected == "NONE") {
        select(player_select)
    }
    
})
