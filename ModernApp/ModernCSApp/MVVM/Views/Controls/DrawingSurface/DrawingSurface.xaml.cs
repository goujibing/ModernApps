﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Navigation;


namespace ModernCSApp.Views.Controls
{
    public sealed partial class DrawingSurface
    {
        private readonly ModernCSApp.DxRenderer.DrawingSurface renderer;

        public DrawingSurface()
        {
            this.InitializeComponent();

            renderer = new DxRenderer.DrawingSurface();
            renderer.Run(this);
        }
    }
}
