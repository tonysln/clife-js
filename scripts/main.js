const config = {
    type: Phaser.WEBGL,
    width: 920,
    height: 640,
    pixelArt: true,
    parent: 'game',
    scene: GameScene
};

const game = new Phaser.Game(config);
game.scene.add('UI', UIScene, true);