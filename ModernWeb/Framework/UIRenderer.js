
var UIRenderer = (function () {
    function UIRenderer(RootUI, HeadUI) {
        this.RootUI = RootUI;
        this.HeadUI = HeadUI;
    }
    UIRenderer.prototype.LoadCSS = function (css) {
        this.HeadUI.append($('<link rel="stylesheet" type="text/css" />').attr('href', '/Themes/' + css + ".css"));
    };
    UIRenderer.prototype.FindDiv = function (id) {
        var found = $("#" + id);
        return found;
    };
    UIRenderer.prototype.LoadDiv = function (id) {
        this.RootUI.append('<div id="' + id + '"></div>');
        var found = $("#" + id);
        return found;
    };
    UIRenderer.prototype.LoadDivInParent = function (id, parentid) {
        var found = $("#" + parentid);
        if (found != null) {
            found.append('<div id="' + id + '"></div>');
        }
        found = $("#" + id);
        return found;
    };
    UIRenderer.prototype.UnloadDiv = function (id) {
        var found = $("#" + id);
        if (found != null) {
            found.remove();
        }
    };
    UIRenderer.prototype.AppendToDiv = function (id, text, className) {
        var found = $("#" + id);
        var newDiv;
        if (found != null) {
            newDiv = found.append('<div class="' + className + '">' + text + '</div>');
        }
        return newDiv;
    };
    UIRenderer.prototype.FillDivContent = function (id, message) {
        var found = $("#" + id);
        if (found != null) {
            found.html(message);
        }
    };
    UIRenderer.prototype.ShowDiv = function (id) {
        var found = $("#" + id);
        if (found != null) {
            found.css("display", "");
        }
    };
    UIRenderer.prototype.AnimateDiv = function (id, animateProperties, duration) {
        var found = $("#" + id);
        if (found != null) {
            found.animate(animateProperties, duration);
        }
    };
    UIRenderer.prototype.HideDiv = function (id) {
        var found = $("#" + id);
        if (found != null) {
            found.css("display", "none");
        }
    };
    UIRenderer.prototype.RemoveFirstChild = function (id) {
        $("#" + id + " ").children(":first").remove();
    };
    UIRenderer.prototype.LoadCanvas = function (id) {
        this.RootUI.append('<canvas id="' + id + '"></canvas>');
    };
    UIRenderer.prototype.LoadCanvasInParent = function (id, parent) {
        parent.append('<canvas id="' + id + '"></canvas>');
        var found = $("#" + id);
        return found;
    };
    UIRenderer.prototype.UnloadCanvas = function (id) {
        var found = $("#" + id);
        if (found != null) {
            found.remove();
        }
    };
    UIRenderer.prototype.FindTextArea = function (id) {
        var found = $("#" + id);
        return found;
    };
    UIRenderer.prototype.LoadTextAreaInParent = function (id, parent) {
        parent.append('<textarea id="' + id + '" name="' + id + '" style="width: 100%; height:100%; " >this is a test</textarea>');
        var found = $("#" + id);
        return found;
    };
    UIRenderer.prototype.FindHTMLElement = function (id) {
        var found = $("#" + id);
        return found;
    };
    UIRenderer.prototype.FindHTMLElementInParent = function (id, parentId) {
        var found = $("#" + parentId + " #" + id);
        return found;
    };
    UIRenderer.prototype.FindHTMLElementInParentByClass = function (className, parentId) {
        var found = $("#" + parentId + " ." + className);
        return found;
    };
    UIRenderer.prototype.LoadHTMLElement = function (id, parent, html) {
        if (parent == null) {
            this.RootUI.append(html);
        } else {
            parent.append(html);
        }
        if (id != null) {
            var found = $("#" + id);
            return found;
        }
    };
    return UIRenderer;
})();
