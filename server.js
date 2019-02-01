const http = require('http')
const fs = require('fs')
const socketio = require('socket.io')

const list = []
const currentlyplaying = []
const gameboard = []
let fillcheck = 0


const readfile = file => new Promise((resolve, reject) => 
	fs.readFile(file, (err, data) => err ? reject(err) : resolve(data)))

const server = http.createServer(async (req, res) => 
{
	res.end(await readfile(req.url.substr(1)))
})

const io = socketio(server)

const game = (player1, player2) => 
{

	for (var i = 0; i < 42; i++) {
		const temp = {id: i, value: "empty"}
		gameboard.push(temp)
	}

	player1.emit('board', gameboard)
	player2.emit('board', gameboard)
	player1.emit('yourturn')
}

const wincheckmiddle = (c, opponent) => 
{

	let check = true
		const column = parseInt(gameboard[c]['id']/7)
		
		//check if element is in upper middle side of row
		if(column < 3)
		{
			//check right side
			for (var i = c; i < c+4; i++) 
			{
				if(gameboard[i]['value'] == 'empty' || gameboard[i]['value'] == opponent)
				{
					check = false
					break
				}
			}

			if(check)
			{
				return true
			}

			else
			{
				check = true
				//check left side
				for (var i = c; i > c-4; i--)
				{
					if(gameboard[i]['value'] == 'empty' || gameboard[i]['value'] == opponent)
					{
						check = false
						break
					}
				}

				if(check)
				{
					return true
				}

				else
				{
					check = true
					//check down side
					for (var i = c; i < c + 22; i+=7) 
					{
						if(gameboard[i]['value'] == 'empty' || gameboard[i]['value'] == opponent)
						{
							check = false
							break
						}
					}

					if(check)
					{
						return true
					}

					else
					{
						return false
					}
				}
			}
		}

		//check for element in lower middle side of row
		else
		{

			//check right side
			for (var i = c; i < c+4; i++) 
			{
				if(gameboard[i]['value'] == 'empty' || gameboard[i]['value'] == opponent)
				{
					check = false
					break
				}
			}

			if(check)
			{
				return true
			}

			else
			{
				check = true
				//check left side
				for (var i = c; i > c-4; i--)
				{
					if(gameboard[i]['value'] == 'empty' || gameboard[i]['value'] == opponent)
					{
						check = false
						break
					}
				}

				if(check)
				{
					return true
				}

				else
				{
					check = true
					//check upper side
					for (var i = c; i > c - 22; i-=7) 
					{
						if(gameboard[i]['value'] == 'empty' || gameboard[i]['value'] == opponent)
						{
							check = false
							break
						}
					}

					if(check)
					{
						return true
					}

					else
					{
						return false
					}
				}
			}
		}
}

const wincheckleft = (c, opponent) =>
{
	let check = true
	
		const column = parseInt(gameboard[c]['id']/7)
		
		//check if element is in upper left side of row
		if(column < 3)
		{
			//check right side
			for (var i = c; i < c+4; i++) 
			{
				if(gameboard[i]['value'] == 'empty' || gameboard[i]['value'] == opponent)
				{
					check = false
					break
				}
			}

			if(check)
			{
				return true
			}

			else
			{
				check = true
				//check down side
				for (var i = c; i < c+22; i+=7) 
				{
					if(gameboard[i]['value'] == 'empty' || gameboard[i]['value'] == opponent)
					{
						check = false
						break
					}
				}

				if(check)
				{
					return true
				}

				else
				{
					return false
				}
			}
		}

		else
		{
			//check right side
			for (var i = c; i < c+4; i++) 
			{
				if(gameboard[i]['value'] == 'empty' || gameboard[i]['value'] == opponent)
				{
					check = false
					break
				}
			}

			if(check)
			{
				return true
			}

			else
			{
				check = true
				//check up side
				for (var i = c; i > c-22; i-=7) 
				{
					if(gameboard[i]['value'] == 'empty' || gameboard[i]['value'] == opponent)
					{
						check = false
						break
					}
				}

				if(check)
				{
					return true
				}

				else
				{
					return false
				}
			}	
		}
}

