﻿/// <reference path="..\..\Layouts\Layout001.ts"/>
/// <reference path="..\..\Controls\LayoutPanelControl.ts"/>


class DemoInfiniteCanvasDataGridModernTree extends Layout001 {



    //LAYOUT CHILDREN

    private _infiniteCanvasControl: InfiniteCanvasControl;
    private _dataGridControl: DataGridControl;
    private _modernTreeControl: ModernTreeControl;



    constructor(public UIRenderer: UIRenderer, public Debugger: Debugger) {
        super(UIRenderer, Debugger);


        //LAYOUT CHILDREN
        this._infiniteCanvasControl = new InfiniteCanvasControl(UIRenderer, Debugger, "divInfiniteCanvas", null, 0);
        this._dataGridControl = new DataGridControl(UIRenderer, Debugger, "divDataGrid", null);
        this._modernTreeControl = new ModernTreeControl(UIRenderer, Debugger, "divModernTree", null);




        //WHEN LAYOUTS UPDATE THIS IS WHAT IS USED TO REFRESH OTHER CONTROLS
        this.AreaA.LayoutChangedCallback = (rect) => {
            this.Debugger.Log("AreaA.LayoutChangedCallback");
            this._infiniteCanvasControl.UpdateFromLayout(rect);
        };


        this.AreaB.LayoutChangedCallback = (rect) => {
            this.Debugger.Log("AreaB.LayoutChangedCallback");
            this._dataGridControl.UpdateFromLayout(rect);
        };

        this.AreaC.LayoutChangedCallback = (rect) => {
            this.Debugger.Log("AreaC.LayoutChangedCallback");
            this._modernTreeControl.UpdateFromLayout(rect);
        };


    }

    public Show() {
        super.Show(
            [
                { "id": "app1", "text": "", "data": "scene|WindowsHome01", "style": 'background-color:#0281d5;background-image:url("/Content/Icons/MetroIcons/96x96/Folders & OS/Windows 8.png");background-position-x:25px;background-position-y:25px;background-size:70px; background-repeat:no-repeat;' },
                { "id": "app3", "text": "", "data": "scene|XBoxHome01", "style": 'background-color:#228500;background-image:url("/Content/Icons/MetroIcons/96x96/Devices & Drives/XBox 360.png");background-position-x:25px;background-position-y:25px;background-size:70px; background-repeat:no-repeat;' },
                { "id": "app2", "text": "", "data": "scene|WindowsPhoneHome01", "style": 'background-color:#0281d5;background-image:url("/Content/Icons/MetroIcons/96x96/Folders & OS/Windows.png");background-position-x:25px;background-position-y:25px;background-size:70px; background-repeat:no-repeat;' },
                { "id": "app4", "text": "", "data": "scene|OfficeHome01", "style": 'background-color:#ff5e23;background-image:url("/Content/Icons/MetroIcons/96x96/Office Apps/MS Office.png");background-position-x:25px;background-position-y:25px;background-size:70px; background-repeat:no-repeat;' },
            ],
            [],
            {}
        );

        this.Debugger.Log("DemoInfiniteCanvasDataGridModernTree.LayoutChangedCallback");



        this._InitializeInfiniteCanvas(this.AreaA.Dimension.y2 - this.AreaA.Dimension.y1);
        this._InitializeDataGrid(this.AreaB.Dimension.y2 - this.AreaB.Dimension.y1);
        this._InitializeModernTree(this.AreaC.Dimension.x2);
        
    }


    public Unload() {
        super.Unload();

        this.Debugger.Log("DemoInfiniteCanvasDataGridModernTree.LayoutChangedCallback");


        this._infiniteCanvasControl.Unload();
        this._dataGridControl.Unload();
        this._modernTreeControl.Unload();

    }



    // =======================
    // SHOW / HIDES
    // =======================

    public ShowInfiniteCanvas() {
        this.Debugger.Log("DemoInfiniteCanvasDataGridModernTree:ShowInfiniteCanvas");
        this._infiniteCanvasControl.Show(this, null, null);
    }

    public HideInfiniteCanvas() {
        this.Debugger.Log("DemoInfiniteCanvasDataGridModernTree:HideInfiniteCanvas");
        this._infiniteCanvasControl.Hide();
    }

    public ShowDataGrid() {
        this.Debugger.Log("DemoInfiniteCanvasDataGridModernTree:ShowDataGrid");
        this._dataGridControl.Show(this, null, null);
    }

    public HideDataGrid() {
        this.Debugger.Log("DemoInfiniteCanvasDataGridModernTree:HideDataGrid");
        this._dataGridControl.Hide();
    }

    public ShowModernTree() {
        this.Debugger.Log("DemoInfiniteCanvasDataGridModernTree:ShowModernTree");
        this._modernTreeControl.Show(this, null, null);
    }

    public HideModernTree() {
        this.Debugger.Log("DemoInfiniteCanvasDataGridModernTree:HideModernTree");
        this._modernTreeControl.Hide();
    }




    // =======================
    // INITIALIZE CONTROLS
    // =======================



    private _InitializeInfiniteCanvas(startHeight: number) {
        this.Debugger.Log("DemoInfiniteCanvasDataGridModernTree._InitializeInfiniteCanvas");
        this._infiniteCanvasControl.InitCallbacks({ parent: this, data: null }, null, null);
        this._infiniteCanvasControl.InitUI(startHeight);

        this.ShowInfiniteCanvas();
    }

    private _InitializeDataGrid(startHeight: number) {
        this.Debugger.Log("DemoInfiniteCanvasDataGridModernTree._InitializeDataGrid");
        this._dataGridControl.InitCallbacks({ parent: this, data: null }, null, null);
        this._dataGridControl.InitUI(startHeight);

        this.ShowDataGrid();
    }

    private _InitializeModernTree(startHeight: number) {
        this.Debugger.Log("DemoInfiniteCanvasDataGridModernTree._InitializeModernTree");
        this._modernTreeControl.InitCallbacks({ parent: this, data: null }, null, null);
        this._modernTreeControl.InitUI(startHeight);

        this.ShowModernTree();
    }



}


