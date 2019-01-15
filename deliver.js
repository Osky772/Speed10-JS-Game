// app should have way to add player 2 with driving with keys "wsad"
// app should have way to display coins randomly on "streets" it's everywhere exclude houses
// app should have way to collect coins by players (then coins should disappear)
// app should have way to display another coins after player get the currently displayed coin
// app should have way to display current state of collected coins for each player
// app should have way to finish after 2 minutes 
// *** app should have way to generate one random house after 45 seconds where player can drive in and get extra 10 coins ***
// *** app should have way to select color of player1 of every player ***
// *** coins would have rotation 3D ***

(function(){
    const body = document.querySelector("body");
    const deliverContainer = document.createElement("div")
    deliverContainer.classList.add("deliver-map");
    body.prepend(deliverContainer);

    //create player1
    const player1 = document.createElement("div");
    player1.classList.add("car");
    player1.classList.add("player1");
    player1.dataset.px = 'px';
    const suffix = player1.dataset.px;
    deliverContainer.prepend(player1);
    //create player2
    const player2 = document.createElement("div");
    player2.classList.add("car");
    player2.classList.add("player2");
    player2.dataset.px = 'px';
    deliverContainer.prepend(player2);
    let p1PositionY;
    let p1PositionX;
    
    // Div for wrong way effect (red flashback) and for winner effect (full green screen with capture "winner")
    const drivingEffect = document.createElement("div");
    body.prepend(drivingEffect);

    const totalWidth = Number(getComputedStyle(deliverContainer).getPropertyValue("width").slice(0, -2));
    const totalHeight = Number(getComputedStyle(deliverContainer).getPropertyValue("height").slice(0, -2));
    
    function getPlayer1Position(axis) {
        axis === "x" ? p1PositionX = Number(getComputedStyle(document.documentElement).getPropertyValue(`--p1PositionX`).slice(0, -2)) 
        : p1PositionY = Number(getComputedStyle(document.documentElement).getPropertyValue(`--p1PositionY`).slice(0, -2));
    };

    // Starting position and rotate of player1 
    let deg = 90;
    getPlayer1Position("y");
    getPlayer1Position("x");

    function wrongWay() {
        drivingEffect.classList.add("wrong-way");
        setTimeout(() => {
            drivingEffect.classList.remove("wrong-way");
        }, 100);
    };

    console.log(player1)

    function winner() {
        window.removeEventListener("keydown", addKeys);
        setTimeout(() => {
            drivingEffect.classList.add("winner");
            drivingEffect.textContent = "Winner!";
        }, 1000);
    };

    function rideRight(player, playerPositionX, playerPositionY) {
        let cordsX = homesCords.some(home => {
            // check if player1 position would be the same as any home's position and would not be equal to deliver home cords
            return playerPositionX + 80 === home.posX && playerPositionY === home.posY && !(playerPositionX + 80 === deliverCords.posX && playerPositionY === deliverCords.posY);
        });
        if (cordsX) {
                playerPositionX;
                wrongWay();
            } else {
                player.style.transition = `top 0.5s, left 0.5s, transform 0.1s`;
                deg = 90;
                player.style.transform = `rotate(${deg}deg)`;
                getPlayer1Position("x");
                if (playerPositionX < totalWidth) {
                    p1PositionX += 80;
                    document.documentElement.style.setProperty(`--p1PositionX`, p1PositionX + suffix);
                    if (playerPositionY === deliverCords.posY && p1PositionX === deliverCords.posX) {
                        winner();
                    };
                };
            };
      };
    
    function rideLeft() {
        let cordsX = homesCords.some(home => {
            return p1PositionX - 80 === home.posX && p1PositionY === home.posY && !(p1PositionX - 80 === deliverCords.posX && p1PositionY === deliverCords.posY);
        });
        if (cordsX) {
            p1PositionX;
            wrongWay();
        } else {
            if (deg === 0) {
                player1.style.transition = `top 0.5s, left 0.5s, transform 0.1s`;
                player1.style.transform = `rotate(-90deg)`;
                setTimeout(() => {
                    player1.style.transition = `top 0.5s, left 0.5s, transform 0s`;
                    deg = 270;
                    player1.style.transform = `rotate(${deg}deg)`;
                }, 100);
            } else {
                player1.style.transition = `top 0.5s, left 0.5s, transform 0.1s`;
                deg = 270;
                player1.style.transform = `rotate(${deg}deg)`;
            }
            getPlayer1Position("x");
            if (p1PositionX > 0) {
                p1PositionX -= 80;
                document.documentElement.style.setProperty(`--p1PositionX`, p1PositionX + suffix);
                if (p1PositionY === deliverCords.posY && p1PositionX === deliverCords.posX) {
                    winner();
                };
            };
        };
    };
    
    function rideDown() {
        let cordsY = homesCords.some(home => {
            return p1PositionX === home.posX && p1PositionY + 80 === home.posY && !(p1PositionX === deliverCords.posX && p1PositionY + 80 === deliverCords.posY);
        });
        if (cordsY) {
                p1PositionY;
                wrongWay();
            } else {
                player1.style.transition = `top 0.5s, left 0.5s, transform 0.1s`;
                deg = 180;
                player1.style.transform = `rotate(${deg}deg)`;
                getPlayer1Position("y");
                if (p1PositionY + 80 < totalHeight) {
                    p1PositionY += 80;
                    document.documentElement.style.setProperty(`--p1PositionY`, p1PositionY + suffix);
                    if (p1PositionY === deliverCords.posY && p1PositionX === deliverCords.posX) {
                        winner();
                    };
                };
            };
    };
    
    function rideTop() {
        let cordsY = homesCords.some(home => {
            return (p1PositionX === home.posX && p1PositionY - 80 === home.posY) && !(p1PositionX === deliverCords.posX && p1PositionY - 80 === deliverCords.posY);
        });
        if (cordsY) {
            p1PositionY;
            wrongWay();
        } else {
            if (deg === 270) {
                player1.style.transition = `top 0.5s, left 0.5s, transform 0.1s`;
                deg = 360;
                player1.style.transform = `rotate(${deg}deg)`;
            } else if (deg === 360){
                player1.style.transition = `top 0.5s, left 0.5s, transform 0s`;
                deg = 0;
                player1.style.transform = `rotate(${deg}deg)`;
            } else {
                player1.style.transition = `top 0.5s, left 0.5s, transform 0.1s`;
                deg = 0;
                player1.style.transform = `rotate(${deg}deg)`;
            }
            getPlayer1Position("y");
            if (p1PositionY > 0) {
                p1PositionY -= 80;
                document.documentElement.style.setProperty(`--p1PositionY`, p1PositionY + suffix);
                if (p1PositionY === deliverCords.posY && p1PositionX === deliverCords.posX) {
                    winner();
                };
            };
        };
    };
    
    function addKeys(e) {
        if (e.keyCode === 39) {
            rideRight(player1, p1PositionX, p1PositionY);
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
    // Then I refer to that cords when player1 is driving (above in code)
    const deliverCords = deliverTo();
}());

