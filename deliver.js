// *** app should have way to generate one random house after 45 seconds where player can drive in and get extra 10 coins ***
// *** app should have way to select color of player1 of every player ***
// *** coins would have rotation 3D ***

(function(){
    const body = document.querySelector("body");
    const deliverContainer = document.querySelector(".deliver-map")
    // coin element's cords
    let coinEl;
    let coinTop = 0;
    let coinLeft = 0;
    // timer values
    const minutes = document.querySelector(".minutes")
    const seconds = document.querySelector(".seconds")
    const mins = 2;
    let totalSeconds = mins * 60;
    minutes.textContent = mins + "";
    seconds.textContent = "00";
    //create player1
    const player1 = document.createElement("div");
    player1.classList.add("car");
    player1.classList.add("player1");
    player1.dataset.px = 'px';
    const suffix = player1.dataset.px;
    deliverContainer.prepend(player1);
    const player1ScoreHeader = document.querySelector(".player-one__score");
    let player1Score = 0;
    //create player2
    const player2 = document.createElement("div");
    player2.classList.add("car");
    player2.classList.add("player2");
    player2.dataset.px = 'px';
    deliverContainer.prepend(player2);
    const player2ScoreHeader = document.querySelector(".player-two__score");
    let player2Score = 0;
    // Get total width and height of map container
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



    /********************************************
            FUNCTIONS FOR DRIVING
    ********************************************/

    function rideRight(player, playerPositionX, playerPositionY, setPositionX, setPositionY) {
        playerPositionY = getPlayerPosition(setPositionY ,"y");
        playerPositionX = getPlayerPosition(setPositionX ,"x");
        let cordsX = homesCords.some(home => {
            // check if player's position would be the same as any home's position and would not be equal to deliver home cords
            return playerPositionX + 80 === home.posX && playerPositionY === home.posY;
        });
        if (cordsX || !(playerPositionX < totalWidth)) {
                playerPositionX;
            } else {
                player.style.transition = `top 0.5s, left 0.5s, transform 0.1s`;
                deg = 90;
                player.style.transform = `rotate(${deg}deg)`;
                playerPositionX += 80;
                document.documentElement.style.setProperty(setPositionX, playerPositionX + suffix);
                if (playerPositionY === coinTop && playerPositionX === coinLeft) {
                    getCoin(player);
                };
            };
      };
    
    function rideLeft(player, playerPositionX, playerPositionY, setPositionX, setPositionY) {
        playerPositionY = getPlayerPosition(setPositionY ,"y");
        playerPositionX = getPlayerPosition(setPositionX ,"x");
        let cordsX = homesCords.some(home => {
            return playerPositionX - 80 === home.posX && playerPositionY === home.posY;
        });
        if (cordsX || !(playerPositionX > 0)) {
            playerPositionX;
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
            playerPositionX -= 80;
            document.documentElement.style.setProperty(setPositionX, playerPositionX + suffix);
            if (playerPositionY === coinTop && playerPositionX === coinLeft) {
                getCoin(player);
            };
        };
    };
    function rideDown(player, playerPositionX, playerPositionY ,setPositionX, setPositionY) {
        playerPositionY = getPlayerPosition(setPositionY, "y");
        playerPositionX = getPlayerPosition(setPositionX, "x");
        let cordsY = homesCords.some(home => {
            return playerPositionX === home.posX && playerPositionY + 80 === home.posY;
        });
        if (cordsY || !(playerPositionY + 80 < totalHeight)) {
                playerPositionY;
            } else {
                player.style.transition = `top 0.5s, left 0.5s, transform 0.1s`;
                deg = 180;
                player.style.transform = `rotate(${deg}deg)`;
                playerPositionY += 80;
                document.documentElement.style.setProperty(setPositionY, playerPositionY + suffix);
                if (playerPositionY === coinTop && playerPositionX === coinLeft) {
                    getCoin(player);
                };
            };
    };
    
    function rideTop(player, playerPositionX, playerPositionY, setPositionX, setPositionY) {
        playerPositionY = getPlayerPosition(setPositionY, "y");
        playerPositionX = getPlayerPosition(setPositionX, "x");
        let cordsY = homesCords.some(home => {
            return (playerPositionX === home.posX && playerPositionY - 80 === home.posY);
        });
        if (cordsY || !(playerPositionY > 0)) {
            playerPositionY;
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
            playerPositionY -= 80;
            document.documentElement.style.setProperty(setPositionY, playerPositionY + suffix);
            if (playerPositionY === coinTop && playerPositionX === coinLeft) {
                getCoin(player);
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
    
    window.addEventListener("keyup", player1Control);
    window.addEventListener("keyup", player2Control);
    


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

    

    /***********************************  
            CREATE COINS
    ***********************************/

    function createCoins() {
        let isOnStreet = false;
        for (let i = 0; !isOnStreet; i++) {
            const coinPosY = Math.floor(Math.random() * 8) * 80;
            const coinPosX = Math.floor(Math.random() * 14) * 80;

            isOnHome = homesCords.some(function(home) {
                return home.posX === coinPosX && home.posY === coinPosY;
            });

            if (!isOnHome) {
                const coin = document.createElement("div");
                coin.classList.add("coin");
                coin.style.left = `${coinPosX}px`
                coin.style.top = `${coinPosY}px`
                deliverContainer.prepend(coin);
                isOnStreet = true;
                coinEl = document.querySelector(".coin");
                coinTop = coinPosY;
                coinLeft = coinPosX;
                // Check for bug with doubled coins
                const checkWrongCoins = document.querySelectorAll(".coin");
                if (checkWrongCoins.length > 1) {
                    checkWrongCoins[1].remove();
                };
            };
            !isOnStreet;
        };
    };

    createCoins();

    function getCoin(player) {
        if (player.classList.contains("player1")) {
            player1Score += 1;
            player1ScoreHeader.textContent = player1Score;
        } else if (player.classList.contains("player2")) {
            player2Score += 1;
            player2ScoreHeader.textContent = player2Score;
        }
        coinEl.remove();
        setTimeout(() => {
            createCoins();
        }, 1000);
    };

    /**************************************
            TIMER AND FINISH GAME
    ***************************************/

    const timer = setInterval(function() {
        if (totalSeconds === 0) {
            window.removeEventListener("keyup", player1Control);
            window.removeEventListener("keyup", player2Control);
            clearInterval(timer);
            return;
        };
        --totalSeconds;
        seconds.textContent = formatTimer(totalSeconds % 60);
        minutes.textContent = formatTimer(parseInt(totalSeconds / 60));
    }, 1000);

    function formatTimer(val) {
        let valString = `${val}`;
        if (valString.length < 2) {
            return `0${valString}`;
        } else {
            return valString;
        };
    };
    

}());

