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
    
    // Div for wrong way effect (red flashback) and for winner effect (full green screen with capture "winner")
    const drivingEffect = document.createElement("div");
    body.prepend(drivingEffect);

    const totalWidth = Number(getComputedStyle(deliverContainer).getPropertyValue("width").slice(0, -2));
    const totalHeight = Number(getComputedStyle(deliverContainer).getPropertyValue("height").slice(0, -2));
    
    function getPlayerPosition(setPosition, axis) {
        if (axis === "x") {
            return Number(getComputedStyle(document.documentElement).getPropertyValue(setPosition).slice(0, -2));
        } else if (axis === "y") {
            return Number(getComputedStyle(document.documentElement).getPropertyValue(setPosition).slice(0, -2));
        }
    };

    // Starting position and rotate of player1 
    let deg = 90;
    let p1PositionX = getPlayerPosition("--p1PositionX" ,"x");
    let p1PositionY = getPlayerPosition("--p1PositionY", "y");

    // Starting position and rotate of player2 
    let p2PositionX = getPlayerPosition(player2 ,"x");
    let p2PositionY = getPlayerPosition(player2, "y");

    function wrongWay() {
        drivingEffect.classList.add("wrong-way");
        setTimeout(() => {
            drivingEffect.classList.remove("wrong-way");
        }, 100);
    };

    function winner() {
        window.removeEventListener("keydown", player1Control);
        window.removeEventListener("keydown", player2Control);
        setTimeout(() => {
            drivingEffect.classList.add("winner");
            drivingEffect.textContent = "Winner!";
        }, 1000);
    };

    function rideRight(player, playerPositionX, playerPositionY, setPositionX, setPositionY) {
        playerPositionY = getPlayerPosition(setPositionY ,"y");
        playerPositionX = getPlayerPosition(setPositionX ,"x");
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
                playerPositionX = getPlayerPosition(setPositionX ,"x");
                if (playerPositionX < totalWidth) {
                    playerPositionX += 80;
                    document.documentElement.style.setProperty(setPositionX, playerPositionX + suffix);
                    if (playerPositionY === deliverCords.posY && playerPositionX === deliverCords.posX) {
                        winner();
                    };
                };
            };
      };
    
    function rideLeft(player, playerPositionX, playerPositionY, setPositionX, setPositionY) {
        playerPositionY = getPlayerPosition(setPositionY ,"y");
        playerPositionX = getPlayerPosition(setPositionX ,"x");
        let cordsX = homesCords.some(home => {
            return playerPositionX - 80 === home.posX && playerPositionY === home.posY && !(playerPositionX - 80 === deliverCords.posX && playerPositionY === deliverCords.posY);
        });
        if (cordsX) {
            playerPositionX;
            wrongWay();
        } else {
            if (deg === 0) {
                player.style.transition = `top 0.5s, left 0.5s, transform 0.1s`;
                player.style.transform = `rotate(-90deg)`;
                setTimeout(() => {
                    player.style.transition = `top 0.5s, left 0.5s, transform 0s`;
                    deg = 270;
                    player.style.transform = `rotate(${deg}deg)`;
                }, 100);
            } else {
                player.style.transition = `top 0.5s, left 0.5s, transform 0.1s`;
                deg = 270;
                player.style.transform = `rotate(${deg}deg)`;
            }
            playerPositionX = getPlayerPosition(setPositionX ,"x");
            if (playerPositionX > 0) {
                playerPositionX -= 80;
                document.documentElement.style.setProperty(setPositionX, playerPositionX + suffix);
                if (playerPositionY === deliverCords.posY && playerPositionX === deliverCords.posX) {
                    winner();
                };
            };
        };
    };
    function rideDown(player, playerPositionX, playerPositionY ,setPositionX, setPositionY) {
        playerPositionY = getPlayerPosition(setPositionY, "y");
        playerPositionX = getPlayerPosition(setPositionX, "x");
        let cordsY = homesCords.some(home => {
            return playerPositionX === home.posX && playerPositionY + 80 === home.posY && !(playerPositionX === deliverCords.posX && playerPositionY + 80 === deliverCords.posY);
        });
        if (cordsY) {
                playerPositionY;
                wrongWay();
            } else {
                player.style.transition = `top 0.5s, left 0.5s, transform 0.1s`;
                deg = 180;
                player.style.transform = `rotate(${deg}deg)`;
                playerPositionY = getPlayerPosition(setPositionY, "y");
                if (playerPositionY + 80 < totalHeight) {
                    playerPositionY += 80;
                    document.documentElement.style.setProperty(setPositionY, playerPositionY + suffix);
                    if (playerPositionY === deliverCords.posY && playerPositionX === deliverCords.posX) {
                        winner();
                    };
                };
            };
    };
    
    function rideTop(player, playerPositionX, playerPositionY, setPositionX, setPositionY) {
        playerPositionY = getPlayerPosition(setPositionY, "y");
        playerPositionX = getPlayerPosition(setPositionX, "x");
        let cordsY = homesCords.some(home => {
            return (playerPositionX === home.posX && playerPositionY - 80 === home.posY) && !(playerPositionX === deliverCords.posX && playerPositionY - 80 === deliverCords.posY);
        });
        if (cordsY) {
            playerPositionY;
            wrongWay();
        } else {
            if (deg === 270) {
                player.style.transition = `top 0.5s, left 0.5s, transform 0.1s`;
                deg = 360;
                player.style.transform = `rotate(${deg}deg)`;
            } else if (deg === 360){
                player.style.transition = `top 0.5s, left 0.5s, transform 0s`;
                deg = 0;
                player.style.transform = `rotate(${deg}deg)`;
            } else {
                player.style.transition = `top 0.5s, left 0.5s, transform 0.1s`;
                deg = 0;
                player.style.transform = `rotate(${deg}deg)`;
            }
            playerPositionY = getPlayerPosition(setPositionY, "y");
            if (playerPositionY > 0) {
                playerPositionY -= 80;
                document.documentElement.style.setProperty(setPositionY, playerPositionY + suffix);
                if (playerPositionY === deliverCords.posY && playerPositionX === deliverCords.posX) {
                    winner();
                };
            };
        };
    };
    
    function player1Control(e) {
        if (e.keyCode === 39) {
            rideRight(player1, p1PositionX, p1PositionY, "--p1PositionX", "--p1PositionY");
        } else if (e.keyCode === 40) {
            rideDown(player1, p1PositionX, p1PositionY, "--p1PositionX", "--p1PositionY");
        } else if (e.keyCode === 37) {
            rideLeft(player1, p1PositionX, p1PositionY, "--p1PositionX", "--p1PositionY");
        } else if (e.keyCode === 38) {
            rideTop(player1, p1PositionX, p1PositionY, "--p1PositionX", "--p1PositionY");
        };
    };

    function player2Control(e) {
        if (e.keyCode === 68) {
            rideRight(player2, p2PositionX, p2PositionY, "--p2PositionX", "--p2PositionY");
        } else if (e.keyCode === 83) {
            rideDown(player2, p2PositionX, p2PositionY, "--p2PositionX", "--p2PositionY");
        } else if (e.keyCode === 65) {
            rideLeft(player2, p2PositionX, p2PositionY, "--p2PositionX", "--p2PositionY");
        } else if (e.keyCode === 87) {
            rideTop(player2, p2PositionX, p2PositionY, "--p2PositionX", "--p2PositionY");
        };
    };
    
    window.addEventListener("keydown", player1Control);
    window.addEventListener("keydown", player2Control);
    
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

