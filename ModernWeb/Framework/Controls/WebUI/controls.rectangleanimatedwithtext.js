var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RectangleAnimatedWithText = (function (_super) {
    __extends(RectangleAnimatedWithText, _super);
    function RectangleAnimatedWithText(experience, slot, bkgcolor, bkgalpha, deltapixel, deltatime, deltadirection, title, titlefont, titlefillstyle) {
        _super.call(this, experience);
        this._movementX = 0;
        this._movementY = 0;
        this._movementH = 0;
        this._movementW = 0;
        this._xDirection = -1;
        this._yDirection = -1;
        this._stopAnimation = false;
        this._bhButClick = new BehaviorClickAnimation(this);
        this.Slot = slot;
        this.Color = bkgcolor;
        this.Alpha = bkgalpha;
        this.DeltaPixel = deltapixel;
        this.DeltaTime = deltatime;
        this.DeltaDirection = deltadirection;
        this.Title = title;
        this.TitleFillStyle = titlefillstyle;
        this.TitleFont = titlefont;
    }
    RectangleAnimatedWithText.prototype.Initialize = function () {
        _super.prototype.Initialize.call(this);
        this.zIndex += 3;
    };
    RectangleAnimatedWithText.prototype.Update = function (tick) {
        _super.prototype.Update.call(this, tick);
    };
    RectangleAnimatedWithText.prototype.Draw = function (surface) {
        _super.prototype.Draw.call(this, surface);
        var newChange = 0;
        if (this.IsVisible) {
            var co = this.ClickedOn();
            this._bhButClick.CalculateDelta(co);
            if (this.DeltaPixel > 0 && !this._stopAnimation) {
                newChange = this.FrameLengthMsec / 1000;
                newChange = newChange / this.DeltaTime;
                newChange = newChange * this.DeltaPixel;
                this._movementY = this.Y();
                this._movementX = this.X();
                if (this.DeltaDirection == "FromBottom") {
                    this._movementW = this.Width();
                    if (this._yDirection == -1) {
                        if (this._movementH >= this.DeltaPixel) {
                            this._yDirection = 1;
                        }
                        this._movementH = this._movementH + newChange;
                        this._movementY += (this.Height() - this._movementH);
                    } else if (this._yDirection == 1) {
                        this._stopAnimation = true;
                        if (this._movementH <= 0) {
                            this._yDirection = -1;
                        }
                        this._movementH = this._movementH - newChange;
                        this._movementY += (this.Height() - this._movementH);
                    }
                } else if (this.DeltaDirection == "FromTop") {
                    this._movementW = this.Width();
                    if (this._yDirection == -1) {
                        if (this._movementH >= this.DeltaPixel) {
                            this._yDirection = 1;
                        }
                        this._movementH = this._movementH + newChange;
                    } else if (this._yDirection == 1) {
                        this._stopAnimation = true;
                        if (this._movementH <= 0) {
                            this._yDirection = -1;
                        }
                        this._movementH = this._movementH - newChange;
                    }
                } else if (this.DeltaDirection == "FromLeft") {
                    this._movementH = this.Height();
                    if (this._xDirection == -1) {
                        if (this._movementW >= this.DeltaPixel) {
                            this._xDirection = 1;
                        }
                        this._movementW += newChange;
                    } else if (this._xDirection == 1) {
                        this._stopAnimation = true;
                        if (this._movementW <= 0) {
                            this._xDirection = -1;
                        }
                        this._movementW -= newChange;
                    }
                } else if (this.DeltaDirection == "FromRight") {
                    this._movementH = this.Height();
                    if (this._xDirection == -1) {
                        if (this._movementW >= this.DeltaPixel) {
                            this._xDirection = 1;
                        }
                        this._movementW += newChange;
                        this._movementX += (this.Width() - this._movementW);
                    } else if (this._xDirection == 1) {
                        this._stopAnimation = true;
                        if (this._movementW <= 0) {
                            this._xDirection = -1;
                        }
                        this._movementW -= newChange;
                        this._movementX += (this.Width() - this._movementW);
                    }
                }
            }
            surface.save();
            surface.fillStyle = this.Color;
            surface.globalAlpha = this.Alpha;
            surface.fillRect(this.X() + (this._bhButClick.Delta / 2), this.Y() + (this._bhButClick.Delta / 2), this._movementW - this._bhButClick.Delta, this._movementH - this._bhButClick.Delta);
            surface.restore();
            if (this._stopAnimation) {
                surface.save();
                surface.font = this.TitleFont;
                surface.globalAlpha = 1.0;
                surface.fillStyle = this.TitleFillStyle;
                if (this.DeltaDirection == "FromBottom") {
                    surface.fillText(this.Title, this.X() + 10, this.Y() + this.Height() - 20);
                } else if (this.DeltaDirection == "FromTop") {
                    surface.fillText(this.Title, this.X() + 10, this.Y() + 30);
                } else if (this.DeltaDirection == "FromLeft") {
                    surface.translate(this.X() + 10, this.Y() + 10);
                    surface.rotate(90 * (Math.PI / 180));
                    surface.fillText(this.Title, 0, 0);
                } else if (this.DeltaDirection == "FromRight") {
                    surface.translate(this.X() + this.Width() - 10, this.Y() + this.Height() - 10);
                    surface.rotate(-90 * (Math.PI / 180));
                    surface.fillText(this.Title, 0, 0);
                }
                surface.restore();
            }
        }
    };
    RectangleAnimatedWithText.prototype.Unload = function () {
        _super.prototype.Unload.call(this);
    };
    return RectangleAnimatedWithText;
})(ControlBase);
