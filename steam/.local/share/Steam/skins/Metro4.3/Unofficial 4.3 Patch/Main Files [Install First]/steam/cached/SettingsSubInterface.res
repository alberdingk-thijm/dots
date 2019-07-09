"steam/cached/SettingsSubInterface.res"
{
	styles
	{
		CSubPanelOptionsInterface
		{
			render_bg
			{
				0="image(x0+16,y0+7,x1,y1,graphics/metro/labels/settings/interface)"
			}
		}
	}
	layout
	{
		region { name=box margin-left=16 margin-right=16 }

		place { region=box control="LanguageCombo" width=310 }
		place { region=box control="FavoriteWindowCombo" width=310 }
		place { region=box control="SkinCombo" width=310 }
		place { region=box control="Label4,LanguageCombo,TranslationLabel" y=17 margin-top=16 height=24 dir=down }
		place { start=TranslationLabel control="Label2,FavoriteWindowCombo" y=8 height=24 dir=down }
		place { start=FavoriteWindowCombo control="Label3,SkinCombo" y=8 height=24 dir=down }
		place { start=SkinCombo control="Divider3,AutoLaunchCheck,BigPictureModeCheck,UrlBarCheck,DWriteCheck,H264HWAccelCheck,DPIScalingCheck,GPUWebViewCheck,NotifyAvailableGamesCheck" y=8 spacing=4 dir=down }
		place { start=NotifyAvailableGamesCheck control="SetJumpListOptionsButton" align=bottom dir=down margin-bottom=16 }
		//Hidden
		place { control="Label1,Divider1,Divider2" dir=down margin-left=-999 }
	}
}