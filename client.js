const socket = io()
let board = [['0','0','0','0','0','0','0'],['0','0','0','0','0','0','0'],['0','0','0','0','0','0','0'],['0','0','0','0','0','0','0'],['0','0','0','0','0','0','0'],['0','0','0','0','0','0','0']]
let gameboard = []
let turn = false

const click = () =>
{
	event.preventDefault()
	const i = event.target.id
	if(turn)
	{
		socket.emit('clicked', i)
	}

}

const hover = () =>
{
	event.preventDefault()
	const i = event.target.getAttribute('id')
	const row = parseInt(i/7)
	const column = (i%7)
	if(board[row][column] == '0')
	{	
		event.target.setAttribute("fill", "green")
	}
}



const leave = () =>
{
	event.preventDefault()
	const i = event.target.getAttribute('id')
	const row = parseInt(i/7)
	const column = (i%7)
	if(board[row][column] == '0')		
	{
		event.target.setAttribute("fill", "white")
	}
}

const checkcolor = i=>
{
	if(i == '0')
	{	
		return "white"
	}

	else if(i == '1')
	{
		return "blue"
	}

	else if(i == '2')
	{
		return "yellow"
	}
}

const createcircle = (i, x, y, color) => React.createClass({
	render: () => {
		return (React.createElement('circle', {id: i, cx: x, cy: y, r: "10", stroke: "black", fill: checkcolor(color), onClick: click, onMouseOver: hover, onMouseLeave: leave}))
	}
})

const makeboard = () =>
{
	let i = 0
	let x = 15
	let y = 15
	
	ReactDOM.render(
 	React.createElement('div', {id: "board"}, 	
		React.createElement('svg', {width: '500', height: '500'},
		board.map( row => 
			row.map( column => 
				React.createElement(createcircle(i, x, y, column), x = x + 30, i++), 
					x = 15,
					y = y + 30,
				),

			)
			)),
	document.getElementById('root'))
}

socket.on('one', () =>
{
	ReactDOM.render(
		React.createElement('h1', null, 'Waiting for opponent...'),
		document.getElementById('root'))
})

socket.on('two', () =>
{
	makeboard()

	socket.on('board', li =>
	{
		for (var i = 0; i < li.length; i++) {
			gameboard[i] = li[i]
		}
	})
})

socket.on('p1', c =>
{
	const row = parseInt(c/7)
	const column = (c%7)
	board[row][column] = '1'
	makeboard()
})

socket.on('p2', c =>
{
	const row = parseInt(c/7)
	const column = (c%7)
	board[row][column] = '2'
	makeboard()
})

socket.on('msg', data =>
{
	console.log(data)
})

socket.on('yourturn', () =>
{
	console.log('your turn')
	turn = true
})

socket.on('opponentturn', () =>
{
	console.log('opponents turn')
	turn = false
})

const restart = () =>
{
	socket.emit('restart')
}

socket.on('gameover', data =>
{
	board = [['0','0','0','0','0','0','0'],['0','0','0','0','0','0','0'],['0','0','0','0','0','0','0'],['0','0','0','0','0','0','0'],['0','0','0','0','0','0','0'],['0','0','0','0','0','0','0']]
	gameboard = []
	ReactDOM.render( 
		React.createElement('h1', null, data),
		document.getElementById('root'))
})

socket.on('loss', () =>
{
	ReactDOM.render(
		React.createElement('h1', null, "Connection Lost :("),
		document.getElementById('root'))

})