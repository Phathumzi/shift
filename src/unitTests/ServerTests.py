from flask import Flask, render_template
from flask_socketio import SocketIO, send, emit
import random

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret_key'
socketio = SocketIO(app)

games = {}
clients = {}
CROSS_SYMBOL = 'x'
CIRCLE_SYMBOL = 'o'
WIN_STATES = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]


@app.route('/')
def index():
    return render_template('index.html')


@socketio.on('connect')
def handle_connect():
    client_id = random.randint(100, 999)
    clients[client_id] = {'clientId': client_id, 'connection': request.sid}
    emit('connect', {'method': 'connect', 'clientId': client_id})


@socketio.on('create')
def handle_create_game(data):
    player = {'clientId': data['clientId'], 'symbol': CROSS_SYMBOL, 'isTurn': True, 'wins': 0, 'lost': 0}
    game_id = random.randint(100, 999)
    board = ['', '', '', '', '', '', '', '', '']
    games[game_id] = {'gameId': game_id, 'players': [player], 'board': board}
    emit('create', {'method': 'create', 'game': games[game_id]}, broadcast=True)
    send_available_games()


@socketio.on('join')
def handle_join_game(data):
    player = {'clientId': data['clientId'], 'symbol': CIRCLE_SYMBOL, 'isTurn': False, 'wins': 0, 'lost': 0}
    game_id = data['gameId']
    games[game_id]['players'].append(player)
    emit('join', {'method': 'join', 'game': games[game_id]}, broadcast=True)
    make_move(games[game_id])


@socketio.on('makeMove')
def handle_make_move(data):
    game_id = data['game']['gameId']
    games[game_id]['board'] = data['game']['board']
    curr_player, player_symbol = '', ''
    for player in games[game_id]['players']:
        if player['isTurn']:
            curr_player = player['clientId']
            player_symbol = player['symbol']
    is_winner = any(all(games[game_id]['board'][cell] == player_symbol for cell in row) for row in WIN_STATES)
    if is_winner:
        emit('gameEnds', {'method': 'gameEnds', 'winner': player_symbol}, broadcast=True)
    else:
        is_draw = all(all(games[game_id]['board'][cell] != '' for cell in row) for row in WIN_STATES)
        if is_draw:
            emit('draw', {'method': 'draw'}, broadcast=True)
        else:
            for player in games[game_id]['players']:
                player['isTurn'] = not player['isTurn']
            make_move(games[game_id])


def make_move(game):
    pay_load = {'method': 'updateBoard', 'game': game}
    for player in game['players']:
        emit('updateBoard', pay_load, room=clients[player['clientId']]['connection'])


def send_available_games():
    all_games = [game_id for game_id in games if len(games[game_id]['players']) < 2]
    pay_load = {'method': 'gamesAvail', 'games': all_games}
    for client_id in clients:
        emit('gamesAvail', pay_load, room=clients[client_id]['connection'])


if __name__ == '__main__':
    socketio.run(app, debug=True)
