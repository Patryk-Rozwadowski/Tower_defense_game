export const mobCreator = (
  ctx,
  cellSize,
  x,
  y,
  type,
  hp,
  color,
  size,
  speed
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
    render: (self) => {
      ctx.beginPath();
      ctx.fillStyle = self.color;
      ctx.arc(
        self.x - self.size + 10,
        self.y + self.cellSize / 2,
        self.size,
        0,
        2 * Math.PI
      );
      ctx.fill();
      ctx.stroke();
    },
  });

  return Object.assign(self, mobRender(self.x), logger(self.type));
};
