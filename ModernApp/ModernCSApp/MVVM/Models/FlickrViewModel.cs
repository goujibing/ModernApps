﻿
using System;
using System.Linq;
using System.Threading.Tasks;
using ModernCSApp.Services;
using SumoNinjaMonkey.Framework.Services;
using Windows.Data.Xml.Dom;
using Windows.UI.Notifications;
using System.Collections.Generic;
using GalaSoft.MvvmLight.Command;
using Windows.UI.Xaml.Controls;
using System.Collections.ObjectModel;
using FlickrNet;

namespace ModernCSApp.Models
{
    

    public partial class FlickrViewModel : DefaultViewModel
    {
        
        public event EventHandler ChangeState;

        const string apiKey = "";
        const string apiSecret = "";
        string frob = string.Empty;
        OAuthRequestToken _rt;
        OAuthAccessToken _at;

        Auth flickr_Auth;
        public Person FlickrPerson { get; set; }
        public PhotoCollection FlickrPersonPhotos { get; set; }
        public PhotoCollection FlickrPhotoStreamPhotos { get; set; }
        public PhotoCommentCollection SelectedPhotoComments { get; set; }
        public Photo SelectedPhoto { get; set; }
        public PhotoInfo SelectedPhotoInfo { get; set; }
        public ExifTagCollection SelectedExifInfo { get; set; }

        FlickrNet.Flickr _flickr = null;

        Windows.UI.Core.CoreDispatcher _dispatcher;
        public string AuthorizationUrl { get; set; }


        public string FullName { get { return _at.FullName; } }
        public string ScreenName { get { return _at.ScreenName; } }
        public string Username { get { return _at.Username; } }

        public string BuddyIconUrl { get; set; }



        public OAuthAccessToken AccessToken
        {
            get { return _at; }
            private set{}
        }


        public FlickrViewModel(Windows.UI.Core.CoreDispatcher dispatcher)
        {
            _flickr = new FlickrNet.Flickr(apiKey, apiSecret);

            _dispatcher = dispatcher;

        }


        public void ViewInit()
        {
            if (IsFlickrLoginDetailsCached())
            {
                _at = new OAuthAccessToken();
                var found = Services.AppDatabase.Current.AppStates.Where(x => x.Name == "at.FullName").FirstOrDefault();
                _at.FullName = found.Value;
                found = Services.AppDatabase.Current.AppStates.Where(x => x.Name == "at.ScreenName").FirstOrDefault();
                _at.ScreenName = found.Value;
                found = Services.AppDatabase.Current.AppStates.Where(x => x.Name == "at.UserId").FirstOrDefault();
                _at.UserId = found.Value;
                found = Services.AppDatabase.Current.AppStates.Where(x => x.Name == "at.Username").FirstOrDefault();
                _at.Username = found.Value;
                found = Services.AppDatabase.Current.AppStates.Where(x => x.Name == "at.Token").FirstOrDefault();
                _at.Token = found.Value;
                found = Services.AppDatabase.Current.AppStates.Where(x => x.Name == "at.TokenSecret").FirstOrDefault();
                _at.TokenSecret = found.Value;
                found = Services.AppDatabase.Current.AppStates.Where(x => x.Name == "fp.BuddyIconUrl").FirstOrDefault();
                BuddyIconUrl = found!=null?  found.Value: string.Empty;

                _flickr.OAuthAccessToken = _at.Token;
                _flickr.OAuthAccessTokenSecret = _at.TokenSecret;

            }
        }


        public bool IsFlickrLoginDetailsCached()
        {
            var found = Services.AppDatabase.Current.AppStates.Where(x => x.Name == "at.FullName").FirstOrDefault();
            if (found != null)
            {
                return true;
            }

            return false;
        }


