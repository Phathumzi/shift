
from flask import Flask, request

app = Flask(__name__)

chatlog = []

@app.route('/')
def index():
    return '''
        <html>
            <head>
                <title>Chat</title>
            </head>
            <body>
                <div id="chatlog"></div>
                <input type="text" id="message" />
                <button id="send">Send</button>
            </body>
            <script>
              var chatlog = document.getElementById('chatlog');
              var message = document.getElementById('message');
              var sendBtn = document.getElementById('send');

              // send message to server
              sendBtn.addEventListener('click', function() {
                var xhr = new XMLHttpRequest();
                xhr.open('POST', '/chat', true);
                xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
                xhr.send(JSON.stringify({ message: message.value }));
                message.value = '';
              });

              // update chat log with received messages
              setInterval(function() {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', '/chat', true);
                xhr.onload = function() {
                  if (xhr.status === 200) {
                    chatlog.innerHTML = xhr.responseText;
                  }
                };
                xhr.send();
              }, 1000);
            </script>
        </html>
    '''

@app.route('/chat', methods=['GET', 'POST'])
def chat():
    if request.method == 'POST':
        chatlog.append(request.json['message'])
    return '<br>'.join(chatlog)

if __name__ == '__main__':
    app.run()
