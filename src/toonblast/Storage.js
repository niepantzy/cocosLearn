var Storage = {
    getCurrentLevel:function () {
        var level = cc.sys.localStorage.getItem("level") || 0;
        return parseInt(level);
    },

    setCurrentLevel:function (level) {
        cc.sys.localStorage.setItem("level",level);
    },

    getCurrentScore:function () {
        var score = cc.sys.localStorage.getItem("score") || 0;
        return parseInt(score);
    },

    setCurrentScore:function (score) {
        var level = cc.sys.localStorage.setItem("score",score);
    },
}