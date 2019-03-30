var res = {
    bg : "res/SavePets_Bg.png",
    one : "res/SavePets_Icon_Cube1.png",
    two : "res/SavePets_Icon_Cube2.png",
    three : "res/SavePets_Icon_Cube3.png",
    four : "res/SavePets_Icon_Cube4.png",
    five : "res/SavePets_Icon_Cube5.png",
    toonblastPlist : "res/toonblast.plist",
    toonblastPng : "res/toonblast.png",
    grossiniPlist : "res/grossini.plist",
    grossiniPng : "res/grossini.png",
    cowPlayerPlist0: "res/DemoPlayer0.plist",
    cowPlayerPng0: "res/DemoPlayer0.png",
    cowPlayerPlist1: "res/DemoPlayer1.plist",
    cowPlayerPng1: "res/DemoPlayer1.png",
    cowPlayerSpine: "res/DemoPlayer.ExportJson",
};
var actions = [
    "res/SavePets_Icon_Cube1.png",
    "res/SavePets_Icon_Cube2.png",
    "res/SavePets_Icon_Cube3.png",
    "res/SavePets_Icon_Cube4.png",
    "res/SavePets_Icon_Cube5.png"
];

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
for (var i in actions) {
    g_resources.push(actions[i]);
}