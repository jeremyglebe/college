var DoW = DoW || {};

//Game configuration
var conf = {
    width: 1080,
    height: 1920,
    renderer: Phaser.AUTO,
    forceSetTimeOut: true
};
DoW.game = new Phaser.Game(conf);

DoW.game.state.add('Boot', DoW.Boot);
DoW.game.state.add('Preload', DoW.Preload);
DoW.game.state.add('Menu', DoW.Menu);
DoW.game.state.add('Play', DoW.Play);
DoW.game.state.add('GameOver', DoW.GameOver);

DoW.game.state.start('Boot');