'use strict';

const MINDIST = 20;
const TOL = 0.1;
const TOLxTOL = 0.01;
export const DEFAULT_RADIUS = 15;
export const Point = function (x, y) {
  this.x = x;
  this.y = y;
}

export const LEFT = 'Left';
export const RIGHT = 'Right';
export const TOP = 'Top';
export const BOTTOM = 'Bottom';

export function _route(conn, fromPt, fromDir, toPt, toDir) {
  fromPt.x = fromPt.x || 0;
  fromPt.y = fromPt.y || 0;
  toPt.x = toPt.x || 0;
  toPt.y = toPt.y || 0;

  const xDiff = fromPt.x - toPt.x;
  const yDiff = fromPt.y - toPt.y;
  let point;
  let dir;
  let pos;

  conn.push(new Point(fromPt.x, fromPt.y));

  if (((xDiff * xDiff) < (TOLxTOL)) && ((yDiff * yDiff) < (TOLxTOL))) {
    conn.push(new Point(toPt.x, toPt.y));
    return;
  }

  if (fromDir === LEFT) {
    if ((xDiff > 0) && ((yDiff * yDiff) < TOL) && (toDir === RIGHT)) {
      point = toPt
      dir = toDir
    }
    else {
      if (xDiff < 0) {
        point = new Point(fromPt.x - MINDIST, fromPt.y);
      }
      else if (((yDiff > 0) && (toDir === BOTTOM)) || ((yDiff < 0) && (toDir === TOP))) {
        point = new Point(toPt.x, fromPt.y);
      }
      else if (fromDir === toDir) {
        pos = Math.min(fromPt.x, toPt.x) - MINDIST;
        point = new Point(pos, fromPt.y);
      }
      else {
        point = new Point(fromPt.x - (xDiff / 2), fromPt.y);
      }

      if (yDiff > 0) {
        dir = TOP
      }
      else {
        dir = BOTTOM
      }
    }
  }
  else if (fromDir === RIGHT) {
    if ((xDiff < 0) && ((yDiff * yDiff) < TOL) && (toDir === LEFT)) {
      point = toPt
      dir = toDir
    }
    else {
      if (xDiff > 0) {
        point = new Point(fromPt.x + MINDIST, fromPt.y);
      }
      else if (((yDiff > 0) && (toDir === BOTTOM)) || ((yDiff < 0) && (toDir === TOP))) {
        point = new Point(toPt.x, fromPt.y);
      }
      else if (fromDir === toDir) {
        pos = Math.max(fromPt.x, toPt.x) + MINDIST;
        point = new Point(pos, fromPt.y);
      }
      else {
        point = new Point(fromPt.x - (xDiff / 2), fromPt.y);
      }

      if (yDiff > 0) {
        dir = TOP;
      }
      else {
        dir = BOTTOM;
      }
    }
  }
  else if (fromDir === BOTTOM) {
    if (((xDiff * xDiff) < TOL) && (yDiff < 0) && (toDir === TOP)) {
      point = toPt;
      dir = toDir;
    }
    else {
      if (yDiff > 0) {
        point = new Point(fromPt.x, fromPt.y + MINDIST);
      }
      else if (((xDiff > 0) && (toDir === RIGHT)) || ((xDiff < 0) && (toDir === LEFT))) {
        point = new Point(fromPt.x, toPt.y);
      }
      else if (fromDir === toDir) {
        pos = Math.max(fromPt.y, toPt.y) + MINDIST;
        point = new Point(fromPt.x, pos);
      }
      else {
        point = { x: fromPt.x, y: fromPt.y - (yDiff / 2) };
      }

      if (xDiff > 0) {
        dir = LEFT;
      }
      else {
        dir = RIGHT;
      }
    }
  } else if (fromDir === TOP) {
    if (((xDiff * xDiff) < TOL) && (yDiff > 0) && (toDir === BOTTOM)) {
      point = toPt;
      dir = toDir;
    }
    else {
      if (yDiff < 0) {
        point = new Point(fromPt.x, fromPt.y - MINDIST);
      }
      else if (((xDiff > 0) && (toDir === RIGHT)) || ((xDiff < 0) && (toDir === LEFT))) {
        point = new Point(fromPt.x, toPt.y);
      }
      else if (fromDir === toDir) {
        pos = Math.min(fromPt.y, toPt.y) - MINDIST;
        point = new Point(fromPt.x, pos);
      }
      else {
        point = { x: fromPt.x, y: fromPt.y - (yDiff / 2) };
      }

      if (xDiff > 0) {
        dir = LEFT;
      }
      else {
        dir = RIGHT;
      }
    }
  }
  _route(conn, point, dir, toPt, toDir);
}

export function _calcOrientation(beginX, beginY, endX, endY, orientationLimit) {

  let _calcWithLimit = (rank) => {
    if (orientationLimit) {
      for (let i = 0; i < rank.length; i++) {
        let isInLimit = orientationLimit.some((limit) => {
          return limit === rank[i];
        });
        if (isInLimit) {
          return rank[i];
        }
      }
      return rank[0];
    } else {
      return rank[0];
    }
  };
  // 计算orientation
  let posX = endX - beginX;
  let posY = endY - beginY;
  let orientation = null;

  // 斜率
  let k = Math.abs(posY / posX);

  if (posX === 0 || posY === 0) {
    if (posX === 0) {
      orientation = posY >= 0 ? _calcWithLimit(['Top', 'Left', 'Right', 'Bottom']) : orientation;
      orientation = posY < 0 ? _calcWithLimit(['Bottom', 'Left', 'Right', 'Top']) : orientation;
    }
    if (posY === 0) {
      orientation = posX >= 0 ? _calcWithLimit(['Right', 'Top', 'Bottom', 'Left']) : orientation;
      orientation = posX < 0 ? _calcWithLimit(['Left', 'Top', 'Bottom', 'Right']) : orientation;
    }
  } else if (posX > 0 && posY > 0) {
    if (k > 1) {
      orientation = _calcWithLimit(['Top', 'Left', 'Right', 'Bottom']);
      // orientation = [0, -1];
    } else {
      orientation = _calcWithLimit(['Left', 'Top', 'Bottom', 'Right']);
      // orientation = [-1, 0];
    }
  } else if (posX < 0 && posY > 0) {
    if (k > 1) {
      orientation = _calcWithLimit(['Top', 'Right', 'Left', 'Bottom']);
      // orientation = [0, -1];
    } else {
      orientation = _calcWithLimit(['Right', 'Top', 'Bottom', 'Left']);
      // orientation = [1, 0];
    }
  } else if (posX < 0 && posY < 0) {
    if (k > 1) {
      orientation = _calcWithLimit(['Bottom', 'Right', 'Left', 'Top']);
      // orientation = [0, 1];
    } else {
      orientation = _calcWithLimit(['Right', 'Bottom', 'Top', 'Left']);
      // orientation = [1, 0];
    }
  } else {
    if (k > 1) {
      orientation = _calcWithLimit(['Bottom', 'Left', 'Right', 'Top']);
      // orientation = [0, 1];
    } else {
      orientation = _calcWithLimit(['Left', 'Bottom', 'Top', 'Right']);
      // orientation = [-1, 0];
    }
  }

  switch (orientation) {
    case 'Left':
      return [-1, 0];
    case 'Right':
      return [1, 0];
    case 'Top':
      return [0, -1];
    case 'Bottom':
      return [0, 1];
  }
}