const wincheckright = (c, opponent) =>
{
		let check = true
	
		const column = parseInt(gameboard[c]['id']/7)
		
		//check if element is in upper right side of row
		if(column < 3)
		{
			//check left side
			for (var i = c; i > c-4; i--) 
			{
				if(gameboard[i]['value'] == 'empty' || gameboard[i]['value'] == opponent)
				{
					check = false
					break
				}
			}

			if(check)
			{
				return true
			}

			else
			{
				check = true
				//check down side
				for (var i = c; i < c+22; i+=7) 
				{
					if(gameboard[i]['value'] == 'empty' || gameboard[i]['value'] == opponent)
					{
						check = false
						break
					}
				}

				if(check)
				{
					return true
				}

				else
				{
					return false
				}
			}
		}

		else
		{
			//check left side
			for (var i = c; i > c-4; i--) 
			{
				if(gameboard[i]['value'] == 'empty' || gameboard[i]['value'] == opponent)
				{
					check = false
					break
				}
			}

			if(check)
			{
				return true
			}

			else
			{
				check = true
				//check upper side
				for (var i = c; i > c-22; i-=7) 
				{
					if(gameboard[i]['value'] == 'empty' || gameboard[i]['value'] == opponent)
					{
						check = false
						break
					}
				}

				if(check)
				{
					return true
				}

				else
				{
					return false
				}
			}	
		}
}

const wincheck = (c, opponent) =>
{
		
	//check for element in middle of row
	if(gameboard[c]['id'] % 7 == 3)
	{
		if(wincheckmiddle(c, opponent) == true)
		{
			return true
		}

		else
		{
			return false
		}
	}
	
	//check for element in left side of row
	else if(gameboard[c]['id'] % 7 < 3)
	{
		if(wincheckleft(c, opponent) == true)
		{
			return true
		}

		else
		{
			return false
		}
	}


	//horizontal check for element in right side of row
	else
	{
		if(wincheckright(c, opponent) == true)
		{
			return true
		}

		else 
		{
			return false
		}
	}
}

io.sockets.on('connection', socket => 
{
	console.log("a user connected")
	list.push(socket)
	if(list.length % 2 == 0)
	{
		list[0].emit('two')
		list[1].emit('two')
		list[0].emit('msg', 'Player1')
		list[1].emit('msg', 'Player2')
		const temp = []
		for (var i = 0; i < list.length; i++) 
		{
			temp.push(list[i])
		}		
		currentlyplaying.push(temp)
		game(list[0], list[1])
		list.splice(0,2)
	}
	
	else
	{
		socket.emit('one')
	}

	socket.on('disconnect', () => 
	{
		console.log("a user left")
		if(socket == currentlyplaying[0][0])
		{
			currentlyplaying[0][1].emit('loss')
			currentlyplaying.splice(0)
		}
		else
		{
			currentlyplaying[0][0].emit('loss')
			currentlyplaying.splice
		}
		gameboard.splice(0, gameboard.length)
	})

	socket.on('clicked', circle => 
	{
		let c = parseInt(circle)
		while(c <= 41)
		{
			c = c + 7
		}
		c = c - 7

		while(c >= circle)
		{
			if(gameboard[c]['value'] == "empty")
			{
				if(currentlyplaying[0][0] == socket)
				{
					gameboard[c]['value'] = 'player1'
					socket.emit('p1', c)
					currentlyplaying[0][1].emit('p2', c)
					fillcheck++
					if(fillcheck == 42)
					{
						socket.emit('gameover', "Game ended as a draw")
						currentlyplaying[0][1].emit('gameover', "Game ended as a draw")
						gameboard.splice(0, gameboard.length)
						break
					}

					const result = wincheck(c, 'player2')
					if(result == true)
					{
						socket.emit('gameover', "player 1 has won")
						currentlyplaying[0][1].emit('gameover', "player 1 has won")
						gameboard.splice(0, gameboard.length)
						break
					}

					else
					{
						socket.emit('opponentturn')
						currentlyplaying[0][1].emit('yourturn')
						break						
					}

				}
				
				else
				{
					gameboard[c]['value'] = 'player2'
					socket.emit('p1', c)
					currentlyplaying[0][0].emit('p2', c)
	
					if(fillcheck == 42)
					{
						socket.emit('gameover', "Game ended as a draw")
						currentlyplaying[0][1].emit('gameover', "Game ended as a draw")
						gameboard.splice(0, gameboard.length)
						break
					}

					const result = wincheck(c, 'player1')
					if(result == true)
					{
						socket.emit('gameover', "player 2 has won")
						currentlyplaying[0][0].emit('gameover', "player 2 has won")
						gameboard.splice(0, gameboard.length)
						break
					}

					else
					{
						socket.emit('opponentturn')
						currentlyplaying[0][0].emit('yourturn')
						break						
					}
				}

			}
			else
			{
				c = c - 7
			}	
		}
	})
})

server.listen(8000, () => console.log("Started"))