        public async void RequestAuthorization()
        {
            
            //1. GET THE OAUTH REQUEST TOKEN
            //2. CONSTRUCT A URL & LAUNCH IT TO GET AN "AUTHORIZATION" TOKEN
            await _flickr.OAuthGetRequestTokenAsync("oob", async (x) =>  //{} new Action<FlickrResult<OAuthRequestToken>>(x =>
            {
                
                if (!x.HasError)
                {
                    _rt = x.Result;
                    string url = _flickr.OAuthCalculateAuthorizationUrl(_rt.Token, FlickrNet.AuthLevel.Write);
                    try
                    {
                        await _dispatcher.RunAsync(Windows.UI.Core.CoreDispatcherPriority.High, () =>
                        {
                            ////await Windows.System.Launcher.LaunchUriAsync(new Uri(url), new Windows.System.LauncherOptions() { DisplayApplicationPicker = true });
                            //grdWebView.Visibility = Visibility.Visible;
                            //tbConfirmationCode.Visibility = Visibility.Visible;
                            //wvLoginRequest.Source = new Uri(url);

                        });


                        await _dispatcher.RunAsync(
                            Windows.UI.Core.CoreDispatcherPriority.High,
                            new Windows.UI.Core.DispatchedHandler(() =>
                            {
                                AuthorizationUrl = url;
                                if (ChangeState != null) ChangeState("RequestGiven", EventArgs.Empty);
                                
                            })
                        );
                    }
                    catch (Exception ex)
                    {
                        var m = ex.Message;
                    }
                };
            });


        }

        public async void AuthorizationGiven(string confirmationCode)
        {
            //3. COPY THE VERIFICATION CODE FROM THE FLICKR PAGE AND USE IT TO GET AN "ACCESS" TOKEN
            if (confirmationCode.Length == 0) return;

            await _flickr.OAuthGetAccessTokenAsync(_rt, confirmationCode, async (rat) => // new Action<FlickrResult<OAuthAccessToken>>(rat =>
            //await _flickr.OAuthGetAccessTokenAsync(rt, tbConfirmationCode.Text, new Action<FlickrResult<OAuthAccessToken>>(rat =>
            {

                if (!rat.HasError)
                {
                    _at = rat.Result;


                    await _dispatcher.RunAsync(Windows.UI.Core.CoreDispatcherPriority.High, () =>
                    {

                        Services.AppDatabase.Current.AddAppState("at.FullName", _at.FullName);
                        Services.AppDatabase.Current.AddAppState("at.ScreenName", _at.ScreenName);
                        Services.AppDatabase.Current.AddAppState("at.UserId", _at.UserId);
                        Services.AppDatabase.Current.AddAppState("at.Username", _at.Username);
                        Services.AppDatabase.Current.AddAppState("at.Token", _at.Token);
                        Services.AppDatabase.Current.AddAppState("at.TokenSecret", _at.TokenSecret);

                        //buddy icon is populated when we retrieve loggedin users details ( GetLoggedInUserDetails )
                        Services.AppDatabase.Current.AddAppState("fp.BuddyIconUrl", "");
                        
                        //_flickr.AuthToken = _at.Token;


                        //refresh based on new appstates added
                        Services.AppDatabase.Current.LoadInstances();
                        


                        if (ChangeState != null) ChangeState("ConfirmationComplete", EventArgs.Empty);

                    });


                    //if (ChangeState != null) ChangeState("ConfirmationComplete", EventArgs.Empty);
                    





                    ////USE YOUR ACCESS TO START MAKING API CALLS
                    //GetLoggedInUserDetails(at.UserId);


                }
            });

        }




