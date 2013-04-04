﻿using System;
//using ModernCSApp.Views;
using SumoNinjaMonkey.Framework.Services;
using Windows.UI.Xaml.Controls;
using ModernCSApp.Views;
namespace ModernCSApp.Services
{
    public class NavigationService : NavigationServiceBase
    {
        //private static Frame _mainFrame = null;
        //private static NavigationService Instance = new NavigationService();

        public NavigationService()
        {

        }
        //public static void Init(Frame mainFrame)
        //{
        //    NavigationServiceBase.Init(mainFrame);
        //    //NavigationService._mainFrame = mainFrame;
        //}


        

        public static void Navigate(string viewName, object parameter = null)
        {
            

            //ShareManager.Instance.Clear();

            if (viewName != null)
            {
                //if (viewName == "DashboardView")
                //{
                //    NavigationService._mainFrame.Navigate(typeof(DashboardView), parameter);
                //    return;
                //}
                if (viewName == "SplashScreenView")
                {
                    _mainFrame.Navigate(typeof(SplashScreenView), parameter);
                    return;
                }
                //else if (viewName == "StoryboardTimelineView")
                //{
                //    NavigationService._mainFrame.Navigate(typeof(StoryboardTimelineView), parameter);
                //    return;
                //}
                //else if (viewName == "SceneDesignerView")
                //{
                //    NavigationService._mainFrame.Navigate(typeof(SceneDesignerView), parameter);
                //    return;
                //}
                else if (viewName == "HomeView")
                {
                    _mainFrame.Navigate(typeof(HomeView), parameter);
                    return;
                }
                //else if (viewName == "ResearchAreaView")
                //{
                //    NavigationService._mainFrame.Navigate(typeof(ResearchAreaView), parameter);
                //    return;
                //}

                NavigateBase(viewName, parameter);


            }
            throw new ArgumentException("There is no view associated with the name : " + viewName);
        }

        public async static void NavigateOnUI(string viewName, object parameter = null)
        {
            Windows.UI.Core.DispatchedHandler invokedHandler = new Windows.UI.Core.DispatchedHandler(() =>
            {
                LoggingService.LogInformation("navigating to " + viewName, "NavigationService.NavigateOnUI");

                Navigate(viewName, parameter);
            });

            await _mainFrame.Dispatcher.RunAsync(Windows.UI.Core.CoreDispatcherPriority.Normal, invokedHandler);
        }
       
    }
}
