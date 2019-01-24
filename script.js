// *** app should have way to select color of player1 of every player ***

(function() {
	const body = document.querySelector("body");
	const playNode = document.querySelector(".play");
	const introNode = document.querySelector(".intro");
	const deliverContainer = document.querySelector('.deliver-map');
	let isGameRunning = false;
	// coin element's cords
	let coinEl;
	let coinTop = 0;
	let coinLeft = 0;
	// Extra coins
	let extraCoinTime = 0;
	let extraCoinCreated = false;
	// set timer
	let totalSeconds;
	const minutes = document.querySelector('.minutes');
	minutes.textContent = '02';
	const seconds = document.querySelector('.seconds');
	seconds.textContent = '00';
	//create player1
	const player1 = document.createElement('div');
	player1.classList.add('car');
	player1.classList.add('player1');
	player1.style.backgroundImage = 'url("img/black-fastcar.png")';
	player1.dataset.px = 'px';
	const suffix = player1.dataset.px;
	deliverContainer.prepend(player1);
	const player1ScoreHeader = document.querySelector('.player-one__score');
	const addScoreP1 = document.querySelector(".player-one__add-score");
	let player1Score = 0;
	const leftArrowP1 = document.querySelector('.triangle-left.P1');
	const rightArrowP1 = document.querySelector('.triangle-right.P1');
	//create player2
	const player2 = document.createElement('div');
	player2.classList.add('car');
	player2.classList.add('player2');
	player2.style.backgroundImage = 'url("img/black-fastcar.png")';
	player2.dataset.px = 'px';
	deliverContainer.prepend(player2);
	const player2ScoreHeader = document.querySelector('.player-two__score');
	const addScoreP2 = document.querySelector(".player-two__add-score");
	let player2Score = 0;
	const leftArrowP2 = document.querySelector('.triangle-left.P2');
	const rightArrowP2 = document.querySelector('.triangle-right.P2');
	// Get total width and height of map container
	const totalWidth = Number(getComputedStyle(deliverContainer).getPropertyValue('width').slice(0, -2));
	const totalHeight = Number(getComputedStyle(deliverContainer).getPropertyValue('height').slice(0, -2));

	function getPlayerPosition(setPosition, axis) {
		if (axis === 'x') {
			return Number(getComputedStyle(document.documentElement).getPropertyValue(setPosition).slice(0, -2));
		} else if (axis === 'y') {
			return Number(getComputedStyle(document.documentElement).getPropertyValue(setPosition).slice(0, -2));
		}
	}

	const allCars = [
		{
			car: 'url("img/black-fastcar.png")'
		},
		{
			car: 'url("img/black-pickup.png")'
		},
		{
			car: 'url("img/blue-fastcar.png")'
		},
		{
			car: 'url("img/green-fastcar.png")'
		},
		{
			car: 'url("img/red-fastcar.png")'
		},
		{
			car: 'url("img/red-fastcar2.png")'
		},
		{
			car: 'url("img/white-fastcar.png")'
		},
		{
			car: 'url("img/white-fastcar3.png")'
		},
		{
			car: 'url("img/white-van.png")'
		},
		{
			car: 'url("img/yellow-fastcar.png")'
		},
		{
			car: 'url("img/red-fastcar3.png")'
		},
		{
			car: 'url("img/yellow-pickup.png")'
		},
		{
			car: 'url("img/police.png")'
		},
		{
			car: 'url("img/blue-van.png")'
		},
		{
			car: 'url("img/blue-pickup.png")'
		},
		{
			car: 'url("img/black-van.png")'
		},
		{
			car: 'url("img/black-fastcar2.png")'
		},
		
	]
	
	leftArrowP1.addEventListener('click', leftArrowChoose);
	rightArrowP1.addEventListener('click', rightArrowChoose);
	leftArrowP2.addEventListener('click', leftArrowChoose);
	rightArrowP2.addEventListener('click', rightArrowChoose);

	function leftArrowChoose(e) {
		const player = e.currentTarget.classList[1];
		const playerCarChoose = document.querySelector(`.car-image.${player}`);
		const carImg = allCars.findIndex(car => {
			return car.car === playerCarChoose.style.backgroundImage;
		})
		if (carImg === 0 || carImg === -1) {
			return;
		} else if (allCars[carImg - 1].car !== playerCarChoose.style.backgroundImage) {
			playerCarChoose.style.backgroundImage = allCars[carImg - 1].car;
			if (player === 'P1') {
				player1.style.backgroundImage = allCars[carImg - 1].car;
			} else {
				player2.style.backgroundImage = allCars[carImg - 1].car;
			}
		}
	}

	function rightArrowChoose(e) {
		const player = e.currentTarget.classList[1];
		const playerCarChoose = document.querySelector(`.car-image.${player}`);
		const carImg = allCars.findIndex(car => {
			return car.car === playerCarChoose.style.backgroundImage;
		})
		if (carImg === allCars.length - 1 || carImg === -1) {
			playerCarChoose.style.backgroundImage = 'url("img/black-fastcar.png")';
			return;
		} else if (allCars[carImg + 1].car !== playerCarChoose.style.backgroundImage) {
			playerCarChoose.style.backgroundImage = allCars[carImg + 1].car;
			if (player === 'P1') {
				player1.style.backgroundImage = allCars[carImg + 1].car;
			} else {
				player2.style.backgroundImage = allCars[carImg + 1].car;
			}
		}
	}

	// Starting position and rotate of player1
	let deg = 90;
	let p1PositionX = getPlayerPosition('--p1PositionX', 'x');
	let p1PositionY = getPlayerPosition('--p1PositionY', 'y');
	// Starting position and rotate of player2
	let p2PositionX = getPlayerPosition(player2, 'x');
	let p2PositionY = getPlayerPosition(player2, 'y');

	function clickPlay() {
		const gameContainer = document.querySelector(".deliver-game-container");
		introNode.remove();
		gameContainer.style.display = 'block';
		const beforePlay = document.createElement("div");
		beforePlay.classList.add('before-play');
		beforePlay.textContent = 'Click enter to play';
		body.prepend(beforePlay);
		
	}
	playNode.addEventListener('click', clickPlay);

	// START GAME WITH ENTER
	function startGame(e) {
		if (e.keyCode === 13 && !isGameRunning) {
			const beforePlay = document.querySelector(".before-play");
			beforePlay !== null ? beforePlay.remove() : beforePlay;
			totalSeconds = 120;
			const finishGame = document.querySelector(".finish-game");
			finishGame.classList.remove("finish-game-enabled");
			document.documentElement.style.setProperty('--p1PositionX', '0px');
			document.documentElement.style.setProperty('--p1PositionY', '0px');
			document.documentElement.style.setProperty('--p2PositionX', '1100px');
			document.documentElement.style.setProperty('--p2PositionY', '0px');
			startTimer();
			createCoins();
			window.addEventListener('keyup', player1Control);
			window.addEventListener('keyup', player2Control);
			isGameRunning = true;
		}
	}
	window.addEventListener('keydown', startGame);

	/******************************************************************************************************************
                                            FUNCTIONS FOR DRIVING
    ******************************************************************************************************************/

	function rideRight(player, playerPositionX, playerPositionY, setPositionX, setPositionY) {
		playerPositionY = getPlayerPosition(setPositionY, 'y');
		playerPositionX = getPlayerPosition(setPositionX, 'x');
		let cordsX = homesCords.some((home) => {
			// check if player's position would be the same as any home's position and would not be equal to deliver home cords
			return playerPositionX + 50 === home.posX && playerPositionY === home.posY;
		});
		if (cordsX || !(playerPositionX < totalWidth)) {
			playerPositionX;
		} else {
			player.style.transition = `top 0.5s, left 0.5s, transform 0.1s`;
			deg = 90;
			player.style.transform = `rotate(${deg}deg)`;
			playerPositionX += 50;
			document.documentElement.style.setProperty(setPositionX, playerPositionX + suffix);
			if (playerPositionY === coinTop && playerPositionX === coinLeft) {
				getCoin(player);
			}
		}
	}

	function rideLeft(player, playerPositionX, playerPositionY, setPositionX, setPositionY) {
		playerPositionY = getPlayerPosition(setPositionY, 'y');
		playerPositionX = getPlayerPosition(setPositionX, 'x');
		let cordsX = homesCords.some((home) => {
			return playerPositionX - 50 === home.posX && playerPositionY === home.posY;
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
			playerPositionX -= 50;
			document.documentElement.style.setProperty(setPositionX, playerPositionX + suffix);
			if (playerPositionY === coinTop && playerPositionX === coinLeft) {
				getCoin(player);
			}
		}
	}
	function rideDown(player, playerPositionX, playerPositionY, setPositionX, setPositionY) {
		playerPositionY = getPlayerPosition(setPositionY, 'y');
		playerPositionX = getPlayerPosition(setPositionX, 'x');
		let cordsY = homesCords.some((home) => {
			return playerPositionX === home.posX && playerPositionY + 50 === home.posY;
		});
		if (cordsY || !(playerPositionY + 50 < totalHeight)) {
			playerPositionY;
		} else {
			player.style.transition = `top 0.5s, left 0.5s, transform 0.1s`;
			deg = 180;
			player.style.transform = `rotate(${deg}deg)`;
			playerPositionY += 50;
			document.documentElement.style.setProperty(setPositionY, playerPositionY + suffix);
			if (playerPositionY === coinTop && playerPositionX === coinLeft) {
				getCoin(player);
			}
		}
	}

	function rideTop(player, playerPositionX, playerPositionY, setPositionX, setPositionY) {
		playerPositionY = getPlayerPosition(setPositionY, 'y');
		playerPositionX = getPlayerPosition(setPositionX, 'x');
		let cordsY = homesCords.some((home) => {
			return playerPositionX === home.posX && playerPositionY - 50 === home.posY;
		});
		if (cordsY || !(playerPositionY > 0)) {
			playerPositionY;
		} else {
			if (deg === 270) {
				player.style.transition = `top 0.5s, left 0.5s, transform 0.1s`;
				deg = 360;
				player.style.transform = `rotate(${deg}deg)`;
			} else if (deg === 360) {
				player.style.transition = `top 0.5s, left 0.5s, transform 0s`;
				deg = 0;
				player.style.transform = `rotate(${deg}deg)`;
			} else {
				player.style.transition = `top 0.5s, left 0.5s, transform 0.1s`;
				deg = 0;
				player.style.transform = `rotate(${deg}deg)`;
			}
			playerPositionY -= 50;
			document.documentElement.style.setProperty(setPositionY, playerPositionY + suffix);
			if (playerPositionY === coinTop && playerPositionX === coinLeft) {
				getCoin(player);
			}
		}
	}

	function player1Control(e) {
		if (e.keyCode === 39) {
			rideRight(player1, p1PositionX, p1PositionY, '--p1PositionX', '--p1PositionY');
		} else if (e.keyCode === 40) {
			rideDown(player1, p1PositionX, p1PositionY, '--p1PositionX', '--p1PositionY');
		} else if (e.keyCode === 37) {
			rideLeft(player1, p1PositionX, p1PositionY, '--p1PositionX', '--p1PositionY');
		} else if (e.keyCode === 38) {
			rideTop(player1, p1PositionX, p1PositionY, '--p1PositionX', '--p1PositionY');
		}
	}

	function player2Control(e) {
		if (e.keyCode === 68) {
			rideRight(player2, p2PositionX, p2PositionY, '--p2PositionX', '--p2PositionY');
		} else if (e.keyCode === 83) {
			rideDown(player2, p2PositionX, p2PositionY, '--p2PositionX', '--p2PositionY');
		} else if (e.keyCode === 65) {
			rideLeft(player2, p2PositionX, p2PositionY, '--p2PositionX', '--p2PositionY');
		} else if (e.keyCode === 87) {
			rideTop(player2, p2PositionX, p2PositionY, '--p2PositionX', '--p2PositionY');
		}
	}

	/******************************************************************************************************************
                                                    CREATE HOUSES
    //******************************************************************************************************************/

	function createRow(startX, endX, startY) {
		for (let x = startX; x <= endX; x += 50) {
			const y = startY;
			const home = document.createElement('div');
			home.classList.add('home');
			home.style.setProperty('left', `${x}px`);
			home.style.setProperty('top', `${y}px`);
			deliverContainer.append(home);
		}
	}

	function createColumn(startY, endY, startX) {
		for (let y = startY; y <= endY; y += 50) {
			let x = startX;
			const home = document.createElement('div');
			home.classList.add('home');
			home.style.setProperty('top', `${y}px`);
			home.style.setProperty('left', `${x}px`);
			deliverContainer.append(home);
		}
	}

	createRow(0, 200, 50);
	createRow(0, 100, 150);
	createRow(0, 50, 500);
	createRow(0, 150, 700);
	createRow(50, 200, 400);
	createRow(150, 300, 500);
	createRow(250, 300, 600);
	createRow(250, 300, 650);
	createRow(300, 400, 0);
	createRow(400, 500, 700);
	createRow(500, 500, 0);
	createRow(500, 500, 150);
	createRow(500, 500, 250);
	createRow(500, 500, 450);
	createRow(500, 500, 550);

	createColumn(0,300,550);
	createColumn(400,700,550);
	createColumn(50,200,300);
	createColumn(100,150,200);
	createColumn(200,300,0);
	createColumn(250,350,100);
	createColumn(250,350,200);
	createColumn(300,400,300);
	createColumn(100,300,400);
	createColumn(400,600,400);
	createColumn(550,600,50);
	createColumn(550,600,150);

	createRow(900, 1100, 50);
	createRow(700, 800, 0);
	createRow(1000, 1100, 150);
	createRow(1000, 1100, 150);
	createRow(900, 1050, 400);
	createRow(1050, 1100, 500);
	createRow(800, 950, 500);
	createRow(800, 850, 600);
	createRow(800, 850, 650);
	createRow(950, 1100, 700);
	createRow(600, 700, 700);
	createRow(600, 600, 550);
	createRow(600, 600, 450);
	createRow(600, 600, 150);
	createRow(600, 600, 250);
	createRow(600, 600, 0);

	createColumn(50,200,800);
	createColumn(100,300,700);
	createColumn(100,150,900);
	createColumn(400,600,700);
	createColumn(300,400,800);
	createColumn(250,350,900);
	createColumn(250,350,1000);
	createColumn(200,300,1100);
	createColumn(550,600,950);
	createColumn(550,600,1050);

	/* createColumn(80, 560, 0);
	createRow(160, 720, 0);
	createColumn(0, 640, 1040);
	createColumn(0, 240, 800);
	createRow(160, 560, 160);
	createColumn(240, 240, 160);
	createRow(160, 320, 400);
	createRow(320, 480, 320);
	createColumn(160, 320, 640);
	createRow(720, 880, 480);
	createRow(800, 880, 400);
	createRow(480, 560, 480);
	createRow(480, 880, 640);
	createRow(880, 880, 240);
	createRow(880, 880, 80);
	createColumn(560, 640, 160);
	createRow(240, 320, 560); */

	const homes = document.querySelectorAll('.home');
	// Add to every home element class "home"
	homes.forEach((home, index) => {
		if (index % 4 === 0) {
			home.style.backgroundImage = "url('img/bulding-top-3.png')";
		} else if (index % 5 === 0) {
			home.style.backgroundImage = "url('img/bulding-top-2.png')";
		}
	});

	// Create empty array for every home's cords (left, top) values
	let homesCords = [];

	// For every homes elements push object with it's index and position
	homes.forEach((home, i) => {
		homesCords.push({
			home: i,
			posY: Number(getComputedStyle(home).getPropertyValue('top').slice(0, -2)),
			posX: Number(getComputedStyle(home).getPropertyValue('left').slice(0, -2))
		});
	});

	/******************************************************************************************************************  
                                                    CREATE COINS
    ******************************************************************************************************************/

	function createCoins() {
		let isOnStreet = false;

		// Create Extra coin
		if (!extraCoinCreated) {
			extraCoinTime = totalSeconds - Math.ceil(Math.random() * 30);
			extraCoinCreated = true;
		}
		for (let i = 0; !isOnStreet; i++) {
			const coinPosY = Math.floor(Math.random() * 15) * 50;
			const coinPosX = Math.floor(Math.random() * 23) * 50;

			isOnHome = homesCords.some(function(home) {
				return home.posX === coinPosX && home.posY === coinPosY;
			});

			if (!isOnHome) {
				const coin = document.createElement('div');
				coin.classList.add('coin');
				coin.style.left = `${coinPosX}px`;
				coin.style.top = `${coinPosY}px`;
				deliverContainer.prepend(coin);
				coinEl = document.querySelector('.coin');
				coinTop = coinPosY;
				coinLeft = coinPosX;
				// Check for bug with doubled coins
				const checkWrongCoins = document.querySelectorAll('.coin');
				if (checkWrongCoins.length > 1) {
					checkWrongCoins[1].remove();
				}
				isOnStreet = true;
				// Display extra coin
				if (totalSeconds <= extraCoinTime && extraCoinCreated) {
					coin.classList.add('gold');
					extraCoinCreated = false;
				}

			}
		}
	}

	function getCoin(player) {
		if (player.classList.contains('player1')) {
			if (coinEl.classList.contains('gold')) {
				coinEl.remove();
				player1Score += 5;
				player1ScoreHeader.textContent = player1Score;
				addScoreP1.textContent = "+5";
				addScoreAnimation(addScoreP1);
			} else {
				coinEl.remove();
				addScoreP1.style.animation = '';
				player1Score += 1;
				player1ScoreHeader.textContent = player1Score;
				addScoreP1.textContent = "+1";
				addScoreAnimation(addScoreP1);
			}
		} else if (player.classList.contains('player2')) {
			if (coinEl.classList.contains('gold')) {
				coinEl.remove();
				player2Score += 5;
				player2ScoreHeader.textContent = player2Score;	
				addScoreP2.textContent = "+5";
				addScoreAnimation(addScoreP2);
			} else {
				coinEl.remove();
				player2Score += 1;
				player2ScoreHeader.textContent = player2Score;
				addScoreP2.textContent = "+1";
				addScoreAnimation(addScoreP2);
			}
		}
		createCoins();
	}

	function addScoreAnimation(addScoreNode) {
		if (addScoreNode.style.opacity === '' || addScoreNode.style.opacity === '0') {
			addScoreNode.style.opacity = '1';
			setTimeout(() => {
				addScoreNode.style.opacity = '0';
			},1000)
		} else if (addScoreNode.style.opacity === '1') {
			let counter = 0;
			const score = setInterval(() => {
				addScoreNode.style.opacity = '1';
				counter+=1;
				if (counter === 10) {
					addScoreNode.style.opacity = '0';
					clearInterval(score);
				}
			}, 100);
		}
	}

	/******************************************************************************************************************
                                                TIMER AND FINISH GAME
    *******************************************************************************************************************/

	function startTimer() {
		const timer = setInterval(function() {
			--totalSeconds;
			seconds.textContent = formatTimer(totalSeconds % 60);
			minutes.textContent = formatTimer(parseInt(totalSeconds / 60));
			if (totalSeconds === 0) {
				window.removeEventListener('keyup', player1Control);
				window.removeEventListener('keyup', player2Control);
				winner();
				clearInterval(timer);
				return;
			}
		}, 1000);

		function formatTimer(val) {
			let valString = `${val}`;
			if (valString.length < 2) {
				return `0${valString}`;
			} else {
				return valString;
			}
		}
	}

	function winner() {
		const finishGame = document.querySelector(".finish-game");
		const finishP1Score = document.querySelector(".finish-game__player1-score");
		const finishP2Score = document.querySelector(".finish-game__player2-score");
		finishGame.classList.add("finish-game-enabled");
		
		finishP1Score.textContent = `score: ${player1Score}`;
		finishP2Score.textContent = `score: ${player2Score}`;
		
		setTimeout(() => {
			document.documentElement.style.setProperty('--p1PositionX', '0px');
			document.documentElement.style.setProperty('--p1PositionY', '0px');
			document.documentElement.style.setProperty('--p2PositionX', '1100px');
			document.documentElement.style.setProperty('--p2PositionY', '0px');
			player1.style.transform = 'rotate(90deg)';
			player2.style.transform = 'rotate(90deg)';
			setTimeout(() => {
				isGameRunning = false;
			}, 500)
		}, 2000);
	}
})();