        public void GetLoggedInUserDetails(string userid)
        {
            DownloadService.Current.DownloadCount++;

            //GET LOGGED IN USER DETAILS
            _flickr.PeopleGetInfoAsync(userid, (p)=> //new Action<FlickrResult<Person>>(p =>
            {
                DownloadService.Current.DownloadCount--;

                if (!p.HasError)
                {
                    FlickrPerson = p.Result;
                    _dispatcher.RunAsync(
                        Windows.UI.Core.CoreDispatcherPriority.High,
                        new Windows.UI.Core.DispatchedHandler(() =>
                        {
                            //imgUser.Source = new BitmapImage(new Uri(p.Result.BuddyIconUrl));
                            //brdAvatar.Opacity = 1;

                            //lblName.Text = p.Result.UserName;

                            //spLogin.Visibility = Visibility.Collapsed;
                            //spLoggedIn.Visibility = Visibility.Visible;

                            //lblProject.Visibility = Visibility.Visible;

                            if (ChangeState != null) ChangeState("UserInfoRetrieved", EventArgs.Empty);

                        })
                        );
                }
                else
                {
                    _raiseError(p.ErrorMessage);
                }
            });


            GetLoggedInFavourites(userid);
            return;

            //GET LOGGED IN USERS PUBLIC PICTURES
            //_flickr.PeopleGetPublicPhotosAsync(userid,async (pc) => //new Action<FlickrResult<PhotoCollection>>(pc =>
            _flickr.PeopleGetPhotosAsync(userid, async (pc) => //new Action<FlickrResult<PhotoCollection>>(pc =>
            {
                if (!pc.HasError)
                {
                    FlickrPersonPhotos = pc.Result;


                    await _dispatcher.RunAsync(
                        Windows.UI.Core.CoreDispatcherPriority.High,
                        new Windows.UI.Core.DispatchedHandler(() =>
                        {
                            //lbPhotos.ItemsSource = PersonPhotos;

                            if (ChangeState != null) ChangeState("UserPublicPhotosRetrieved", EventArgs.Empty);
                        })
                    );


                }
                else
                {

                }
            });

        }

        public void GetPhotoStream(string userid)
        {
            DownloadService.Current.DownloadCount++;

            _flickr.PeopleGetPhotosAsync(userid, async (pc) =>
            {
                DownloadService.Current.DownloadCount--;
                if (!pc.HasError)
                {
                    FlickrPhotoStreamPhotos = pc.Result;


                    await _dispatcher.RunAsync(
                        Windows.UI.Core.CoreDispatcherPriority.High,
                        new Windows.UI.Core.DispatchedHandler(() =>
                        {
                            if (ChangeState != null) ChangeState("PhotoStreamPhotosRetrieved", EventArgs.Empty);
                        })
                    );
                }
                else
                {
                    _raiseError(pc.ErrorMessage);
                }
            });
        }

        public void GetLoggedInFavourites(string userid)
        {
            DownloadService.Current.DownloadCount++;
            _flickr.FavoritesGetListAsync(userid, async (pc)=>
            {
                DownloadService.Current.DownloadCount--;
                if (!pc.HasError)
                {
                    FlickrPersonPhotos = pc.Result;


                    await _dispatcher.RunAsync(
                        Windows.UI.Core.CoreDispatcherPriority.High,
                        new Windows.UI.Core.DispatchedHandler(() =>
                        {
                            //lbPhotos.ItemsSource = PersonPhotos;

                            if (ChangeState != null) ChangeState("UserPublicPhotosRetrieved", EventArgs.Empty);
                        })
                    );


                }
                else
                {
                    _raiseError(pc.ErrorMessage);
                }
            });
        }

        public void GetAuthorFavourites(string userid)
        {
            DownloadService.Current.DownloadCount++;
            _flickr.FavoritesGetListAsync(userid, async (pc) =>
            {
                DownloadService.Current.DownloadCount--;
                if (!pc.HasError)
                {
                    FlickrPersonPhotos = pc.Result;


                    await _dispatcher.RunAsync(
                        Windows.UI.Core.CoreDispatcherPriority.High,
                        new Windows.UI.Core.DispatchedHandler(() =>
                        {
                            //lbPhotos.ItemsSource = PersonPhotos;

                            if (ChangeState != null) ChangeState("AuthorPublicPhotosRetrieved", EventArgs.Empty);
                        })
                    );


                }
                else
                {
                    _raiseError(pc.ErrorMessage);
                }
            });
        }


