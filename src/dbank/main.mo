import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Int "mo:base/Int";
import Float "mo:base/Float";
//import Nat "mo:base/Nat";

// actor DBank {
//   var currentValue = 300;
//   currentValue := 100;

//   let id : Nat = 384744234;

//   Debug.print(debug_show(id));
// }

actor DBank {
  stable var currentValue : Float = 200;
  //currentValue := 100;
  var elapsedTimeNS : Int = 0;
  stable var elapsedTimeS : Int = 0;

  let id = 444666777888;
  stable var startTime = Time.now();
  //startTime := Time.now();

  public func topUp(amount: Float) {
    currentValue += amount;
    Debug.print(debug_show(currentValue));

  };

  public func withdraw(amount: Float) {
    let tempVal:Float = currentValue - amount;
    if(tempVal >= 0) {
      currentValue -= amount;
      Debug.print(debug_show(currentValue));
    }
    else {
      Debug.print("[ERROR] To dev: the result is a negative number. Variable `currentValue` ,of type Nat, cannot hold negative numbers");
    }

  };

  public query func checkBalance() : async Float {
    return currentValue;
  };

  public func compound() : async Float {
    let currentTime = Time.now();
    elapsedTimeNS := currentTime - startTime;
    elapsedTimeS := elapsedTimeNS / 1000000000;
    currentValue := currentValue * (1.01 ** Float.fromInt(elapsedTimeS));
    startTime := currentTime;
    return currentValue;
  };

  public query func elapsedTimeInSeconds() : async Int {
    return elapsedTimeS;
  };

  public query func hoursSince1970() : async Int {
    return (((Time.now() / 1000000000) / 60) / 60);
  };

  public query func display(thisGuy : Text) : async Text {
    return "text given = , " # thisGuy # "!";
  };
};
