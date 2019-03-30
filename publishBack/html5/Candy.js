var Candy  = cc.Sprite.extend({
    type : 0,
    col:0,
    row:0,
    ctor:function (type,col,row) {
        this._super("res/SavePets_Icon_Cube"+(type + 1)+".png");
        this.setScale(Constant.CANDY_WIDTH/this.width,Constant.CANDY_WIDTH/this.height);
        this.init(type,col,row);
    },
    init:function (type,col,row) {
        this.type = type;
        this.col = col;
        this.row = row;
    }
})

Candy.createRandomType = function (col,row) {
    return new Candy(parseInt(Math.random()*Constant.CANDY_TYPE_COUNT),col,row)
}