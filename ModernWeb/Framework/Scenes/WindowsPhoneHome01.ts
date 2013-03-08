﻿/// <reference path="..\Layouts\Layout003.ts"/>
/// <reference path="..\Controls\LayoutPanelControl.ts"/>




class WindowsPhoneHome01 extends Layout003 {


    constructor(public UIRenderer: UIRenderer, public Debugger: Debugger) {
        super(UIRenderer, Debugger, 500, 250);




 
        //WHEN LAYOUTS UPDATE THIS IS WHAT IS USED TO REFRESH OTHER CONTROLS
        var _self = this;
        this.AreaA.LayoutChangedCallback = (rect) => {
            this.Debugger.Log("AreaA.LayoutChangedCallback");
            


        };


    }

    public Show() {
        super.Show(
            [
                { "id": "app1", "text": "", "data": "scene|WindowsHome01", "style": 'background-color:#0281d5;background-image:url("/Content/Icons/MetroIcons/96x96/Folders & OS/Windows 8.png");background-position-x:25px;background-position-y:25px;background-size:70px; background-repeat:no-repeat;' },
                { "id": "app3", "text": "", "data": "scene|XBoxHome01", "style": 'background-color:#228500;background-image:url("/Content/Icons/MetroIcons/96x96/Devices & Drives/XBox 360.png");background-position-x:25px;background-position-y:25px;background-size:70px; background-repeat:no-repeat;' },
                { "id": "app2", "text": "", "data": "scene|WindowsPhoneHome01", "style": 'background-color:#0281d5;background-image:url("/Content/Icons/MetroIcons/96x96/Folders & OS/Windows.png");background-position-x:25px;background-position-y:25px;background-size:70px; background-repeat:no-repeat;' },
                { "id": "app4", "text": "", "data": "scene|OfficeHome01", "style": 'background-color:#ff5e23;background-image:url("/Content/Icons/MetroIcons/96x96/Office Apps/MS Office.png");background-position-x:25px;background-position-y:25px;background-size:70px; background-repeat:no-repeat;' },
                { "id": "app5", "text": "", "data": "scene|OutlookHome01", "style": 'background-color:#fff2a7;background-image:url("/Content/Icons/MetroIcons/96x96/Office Apps/Outlook.png");background-position-x:25px;background-position-y:25px;background-size:70px; background-repeat:no-repeat;' },
            ],
            {
                "logoUrl": "/Content/Icons/MetroIcons/96x96/Folders & OS/Windows.png",
                "items": [
                    { "id": "tb1", "text": "ToolbarItem 1", "data": "action|item1", "style": '' },
                    { "id": "tb2", "text": "SHOW AppBar", "data": "action|open appbar", "style": '' },
                    { "id": "tb3", "text": "ToolbarItem 3", "data": "action|item3", "style": '' },
                    { "id": "tb4", "text": "ToolbarItem 4", "data": "action|item4", "style": '' }
                ],
                "title": "Windows Phone",
                "titleLength": 240,
                "backgroundColor": "#0281d5"
            }
        );
        this.Debugger.Log("WindowsPhoneHome01.Show");
    

    }


    public Unload() {
        
        this.Debugger.Log("WindowsPhoneHome01.Unload");

        super.Unload();

    }



    // =======================
    // SHOW / HIDES
    // =======================


    // =======================
    // INITIALIZE CONTROLS
    // =======================






}


