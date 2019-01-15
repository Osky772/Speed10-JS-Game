// app should have way to add player 2 with driving with keys "wsad"
// app should have way to display coins randomly on "streets" it's everywhere exclude houses
// app should have way to collect coins by players (then coins should disappear)
// app should have way to display another coins after player get the currently displayed coin
// app should have way to display current state of collected coins for each player
// app should have way to finish after 2 minutes 
// *** app should have way to generate one random house after 45 seconds where player can drive in and get extra 10 coins ***
// *** app should have way to select color of car of every player ***
// *** coins would have rotation 3D ***

(function(){
    const body = document.querySelector("body");
    const deliverContainer = document.createElement("div")
    deliverContainer.classList.add("deliver-map");
    body.prepend(deliverContainer);
    const car = document.createElement("div");
    car.classList.add("car");
    car.dataset.px = 'px';
    const suffix = car.dataset.px;
    deliverContainer.prepend(car);
    let carPositionY;
    let carPositionX;
    
    // Div for wrong way effect (red flashback) and for winner effect (full green screen with capture "winner")
    const drivingEffect = document.createElement("div");
    body.prepend(drivingEffect);

    const totalWidth = Number(getComputedStyle(deliverContainer).getPropertyValue("width").slice(0, -2));
    const totalHeight = Number(getComputedStyle(deliverContainer).getPropertyValue("height").slice(0, -2));
    
    function getCarPosition(axis) {
        axis === "x" ? carPositionX = Number(getComputedStyle(document.documentElement).getPropertyValue(`--carPositionX`).slice(0, -2)) 
        : carPositionY = Number(getComputedStyle(document.documentElement).getPropertyValue(`--carPositionY`).slice(0, -2));
        
    };

    // Starting position and rotate of car 
    let deg = 90;
    getCarPosition("y");
    getCarPosition("x");

    function wrongWay() {
        drivingEffect.classList.add("wrong-way");
        setTimeout(() => {
            drivingEffect.classList.remove("wrong-way");
        }, 100);
    };

    function winner() {
        window.removeEventListener("keydown", addKeys);
        setTimeout(() => {
            drivingEffect.classList.add("winner");
            drivingEffect.textContent = "Winner!";
        }, 1000);
    };

    function rideRight() {
        let cordsX = homesCords.some(home => {
            // check if car position would be the same as any home's position and would not be equal to deliver home cords
            return carPositionX + 80 === home.posX && carPositionY === home.posY && !(carPositionX + 80 === deliverCords.posX && carPositionY === deliverCords.posY);
        });
        if (cordsX) {
                carPositionX;
                wrongWay();
            } else {
                car.style.transition = `top 0.5s, left 0.5s, transform 0.1s`;
                deg = 90;
                car.style.transform = `rotate(${deg}deg)`;
                getCarPosition("x");
                if (carPositionX < totalWidth) {
                    carPositionX += 80;
                    document.documentElement.style.setProperty(`--carPositionX`, carPositionX + suffix);
                    if (carPositionY === deliverCords.posY && carPositionX === deliverCords.posX) {
                        winner();
                    };
                };
            };
      };
    
    function rideLeft() {
        let cordsX = homesCords.some(home => {
            return carPositionX - 80 === home.posX && carPositionY === home.posY && !(carPositionX - 80 === deliverCords.posX && carPositionY === deliverCords.posY);
        });
        if (cordsX) {
            carPositionX;
            wrongWay();
        } else {
            if (deg === 0) {
                car.style.transition = `top 0.5s, left 0.5s, transform 0.1s`;
                car.style.transform = `rotate(-90deg)`;
                setTimeout(() => {
                    car.style.transition = `top 0.5s, left 0.5s, transform 0s`;
                    deg = 270;
                    car.style.transform = `rotate(${deg}deg)`;
                }, 100);
            } else {
                car.style.transition = `top 0.5s, left 0.5s, transform 0.1s`;
                deg = 270;
                car.style.transform = `rotate(${deg}deg)`;
            }
            getCarPosition("x");
            if (carPositionX > 0) {
                carPositionX -= 80;
                document.documentElement.style.setProperty(`--carPositionX`, carPositionX + suffix);
                if (carPositionY === deliverCords.posY && carPositionX === deliverCords.posX) {
                    winner();
                };
            };
        };
    };
    
    function rideDown() {
        let cordsY = homesCords.some(home => {
            return carPositionX === home.posX && carPositionY + 80 === home.posY && !(carPositionX === deliverCords.posX && carPositionY + 80 === deliverCords.posY);
        });
        if (cordsY) {
                carPositionY;
                wrongWay();
            } else {
                car.style.transition = `top 0.5s, left 0.5s, transform 0.1s`;
                deg = 180;
                car.style.transform = `rotate(${deg}deg)`;
                getCarPosition("y");
                if (carPositionY + 80 < totalHeight) {
                    carPositionY += 80;
                    document.documentElement.style.setProperty(`--carPositionY`, carPositionY + suffix);
                    if (carPositionY === deliverCords.posY && carPositionX === deliverCords.posX) {
                        winner();
                    };
                };
            };
    };
    
    function rideTop() {
        let cordsY = homesCords.some(home => {
            return (carPositionX === home.posX && carPositionY - 80 === home.posY) && !(carPositionX === deliverCords.posX && carPositionY - 80 === deliverCords.posY);
        });
        if (cordsY) {
            carPositionY;
            wrongWay();
        } else {
            if (deg === 270) {
                car.style.transition = `top 0.5s, left 0.5s, transform 0.1s`;
                deg = 360;
                car.style.transform = `rotate(${deg}deg)`;
            } else if (deg === 360){
                car.style.transition = `top 0.5s, left 0.5s, transform 0s`;
                deg = 0;
                car.style.transform = `rotate(${deg}deg)`;
            } else {
                car.style.transition = `top 0.5s, left 0.5s, transform 0.1s`;
                deg = 0;
                car.style.transform = `rotate(${deg}deg)`;
            }
            getCarPosition("y");
            if (carPositionY > 0) {
                carPositionY -= 80;
                document.documentElement.style.setProperty(`--carPositionY`, carPositionY + suffix);
                if (carPositionY === deliverCords.posY && carPositionX === deliverCords.posX) {
                    winner();
                };
            };
        };
    };
    
    function addKeys(e) {
        if (e.keyCode === 39) {
            rideRight();
        } else if (e.keyCode === 40) {
            rideDown();
        } else if (e.keyCode === 37) {
            rideLeft();
        } else if (e.keyCode === 38) {
            rideTop();
        };
    };
    
    window.addEventListener("keydown", addKeys);
    
    /*********************************************
                    CREATE HOUSES
    **********************************************/
    
    function createRow(startX, endX, startY) {
        for (let x = startX; x <= endX; x += 80) {
            const y = startY;
            const home = document.createElement("div");
            home.classList.add("home");
            home.style.setProperty("left", `${x}px`);
            home.style.setProperty("top", `${y}px`);
            deliverContainer.append(home);
        };
    };
    
    function createColumn(startY, endY, startX) {
        for (let y = startY; y <= endY; y += 80) {
            let x = startX;
            const home = document.createElement("div");
            home.classList.add("home");
            home.style.setProperty("top", `${y}px`);
            home.style.setProperty("left", `${x}px`);
            deliverContainer.append(home);
        };
    };
    
    createColumn(80,560,0);
    createRow(160,720,0);
    createColumn(0,640,1040);
    createColumn(0,240,800);
    createRow(160, 560, 160);
    createColumn(240,240,160);
    createRow(160,320,400);
    createRow(320,480,320);
    createColumn(160,320,640);
    createRow(720,880,480);
    createRow(800,880,400);
    createRow(480,560,480);
    createRow(480,880,640);
    createRow(880,880,240);
    createRow(880,880,80);
    createColumn(560,640,160);
    createRow(240,320,560);
    
    // Add to every home element class "home"
    const homes = document.querySelectorAll(".home");
    // Create empty array for every home's cords (left, top) values
    let homesCords = [];
    
    // For every homes elements push object with it's index and position
    homes.forEach((home, i) => {
        homesCords.push({
            home: i,
            posY : Number(getComputedStyle(home).getPropertyValue("top").slice(0, -2)),
            posX : Number(getComputedStyle(home).getPropertyValue("left").slice(0, -2)),
        });
    });
    
    // Choose house to deliver
    function deliverTo() {
        const index = Math.floor(Math.random() * homes.length);
        homes[index].classList.add("deliver");
        return homesCords[index];
    };
    // Then I refer to that cords when car is driving (above in code)
    const deliverCords = deliverTo();
}());

