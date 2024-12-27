document.addEventListener("DOMContentLoaded", () => {
  const vehicle_Canvas = document.getElementById("vehicle_Canvas");
  if (vehicle_Canvas) {
    vehicle_Canvas.width = 300;
    vehicle_Canvas.height = window.innerHeight;

    const vehicleContext = vehicle_Canvas.getContext("2d");
    const road = new Road(vehicle_Canvas.width / 2, vehicle_Canvas.width * 0.9);

    const gameOverInitiator = () => {
      console.log("Game Over Initiator called");
      const gameOverDisplay = document.createElement("div");
      const gameOverBtn = document.createElement("button");

      // Insert text to replay button
      gameOverBtn.innerHTML = "Retry";
      gameOverDisplay.appendChild(gameOverBtn);

      // Reload when retry button is clicked
      gameOverBtn.onclick = () => {
        // window.location.reload();
        window.location.href = "../front.html";
      };
      gameOverDisplay.classList.add("gameover");

      document.querySelector("body").appendChild(gameOverDisplay);
    };

    const PlayAgainInitiator = () => {
      const playAgainDisplay = document.createElement("div");
      const playAgainBtn = document.createElement("button");

      playAgainBtn.innerHTML = "YOU WIN 🎖 ⚡Play Again⚡";
      playAgainDisplay.appendChild(playAgainBtn);

      // Reload when retry button is clicked
      playAgainBtn.onclick = () => {
        window.location.href = "../front.html";
        // window.location.reload();
      };

      playAgainDisplay.classList.add("playAgain");
      document.querySelector("body").appendChild(playAgainDisplay);
    };

    const N = 1;
    const vehicles = generateVehicles(N);
    let bestVehicle = vehicles[0];

    let traffic = [];
    for (let i = -100; i >= -7000; i -= 100) {
      let traffic_object = new Vehicle(
        road.getLaneCenter(Math.floor(Math.random() * 3)),
        i,
        30,
        60,
        "TRAFFIC",
        2,
        getRandomColor()
      );
      traffic.push(traffic_object);
    }
    animate();

    function save() {
      localStorage.setItem("bestBrain", JSON.stringify(bestVehicle.brain));
    }

    function discard() {
      localStorage.removeItem("bestBrain");
    }

    function generateVehicles(N) {
      const vehicles = [];
      for (let i = 1; i <= N; i++) {
        vehicles.push(new Vehicle(road.getLaneCenter(1), 100, 30, 60, "KEYS"));
      }
      return vehicles;
    }

    function animate() {
      let animationID;
      for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, []);
      }

      for (let i = 0; i < vehicles.length; i++) {
        vehicles[i].update(road.borders, traffic);
      }

      bestVehicle = vehicles.find(
        (v) => v.y == Math.min(...vehicles.map((v) => v.y))
      );

      // console.log("Best Vehicle", bestVehicle.y);

      vehicle_Canvas.height = window.innerHeight;

      vehicleContext.save();
      vehicleContext.translate(0, -bestVehicle.y + vehicle_Canvas.height * 0.7);
      road.draw(vehicleContext);

      for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(vehicleContext, getRandomColor());
      }

      // console.log("last traffic", traffic[traffic.length - 1].y);

      vehicleContext.globalAlpha = 0.2;

      for (let i = 0; i < vehicles.length; i++) {
        vehicles[i].draw(vehicleContext);
      }
      vehicleContext.globalAlpha = 1;

      bestVehicle.draw(vehicleContext, true);
      if (bestVehicle.y < traffic[traffic.length - 1].y - 1000) {
        cancelAnimationFrame(animationID);
        return PlayAgainInitiator();
      }
      vehicleContext.restore();

      animationID = requestAnimationFrame(animate);
      if (bestVehicle.damaged === true) {
        console.log("Best Vehicle Damaged");
        cancelAnimationFrame(animationID);
        return gameOverInitiator();
      }
    }
  } else {
    console.error("vehicle_Canvas element not found");
  }
});
