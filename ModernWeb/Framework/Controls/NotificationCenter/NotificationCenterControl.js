var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var NotificationCenterControl = (function (_super) {
    __extends(NotificationCenterControl, _super);
    function NotificationCenterControl(UIRenderer, Debugger, UniqueID, ParentUniqueID) {
        _super.call(this, UIRenderer, Debugger, UniqueID, ParentUniqueID);
        this.UIRenderer = UIRenderer;
        this.Debugger = Debugger;
        this.UniqueID = UniqueID;
        this.ParentUniqueID = ParentUniqueID;
    }
    NotificationCenterControl.prototype.InitUI = function (startHeight) {
        this.Debugger.Log("NotificationCenterControl:InitUI");
        this.UIRenderer.LoadDivInParent(this.UniqueID + "_Overlay", this.UniqueID);
    };
    NotificationCenterControl.prototype.UpdateFromLayout = function (left) {
        this.Debugger.Log("NotificationCenterControl:UpdateFromLayout " + left);
        this._rootDiv.css("left", left);
    };
    NotificationCenterControl.prototype.Unload = function () {
        this.Debugger.Log("NotificationCenterControl:Unload ");
        _super.prototype.Unload.call(this);
    };
    NotificationCenterControl.prototype.Show = function (id, htmlMessage, durationms) {
        _super.prototype.Show.call(this, null, null, null);
        this.Debugger.Log("NotificationCenterControl:Show " + id);
        var newItem = this.UIRenderer.LoadHTMLElement(id, this._rootDiv, htmlMessage);
        newItem.fadeTo(0, 0);
        newItem.fadeTo(400, 1);
        setTimeout("_bootup.SceneManager.CurrentScene.CloseNotification('" + id + "')", durationms);
    };
    NotificationCenterControl.prototype.UnloadItem = function (id) {
        this.Debugger.Log("NotificationCenterControl:UnloadItem - " + id);
        var _self = this;
        this.UIRenderer.FindDiv(id).fadeTo(400, 0, function () {
            _self.UIRenderer.UnloadDiv(id);
        });
    };
    return NotificationCenterControl;
})(FrameworkControl);
