import useStore from "@/store";

export class Physics {
  private x: number;
  private y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }
  setX(x: number) {
    this.x = x;
  }
  setY(y: number) {
    this.y = y;
  }
  moveToGradually(x: number, y: number): Promise<true> {
    return new Promise((resolve) => {
      if (this.getX() - x < 0) {
        this.setX(this.getX() + 0.02);
        if (this.getX() > x) {
          this.setX(x);
        }
      } else if (this.getX() - x > 0) {
        this.setX(this.getX() - 0.02);
        if (this.getX() < x) {
          this.setX(x);
        }
      }
      if (this.getY() - y < 0) {
        this.setY(this.getY() + 0.02);
        if (this.getY() > y) {
          this.setY(y);
        }
      } else if (this.getY() - y > 0) {
        this.setY(this.getY() - 0.02);
        if (this.getY() < y) {
          this.setY(y);
        }
      }
      if (this.getX() !== x || this.getY() !== y) {
        setTimeout(this.moveToGradually, 20);
      } else {
        resolve(true);
      }
      useStore.getState().restaurant.update();
    });
  }
}
