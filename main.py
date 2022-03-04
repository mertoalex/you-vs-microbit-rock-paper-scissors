microbit_selected = "NONE"
player_selected = "NONE"
player_select = randint(0,2)
win=1
drawed = False
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
Xcon = images.create_image("""
	1 0 0 0 1
	0 1 0 1 0
	0 0 1 0 0
	0 1 0 1 0
	1 0 0 0 1
""")
wincon = images.create_image("""
	0 0 0 0 0
	0 1 1 1 0
	0 0 1 0 0
	0 1 1 1 0
	0 0 0 0 0
""")
lose = images.create_image("""
	0 1 1 1 0
	1 0 1 0 1
	1 1 0 1 1
	0 1 1 1 0
	0 1 0 1 0
""")
draw = images.create_image("""
	0 0 0 0 0
	1 1 1 1 1
	0 0 0 0 0
	1 1 1 1 1
	0 0 0 0 0
""")

def restart():
	global microbit_selected, player_selected, player_select, win, drawed
	microbit_selected = "NONE"
	player_selected = "NONE"
	player_select = randint(0,2)
	win=1
	drawed = False

input.on_gesture(Gesture.SHAKE, restart)

def on_button_pressed_a():
	global player_select
	if player_selected == "NONE":
		player_select -= 1
		if player_select <= -1:
			player_select = 2
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
	global player_select
	if player_selected == "NONE":
		player_select += 1
		if player_select >= 3:
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

def fight(first_player: str, second_player: str):
	global win, drawed

	if not first_player in " rock paper scissors " or not second_player in " rock paper scissors ":
		error.show_image(0)
		win = -120

	#win
	if (first_player == "paper" and second_player == "rock") or (first_player == "rock" and second_player == "scissors") or (first_player == "scissors" and second_player == "paper"):win= 0
	#lose
	if (second_player == "paper" and first_player == "rock") or (second_player == "rock" and first_player == "scissors") or (second_player == "scissors" and first_player == "paper"):win=-1
	#draw
	if first_player == second_player: drawed = True

def on_forever():
	global microbit_selected, player_selected, player_select, win
	for _ in range(1):
		if player_selected == "NONE":
			select(player_select)
			continue
		elif win==1:
			Xcon.show_image(0)
			basic.pause(50)
			microbit()
			fight(player_selected, microbit_selected)
			basic.pause(50)
		elif drawed:
			draw.show_image(0)
			restart()
		elif win==0:
			wincon.show_image(0)
		elif win==-1:
			lose.show_image(0)
		else:
			error.show_image(0)
			print("ERROR: player_selected or microbit_selected is not rock, paper or scissors!")
	pass

basic.forever(on_forever)