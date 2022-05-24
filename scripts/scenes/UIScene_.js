class UIScene extends Phaser.Scene
{
    constructor()
    {
        super('UIScene');
        this.g;
        this.g2;
        this.gameScene;
        this.tileChooserUI
    }

    // PRELOAD FUNCTION
    preload()
    {
    }


    // CREATE FUNCTION
    create()
    {
        this.gameScene = this.scene.get('GameScene');

        // UI
        const navBoxX = 920 - 50;
        const navBoxY = 10;
        const tileChooserH = 100;
        const tileChooserY = 640 - 10 - tileChooserH;

        this.g = this.add.graphics();
        this.g.lineStyle(1, 0x454545, 1.0);
        this.g.fillStyle(0x1c1c1c, 0.95);
        this.g.fillRect(navBoxX, navBoxY, 40, 26);
        this.g.strokeRect(navBoxX, navBoxY, 40, 26);

        const zoomInButton = this.add.text(navBoxX + 6, navBoxY + 6, '+', { fill: '#fff' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.zoomIn());

        const zoomOutButton = this.add.text(navBoxX + 23, navBoxY + 5, '-', { fill: '#fff' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.zoomOut());


        // Tile Chooser
        this.g2 = this.add.graphics();
        this.g2.lineStyle(1, 0x454545, 1.0);
        this.g2.fillStyle(0x1c1c1c, 0.95);
        this.g2.fillRect(10, tileChooserY, 700, tileChooserH);
        this.g2.strokeRect(10, tileChooserY, 700, tileChooserH);
        this.g2.visible = false;

        const tileChooserUICloseBtn = this.add.text(14, tileChooserY + 2, 'x', { fill: '#fff' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.hideTileChooser(212));

        
        const tileChooserUIOpt1 = this.add.text(50, tileChooserY + 60, 'Table', { fill: '#fff' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.gameScene.replaceTile(212));

        const tileChooserUIOpt2 = this.add.text(150, tileChooserY + 60, 'Chair', { fill: '#fff' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.gameScene.replaceTile(213));

        const tileChooserUIOpt3 = this.add.text(250, tileChooserY + 60, 'Water', { fill: '#fff' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.gameScene.replaceTile(220));

        const tileChooserUIOpt4 = this.add.text(350, tileChooserY + 60, 'Plant 1', { fill: '#fff' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.gameScene.replaceTile(130));

        const tileChooserUIOpt5 = this.add.text(460, tileChooserY + 60, 'Plant 2', { fill: '#fff' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.gameScene.replaceTile(128));

        const tileChooserUIOpt6 = this.add.text(580, tileChooserY + 60, 'Plant 3', { fill: '#fff' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.gameScene.replaceTile(121));


        this.tileChooserUI = [tileChooserUICloseBtn, tileChooserUIOpt1, tileChooserUIOpt2, tileChooserUIOpt3, tileChooserUIOpt4, tileChooserUIOpt5, tileChooserUIOpt6];
        this.tileChooserUI.forEach(x => x.visible = false);
    }


    showTileChooser()
    {
        this.g2.visible = true;
        this.tileChooserUI.forEach(x => x.visible = true);
    }


    hideTileChooser()
    {
        this.g2.visible = false;
        this.gameScene.tileChangeMode = false;
        this.gameScene.selectedTile = undefined;
        this.gameScene.g.clear();
        this.tileChooserUI.forEach(x => x.visible = false);
    }


    zoomIn()
    {   
        if (this.gameScene.cameras.main.zoom <= 2.0)
            this.gameScene.cameras.main.zoom += 0.5;
    }


    zoomOut()
    {
        if (this.gameScene.cameras.main.zoom >= 1.0)
            this.gameScene.cameras.main.zoom -= 0.5;
    }


    // UPDATE FUNCTION
    update()
    {
    }
}