var Sound = {

    silence:false,
    _eatEffect:0,
    playMenuBgMusic:function(){
        if(!Sound.silence){
            cc.audioEngine.playMusic(res.bgGameWelcomeMp3,true);
        }
    },

    playGameBgMusic:function(){
        if(!Sound.silence){
            cc.audioEngine.playMusic(res.bgGameMp3,true);
        }
    },

    playEat:function(){
        if(!Sound.silence){
            if(Sound._eatEffect){
                cc.audioEngine.stopEffect(Sound._eatEffect);
            }
            Sound._eatEffect = cc.audioEngine.playEffect(res.eatMp3,false);
        }
    },
    playCoffee:function(){
        if(!Sound.silence){
            cc.audioEngine.playEffect(res.coffeeMp3,true);
        }
    },
    playMushroom:function(){
        if(!Sound.silence){
            cc.audioEngine.playEffect(res.mushroomMp3,true);
        }
    },
    playHit:function(){
        if(!Sound.silence){
            cc.audioEngine.playEffect(res.hitMp3,true);
        }
    },
    playHurt:function(){
        if(!Sound.silence){
            cc.audioEngine.playEffect(res.hurtMp3,true);
        }
    },
    playLose:function(){
        if(!Sound.silence){
            cc.audioEngine.playEffect(res.loseMp3,true);
        }
    },


    stop:function(){
        cc.audioEngine.stopAllEffects();
        cc.audioEngine.stopMusic();
    },
    toggleOnOff:function () {
        if(Sound.silence){
            Sound.silence = false;
            cc.audioEngine.setEffectsVolume(1);
            cc.audioEngine.setMusicVolume(1);
        }else{
            Sound.silence = true;
            cc.audioEngine.setEffectsVolume(0);
            cc.audioEngine.setMusicVolume(0);
        }
    }
}