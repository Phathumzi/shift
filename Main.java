import java.util.Scanner;

public class Main {


    public static void main(String[] args) {
        Move M = new Move();
        new Player("PlayerA",M);//Creates new players
        new Player("PlayerB", M);
    }
}

class Move {


    Boolean moved = false;
    int move;
    Scanner in = new Scanner(System.in);

    public synchronized void setPlayerAMove() {

        while (moved) {
            try {
                wait(); //waits for PlayerB to Move
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }

        }
        System.out.print("PlayerA move ");
        this.move = in.nextInt();

        System.out.println("PlayerA moved " + this.move);
        moved = true;
        notify();//notifies player B

    }

    public synchronized void setPlayerBMove(){

        while (!moved) {
            try {
                wait(); //waits for playerA to move
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }

        }
        System.out.print("PlayerB move ");
        this.move = in.nextInt();

        System.out.println("PlayerB moved " + this.move);
        moved = false;
        notify();//notifies player A
    }
}

class Player implements Runnable {
    String player;
    Move move;
    public Player(String player, Move move){
        this.move = move;this.player = player;
        new Thread(this, "Player").start();//creates new thread for each player
    }

    @Override
    public void run() {
        while (true) {
            if (this.player.equals("PlayerA")) {
                move.setPlayerBMove();
            }
            else if (this.player.equals("PlayerB")){
                move.setPlayerAMove();
            }
        }
    }

}


