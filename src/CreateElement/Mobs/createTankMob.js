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
      `${type.toUpperCase()} created successfully - instance.`
    ),
  });

  const mobRender = () => ({
    render: () => {
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.arc(x - size + 10, y + cellSize / 2, size, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();

      //
      x += speed;
    },
  });

  return Object.assign(self, mobRender(), logger(self.type));
};
