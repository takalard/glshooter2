(function() {

var bulletPool = [];
var activeList = [];

gls2.Danmaku = {};

gls2.Danmaku.setup = function() {
    for (var i = 0; i < 250; i++) {
        var b = gls2.Bullet();
        // b.update = function() {
        //     this.rotation += 10;
        // };
        b.addEventListener("removed", function() {
            bulletPool.push(this);
            var idx = activeList.indexOf(this);
            if (idx !== -1) activeList.splice(idx, 1);
        });

        bulletPool.push(b);
    }

    var config = tm.bulletml.AttackPattern.defaultConfig;
    config.isInsideOfWorld = function(b) {
        return !(b.x < -50 || SC_W+50 < b.x || b.y < -50 || SC_H+50 < b.y);
    };
    config.bulletFactory = function(spec) {
        var b = bulletPool.shift(0);
        if (b) {
            activeList.push(b);

            b.setFrameIndex(1);
            return b;
        } else {
            console.warn("弾が足りない！");
        }
    };
    config.speedRate = 4;
};

var $ = bulletml.dsl;

/** 自機狙い弾 */
var fire0 = $.fire($.direction(0), $.bullet());

gls2.Danmaku["basic0-0"] = new bulletml.Root({
    top: $.action([
        fire0,
    ]),
});

gls2.Danmaku["basic0-4"] = new bulletml.Root({
    top: $.action([
        $.repeat(3, [
            $.repeat(5, [
                $.fire($.direction(-20), $.speed("$loop.count*0.06+0.75"), $.bullet()),
                $.fire($.direction(  0), $.speed("$loop.count*0.06+0.75"), $.bullet()),
                $.fire($.direction(+20), $.speed("$loop.count*0.06+0.75"), $.bullet()),
            ]),
            $.wait(40),
        ]),
    ]),
});

gls2.Danmaku.clearAll = function() {
    var copied = [].concat(activeList);
    for (var i = 0, end = copied.length; i < end; i++) {
        copied[i].remove();
    }
};

gls2.Bullet = tm.createClass({
    superClass: tm.app.Sprite,
    init: function() {
        this.superInit("tex0", 20, 20);
    },
});

})();