        bool _GetPhotoInfo_IsRunning = false;
        public void GetPhotoInfo(Photo photo)
        {
            if (_GetPhotoInfo_IsRunning) return;

            _GetPhotoInfo_IsRunning = true;
            DownloadService.Current.DownloadCount++;

            SelectedPhoto = photo;

            _flickr.PhotosGetInfoAsync(photo.PhotoId, async (pc) =>
            {
                _GetPhotoInfo_IsRunning = false;
                DownloadService.Current.DownloadCount--;

                if (!pc.HasError)
                {
                    SelectedPhotoInfo = pc.Result;

                    await _dispatcher.RunAsync(
                        Windows.UI.Core.CoreDispatcherPriority.High,
                        new Windows.UI.Core.DispatchedHandler(() =>
                        {
                            if (ChangeState != null) ChangeState("PhotoInfoRetrieved", EventArgs.Empty);
                        })
                    );
                }
                else
                {
                    _raiseError(pc.ErrorMessage);
                }
            });

        }

        bool _GetPhotoExif_IsRunning = false;
        public void GetPhotoExif(Photo photo)
        {
            if (_GetPhotoExif_IsRunning) return;

            _GetPhotoExif_IsRunning = true;
            DownloadService.Current.DownloadCount++;

            _flickr.PhotosGetExifAsync(photo.PhotoId, async (pc) =>
            {
                _GetPhotoExif_IsRunning = false;
                DownloadService.Current.DownloadCount--;

                if (!pc.HasError)
                {
                    SelectedExifInfo = pc.Result;

                    await _dispatcher.RunAsync(
                        Windows.UI.Core.CoreDispatcherPriority.High,
                        new Windows.UI.Core.DispatchedHandler(() =>
                        {
                            if (ChangeState != null) ChangeState("PhotoExifRetrieved", EventArgs.Empty);
                        })
                    );
                }
                else
                {
                    await _dispatcher.RunAsync(
                        Windows.UI.Core.CoreDispatcherPriority.High,
                        new Windows.UI.Core.DispatchedHandler(() =>
                        {
                            _raiseError(pc.ErrorMessage);
                        })
                    );
                    
                }
            });
        }

        public async void FavouritePhoto(Photo photo)
        {
            //if (ChangeState != null) ChangeState("PhotoFavourited", new CustomEventArgs() { Photo = photo });
            //return;
            DownloadService.Current.DownloadCount++;

            _flickr.FavoritesAddAsync(photo.PhotoId, async (nr) =>
            {
                
                DownloadService.Current.DownloadCount--;

                if (!nr.HasError)
                {
                    await _dispatcher.RunAsync(
                        Windows.UI.Core.CoreDispatcherPriority.High,
                        new Windows.UI.Core.DispatchedHandler(() =>
                        {
                            if (ChangeState != null) ChangeState("PhotoFavourited", new CustomEventArgs() { Photo = photo });
                        })
                    );
                }
                else
                {
                    await _dispatcher.RunAsync(
                        Windows.UI.Core.CoreDispatcherPriority.High,
                        new Windows.UI.Core.DispatchedHandler(() =>
                        {
                            _raiseError(nr.ErrorMessage);
                        })
                    );

                }
            });
        }

        public void GetPhotoComments(Photo photo)
        {
            DownloadService.Current.DownloadCount++;
            _flickr.PhotosCommentsGetListAsync(photo.PhotoId, async (pc) =>
            {
                DownloadService.Current.DownloadCount--;
                if (!pc.HasError)
                {
                    SelectedPhotoComments = pc.Result;

                    await _dispatcher.RunAsync(
                        Windows.UI.Core.CoreDispatcherPriority.High,
                        new Windows.UI.Core.DispatchedHandler(() =>
                        {
                            if (ChangeState != null) ChangeState("PhotoCommentsRetrieved", EventArgs.Empty);
                        })
                    );


                }
                else
                {
                    _raiseError(pc.ErrorMessage);
                }
            });
        }

        
        private async void _raiseError(string message){
            await _dispatcher.RunAsync(
                        Windows.UI.Core.CoreDispatcherPriority.High,
                        new Windows.UI.Core.DispatchedHandler(() =>
                        {
                            SendInformationNotification(message, 2);
                        })
                    );
        }
    }


    public class CustomEventArgs : EventArgs
    {
        public Photo Photo;
    }
}
