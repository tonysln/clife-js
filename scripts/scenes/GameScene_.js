class GameScene extends Phaser.Scene
{
    constructor()
    {
        super('GameScene');
        this.map;
        this.furnLayer;
        this.g
        this.UIScene;
        this.tileChangeMode;
        this.selectedTile;
    }


    // PRELOAD FUNCTION
    preload()
    {
        this.load.image('tiles', 'assets/tilemaps/iso-64x64-outside.png');
        this.load.image('tiles2', 'assets/tilemaps/iso-64x64-building.png');
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/tilemap.json');
    }


    // CREATE FUNCTION
    create()
    {
        this.hideLoadingLabel();

        this.UIScene = this.scene.get('UIScene');
        this.tileChangeMode = false;
        this.selectedTile = undefined;

        // Tileset & graphics
        this.map = this.add.tilemap('map');
        const tileset1 = this.map.addTilesetImage('iso-64x64-outside', 'tiles');
        const tileset2 = this.map.addTilesetImage('iso-64x64-building', 'tiles2');
        const layer1 = this.map.createLayer('Tile Layer 1', [ tileset1, tileset2 ]);
        const layer2 = this.map.createLayer('Tile Layer 2', [ tileset1, tileset2 ]);
        const layer3 = this.map.createLayer('Tile Layer 3', [ tileset1, tileset2 ]);

        this.furnLayer = layer3;
        this.furnLayer.setCollisionByProperty({ collides: true });

        this.g = this.add.graphics({
            fillStyle: { color: 0xffff00, alpha: 0.75 },
            lineStyle: { color: 0xffff00, alpha: 0.75, width: 1 }
        });


        // Camera
        const cam = this.cameras.main;
        cam.setZoom(1.5);
        cam.scrollX -= 450;
        cam.scrollY += 150;


        // Tile select
        this.input.on('pointerdown', (p) => {
            if (p.rightButtonDown()) {
                this.g.clear();

                const wX = this.input.activePointer.worldX;
                const wY = this.input.activePointer.worldY;
                const tile = this.furnLayer.getTileAtWorldXY(wX, wY);
                if (tile) {
                    this.drawTileBorder(tile, this.g);
                    this.UIScene.showTileChooser()
                    this.tileChangeMode = true;
                    this.selectedTile = tile;
                    console.log(tile.index)
                } else {
                    this.UIScene.hideTileChooser()
                    this.tileChangeMode = false;
                    this.selectedTile = undefined;
                }
            }
        });

        // TODO if mouse drag + selectedTile + leftclickdown
        // move item

        // Mouse drag movement
        this.input.on('pointermove', function(p) {
            if (!p.isDown)
                return;
            
            if (p.leftButtonDown()) {
                cam.scrollX -= (p.x - p.prevPosition.x) / cam.zoom;
                cam.scrollY -= (p.y - p.prevPosition.y) / cam.zoom;
            }
        });


        // Remove pointer captures
        this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.input.off('pointermove');
            this.input.off('pointerdown');
        });
    }


    // UPDATE FUNCTION
    update()
    {   
    }


    // HELPER FUNCTIONS
    replaceTile(val)
    {
        if (this.selectedTile) {
            const t = this.selectedTile;
            this.map.replaceByIndex(t.index, val, t.x, t.y, 1, 1);
        }
    }


    drawTileBorder(tile, graphics)
    {
        const { pixelX, pixelY, width, height } = tile;
        graphics
          .strokeRect(pixelX, pixelY, width, height);
    }


    hideLoadingLabel()
    {
        document.getElementById('loading').style.display = 'none';
    }
}