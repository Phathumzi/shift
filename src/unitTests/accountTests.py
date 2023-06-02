from flask import Flask, render_template, request
import pymysql

app = Flask(__name__)
conn = pymysql.connect(host='your_host', user='your_user', password='your_password', db='your_database')

@app.route('/Account', methods=['GET', 'POST'])
def account():
    if request.method == 'POST':
        userid = session['user_id']
        update_name = request.form['update_username']
        update_email = request.form['update_email']
        cursor = conn.cursor()
        cursor.execute("UPDATE users SET username = %s, email = %s WHERE userid = %s", (update_name, update_email, userid))
        conn.commit()
        
        new_pass = request.form['new_pass']
        confirm_pass = request.form['confirm_pass']
        if new_pass and confirm_pass:
            if new_pass != confirm_pass:
                message = 'Passwords do not match!'
            else:
                cursor.execute("UPDATE users SET password = %s WHERE userid = %s", (confirm_pass, userid))
                conn.commit()
                message = 'Password updated successfully!'
        else:
            message = None
        return render_template('Account.html', message=message)

    else:
        userid = session['user_id']
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE userid = %s", userid)
        user = cursor.fetchone()
        return render_template('Account.html', user=user)

if __name__ == '__main__':
    app.run()
