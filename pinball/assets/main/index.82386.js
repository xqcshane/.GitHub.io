window.__require=function t(e,i,n){function o(r,a){if(!i[r]){if(!e[r]){var s=r.split("/");if(s=s[s.length-1],!e[s]){var h="function"==typeof __require&&__require;if(!a&&h)return h(s,!0);if(c)return c(s,!0);throw new Error("Cannot find module '"+r+"'")}r=s}var l=i[r]={exports:{}};e[r][0].call(l.exports,function(t){return o(e[r][1][t]||t)},l,l.exports,t,e,i,n)}return i[r].exports}for(var c="function"==typeof __require&&__require,r=0;r<n.length;r++)o(n[r]);return o}({Ball:[function(t,e,i){"use strict";cc._RF.push(e,"1d3eco/MrRNJrBdpHK5Et9m","Ball");var n=t("./Config"),o=cc.Class({extends:cc.Component,properties:function(){return{rigidBody:{type:cc.RigidBody,default:null},isTouchedGround:!1}},onLoad:function(){this.rigidBody=this.getComponent(cc.RigidBody),this.collider=this.getComponent(cc.Collider)},update:function(t){if(this.isTouchedGround){this.rigidBody.active=!1,this.rigidBody.linearVelocity=cc.Vec2.ZERO;var e=[];e.push(this.node.position),e.push(cc.v2(349,-498)),e.push(cc.v2(338,608)),e.push(cc.v2(162,557)),this.node.runAction(cc.sequence(cc.cardinalSplineTo(1,e,.9),cc.callFunc(function(){this.rigidBody.active=!0,this.node.group=n.groupBallInRecycle,this.main.recycleBall()}.bind(this)))),this.isTouchedGround=!1}},onBeginContact:function(t,e,i){"ground"==i.node.name&&(this.isTouchedGround=!0)}});e.exports=o,cc._RF.pop()},{"./Config":"Config"}],Barrier:[function(t,e,i){"use strict";cc._RF.push(e,"60c62mT6OhALLjJRsK7kVMV","Barrier");var n=cc.Class({extends:cc.Component,properties:function(){return{lbScore:{default:null,type:cc.Label},isAddBuffBall:!1}},start:function(){this.lbScore&&(this.lbScore.node.rotation=-this.node.rotation),this.setScore(this.main.setBarrierScore()),this.node.color=cc.color(200,this.randomNum(0,255),this.randomNum(0,255),255)},randomNum:function(t,e){var i=e-t,n=Math.random();return t+Math.floor(n*i)},setScore:function(t){this.lbScore&&(this.score=t,this.lbScore.string=this.score.toString())},onBeginContact:function(t,e,i){this.isAddBuffBall?(this.main.addBall(this.node.position),this.main.removeBarrier(this)):(this.main.addScore(),1==this.score?this.main.removeBarrier(this):(this.setScore(this.score-1),this.main.shake(this)))}});e.exports=n,cc._RF.pop()},{}],Config:[function(t,e,i){"use strict";cc._RF.push(e,"12c6crNXPJI1reYdtydpz+A","Config"),e.exports={groupBallInGame:"ballInGame",groupBallInRecycle:"ballInRecycle"},cc._RF.pop()},{}],Home:[function(t,e,i){"use strict";cc._RF.push(e,"0aa66nDyExOQZoRfwfov4dw","Home"),cc.Class({extends:cc.Component,properties:{progressBar:null,loadingLabel:cc.Label,startButton:cc.Button},onLoad:function(){cc.director.preloadScene("game",this.onProgress.bind(this),this.onLoaded.bind(this))},start:function(){this.progressBar=this.node.getChildByName("progressBar").getComponent(cc.ProgressBar),this.startButton.node.active=!1},onProgress:function(t,e,i){var n=t/e;this.progressBar.progress=n,this.loadingLabel.string="\u52a0\u8f7d\u4e2d...\uff08"+parseInt(100*n).toString()+"\uff09"},onLoaded:function(){this.loadingLabel.string="\u52a0\u8f7d\u5b8c\u6210\uff08100%\uff09",this.startButton.node.active=!0}}),cc._RF.pop()},{}],MainController:[function(t,e,i){"use strict";cc._RF.push(e,"127dcBUoo1D6LKVwdsIyXAx","MainController");var n=t("./Ball"),o=t("./Barrier"),c=t("./Config");t("./Shake");var r=cc.Class({extends:cc.Component,properties:function(){return{prefabBarriers:{type:cc.Prefab,default:[]},prefabBall:cc.Prefab,balls:{type:n,default:[]},barriers:{type:o,default:[]},lbScoreCount:cc.Label,ballCount:cc.Label,guide:cc.Node,gameStatus:!0,gameOverMark:cc.Node,takeAim:cc.Node}},onLoad:function(){cc.director.getPhysicsManager().enabled=!0,cc.director.getActionManager().gravity=cc.v2(0,-1e3),this.node.on(cc.Node.EventType.TOUCH_START,this.onTouchStart,this),this.node.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this),this.init(),this.guideShow(),this.addBarriers()},init:function(){this.score=0,this.recycleBallsCount=1,this.barrierScoreRate=0,this.balls[0].main=this,this.balls[0].node.group=c.groupBallInRecycle,this.gameOverMark.active=!1,this.gameOverMark.zIndex=10,this.guide.zIndex=10,this.guide.active=!1,this.takeAim.main=this},onTouchStart:function(){this.guideHide()},onTouchEnd:function(t){if(this.isRecycleFinished()){this.node.getChildByName("take-aim").getComponent(cc.Graphics).clear(),this.recycleBallsCount=0;var e=this.node.convertTouchToNodeSpaceAR(t.touch);this.shootBalls(e.sub(cc.v2(0,420)))}},addBall:function(t){var e=cc.instantiate(this.prefabBall).getComponent(n);e.node.parent=this.node,e.node.position=t,e.main=this,e.node.group=c.groupBallInGame,this.balls.push(e),this.setBallCount(this.balls.length)},setBallCount:function(t){this.ballCount.string="\u5c0f\u7403\u6570\uff1a"+t.toString()},shootBalls:function(t){var e=this;if(this.gameStatus)for(var i=function(i){var n=e.balls[i];e.scheduleOnce(function(){this.shootBall(n,t)}.bind(e),.2*i)},n=0;n<this.balls.length;n++)i(n)},shootBall:function(t,e){t.rigidBody.active=!1;var i=[];i.push(t.node.position),i.push(cc.v2(0,420)),t.node.group=c.groupBallInGame,t.node.runAction(cc.sequence(cc.cardinalSplineTo(.8,i,.5),cc.callFunc(function(){t.rigidBody.active=!0,t.rigidBody.linearVelocity=e.mul(3)})))},recycleBall:function(){var t=this;if(this.recycleBallsCount++,this.barrierScoreRate+=.1,this.isRecycleFinished()){for(var e=function(e){var i=t.barriers[e];i.node.runAction(cc.sequence(cc.moveBy(.5,cc.v2(0,100)),cc.callFunc(function(){i.node.position.y>200&&i.node.runAction(cc.shake(1.5,3,3)),i.node.position.y>300&&this.gameOver()}.bind(t))))},i=0;i<this.barriers.length;i++)e(i);this.addBarriers()}},isRecycleFinished:function(){return this.recycleBallsCount==this.balls.length},addBarriers:function(){for(var t=-270+this.getRandomSpace();t<270;){var e=cc.instantiate(this.prefabBarriers[Math.floor(Math.random()*this.prefabBarriers.length)]).getComponent(o);e.node.parent=this.node,e.node.position=cc.v2(t,-410),e.lbScore&&(e.node.rotation=360*Math.random()),e.main=this,t+=this.getRandomSpace(),this.barriers.push(e)}},shake:function(t){var e=cc.shake(.7,1,1);t.node.runAction(e)},addScore:function(){this.score++,this.lbScoreCount.string="\u5206\u6570\uff1a"+this.score.toString()},setBarrierScore:function(){return Math.floor(this.randomNum(1+2*this.barrierScoreRate,5+3*this.barrierScoreRate))},removeBarrier:function(t){var e=this.barriers.indexOf(t);-1!=e&&(t.node.removeFromParent(!1),this.barriers.splice(e,1))},getRandomSpace:function(){return 80+200*Math.random()},randomNum:function(t,e){var i=e-t,n=Math.random();return t+Math.floor(n*i)},guideShow:function(){this.guide.active=!0,this.guide.getChildByName("handMove").getComponent(cc.Animation).play("handMove")},guideHide:function(){this.guide.active=!1,this.guide.getChildByName("handMove").getComponent(cc.Animation).stop("handMove")},gameStart:function(){cc.director.loadScene("game")},gameOver:function(){this.gameStatus=!1,this.gameOverMark.active=!0,this.gameOverMark.getChildByName("score").getComponent(cc.Label).string="\u5f97\u5206\uff1a"+this.score.toString()}});e.exports=r,cc._RF.pop()},{"./Ball":"Ball","./Barrier":"Barrier","./Config":"Config","./Shake":"Shake"}],Shake:[function(t,e,i){"use strict";cc._RF.push(e,"f3b0cFDpm9ATLXIIKo9XlwM","Shake"),cc.Shake=cc.ActionInterval.extend({_initial_x:0,_initial_y:0,_strength_x:0,_strength_y:0,ctor:function(t,e,i){this.initWithDuration(t,e,i)},initWithDuration:function(t,e,i){return cc.ActionInterval.prototype.initWithDuration.call(this,t),this._strength_x=e,this._strength_y=i,!0},rangeRand:function(t,e){return Math.random()*(e-t)+t},update:function(){var t=this.rangeRand(-this._strength_x,this._strength_x),e=this.rangeRand(-this._strength_y,this._strength_y);this.getTarget().setPosition(t+this._initial_x,e+this._initial_y)},startWithTarget:function(t){cc.ActionInterval.prototype.startWithTarget.call(this,t),this._initial_x=t.x,this._initial_y=t.y},stop:function(){this.getTarget().setPosition(new cc.Vec2(this._initial_x,this._initial_y)),cc.ActionInterval.prototype.stop.call(this)}}),cc.shake=function(t,e,i){return new cc.Shake(t,e,i)},cc._RF.pop()},{}],TakeAim:[function(t,e,i){"use strict";cc._RF.push(e,"47e07n9NFtIvo4368Li4gPR","TakeAim"),cc.Class({extends:cc.Component,properties:function(){return{arraw:cc.Sprite}},onLoad:function(){this.node.on(cc.Node.EventType.TOUCH_MOVE,this.onTouchMove,this)},onTouchMove:function(t){if(this.node.main.isRecycleFinished()){var e=cc.v2(0,446),i=this.node.convertTouchToNodeSpaceAR(t.touch);if(!(i.y>e.y)){var n=this.node.getComponent(cc.Graphics),o=i.sub(e),c=o.mag(),r=o.normalize().mul(40),a=e.clone();for(n.fillColor=cc.color(255,255,255,150),a.addSelf(r),a.addSelf(r),n.clear();c>40;)n.circle(a.x,a.y,5),n.fill(),a.addSelf(r),c-=40;var s=e.sub(i),h=Math.atan2(s.y,s.x)/Math.PI*180;this.arraw.node.rotation=-h}}}}),cc._RF.pop()},{}],gameStart:[function(t,e,i){"use strict";cc._RF.push(e,"1efc6oQvkdKzJdKa98PGRNk","gameStart"),cc.Class({extends:cc.Component,onLoad:function(){this.node.on("click",this.gameStart,this)},gameStart:function(){cc.director.loadScene("game")}}),cc._RF.pop()},{}],"use_v2.0.x_cc.Toggle_event":[function(t,e,i){"use strict";cc._RF.push(e,"49ec5y59ZNKLKU0ksGt4fwl","use_v2.0.x_cc.Toggle_event"),cc.Toggle&&(cc.Toggle._triggerEventInScript_check=!0),cc._RF.pop()},{}]},{},["use_v2.0.x_cc.Toggle_event","Ball","Barrier","Config","Home","MainController","Shake","TakeAim","gameStart"]);