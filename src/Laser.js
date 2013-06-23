(function() {

var origParticle = null;

gls2.Laser = tm.createClass({
    superClass: tm.app.CanvasElement,
    player: null,
    image: null,
    c: null,
    age: 0,
    hitY: 0,
    rootTexture: null,
    attackPower: 5,

    head: null,
    foot: null,

    init: function(player, texture, texHead, texFoot) {
        this.player = player;
        var tex = tm.asset.AssetManager.get(texture);

        this.superInit();
        this.image = tex.element;
        this.width = tex.width;
        this.height = 480;
        this.blendMode = "lighter";
        this.origin.y = 1;

        this.c = tm.graphics.Canvas();
        this.c.resize(this.width, this.height+100);
        this.c.globalCompositeOperation = "lighter";

        this.head = tm.app.AnimationSprite(tm.app.SpriteSheet({
            image: texHead,
            frame: {
                width: 80,
                height: 80,
            },
            animations: {
                "default": {
                    frames: [ 0, 1, 2, 3 ],
                    next: "default"
                },
            },
        }), 80, 80);
        this.head.gotoAndPlay();
        this.head.blendMode = "lighter";

        this.foot = tm.app.AnimationSprite(tm.app.SpriteSheet({
            image: texFoot,
            frame: {
                width: 128,
                height: 64,
            },
            animations: {
                "default": {
                    frames: [ 0, 1, 2, 3 ],
                    next: "default"
                },
            },
        }), 128, 64);
        this.foot.gotoAndPlay();
        this.foot.blendMode = "lighter";

        if (origParticle === null) {
            var size = 16;
            origParticle = gls2.Particle(size, 1.0, 0.9, tm.graphics.Canvas()
                .resize(size, size)
                .setFillStyle(
                    tm.graphics.RadialGradient(size*0.5, size*0.5, 0, size*0.5, size*0.5, size*0.5)
                        .addColorStopList([
                            {offset:0.0, color: "rgba(255,255,255,1.0)"},
                            {offset:1.0, color: "rgba(  0,  0,255,0.0)"},
                        ]).toStyle()
                )
                .fillRect(0, 0, size, size)
                .element
            );
        }
    },

    update: function(app) {
        this.x = this.player.x;
        this.y = this.player.y - 30;
        this.age += 1;
        this.hitY -= 50;
        if (this.hitY < -80) this.hitY = -80;

        if (!this.visible) {
            return;
        }

        var copied = [].concat(gls2.Enemy.activeList);
        copied.sort(function(l, r) {
            return r.y - l.y;
        });
        for (var i = 0, len = copied.length; i < len; i++) {
            var e = copied[i];
            if (this.hitY-30 < e.y && e.y < this.y && this.x-40 < e.x && e.x < this.x+40) {
                if (!e.damage(this.attackPower)) {
                    this.hitY = e.y;
                } else {
                    this.genParticle(3);
                }

                if (app.frame % 2 === 0) {
                    this.genParticle(2);
                }
            }
        }

        this.head._updateFrame();
        this.foot._updateFrame();
    },

    genParticle: function(count) {
        for (var i = 0; i < count; i++) {
            var p = origParticle.clone().setPosition(this.x, this.hitY).addChildTo(this.parent);
            var speed = Math.randf(8, 14);
            var dir = Math.randf(0, Math.PI);
            p.dx = Math.cos(dir) * speed;
            p.dy = Math.sin(dir) * speed;
            p.scaleX = p.scaleY = (Math.randf(0.5, 1.5) + Math.randf(0.5, 1.5)) / 2;
            p.addEventListener("enterframe", function() {
                this.x += this.dx;
                this.y += this.dy;
                this.dx *= 0.9;
                this.dy *= 0.9;
            });
        }
    },

    draw: function(canvas) {
        var y = (this.age*15) % 240;
        this.c.clear();
        for (var i = 0; i < 4; i++) {
            this.c.drawImage(this.image, 0, -y + 240*i);
        }

        this.height = Math.max(this.y - this.hitY, 1);
        canvas.context.drawImage(this.c.element,
            0, this.c.height-this.height, this.c.width, this.height,
            -this.width*this.origin.x, -this.height*this.origin.y, this.width, this.height);

        var srcRect = this.head.ss.getFrame(this.head.currentFrame);
        var element = this.head.ss.image.element;
        canvas.drawImage(element,
            srcRect.x, srcRect.y, srcRect.width, srcRect.height,
            -this.width*this.origin.x-43, -this.height*this.origin.y-75, 150, 150);

        srcRect = this.foot.ss.getFrame(this.foot.currentFrame);
        element = this.foot.ss.image.element;
        canvas.drawImage(element,
            srcRect.x, srcRect.y, srcRect.width, srcRect.height,
            -this.width*this.origin.x-43, -this.height*this.origin.y+this.height-37, 150, 74);

    },
});

})();
