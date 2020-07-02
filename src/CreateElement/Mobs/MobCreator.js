import { centerPointOfTile } from '../../Utils/Tiles/centerPointOfTile';

export const MobCreator = (
  ctx,
  cellSize,
  x,
  y,
  type,
  hp,
  color,
  size,
  speed,
  reward,
  score
) => {
  const self = {
    id: Math.random(),
    ctx,
    cellSize,
    x,
    y,
    type,
    hp,
    color,
    size,
    speed,
    reward,
    score,
  };

  const logger = () => ({
    logOk: console.log(
      `${self.type.type.toUpperCase()} created successfully - instance.`
    ),
  });

  const mobRender = () => ({
    // Self returning from mapping in waveMobsMove
    move: (self) => {
      self.x += speed;
    },
    showHp: (self) => {
      let hpWidth = self.hp / (self.size * 6);
      let xCenter = self.x - self.size * 2;
      let yCenter = self.y - self.size * 2;
      ctx.beginPath();
      ctx.Style = '#FF0000';

      ctx.rect(
        centerPointOfTile(xCenter, cellSize),
        centerPointOfTile(yCenter, cellSize),
        hpWidth,
        2
      );
      ctx.stroke();
    },
    render: (self) => {
      ctx.beginPath();
      self.showHp(self);
      ctx.fillStyle = self.color;
      ctx.arc(
        centerPointOfTile(self.x, cellSize),
        centerPointOfTile(self.y, cellSize),
        self.size,
        0,
        2 * Math.PI
      );
      ctx.fill();
    },
  });

  return Object.assign(self, mobRender(self.x), logger(self.type));
};
