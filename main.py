microbit_selected = "NONE"
player_selected = "NONE"
player_select = 0
def microbit():
	global microbit_selected
	microbit_selected = select(randint(0, 2))
def select(rps: number):
	if rps == 0:
		returnning = "rock"
		basic.show_leds("""
			0 0 1 0 0
			0 1 1 1 0
			1 1 1 1 1
			1 1 1 1 0
			0 1 1 0 0
		""")
	elif rps == 1:
		returnning = "paper"
		basic.show_leds("""
			1 1 1 1 1
			1 1 1 1 1
			1 1 1 1 1
			1 1 1 1 1
			1 1 1 1 1
		""")
	elif rps == 2:
		returnning = "scissors"
		basic.show_leds("""
			1 0 0 0 1
			0 1 0 1 0
			0 1 1 1 0
			1 0 1 0 1
			0 1 0 1 0
		""")
	else:
		returnning = "ERR"
		basic.show_leds("""
			0 0 1 1 1
			0 0 1 0 0
			0 0 1 1 1
			0 0 1 0 0
			0 0 1 0 0
		""")
	return returnning

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

def on_button_pressed_ab():
	if player_selected2 == "NONE":
		player_selected2 = select(player_select)
		print("player select & selected")
		print(player_select)
		print(player_selected2)

input.on_button_pressed(Button.AB, on_button_pressed_ab)

# microbit()

def on_forever():
	if player_selected == "NONE":
		select(player_select)
	#print(microbit_selected)

basic.forever(on_forever)
