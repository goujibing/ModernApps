﻿



using ModernCSApp.Views;
using System;
namespace SumoNinjaMonkey.Framework.Controls.DrawingSurface
{
    public interface IBackgroundRenderer
    {
        
        void ChangeBackground(string localUri, string folder);

        void UpdateState(GlobalState state);

    }
}
