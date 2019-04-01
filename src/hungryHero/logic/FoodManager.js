var FoodManager = cc.Class.extend({
    _container : null,
    _gameScene: null,
    _itemToAnimate:null,
    ctor:function (gameScene) {
        this._container = gameScene.itemBatchLayer;
        this._gameScene = gameScene;
        this._itemToAnimate = new Array();

    },
    init:function () {
        this.removeAll();
        Game.user.coffee = Game.user.mushroom = 0;
        this._pattern = 1;
        this._patternPosY = cc.director.getWinSize().height - GameConstants.GAME_AREA_TOP_BOTTOM;
        this._patternStep = 15;
        this._patternDirection = 1;
        this._patternGap = 20;
        this._patternGapCount = 0;
        this._patternChangeDistance = 100;
        this._patternLength = 50;
        this._patternOnce = true;
    },

    removeAll:function () {
        if(this._itemToAnimate.length > 0){
            for (var i=this._itemToAnimate.length -1 ; i>= 0; i--){

                var item = this._itemToAnimate[i];
                this._itemToAnimate.splice(i,1);
                cc.pool.putInPool(item);
                this._container.removeChild(item);
            }
        }
    },
    update:function (hero,elapsed) {
        this._setFoodPattern(elapsed);
        this._createFoodPattern(elapsed);
        this._animateFoodItems(hero, elapsed);
    },
    _animateFoodItems:function (hero,elapsed) {
        var item;
        for (var i = this._itemToAnimate.length - 1;i>=0;i--){
            item = this._itemToAnimate[i];
            if(item){
                if(Game.user.mushroom > 0 && item.type <= GameConstants.ITEM_TYPE_5){
                    item.x -= (item.x - hero.x)*0.2;
                    item.y -= (item.y - hero.y)*0.2;
                }else{
                    item.x -= Game.user.heroSpeed * elapsed;
                }

                if(item.x < -80 || Game.gameState == GameConstants.GAME_STATE_OVER){
                    this._itemToAnimate.splice(i,1);
                    cc.pool.putInPool(item);
                    this._container.removeChild(item);
                    continue;
                }else {
                    // Collision detection - Check if the hero eats a food item.
                    var heroItem_xDist = item.x - hero.x;
                    var heroItem_yDist = item.y - hero.y;
                    var heroItem_sqDist = heroItem_xDist * heroItem_xDist + heroItem_yDist * heroItem_yDist;

                    if (heroItem_sqDist < 5000) {
                        // If hero eats an item, add up the score.
                        if (item.type <= GameConstants.ITEM_TYPE_5) {
                            Game.user.score += item.type;
                            Sound.playEat();
                        }
                        else if (item.type == GameConstants.ITEM_TYPE_COFFEE) {
                            // If hero drinks coffee, add up the score.
                            Game.user.score += 1;

                            // How long does coffee power last? (in seconds)
                            Game.user.coffee = 5;
                            this._gameScene.showCoffeeEffect();
                            Sound.playCoffee();
                        }
                        else if (item.type == GameConstants.ITEM_TYPE_MUSHROOM) {
                            // If hero eats a mushroom, add up the score.
                            Game.user.score += 1;

                            // How long does mushroom power last? (in seconds)
                            Game.user.mushroom = 4;
                            this._gameScene.showMushroomEffect();
                            Sound.playMushroom();
                        }

                        // Create an eat particle at the position of the food item that was eaten.
                        this._gameScene.showEatEffect(item.x, item.y);

                        // Dispose the food item.
                        this._itemToAnimate.splice(i, 1);
                        cc.pool.putInPool(item);
                        this._container.removeChild(item);
                    }
                }
            }
        }
    },

    _setFoodPattern:function (elapsed) {
        if(this._patternChangeDistance > 0){
            this._patternChangeDistance -= Game.user.heroSpeed * elapsed;
        }else{
            if (Math.random() < 0.7) {
                // If random number is < normal item chance (0.7), decide on a random pattern for items.
                this._pattern = Math.ceil(Math.random() * 4);
            }
            else {
                // If random number is > normal item chance (0.3), decide on a random special item.
                this._pattern = Math.ceil(Math.random() * 2) + 9;
            }

            if (this._pattern == 1) {
                // Vertical Pattern
                this._patternStep = 15;
                this._patternChangeDistance = Math.random() * 500 + 500;
            }
            else if (this._pattern == 2) {
                // Horizontal Pattern
                this._patternOnce = true;
                this._patternStep = 40;
                this._patternChangeDistance = this._patternGap * Math.random() * 3 + 5;
            }
            else if (this._pattern == 3) {
                // ZigZag Pattern
                this._patternStep = Math.round(Math.random() * 2 + 2) * 10;
                if (Math.random() > 0.5) {
                    this._patternDirection *= -1;
                }
                this._patternChangeDistance = Math.random() * 800 + 800;
            }
            else if (this._pattern == 4) {
                // Random Pattern
                this._patternStep = Math.round(Math.random() * 3 + 2) * 50;
                this._patternChangeDistance = Math.random() * 400 + 400;
            }
            else {
                this._patternChangeDistance = 0;
            }
        }
    },
    _createFoodPattern: function (elapsed) {
        // Create a food item after we pass some distance (patternGap).
        if (this._patternGapCount < this._patternGap) {
            this._patternGapCount += Game.user.heroSpeed * elapsed;
        }
        else if (this._pattern != 0) {
            // If there is a pattern already set.
            this._patternGapCount = 0;
            var winSize = cc.director.getWinSize();
            var item = null;    //Item

            switch (this._pattern) {
                case 1:
                    // Horizontal, creates a single food item, and changes the position of the pattern randomly.
                    if (Math.random() > 0.9) {
                        // Set a new random position for the item, making sure it's not too close to the edges of the screen.
                        this._patternPosY = Math.floor(Math.random() * (winSize.height - 2 * GameConstants.GAME_AREA_TOP_BOTTOM)) + GameConstants.GAME_AREA_TOP_BOTTOM;
                    }

                    // Checkout item from pool and set the type of item.
                    item = Item.create(Math.ceil(Math.random() * 5));

                    // Reset position of item.
                    item.x = winSize.width + item.width;
                    item.y = this._patternPosY;

                    // Mark the item for animation.
                    this._itemToAnimate.push(item);
                    this._container.addChild(item, 1);
                    break;

                case 2:
                    // Vertical, creates a line of food items that could be the height of the entire screen or just a small part of it.
                    if (this._patternOnce == true) {
                        this._patternOnce = false;
                        this._patternPosY = Math.floor(Math.random() * (winSize.height - 2 * GameConstants.GAME_AREA_TOP_BOTTOM)) + GameConstants.GAME_AREA_TOP_BOTTOM;
                        // Set a random length not shorter than 0.4 of the screen, and not longer than 0.8 of the screen.
                        this._patternLength = (Math.random() * 0.4 + 0.4) * winSize.height;
                    }

                    // Set the start position of the food items pattern.
                    this._patternPosYstart = this._patternPosY;

                    // Create a line based on the height of patternLength, but not exceeding the height of the screen.
                    while (this._patternPosYstart + this._patternStep < this._patternPosY + this._patternLength
                    && this._patternPosYstart + this._patternStep < winSize.height * 0.8) {
                        item = Item.create(Math.ceil(Math.random() * 5));
                        item.x = winSize.width + item.width;
                        item.y = this._patternPosYstart;
                        this._itemToAnimate.push(item);
                        this._container.addChild(item, 1);

                        // Increase the position of the next item based on patternStep.
                        this._patternPosYstart += this._patternStep;
                    }
                    break;

                case 3:
                    // ZigZag, creates a single item at a position, and then moves bottom
                    // until it hits the edge of the screen, then changes its direction and creates items
                    // until it hits the upper edge.

                    // Switch the direction of the food items pattern if we hit the edge.
                    if (this._patternDirection == 1 && this._patternPosY < GameConstants.GAME_AREA_TOP_BOTTOM) {
                        this._patternDirection = -1;
                    }
                    else if (this._patternDirection == -1 && this._patternPosY > winSize.height - GameConstants.GAME_AREA_TOP_BOTTOM) {
                        this._patternDirection = 1;
                    }

                    if (this._patternPosY <= winSize.height - GameConstants.GAME_AREA_TOP_BOTTOM && this._patternPosY >= GameConstants.GAME_AREA_TOP_BOTTOM) {
                        item = Item.create(Math.ceil(Math.random() * 5));
                        item.x = winSize.width + item.width;
                        item.y = this._patternPosY;
                        this._itemToAnimate.push(item);
                        this._container.addChild(item, 1);
                        this._patternPosY += this._patternStep * this._patternDirection;
                    }
                    else {
                        this._patternPosY = winSize.height - GameConstants.GAME_AREA_TOP_BOTTOM;
                    }

                    break;

                case 4:
                    // Random, creates a random number of items along the screen.
                    if (Math.random() > 0.5) {
                        // Choose a random starting position along the screen.
                        this._patternPosY = Math.floor(Math.random() * (winSize.height - 2 * GameConstants.GAME_AREA_TOP_BOTTOM)) + GameConstants.GAME_AREA_TOP_BOTTOM;
                        item = Item.create(Math.ceil(Math.random() * 5));
                        item.x = winSize.width + item.width;
                        item.y = this._patternPosY;
                        this._itemToAnimate.push(item);
                        this._container.addChild(item, 1);
                    }
                    break;

                case 10:
                    // Coffee, this item gives you extra speed for a while, and lets you break through obstacles.

                    // Set a new random position for the item, making sure it's not too close to the edges of the screen.
                    this._patternPosY = Math.floor(Math.random() * (winSize.height - 2 * GameConstants.GAME_AREA_TOP_BOTTOM)) + GameConstants.GAME_AREA_TOP_BOTTOM;
                    item = Item.create(GameConstants.ITEM_TYPE_COFFEE);
                    item.x = winSize.width + item.width;
                    item.y = this._patternPosY;
                    this._itemToAnimate.push(item);
                    this._container.addChild(item, 2);
                    break;

                case 11:
                    // Mushroom, this item makes all the food items fly towards the hero for a while.

                    // Set a new random position for the food item, making sure it's not too close to the edges of the screen.
                    this._patternPosY = Math.floor(Math.random() * (winSize.height - 2 * GameConstants.GAME_AREA_TOP_BOTTOM)) + GameConstants.GAME_AREA_TOP_BOTTOM;
                    item = Item.create(GameConstants.ITEM_TYPE_MUSHROOM);
                    item.x = winSize.width + item.width;
                    item.y = this._patternPosY;
                    this._itemToAnimate.push(item);
                    this._container.addChild(item, 3);
                    break;
            }
        }
    },


})