/*
 * License
 * http://daishihmr.mit-license.org/
 */
(function() {

/**
 * @class
 * @extends {gls2.Stage}
 */
gls2.Stage2 = tm.createClass(
/** @lends {gls2.Stage1.prototype} */
{
    superClass: gls2.Stage,

    init: function(gameScene) {
        this.superInit(gameScene);

        this.seq.add(  0, function() {
            gls2.playBgm("bgm2", true),
            this.gameScene.ground.direction = Math.PI*0.5;
            this.gameScene.ground.speed = 0.3;
        });

        this.seq.add(200, "tank25-top");
        this.seq.add(160, "heri1-left");
        this.seq.add(100, "heri1-right");
        this.seq.add(190, "komachi2-0");
        this.seq.add( 10, "cannon2-4");
        this.seq.add( 80, "komachi2-1");
        this.seq.add(600, "tank15-top");

        this.seq.add(  1, function() {
            this.gameScene.ground.tweener
                .clear()
                .to({speed:1}, 5000, "easeInOutQuad")
                .to({direction:Math.PI}, 5000, "easeInOutQuad")
        });

        this.seq.add( 60, "heri2-center");
        this.seq.add( 60, "heri2-center");
        this.seq.add( 60, "heri2-center");
        this.seq.add( 20, "tankRD-center");
        this.seq.add( 20, "tankL-top");
        this.seq.add( 20, "cannon-R0");
        this.seq.add(  1, "cannon-R2");
        this.seq.add( 40, "heri2-center");
        this.seq.add( 60, "heri2-center");
        this.seq.add( 60, "heri2-center");
        this.seq.add( 60, "cannon-R1");
        this.seq.add(  1, "heri2-center");
        this.seq.add(  1, "heri2-left");
        this.seq.add(  1, "heri2-right");
        this.seq.add( 30, "tankL-top");
        this.seq.add(  1, "cannon2-R0");

        this.seq.add(  1, function() {
            this.gameScene.ground.tweener
                .clear()
                .to({speed:0.3}, 5000, "easeInOutQuad")
                .to({
                    direction: Math.PI*0.25,
                    speed: 1,
                }, 12000, "easeInOutQuad");
        });

        this.seq.add(100, "cannon2-R0");

        this.seq.add(600, "tank5-center");
        this.seq.add(  1, "cannon-3");
        this.seq.add( 90, "heri2-left");
        this.seq.add(  1, "cannon-2");
        this.seq.add( 90, "tank5-left");
        this.seq.add(  1, "cannon-1");
        this.seq.add( 90, "heri2-left");
        this.seq.add(  1, "cannon-0");
        this.seq.add( 90, "heri2-left");
        this.seq.add( 60, "tank5-left");

        this.seq.add(  1, function() {
            this.gameScene.ground.tweener
                .clear()
                .to({direction:Math.PI*0.5}, 5000, "easeInOutQuad");
        });

        this.seq.add( 60, "tank15-top");
        this.seq.add( 60, "heri1-left2");

    },

    setupBackground: function() {
        this.gameScene.ground.background = tm.graphics.LinearGradient(0, 0, 0, SC_H).addColorStopList([
            { offset:0, color:"hsl(130,30%,20%)" },
            { offset:1, color:"hsl(130,30%, 5%)" },
        ]).toStyle();
    },

});

})();
