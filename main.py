microbit_selected = "NONE"
player_selected = "NONE"
player_select = 0
error = images.create_image("""
	0 0 1 1 1
	0 0 1 0 0
	0 0 1 1 1
	0 0 1 0 0
	0 0 1 0 0
""")
rock = images.create_image("""
	0 0 1 0 0
	0 1 1 1 0
	1 1 1 1 1
	1 1 1 1 0
	0 1 1 0 0
""")
paper = images.create_image("""
	1 1 1 1 1
	1 1 1 1 1
	1 1 1 1 1
	1 1 1 1 1
	1 1 1 1 1
""")
scissors = images.create_image("""
	1 0 0 0 1
	0 1 0 1 0
	0 1 1 1 0
	1 0 1 0 1
	0 1 0 1 0
""")

def on_button_pressed_a():
	global player_select
	if player_selected == "NONE":
		player_select -= 1
		if player_select == -1:
			player_select = 2
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
	global player_select
	if player_selected == "NONE":
		player_select += 1
		if player_select == 3:
			player_select = 0
input.on_button_pressed(Button.B, on_button_pressed_b)

def select(rps: number):
	if rps == 0:
		rock.show_image(0)
		returnning = "rock"
	elif rps == 1:
		paper.show_image(0)
		returnning = "paper"
	elif rps == 2:
		scissors.show_image(0)
		returnning = "scissors"
	else:
		error.show_image(0)
		returnning = "ERR"
	return returnning

def microbit():
	global microbit_selected
	microbit_selected = select(randint(0, 2))

def on_button_pressed_ab():
	global player_selected, player_select
	if player_selected == "NONE":
		player_selected = select(player_select)
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_forever():
	if player_selected == "NONE":
		select(player_select)
basic.forever(on_forever)