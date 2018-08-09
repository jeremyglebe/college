var DoW = DoW || {};

DoW.game = new Phaser.Game(800, 600, Phaser.AUTO);

DoW.game.state.add('Boot', DoW.Boot);
DoW.game.state.add('Preload', DoW.Preload);
DoW.game.state.add('Menu', DoW.Menu);
DoW.game.state.add('Play', DoW.Play);
DoW.game.state.add('GameOver', DoW.GameOver);

DoW.game.state.start('Boot');