/// <reference path="_AllReferences.ts" />
var OfficeBrowserFeedback;
(function (OfficeBrowserFeedback) {
    /**
    * Networking module
    */
    (function (Networking) {
        /**
        * Log level enum
        * Keep in sync with _levelMap in msoserviceplatform\src\Browser\feedback\OFeedback\src\scriptsharp\BrowserFeedbackControl.cs
        */
        (function (LogLevel) {
            LogLevel[LogLevel["Error"] = 0] = "Error";
            LogLevel[LogLevel["Warning"] = 1] = "Warning";
            LogLevel[LogLevel["Info"] = 2] = "Info";
            LogLevel[LogLevel["Verbose"] = 3] = "Verbose";
            LogLevel[LogLevel["Spam"] = 4] = "Spam";
        })(Networking.LogLevel || (Networking.LogLevel = {}));
        var LogLevel = Networking.LogLevel;

        

        /**
        * INetworking implementation
        * IMPORTANT: Keep the fully qualified name in sync with the corresponding declaration in
        * msoserviceplatform\src\Browser\feedback\OFeedback\src\scriptsharp\BrowserFeedbackControl.cs
        */
        Networking.NetworkingMgr = null;
    })(OfficeBrowserFeedback.Networking || (OfficeBrowserFeedback.Networking = {}));
    var Networking = OfficeBrowserFeedback.Networking;
})(OfficeBrowserFeedback || (OfficeBrowserFeedback = {}));
/****************************************************************************
DefaultNetworkingImpl.ts
Office browser feedback networking implementation. The default
implementation that uses browser ULS
****************************************************************************/
/// <reference path="_AllReferences.ts" />
var OfficeBrowserFeedback;
(function (OfficeBrowserFeedback) {
    (function (Networking) {
        /**
        * DefaultNetworkingMgr that implements INetworking interface
        */
        var DefaultNetworkingMgr = (function () {
            function DefaultNetworkingMgr() {
                this.UlsLevelMap = {};
            }
            /**
            * Initialize networking
            * @param {Diag.ULSCat} Parameter to give a category ID for the browser telemetry.
            * @param {Diag.ULSCat} Parameter to give a category ID for the browser feedback data.
            */
            DefaultNetworkingMgr.prototype.Init = function (telemetryID, feedbackID) {
                this.telemetryCatID = telemetryID;
                this.feedbackDataCatID = feedbackID;

                // initialize mapping for log levels so that Capture can integrate
                // with this tool
                this.UlsLevelMap[2 /* Info */] = Diag.ULSTraceLevel.info;
                this.UlsLevelMap[1 /* Warning */] = Diag.ULSTraceLevel.warning;
                this.UlsLevelMap[0 /* Error */] = Diag.ULSTraceLevel.error;
                this.UlsLevelMap[3 /* Verbose */] = Diag.ULSTraceLevel.verbose;
                this.UlsLevelMap[4 /* Spam */] = Diag.ULSTraceLevel.spam;
            };

            /**
            * Dismiss networking
            */
            DefaultNetworkingMgr.prototype.Dismiss = function () {
            };

            /**
            * Send trace
            * @param {LogLevel} level The log level
            * @param {Object} data The data to be logged
            * @return {void}
            */
            DefaultNetworkingMgr.prototype.SendTrace = function (level, data) {
                Diag.ULS.sendTraceTag(0x00445056, this.telemetryCatID, this.UlsLevelMap[level], "{0}", data);
            };

            /**
            * Log feedback data
            * @param {Object} data The feedback data to be logged
            * @return {void}
            */
            DefaultNetworkingMgr.prototype.LogFeedbackData = function (data) {
                // IMPORTANT:  If this gets retagged, please notify engfeedback@microsoft.com so we can update our COSMOS scripts
                Diag.ULS.sendTraceTag(0x00445057, this.feedbackDataCatID, Diag.ULSTraceLevel.info, "{0}", data);
                // Toronto work around. Log feedback data to appInsights.
                LogFeedbackDataToAI(data);
            };
            return DefaultNetworkingMgr;
        })();
        Networking.DefaultNetworkingMgr = DefaultNetworkingMgr;

        Networking.NetworkingMgr = new Networking.DefaultNetworkingMgr();
    })(OfficeBrowserFeedback.Networking || (OfficeBrowserFeedback.Networking = {}));
    var Networking = OfficeBrowserFeedback.Networking;
})(OfficeBrowserFeedback || (OfficeBrowserFeedback = {}));
/****************************************************************************
OfficeBrowserFeedback.ts
Office browser feedback module. It deals with Feedback UI creation and deletion,
Feedback form data logging, and UI event controllers.
****************************************************************************/
/// <reference path="_AllReferences.ts" />
var OfficeBrowserFeedback;
(function (OfficeBrowserFeedback) {
    (function (WindowProperties) {
        /**
        *
        */
        function IsNarrow() {
            var narrowScreenBoundary = 800;

            if (window.innerWidth) {
                return window.innerWidth < narrowScreenBoundary;
            }

            // If we can't find the width; go with narrow.
            return true;
        }
        WindowProperties.IsNarrow = IsNarrow;
    })(OfficeBrowserFeedback.WindowProperties || (OfficeBrowserFeedback.WindowProperties = {}));
    var WindowProperties = OfficeBrowserFeedback.WindowProperties;

    /**
    * Constants module
    */
    (function (Constants) {
        /**
        *
        */
        Constants.UseNarrowScreenLayout = false;

        /**
        * html attribute names
        */
        (function (AttributeName) {
            AttributeName.AriaLive = 'aria-live';
            AttributeName.AriaSelected = 'aria-Selected';
            AttributeName.Form = 'form';
            AttributeName.HRef = 'href';
            AttributeName.MaxLength = 'maxlength';
            AttributeName.Name = 'name';
            AttributeName.Placeholder = 'placeholder';
            AttributeName.Role = 'role';
            AttributeName.Source = 'src';
            AttributeName.TabIndex = 'tabindex';
            AttributeName.Target = 'target';
            AttributeName.Type = 'type';
            AttributeName.Value = 'value';
        })(Constants.AttributeName || (Constants.AttributeName = {}));
        var AttributeName = Constants.AttributeName;

        /**
        * html attribute values
        */
        (function (AttributeValue) {
            AttributeValue.BlankWindow = '_blank';
            AttributeValue.Button = 'button';
            AttributeValue.Checkbox = 'checkbox';
            AttributeValue.Checked = 'checked';
            AttributeValue.False = 'false';
            AttributeValue.FeedbackOverall = 'feedbackOverall';
            AttributeValue.One = '1';
            AttributeValue.Polite = 'polite';
            AttributeValue.Submit = 'submit';
            AttributeValue.Text = 'text';
            AttributeValue.TextAreaMaxLength = '1000';
            AttributeValue.True = 'true';
            AttributeValue.Unchecked = 'unchecked';
        })(Constants.AttributeValue || (Constants.AttributeValue = {}));
        var AttributeValue = Constants.AttributeValue;

        /**
        * URL Parameters
        */
        (function (UrlParameters) {
            UrlParameters.CLCID = 'CLCID';
        })(Constants.UrlParameters || (Constants.UrlParameters = {}));
        var UrlParameters = Constants.UrlParameters;

        /**
        * Brs-ish switches to turn on UI/feature
        */
        (function (Brs) {
            Brs.Screenshot = false;
        })(Constants.Brs || (Constants.Brs = {}));
        var Brs = Constants.Brs;

        /**
        * CSS classes
        */
        (function (Classes) {
            Classes.BackgroundBlue = 'officeBrowserFeedbackBackgroundBLue';
            Classes.BackgroundGrey = 'officeBrowserFeedbackBackgroundGrey';
            Classes.FeedbackFormContainer = 'officeBrowserFeedbackFormContainer';
            Classes.FeedbackFormComment = 'officeBrowserFeedbackComment';
            Classes.FeedbackFormSubmitButtonContainer = 'officeBrowserFeedbackSubmitButtonContainer';
            Classes.FeedbackFormSubmitButton = 'officeBrowserFeedbackSubmitButton';
            Classes.FeedbackQuestionMiddleText = 'officeBrowserFeedbackQuestionMiddleText';
            Classes.FeedbackOverallAnchor = 'officeBrowserFeedbackOverallAnchor';
            Classes.FeedbackOverallImage = 'officeBrowserFeedbackOverallImage';
            Classes.FeedbackOverallText = 'officeBrowserFeedbackOverallText';
            Classes.FontSubtitle = 'officeBrowserFeedbackFontSubtitle';
            Classes.FontText = 'officeBrowserFeedbackFontText';
            Classes.FontTitle = 'officeBrowserFeedbackFontTitle';
            Classes.FormContainer = 'officeBrowserFeedbackFormContainer';
            Classes.FullWidth20pxHeight = 'officeBrowserFeedbackFullWidth20pxHeight';
            Classes.OverlayMinWidth = 'officeBrowserFeedbackOverlayMinWidth';
            Classes.Hidden = 'officeBrowserFeedbackHidden';
            Classes.MarginLeft36px = 'officeBrowserFeedbackMarginLeft36px';
            Classes.Narrow = 'officeBrowserFeedbackNarrowLayout';
            Classes.LineHeight = 'officeBrowserFeedbackLineHeight';
            Classes.PadLeft36px = 'officeBrowserFeedbackPadLeft36px';
            Classes.ShowRightBorder = 'officeBrowserFeedbackShowRightBorder';
            Classes.SlideLeft = 'slideLeft';
            Classes.TextAlignLeft = 'officeBrowserFeedbackTextAlignLeft';
            Classes.Visible = 'officeBrowserFeedbackVisible';
            Classes.LinkDiv = 'officeBrowserFeedbackLinkDiv';
            Classes.Link = 'officeBrowserFeedbackLink';

            //TODO: OM:2108673 Update Sway to stop using TextAlginLeft and use TextAlignLeft.
            Classes.TextAlginLeft = 'officeBrowserFeedbackTextAlginLeft';
        })(Constants.Classes || (Constants.Classes = {}));
        var Classes = Constants.Classes;

        /**
        * HTML element ids
        */
        (function (IDs) {
            //Common ids
            IDs.ColumnSeparatorDiv = 'officeBrowserFeedbackColumnSeparatorDiv';
            IDs.FeedbackFormsWrapper = 'officeBrowserFeedbackFormsWrapper';
            IDs.FeedbackOverallDontLikeAnchor = 'officeBrowserFeedbackOverallDontLikeAnchor';
            IDs.FeedbackOverallDontLikeDiv = 'officeBrowserFeedbackOverallDontLikeDiv';
            IDs.FeedbackOverallDontLikeImage = 'officeBrowserFeedbackOverallDontLikeImage';
            IDs.FeedbackOverallDontLikeText = 'officeBrowserFeedbackOverallDontLikeText';
            IDs.FeedbackOverallLikeAnchor = 'officeBrowserFeedbackOverallLikeAnchor';
            IDs.FeedbackOverallLikeDiv = 'officeBrowserFeedbackOverallLikeDiv';
            IDs.FeedbackOverallLikeImage = 'officeBrowserFeedbackOverallLikeImage';
            IDs.FeedbackOverallLikeText = 'officeBrowserFeedbackOverallLikeText';
            IDs.FeedbackOverallSuggestionAnchor = 'officeBrowserFeedbackOverallSuggestAnchor';
            IDs.FeedbackOverallSuggestionDiv = 'officeBrowserFeedbackOverallSuggestDiv';
            IDs.FeedbackOverallSuggestionImage = 'officeBrowserFeedbackOverallSuggestImage';
            IDs.FeedbackOverallSuggestionText = 'officeBrowserFeedbackOverallSuggestText';
            IDs.FeedbackQuestionLeftText = 'officeBrowserFeedbackQuestionLeftText';
            IDs.FeedbackTitle = 'officeBrowserFeedbackTitle';
            IDs.LeftFormContainer = 'officeBrowserFeedbackLeftFormContainer';
            IDs.MainContainer = 'officeBrowserFeedbackMainContainer';
            IDs.MainContentHolder = 'officeBrowserFeedbackMainContentHolder';
            IDs.MiddleFormContainer = 'officeBrowserFeedbackMiddleFormContainer';
            IDs.OverlayBackground = 'officeBrowserFeedbackOverlayBackground';
            IDs.PlaceHolderDiv1 = 'officeBrowserFeedbackPlaceHolderDiv1';
            IDs.PlaceHolderDiv2 = 'officeBrowserFeedbackPlaceHolderDiv2';
            IDs.PrivacyStatementLink = 'officeBrowserFeedbackPrivacyStatementLink';
            IDs.PrivacyStatementLinkDiv = 'officeBrowserFeedbackPrivacyStatementLinkDiv';
            IDs.RightFormContainer = 'officeBrowserFeedbackRightFormContainer';

            //SimpleFeedbackForm ids
            IDs.SimpleFeedbackFormContainer = 'officeBrowserFeedbackContainer';
            IDs.SimpleFeedbackFormQuestionMiddleText = 'officeBrowserFeedbackQuestionMiddleText';
            IDs.SimpleFeedbackFormComment = 'officeBrowserFeedbackComment';
            IDs.SimpleFeedbackFormScreenshotContainer = 'officeBrowserFeedbackScreenshotContainer';
            IDs.SimpleFeedbackFormScreenshotCheckboxText = 'officeBrowserFeedbackScreenshotCheckboxText';
            IDs.SimpleFeedbackFormScreenshotCheckbox = 'officeBrowserFeedbackScreenshotCheckbox';
            IDs.SimpleFeedbackFormScreenshotText = 'officeBrowserFeedbackScreenshotText';
            IDs.SimpleFeedbackFormSubmitButtonContainer = 'officeBrowserFeedbackSubmitButtonContainer';
            IDs.SimpleFeedbackFormSubmitButton = 'officeBrowserFeedbackSubmitButton';

            //ContactInfo form ids
            IDs.ContactInfoFormContainer = 'officeBrowserFeedbackContactInfoContainer';
            IDs.ContactInfoFormQuestionMiddleText = 'officeBrowserFeedbackContactInfoQuestionMiddleText';
            IDs.ContactInfoFormComment = 'officeBrowserFeedbackContactInfoComment';
            IDs.ContactInfoFormEmailText = 'officeBrowserFeedbackContactInfoEmailText';
            IDs.ContactInfoFormEmailInput = 'officeBrowserFeedbackContactInfoEmailInput';
            IDs.ContactInfoFormSubmitButtonContainer = 'officeBrowserFeedbackContactInfoSubmitButtonContainer';
            IDs.ContactInfoFormSubmitButton = 'officeBrowserFeedbackContactInfoSubmitButton';

            //UservoiceLink form ids
            IDs.UservoiceLinkFormContainer = 'officeBrowserFeedbackUservoiceLinkFormContainer';
            IDs.UservoiceLinkFormQuestionMiddleText = 'officeBrowserFeedbackUservoiceLinkFormQuestionMiddleText';
            IDs.UservoiceLinkFormMiddleText = 'officeBrowserFeedbackUservoiceLinkFormMiddleText';
            IDs.UservoiceLinkFormAnchorContainer = 'officeBrowserFeedbackUservoiceLinkFormAnchorContainer';
            IDs.UservoiceLinkFormAnchor = 'officeBrowserFeedbackUservoiceLinkFormAnchor';
            IDs.UservoiceLinkFormCloseButtonContainer = 'officeBrowserFeedbackUservoiceLinkFormCloseButtonContainer';
            IDs.UservoiceLinkFormCloseButton = 'officeBrowserFeedbackUservoiceLinkFormCloseButton';

            //Deprecated, used by Sway.
            //TODO: OM:2108673 On a separate change, update Sway on tenantsway to use the new id variable names instead of these
            //and if possible update sway to actually generate their form from this module instead of overriding it on
            //their code to have lower the coupling.
            IDs.FeedbackQuestionMiddleText = 'officeBrowserFeedbackQuestionMiddleText';
            IDs.FeedbackComment = 'officeBrowserFeedbackComment';
            IDs.SubmitButton = 'officeBrowserFeedbackSubmitButton';
            IDs.SubmitButtonContainer = 'officeBrowserFeedbackSubmitButtonContainer';
        })(Constants.IDs || (Constants.IDs = {}));
        var IDs = Constants.IDs;

        /**
        * Keys
        */
        (function (Keys) {
            Keys.Esc = 27;
        })(Constants.Keys || (Constants.Keys = {}));
        var Keys = Constants.Keys;

        /**
        * Numbers
        */
        (function (Numbers) {
            Numbers.Pause = 100;
        })(Constants.Numbers || (Constants.Numbers = {}));
        var Numbers = Constants.Numbers;

        /**
        * Values for types of feedback that go into the json
        * Also used to determine the FeedbackTemplate used on each one of the feedback types.
        * Keep in sync with the FeedbackType class on msoserviceplatform\src\Browser\Feedback\OFeedback\src\scriptsharp\BrowserFeedbackControl.cs
        */
        (function (FeedbackType) {
            FeedbackType.Dislike = 'dislike';
            FeedbackType.Like = 'like';
            FeedbackType.Idea = 'idea';
        })(Constants.FeedbackType || (Constants.FeedbackType = {}));
        var FeedbackType = Constants.FeedbackType;

        /**
        * HTML tags
        */
        (function (Tags) {
            Tags.Anchor = 'A';
            Tags.Div = 'DIV';
            Tags.Form = 'FORM';
            Tags.Img = 'IMG';
            Tags.Input = 'INPUT';
            Tags.TextArea = 'TEXTAREA';
        })(Constants.Tags || (Constants.Tags = {}));
        var Tags = Constants.Tags;

        /**
        * URLs
        */
        (function (Urls) {
            /**
            * Link to the feedback Privacy Statement
            */
            Urls.PrivacyStatementLink = "http://go.microsoft.com/fwlink/?LinkID=390004";

            /**
            * Create URL from filename, root path, and extension
            * @param {string} filename The file name, excluding file extension (can include a relative path)
            * @param {string} root The file root path
            * @param {string} extension The file extension
            * @return {string} Absolute URL
            */
            function CreateURL(filename, root, extension) {
                var path = root + filename;
                if (extension) {
                    path += extension;
                }
                return path;
            }
            Urls.CreateURL = CreateURL;

            /**
            * Image URL module
            */
            (function (Images) {
                var supportsSvgInImg = document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1");
                Images.Extension;

                // load .svg icon if browser support svg. Otherwise, load .png as a fallback
                if (supportsSvgInImg) {
                    Images.Extension = '.svg';
                } else {
                    Images.Extension = '.png';
                }

                // URLs for icons
                Images.FrownIcon;
                Images.LightBulbIcon;
                Images.SmileIcon;
            })(Urls.Images || (Urls.Images = {}));
            var Images = Urls.Images;
        })(Constants.Urls || (Constants.Urls = {}));
        var Urls = Constants.Urls;
    })(OfficeBrowserFeedback.Constants || (OfficeBrowserFeedback.Constants = {}));
    var Constants = OfficeBrowserFeedback.Constants;

    /**
    * Utility module
    */
    (function (Utils) {
        /**
        * Set HTML element visibility
        * @param {string} id The Id of the HTML element
        * @param {any} vis The visibility to be set (true or false)
        * @return {void}
        */
        function SetElementVisibility(id, vis) {
            var oldClassName = vis ? Constants.Classes.Hidden : Constants.Classes.Visible;
            var newClassName = vis ? Constants.Classes.Visible : Constants.Classes.Hidden;

            DeleteAndAddClassesById(id, oldClassName, newClassName);
        }
        Utils.SetElementVisibility = SetElementVisibility;

        /**
        * Delete HTML element by Id
        * @param {string} id The Id of the HTML element
        * @return {void}
        */
        function DeleteElementById(id) {
            var element = document.getElementById(id);
            if (element != null && element.parentNode != null) {
                element.parentNode.removeChild(element);
            }
        }
        Utils.DeleteElementById = DeleteElementById;

        /**
        * Add a CSS class to an HTML element by Id
        * @param {string} id The Id of the HTML element
        * @param {string} newClassName The name of CSS class to be added
        * @return {void}
        */
        function AddClassById(id, newClassName) {
            var element = document.getElementById(id);

            if (!element) {
                return;
            }

            // We use className instead of classList to support IE9
            element.className = element.className + ' ' + newClassName;
        }
        Utils.AddClassById = AddClassById;

        /**
        * Delete a CSS class of an HTML element by Id
        * @param {string} id The Id of the HTML element
        * @param {string} oldClassName The name of CSS class to be deleted
        * @return {void}
        */
        function DeleteClassById(id, oldClassName) {
            var element = document.getElementById(id);

            if (!element) {
                return;
            }

            // We use className instead of classList to support IE9
            // Get rid of any occurrences of the class we don't want
            element.className = element.className.split(new RegExp('\\b' + oldClassName + '\\b', 'i')).join(' ');

            // Get rid of extra whitespaces
            element.className = element.className.split(/\s+/).join(' ');
        }
        Utils.DeleteClassById = DeleteClassById;

        /**
        * Delete an CSS class and (or) add an CSS class to an HTML element by Id
        * @param {string} id The Id of the HTML element
        * @param {string} oldClassName The name of CSS class to be deleted
        * @param {string} newClassName The name of CSS class to be added
        * @return {void}
        */
        function DeleteAndAddClassesById(id, oldClassName, newClassName) {
            DeleteClassById(id, oldClassName);
            AddClassById(id, newClassName);
        }
        Utils.DeleteAndAddClassesById = DeleteAndAddClassesById;

        /**
        * Cache images
        * @param {string[]} imageNames The name list of images to be cached
        * @return {void}
        */
        function CacheImages(imageNames) {
            var imageCount = imageNames.length;
            for (var i = 0; i < imageCount; i++) {
                var image = new Image();
                image.src = imageNames[i];

                // Save to window so that this cache is global and permanent rather than scoped to this function.
                if (typeof window.officeBrowserFeedbackCachedImages == 'undefined') {
                    window.officeBrowserFeedbackCachedImages = [];
                }
                window.officeBrowserFeedbackCachedImages.push(image);
            }
        }
        Utils.CacheImages = CacheImages;

        /**
        * Set attribute on an HTML element
        * @param {string} id The Id of the HTML element
        * @param {string} attriName The attribute name
        * @param {string} attriValue The attribute value
        * @return {void}
        */
        function SetAttributeOnHtmlElement(id, attriName, attriValue) {
            var htmlElement = document.getElementById(id);
            if (htmlElement) {
                htmlElement.setAttribute(attriName, attriValue);
            }
        }
        Utils.SetAttributeOnHtmlElement = SetAttributeOnHtmlElement;

        /**
        * Returns the version of Internet Explorer or -1 for non-IE browser
        * @return {number} The IE version
        */
        function GetInternetExplorerVersion() {
            var rv = -1;
            var ua = window.navigator.userAgent;

            // Since IE 11, 'MSIE' is not a keyword in its user agent string anymore
            // Determine whether the browser is IE or not, and the version of IE based on Trident keyword and its version
            if (ua.indexOf('Trident') > -1) {
                var re = new RegExp("Trident/([0-9]{1,}[\.0-9]{0,})");
                if (re.exec(ua) != null) {
                    rv = parseFloat(RegExp.$1);
                    rv += 4; // Trident version + 4 is the IE version
                }
            }
            return rv;
        }
        Utils.GetInternetExplorerVersion = GetInternetExplorerVersion;

        /**
        * Create a link to the feedback Privacy Statement
        * @param {number} lcid The Locale ID of the ui.
        * @return {string} Absolute URL to the localized privacy statement.
        */
        function GetPrivacyUrl(lcid) {
            var link = Constants.Urls.PrivacyStatementLink;
            if (lcid && lcid > 0)
                link = link + "&" + Constants.UrlParameters.CLCID + "=0x" + lcid.toString(16);
            return link;
        }
        Utils.GetPrivacyUrl = GetPrivacyUrl;

        /**
        * Generates the url where the UservoiceLinkForm FeedbackFormTemplate should throw the user when clicking on it.
        * @param {boolean} removeAfterReading Whether or not the url should be removed from the dictionary after is read, we use so we don't log extra unused information with the feedback.
        * @return {string} Absoulute URL to the Uservoice forum that the UservoiceLinkForm FeedbackFormTemplate should use.
        */
        function GetUservoiceUrl(removeAfterReading) {
            var data = (FeedbackData.GetData());
            var uservoiceUrl = data["UservoiceUrl"];
            if (removeAfterReading) {
                FeedbackData.RemoveData("UservoiceUrl");
            }
            return uservoiceUrl;
        }
        Utils.GetUservoiceUrl = GetUservoiceUrl;
    })(OfficeBrowserFeedback.Utils || (OfficeBrowserFeedback.Utils = {}));
    var Utils = OfficeBrowserFeedback.Utils;

    /**
    * UI module
    */
    (function (UI) {
        /**
        * Localized UI strings
        */
        UI.Strings;

        /**
        * UI layout
        */
        (function (Layout) {
            /**
            * This enum will be used to determine which form will be associated to each one of the options in the bellyband.
            * Keep in sync with the FeedbackFormTemplate enum on msoserviceplatform\src\Browser\Feedback\OFeedback\src\scriptsharp\BrowserFeedbackControl.cs
            */
            (function (FeedbackFormTemplate) {
                FeedbackFormTemplate[FeedbackFormTemplate["SimpleFeedbackForm"] = 0] = "SimpleFeedbackForm";
                FeedbackFormTemplate[FeedbackFormTemplate["ContactInfoFeedbackForm"] = 1] = "ContactInfoFeedbackForm";
                FeedbackFormTemplate[FeedbackFormTemplate["UservoiceLinkFeedbackForm"] = 2] = "UservoiceLinkFeedbackForm";
            })(Layout.FeedbackFormTemplate || (Layout.FeedbackFormTemplate = {}));
            var FeedbackFormTemplate = Layout.FeedbackFormTemplate;

            /**
            * This dictionary identifes which type of form is being used on each one of the FeedbackType options.
            */
            Layout.ActiveFormTemplates;

            /**
            * Solve the id of the formContainer div for the FeedbackFormTemplate
            * @param {FeedbackFormTemplate} formTemplate The form type to resolve the id.
            */
            function GetFormContainerIdFromFormTemplate(formTemplate) {
                switch (formTemplate) {
                    case 0 /* SimpleFeedbackForm */: {
                        return Constants.IDs.SimpleFeedbackFormContainer;
                    }
                    case 1 /* ContactInfoFeedbackForm */: {
                        return Constants.IDs.ContactInfoFormContainer;
                    }
                    case 2 /* UservoiceLinkFeedbackForm */: {
                        return Constants.IDs.UservoiceLinkFormContainer;
                    }
                    default: {
                        return Constants.IDs.SimpleFeedbackFormContainer;
                    }
                }
            }
            Layout.GetFormContainerIdFromFormTemplate = GetFormContainerIdFromFormTemplate;

            /**
            * Solve the id of the MiddleText div for the FeedbackFormTemplate
            * @param {FeedbackFormTemplate} formTemplate The form type to resolve the id.
            */
            function GetMiddleTextIdFromFormTemplate(formTemplate) {
                switch (formTemplate) {
                    case 0 /* SimpleFeedbackForm */: {
                        return Constants.IDs.SimpleFeedbackFormQuestionMiddleText;
                    }
                    case 1 /* ContactInfoFeedbackForm */: {
                        return Constants.IDs.ContactInfoFormQuestionMiddleText;
                    }
                    case 2 /* UservoiceLinkFeedbackForm */: {
                        return Constants.IDs.UservoiceLinkFormQuestionMiddleText;
                    }
                    default: {
                        return Constants.IDs.SimpleFeedbackFormQuestionMiddleText;
                    }
                }
            }
            Layout.GetMiddleTextIdFromFormTemplate = GetMiddleTextIdFromFormTemplate;

            /**
            * Solves the id of the MiddleText div for the formType that a specific option of the feedack form is using.
            * @param {string} option The string of the option that is on the value attribte of the anchors
            */
            function GetMiddleTextIdFromOptionString(option) {
                switch (option) {
                    case UI.Strings.l_DontLike:
                        return GetMiddleTextIdFromFormTemplate(Layout.ActiveFormTemplates[Constants.FeedbackType.Dislike]);
                    case UI.Strings.l_Like:
                        return GetMiddleTextIdFromFormTemplate(Layout.ActiveFormTemplates[Constants.FeedbackType.Like]);
                    case UI.Strings.l_Suggestion:
                        return GetMiddleTextIdFromFormTemplate(Layout.ActiveFormTemplates[Constants.FeedbackType.Idea]);
                    default:
                        return GetMiddleTextIdFromFormTemplate(0 /* SimpleFeedbackForm */);
                }
            }
            Layout.GetMiddleTextIdFromOptionString = GetMiddleTextIdFromOptionString;

            /**
            * Solves the id of the formContainer div for the formType that a specific option of the feedack form is using.
            * @param {string} option The string of the option that is on the value attribte of the anchors
            */
            function GetFormContainerIdFromOptionString(option) {
                switch (option) {
                    case UI.Strings.l_DontLike:
                        return GetFormContainerIdFromFormTemplate(Layout.ActiveFormTemplates[Constants.FeedbackType.Dislike]);
                    case UI.Strings.l_Like:
                        return GetFormContainerIdFromFormTemplate(Layout.ActiveFormTemplates[Constants.FeedbackType.Like]);
                    case UI.Strings.l_Suggestion:
                        return GetFormContainerIdFromFormTemplate(Layout.ActiveFormTemplates[Constants.FeedbackType.Idea]);
                    default:
                        return GetFormContainerIdFromFormTemplate(0 /* SimpleFeedbackForm */);
                }
            }
            Layout.GetFormContainerIdFromOptionString = GetFormContainerIdFromOptionString;

            /**
            * Generates the UI schema on a UiAsJson object that is then rendered as html DOM elements on the actual document.
            * @param {number} lcid Locale id number used to generate the privacy statement url.
            */
            function GenerateSchema(lcid) {
                var schema = {
                    id: Constants.IDs.OverlayBackground,
                    classes: [OfficeBrowserFeedback.Constants.Classes.OverlayMinWidth],
                    children: [
                        {
                            id: Constants.IDs.MainContainer,
                            children: [
                                {
                                    id: Constants.IDs.MainContentHolder,
                                    tag: Constants.Tags.Form,
                                    classes: [Constants.Classes.Hidden],
                                    children: [
                                        {
                                            id: Constants.IDs.LeftFormContainer,
                                            classes: [Constants.Classes.FormContainer],
                                            children: [
                                                {
                                                    id: Constants.IDs.FeedbackTitle,
                                                    classes: [Constants.Classes.FontTitle, Constants.Classes.TextAlignLeft, Constants.Classes.LineHeight],
                                                    innerText: UI.Strings.l_FeedbackTitle
                                                },
                                                {
                                                    id: Constants.IDs.ColumnSeparatorDiv,
                                                    children: [
                                                        {
                                                            id: Constants.IDs.FeedbackQuestionLeftText,
                                                            classes: [Constants.Classes.FontSubtitle, Constants.Classes.TextAlignLeft, Constants.Classes.LineHeight],
                                                            innerText: UI.Strings.l_FeedbackOverall
                                                        },
                                                        {
                                                            id: Constants.IDs.FeedbackOverallLikeAnchor,
                                                            classes: [Constants.Classes.FeedbackOverallAnchor, Constants.Classes.BackgroundGrey],
                                                            tag: Constants.Tags.Anchor,
                                                            attributes: [
                                                                {
                                                                    name: Constants.AttributeName.HRef,
                                                                    value: '#'
                                                                },
                                                                {
                                                                    name: Constants.AttributeName.Value,
                                                                    value: UI.Strings.l_Like
                                                                },
                                                                {
                                                                    name: Constants.AttributeName.Role,
                                                                    value: Constants.AttributeValue.Button
                                                                },
                                                                {
                                                                    name: Constants.AttributeName.TabIndex,
                                                                    value: Constants.AttributeValue.One
                                                                }
                                                            ],
                                                            children: [
                                                                {
                                                                    id: Constants.IDs.FeedbackOverallLikeImage,
                                                                    classes: [Constants.Classes.FeedbackOverallImage],
                                                                    tag: Constants.Tags.Img
                                                                },
                                                                {
                                                                    id: Constants.IDs.FeedbackOverallLikeText,
                                                                    classes: [Constants.Classes.FontText, Constants.Classes.FeedbackOverallText, Constants.Classes.LineHeight],
                                                                    innerText: UI.Strings.l_Like
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            id: Constants.IDs.PlaceHolderDiv1,
                                                            classes: [Constants.Classes.FullWidth20pxHeight]
                                                        },
                                                        {
                                                            id: Constants.IDs.FeedbackOverallDontLikeAnchor,
                                                            classes: [Constants.Classes.FeedbackOverallAnchor, Constants.Classes.BackgroundGrey],
                                                            tag: Constants.Tags.Anchor,
                                                            attributes: [
                                                                {
                                                                    name: Constants.AttributeName.HRef,
                                                                    value: '#'
                                                                },
                                                                {
                                                                    name: Constants.AttributeName.Value,
                                                                    value: UI.Strings.l_DontLike
                                                                },
                                                                {
                                                                    name: Constants.AttributeName.Role,
                                                                    value: Constants.AttributeValue.Button
                                                                },
                                                                {
                                                                    name: Constants.AttributeName.TabIndex,
                                                                    value: Constants.AttributeValue.One
                                                                }
                                                            ],
                                                            children: [
                                                                {
                                                                    id: Constants.IDs.FeedbackOverallDontLikeImage,
                                                                    classes: [Constants.Classes.FeedbackOverallImage],
                                                                    tag: Constants.Tags.Img
                                                                },
                                                                {
                                                                    id: Constants.IDs.FeedbackOverallDontLikeText,
                                                                    classes: [Constants.Classes.FontText, Constants.Classes.FeedbackOverallText, Constants.Classes.LineHeight],
                                                                    innerText: UI.Strings.l_DontLike
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            id: Constants.IDs.PlaceHolderDiv2,
                                                            classes: [Constants.Classes.FullWidth20pxHeight]
                                                        },
                                                        {
                                                            id: Constants.IDs.FeedbackOverallSuggestionAnchor,
                                                            classes: [Constants.Classes.FeedbackOverallAnchor, Constants.Classes.BackgroundGrey],
                                                            tag: Constants.Tags.Anchor,
                                                            attributes: [
                                                                {
                                                                    name: Constants.AttributeName.HRef,
                                                                    value: '#'
                                                                },
                                                                {
                                                                    name: Constants.AttributeName.Value,
                                                                    value: UI.Strings.l_Suggestion
                                                                },
                                                                {
                                                                    name: Constants.AttributeName.Role,
                                                                    value: Constants.AttributeValue.Button
                                                                },
                                                                {
                                                                    name: Constants.AttributeName.TabIndex,
                                                                    value: Constants.AttributeValue.One
                                                                }
                                                            ],
                                                            children: [
                                                                {
                                                                    id: Constants.IDs.FeedbackOverallSuggestionImage,
                                                                    classes: [Constants.Classes.FeedbackOverallImage],
                                                                    tag: Constants.Tags.Img
                                                                },
                                                                {
                                                                    id: Constants.IDs.FeedbackOverallSuggestionText,
                                                                    classes: [Constants.Classes.FontText, Constants.Classes.FeedbackOverallText, Constants.Classes.LineHeight],
                                                                    innerText: UI.Strings.l_Suggestion
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    id: Constants.IDs.PrivacyStatementLinkDiv,
                                                    classes: [Constants.Classes.FontText, Constants.Classes.LineHeight, Constants.Classes.TextAlignLeft],
                                                    children: [
                                                        {
                                                            id: Constants.IDs.PrivacyStatementLink,
                                                            tag: Constants.Tags.Anchor,
                                                            innerText: UI.Strings.l_PrivacyStatement,
                                                            attributes: [
                                                                {
                                                                    name: Constants.AttributeName.HRef,
                                                                    value: Utils.GetPrivacyUrl(lcid)
                                                                },
                                                                {
                                                                    name: Constants.AttributeName.Target,
                                                                    value: Constants.AttributeValue.BlankWindow
                                                                },
                                                                {
                                                                    name: Constants.AttributeName.TabIndex,
                                                                    value: Constants.AttributeValue.One
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            id: Constants.IDs.MiddleFormContainer,
                                            classes: [Constants.Classes.FormContainer, Constants.Classes.Hidden],
                                            children: GenerateForms().children
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                };
                return schema;
            }
            Layout.GenerateSchema = GenerateSchema;

            /**
            * Generates a wrapper UiAsJson object that holds the different forms that will be used on the bellyband.
            * This is used to generate just one form of each one of the templates that are actually going to be used.
            */
            function GenerateForms() {
                var activeForms = [];
                activeForms[Layout.ActiveFormTemplates[Constants.FeedbackType.Like]] = true;
                activeForms[Layout.ActiveFormTemplates[Constants.FeedbackType.Dislike]] = true;
                activeForms[Layout.ActiveFormTemplates[Constants.FeedbackType.Idea]] = true;

                var wrapper = {
                    id: Constants.IDs.FeedbackFormsWrapper,
                    children: []
                };

                if (activeForms[0 /* SimpleFeedbackForm */]) {
                    wrapper.children.push(GenerateSimpleFeedbackForm());
                }

                if (activeForms[1 /* ContactInfoFeedbackForm */]) {
                    wrapper.children.push(GenerateContactInfoFeedbackForm());
                }

                if (activeForms[2 /* UservoiceLinkFeedbackForm */]) {
                    wrapper.children.push(GenerateUservoiceLinkFeedbackForm());
                }

                return wrapper;
            }
            Layout.GenerateForms = GenerateForms;

            /**
            * Defines the layout for the SimpleFeedbackForm template in a UiAsJson object.
            */
            function GenerateSimpleFeedbackForm() {
                var formSchema = {
                    id: Constants.IDs.SimpleFeedbackFormContainer,
                    classes: [Constants.Classes.Hidden, Constants.Classes.FeedbackFormContainer],
                    children: [
                        {
                            id: Constants.IDs.SimpleFeedbackFormQuestionMiddleText,
                            classes: [Constants.Classes.FeedbackQuestionMiddleText, Constants.Classes.FontSubtitle, Constants.Classes.MarginLeft36px, Constants.Classes.LineHeight, Constants.Classes.TextAlignLeft],
                            attributes: [
                                {
                                    name: Constants.AttributeName.AriaLive,
                                    value: Constants.AttributeValue.Polite
                                }
                            ]
                        },
                        {
                            id: Constants.IDs.SimpleFeedbackFormComment,
                            classes: [Constants.Classes.FeedbackFormComment, Constants.Classes.FontText, Constants.Classes.MarginLeft36px],
                            tag: Constants.Tags.TextArea,
                            attributes: [
                                {
                                    name: Constants.AttributeName.Name,
                                    value: Constants.IDs.SimpleFeedbackFormComment
                                },
                                {
                                    name: Constants.AttributeName.Placeholder,
                                    value: UI.Strings.l_CommentPlaceholder
                                },
                                {
                                    name: Constants.AttributeName.MaxLength,
                                    value: Constants.AttributeValue.TextAreaMaxLength
                                },
                                {
                                    name: Constants.AttributeName.TabIndex,
                                    value: Constants.AttributeValue.One
                                }
                            ]
                        },
                        {
                            id: Constants.IDs.SimpleFeedbackFormScreenshotContainer,
                            classes: [Constants.Classes.MarginLeft36px],
                            children: [
                                {
                                    id: Constants.IDs.SimpleFeedbackFormScreenshotCheckboxText,
                                    brs: Constants.Brs.Screenshot,
                                    children: [
                                        {
                                            id: Constants.IDs.SimpleFeedbackFormScreenshotCheckbox,
                                            tag: Constants.Tags.Input,
                                            attributes: [
                                                {
                                                    name: Constants.AttributeName.Name,
                                                    value: Constants.IDs.SimpleFeedbackFormScreenshotCheckbox
                                                },
                                                {
                                                    name: Constants.AttributeName.Type,
                                                    value: Constants.AttributeValue.Checkbox
                                                },
                                                {
                                                    name: Constants.AttributeName.Value,
                                                    value: Constants.AttributeValue.Unchecked
                                                },
                                                {
                                                    name: Constants.AttributeName.TabIndex,
                                                    value: Constants.AttributeValue.One
                                                }
                                            ]
                                        },
                                        {
                                            id: Constants.IDs.SimpleFeedbackFormScreenshotText,
                                            classes: [Constants.Classes.FontText, Constants.Classes.TextAlignLeft, Constants.Classes.LineHeight],
                                            innerText: UI.Strings.l_IncludeScreenshot
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: Constants.IDs.SimpleFeedbackFormSubmitButtonContainer,
                            classes: [Constants.Classes.FeedbackFormSubmitButtonContainer, Constants.Classes.MarginLeft36px],
                            children: [
                                {
                                    id: Constants.IDs.SimpleFeedbackFormSubmitButton,
                                    classes: [Constants.Classes.FeedbackFormSubmitButton, Constants.Classes.FontText, Constants.Classes.LineHeight],
                                    tag: Constants.Tags.Input,
                                    attributes: [
                                        {
                                            name: Constants.AttributeName.Type,
                                            value: Constants.AttributeValue.Submit
                                        },
                                        {
                                            name: Constants.AttributeName.Value,
                                            value: UI.Strings.l_Submit
                                        },
                                        {
                                            name: Constants.AttributeName.TabIndex,
                                            value: Constants.AttributeValue.One
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                };
                return formSchema;
            }
            Layout.GenerateSimpleFeedbackForm = GenerateSimpleFeedbackForm;

            /**
            * Defines the layout for the ContactInfoForm template in a UiAsJson object.
            */
            function GenerateContactInfoFeedbackForm() {
                var formSchema = {
                    id: Constants.IDs.ContactInfoFormContainer,
                    classes: [Constants.Classes.Hidden, Constants.Classes.FeedbackFormContainer],
                    children: [
                        {
                            id: Constants.IDs.ContactInfoFormQuestionMiddleText,
                            classes: [Constants.Classes.FeedbackQuestionMiddleText, Constants.Classes.FontSubtitle, Constants.Classes.MarginLeft36px, Constants.Classes.LineHeight, Constants.Classes.TextAlignLeft],
                            attributes: [
                                {
                                    name: Constants.AttributeName.AriaLive,
                                    value: Constants.AttributeValue.Polite
                                }
                            ]
                        },
                        {
                            id: Constants.IDs.ContactInfoFormComment,
                            classes: [Constants.Classes.FeedbackFormComment, Constants.Classes.FontText, Constants.Classes.MarginLeft36px],
                            tag: Constants.Tags.TextArea,
                            attributes: [
                                {
                                    name: Constants.AttributeName.Name,
                                    value: Constants.IDs.SimpleFeedbackFormComment
                                },
                                {
                                    name: Constants.AttributeName.Placeholder,
                                    value: UI.Strings.l_CommentPlaceholder
                                },
                                {
                                    name: Constants.AttributeName.MaxLength,
                                    value: Constants.AttributeValue.TextAreaMaxLength
                                },
                                {
                                    name: Constants.AttributeName.TabIndex,
                                    value: Constants.AttributeValue.One
                                }
                            ]
                        },
                        {
                            id: Constants.IDs.ContactInfoFormEmailText,
                            classes: [Constants.Classes.FontText, Constants.Classes.MarginLeft36px, Constants.Classes.LineHeight, Constants.Classes.TextAlignLeft],
                            innerText: UI.Strings.l_EmailRequest,
                            attributes: [
                                {
                                    name: Constants.AttributeName.AriaLive,
                                    value: Constants.AttributeValue.Polite
                                }
                            ]
                        },
                        {
                            id: Constants.IDs.ContactInfoFormEmailInput,
                            classes: [Constants.Classes.FeedbackFormComment, Constants.Classes.FontText, Constants.Classes.MarginLeft36px],
                            tag: Constants.Tags.Input,
                            attributes: [
                                {
                                    name: Constants.AttributeName.Type,
                                    value: Constants.AttributeValue.Text
                                },
                                {
                                    name: Constants.AttributeName.Name,
                                    value: Constants.IDs.ContactInfoFormEmailInput
                                },
                                {
                                    name: Constants.AttributeName.MaxLength,
                                    value: Constants.AttributeValue.TextAreaMaxLength
                                },
                                {
                                    name: Constants.AttributeName.TabIndex,
                                    value: Constants.AttributeValue.One
                                }
                            ]
                        },
                        {
                            id: Constants.IDs.ContactInfoFormSubmitButtonContainer,
                            classes: [Constants.Classes.FeedbackFormSubmitButtonContainer, Constants.Classes.MarginLeft36px],
                            children: [
                                {
                                    id: Constants.IDs.ContactInfoFormSubmitButton,
                                    classes: [Constants.Classes.FeedbackFormSubmitButton, Constants.Classes.FontText, Constants.Classes.LineHeight],
                                    tag: Constants.Tags.Input,
                                    attributes: [
                                        {
                                            name: Constants.AttributeName.Type,
                                            value: Constants.AttributeValue.Submit
                                        },
                                        {
                                            name: Constants.AttributeName.Value,
                                            value: UI.Strings.l_Submit
                                        },
                                        {
                                            name: Constants.AttributeName.TabIndex,
                                            value: Constants.AttributeValue.One
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                };
                return formSchema;
            }
            Layout.GenerateContactInfoFeedbackForm = GenerateContactInfoFeedbackForm;

            /**
            * Defines the layout for the UservoiceLinkFeedback template in a UiAsJson object.
            */
            function GenerateUservoiceLinkFeedbackForm() {
                var formSchema = {
                    id: Constants.IDs.UservoiceLinkFormContainer,
                    classes: [Constants.Classes.Hidden, Constants.Classes.FeedbackFormContainer],
                    children: [
                        {
                            id: Constants.IDs.UservoiceLinkFormQuestionMiddleText,
                            classes: [Constants.Classes.FeedbackQuestionMiddleText, Constants.Classes.FontSubtitle, Constants.Classes.MarginLeft36px, Constants.Classes.LineHeight, Constants.Classes.TextAlignLeft],
                            attributes: [
                                {
                                    name: Constants.AttributeName.AriaLive,
                                    value: Constants.AttributeValue.Polite
                                }
                            ]
                        },
                        {
                            id: Constants.IDs.UservoiceLinkFormMiddleText,
                            classes: [Constants.Classes.FontText, Constants.Classes.MarginLeft36px, Constants.Classes.LineHeight, Constants.Classes.TextAlignLeft],
                            innerText: UI.Strings.l_UservoiceInformation,
                            attributes: [
                                {
                                    name: Constants.AttributeName.AriaLive,
                                    value: Constants.AttributeValue.Polite
                                }
                            ]
                        },
                        {
                            id: Constants.IDs.UservoiceLinkFormAnchorContainer,
                            classes: [Constants.Classes.LinkDiv, Constants.Classes.MarginLeft36px, Constants.Classes.FontText, Constants.Classes.LineHeight, Constants.Classes.TextAlignLeft],
                            children: [
                                {
                                    id: Constants.IDs.UservoiceLinkFormAnchor,
                                    classes: [Constants.Classes.Link],
                                    tag: Constants.Tags.Anchor,
                                    innerText: Utils.GetUservoiceUrl(false),
                                    attributes: [
                                        {
                                            name: Constants.AttributeName.HRef,
                                            value: Utils.GetUservoiceUrl(true)
                                        },
                                        {
                                            name: Constants.AttributeName.Target,
                                            value: Constants.AttributeValue.BlankWindow
                                        },
                                        {
                                            name: Constants.AttributeName.TabIndex,
                                            value: Constants.AttributeValue.One
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: Constants.IDs.UservoiceLinkFormCloseButtonContainer,
                            classes: [Constants.Classes.FeedbackFormSubmitButtonContainer, Constants.Classes.MarginLeft36px],
                            children: [
                                {
                                    id: Constants.IDs.UservoiceLinkFormCloseButton,
                                    classes: [Constants.Classes.FeedbackFormSubmitButton, Constants.Classes.FontText, Constants.Classes.LineHeight],
                                    tag: Constants.Tags.Input,
                                    attributes: [
                                        {
                                            name: Constants.AttributeName.Type,
                                            value: Constants.AttributeValue.Submit
                                        },
                                        {
                                            name: Constants.AttributeName.Value,
                                            value: UI.Strings.l_Close
                                        },
                                        {
                                            name: Constants.AttributeName.TabIndex,
                                            value: Constants.AttributeValue.One
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                };
                return formSchema;
            }
            Layout.GenerateUservoiceLinkFeedbackForm = GenerateUservoiceLinkFeedbackForm;
        })(UI.Layout || (UI.Layout = {}));
        var Layout = UI.Layout;

        /**
        * Create HTML elements from Json structure
        * @param {UiAsJson} schema The Json structure
        * @return {HTMLElement} HTML elements with tree structure
        */
        function HtmlElementFromJson(schema) {
            if (typeof schema.brs == 'undefined') {
                schema.brs = true;
            }

            if (!schema.brs) {
                return null;
            }

            if (!schema.tag) {
                schema.tag = Constants.Tags.Div;
            }

            var element = document.createElement(schema.tag);

            if (schema.attributes) {
                var attribute;
                for (var i = 0; i < schema.attributes.length; i++) {
                    attribute = schema.attributes[i];
                    element.setAttribute(attribute.name, attribute.value);
                }
            }

            if (schema.id) {
                element.id = schema.id;
            }

            if (schema.classes) {
                var concatClasses = schema.classes.join(' ');
                element.className = concatClasses;
            }

            if (schema.innerText) {
                element.innerHTML = schema.innerText;
            }

            if (schema.children) {
                for (i = 0; i < schema.children.length; i++) {
                    //Sometimes IE mis-reports length
                    var cur = schema.children[i];

                    if (cur) {
                        var child = HtmlElementFromJson(cur);

                        if (child) {
                            element.appendChild(child);
                        }
                    }
                }
            }

            return element;
        }
        UI.HtmlElementFromJson = HtmlElementFromJson;

        /**
        * Main content holder slide left animation
        * @param {string} visibleContainerId The id of the container to be made visible, the other containers would be hidden
        * @return {void}
        */
        function MainContentHolderSlideLeft(visibleContainerId) {
            Utils.SetElementVisibility(Layout.GetFormContainerIdFromFormTemplate(Layout.ActiveFormTemplates[Constants.FeedbackType.Dislike]), false);
            Utils.SetElementVisibility(Layout.GetFormContainerIdFromFormTemplate(Layout.ActiveFormTemplates[Constants.FeedbackType.Like]), false);
            Utils.SetElementVisibility(Layout.GetFormContainerIdFromFormTemplate(Layout.ActiveFormTemplates[Constants.FeedbackType.Idea]), false);
            if (Constants.UseNarrowScreenLayout) {
                Utils.SetElementVisibility(Constants.IDs.LeftFormContainer, false);
                Utils.SetElementVisibility(Constants.IDs.MiddleFormContainer, true);
                Utils.SetElementVisibility(visibleContainerId, true);
            } else {
                Utils.AddClassById(Constants.IDs.ColumnSeparatorDiv, Constants.Classes.ShowRightBorder);
                Utils.SetElementVisibility(Constants.IDs.MiddleFormContainer, true);
                Utils.SetElementVisibility(visibleContainerId, true);
                Utils.AddClassById(Constants.IDs.LeftFormContainer, Constants.Classes.SlideLeft);
                Utils.AddClassById(Constants.IDs.MiddleFormContainer, Constants.Classes.SlideLeft);
            }
        }
        UI.MainContentHolderSlideLeft = MainContentHolderSlideLeft;

        /**
        * UI initialization, including creating all feedback related HTML elements and setting initial visibility of elements
        * @param {string} contentUrl The url in which the collateral for the images reside
        * @param {string} uiStrings List of localized ui strings
        * @param {number} lcid Locale Id of the ui.
        * @param {[key: string]: Layout.FeedbackFormTemplate} ActiveFormTemplates Dictionary of ids used to identify which form is to be used when the user hits the like option,
        *  indexed by the Constants.FeedbackType string values. This is an optional parameter and if it is not passed, the buttons will work with the default formTemplate:
        *  Layout.FeedbackFormTemplate.SimpleFeedbackForm.
        * @return {void}
        */
        function Init(contentUrl, uiStrings, lcid, activeFormTemplates) {
            UI.Strings = uiStrings;

            //Null check and use of default form templates.
            if (activeFormTemplates) {
                Layout.ActiveFormTemplates = activeFormTemplates;
            } else {
                Layout.ActiveFormTemplates = {};
                Layout.ActiveFormTemplates[Constants.FeedbackType.Dislike] = 0 /* SimpleFeedbackForm */;
                Layout.ActiveFormTemplates[Constants.FeedbackType.Like] = 0 /* SimpleFeedbackForm */;
                Layout.ActiveFormTemplates[Constants.FeedbackType.Idea] = 0 /* SimpleFeedbackForm */;
            }

            Constants.UseNarrowScreenLayout = WindowProperties.IsNarrow();
            var userInterfaceHtml = HtmlElementFromJson(Layout.GenerateSchema(lcid));
            document.body.insertBefore(userInterfaceHtml, document.body.firstChild);

            // Preload images
            Constants.Urls.Images.FrownIcon = Constants.Urls.CreateURL('feedback_frown', contentUrl, Constants.Urls.Images.Extension);
            Constants.Urls.Images.LightBulbIcon = Constants.Urls.CreateURL('feedback_lightbulb', contentUrl, Constants.Urls.Images.Extension);
            Constants.Urls.Images.SmileIcon = Constants.Urls.CreateURL('feedback_smile', contentUrl, Constants.Urls.Images.Extension);

            var imageNames = [
                Constants.Urls.Images.FrownIcon,
                Constants.Urls.Images.LightBulbIcon,
                Constants.Urls.Images.SmileIcon];
            Utils.CacheImages(imageNames);

            Utils.SetAttributeOnHtmlElement(Constants.IDs.FeedbackOverallDontLikeImage, Constants.AttributeName.Source, Constants.Urls.Images.FrownIcon);
            Utils.SetAttributeOnHtmlElement(Constants.IDs.FeedbackOverallLikeImage, Constants.AttributeName.Source, Constants.Urls.Images.SmileIcon);
            Utils.SetAttributeOnHtmlElement(Constants.IDs.FeedbackOverallSuggestionImage, Constants.AttributeName.Source, Constants.Urls.Images.LightBulbIcon);

            Utils.SetElementVisibility(Constants.IDs.OverlayBackground, true);

            // Show the main feedback UI after a certain time to wait the CSS keyframes animation to finish if
            // the browser is IE10 and above or non-IE
            if (Utils.GetInternetExplorerVersion() > 9 || Utils.GetInternetExplorerVersion() == -1) {
                setTimeout(ShowUi, Constants.Numbers.Pause * 8);
            } else {
                ShowUi();
            }

            // If the screen size is narrow, add the Narrow class to the outermost div so that
            // the CSS used corresponds to the small screen UI
            if (Constants.UseNarrowScreenLayout) {
                Utils.AddClassById(Constants.IDs.OverlayBackground, Constants.Classes.Narrow);
            }
        }
        UI.Init = Init;

        /**
        * Show the main content and attempt to focus on the first anchor element
        * @return {void}
        */
        function ShowUi() {
            Utils.SetElementVisibility(Constants.IDs.MainContentHolder, true);

            // set focus in on the first link after feedback UI is shown
            var firstAnchorElement = document.getElementsByTagName("a")[0];
            if (firstAnchorElement)
                firstAnchorElement.focus();
        }
        UI.ShowUi = ShowUi;

        /**
        * UI dismiss. Delete all feedback related HTML elements
        * @return {void}
        */
        function Dismiss() {
            Utils.SetElementVisibility(Constants.IDs.OverlayBackground, false);
            Utils.DeleteElementById(Constants.IDs.OverlayBackground);
        }
        UI.Dismiss = Dismiss;
    })(OfficeBrowserFeedback.UI || (OfficeBrowserFeedback.UI = {}));
    var UI = OfficeBrowserFeedback.UI;

    /**
    * Events module
    */
    (function (Events) {
        /**
        * Add event listener helper function (wrapper) that deals with IE 8 compatability
        * @param {any} object The object to add event listener to
        * @param {string} type The event type
        * @param {function} listener The listener function
        * @return {void}
        */
        function addEventListenerHelper(object, type, listener) {
            if (object.addEventListener)
                object.addEventListener(type, listener, false);
            else if (object.attachEvent)
                object.attachEvent('on' + type, listener);
        }

        /**
        * Remove event listener helper function (wrapper) that deals with IE 8 compatability
        * @param {any} object The object to remove event listener from
        * @param {string} type The event type
        * @param {function} listener The listener function
        * @return {void}
        */
        function removeEventListenerHelper(object, type, listener) {
            if (object.removeEventListener)
                object.removeEventListener(type, listener, false);
            else if (object.detachEvent)
                object.detachEvent('on' + type, listener);
        }

        /**
        * Stop propagation helper function (wrapper) that deals with IE 8 compatability
        * @param {Event} event The event object
        * @return {void}
        */
        function stopPropagationHelper(event) {
            if (event.stopPropagation) {
                event.stopPropagation();
            } else {
                event.cancelBubble = true;
            }
        }

        /**
        * Prevent default helper function (wrapper) that deals with IE 8 compatability
        * @param {Event} event The event object
        * @return {void}
        */
        function preventDefaultHelper(event) {
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        }

        /**
        * Register event listener
        * @param {string} id The Id of the HTML element
        * @param {string} type The event type
        * @param {function} listener The listener function
        * @return {void}
        */
        function registerEventListener(id, type, listener) {
            var element = document.getElementById(id);
            if (element)
                addEventListenerHelper(element, type, listener);
        }

        /**
        * Un-register event listener
        * @param {string} id The Id of the HTML element
        * @param {string} type The event type
        * @param {function} listener The listener function
        * @return {void}
        */
        function unregisterEventListener(id, type, listener) {
            var element = document.getElementById(id);
            if (element)
                removeEventListenerHelper(element, type, listener);
        }

        /**
        * Event initialization, listener registration
        * @return {void}
        */
        function Init() {
            // set focus in feedback content after feedback UI is shown
            var overlayBackgroundElement = document.getElementById(Constants.IDs.OverlayBackground);
            if (overlayBackgroundElement)
                overlayBackgroundElement.focus();

            addEventListenerHelper(window, 'keyup', FeedbackKeyHandler);

            //Common events
            registerEventListener(Constants.IDs.FeedbackOverallLikeAnchor, 'click', FeedbackOverallLikeHandler);
            registerEventListener(Constants.IDs.FeedbackOverallDontLikeAnchor, 'click', FeedbackOverallDontLikeHandler);
            registerEventListener(Constants.IDs.FeedbackOverallSuggestionAnchor, 'click', FeedbackOverallSuggestionHandler);
            registerEventListener(Constants.IDs.OverlayBackground, 'click', FeedbackOverlayBackgroundHandler);
            registerEventListener(Constants.IDs.MainContainer, 'click', FeedbackMainContainerHandler);

            //SimpleFeedbackForm events
            registerEventListener(Constants.IDs.SimpleFeedbackFormScreenshotCheckbox, 'click', SimpleFeedbackFormScreenshotCheckboxHandler);
            registerEventListener(Constants.IDs.SimpleFeedbackFormSubmitButton, 'click', SimpleFeedbackFormSubmitButtonHandler);

            //ContactInfoFeedbackForm events
            registerEventListener(Constants.IDs.ContactInfoFormSubmitButton, 'click', ContactInfoFormSubmitButtonHandler);

            //UservoiceLinkFeedbackForm events
            registerEventListener(Constants.IDs.UservoiceLinkFormAnchor, 'click', UservoiceLinkFormLinkHandler);
            registerEventListener(Constants.IDs.UservoiceLinkFormCloseButton, 'click', UservoiceLinkFormCloseButtonHandler);
        }
        Events.Init = Init;

        /**
        * Event dismiss, listener un-registration
        * @return {void}
        */
        function Dismiss() {
            removeEventListenerHelper(window, 'keyup', FeedbackKeyHandler);

            //Common events
            unregisterEventListener(Constants.IDs.FeedbackOverallLikeAnchor, 'click', FeedbackOverallLikeHandler);
            unregisterEventListener(Constants.IDs.FeedbackOverallDontLikeAnchor, 'click', FeedbackOverallDontLikeHandler);
            unregisterEventListener(Constants.IDs.FeedbackOverallSuggestionAnchor, 'click', FeedbackOverallSuggestionHandler);
            unregisterEventListener(Constants.IDs.OverlayBackground, 'click', FeedbackOverlayBackgroundHandler);
            unregisterEventListener(Constants.IDs.MainContainer, 'click', FeedbackMainContainerHandler);

            //SimpleFeedbackForm events
            unregisterEventListener(Constants.IDs.SimpleFeedbackFormScreenshotCheckbox, 'click', SimpleFeedbackFormScreenshotCheckboxHandler);
            unregisterEventListener(Constants.IDs.SimpleFeedbackFormSubmitButton, 'click', SimpleFeedbackFormSubmitButtonHandler);

            //ContactInfoFeedbackForm events
            unregisterEventListener(Constants.IDs.ContactInfoFormSubmitButton, 'click', ContactInfoFormSubmitButtonHandler);

            //UservoiceLinkFeedbackForm events
            unregisterEventListener(Constants.IDs.UservoiceLinkFormAnchor, 'click', UservoiceLinkFormLinkHandler);
            unregisterEventListener(Constants.IDs.UservoiceLinkFormCloseButton, 'click', UservoiceLinkFormCloseButtonHandler);
        }
        Events.Dismiss = Dismiss;

        /**
        * Key event handler
        * @param {Event} event The Event object
        * @return {void}
        */
        function FeedbackKeyHandler(event) {
            // Dismiss feedback upon pressing the escape key
            if (event.keyCode == Constants.Keys.Esc) {
                preventDefaultHelper(event);
                stopPropagationHelper(event);

                OfficeBrowserFeedback.Networking.NetworkingMgr.SendTrace(2 /* Info */, { Keyboard: "Escape key pressed, Office browser feedback UI dismissed" });

                DismissAll(false);
            }
        }
        Events.FeedbackKeyHandler = FeedbackKeyHandler;

        /**
        * Overlay background event handler. Dismiss feedback upon clicking on the background area
        * @param {Event} event The Event object
        * @return {void}
        */
        function FeedbackOverlayBackgroundHandler(event) {
            preventDefaultHelper(event);
            stopPropagationHelper(event);

            OfficeBrowserFeedback.Networking.NetworkingMgr.SendTrace(2 /* Info */, { Mouse: "Mouse click on the background area, Office browser feedback UI dismissed" });

            DismissAll(false);
        }
        Events.FeedbackOverlayBackgroundHandler = FeedbackOverlayBackgroundHandler;

        /**
        * Main container event handler. When clicking on main container area, do not propagate the event to lower level.
        * @param {Event} event The Event object
        * @return {void}
        */
        function FeedbackMainContainerHandler(event) {
            stopPropagationHelper(event);
        }
        Events.FeedbackMainContainerHandler = FeedbackMainContainerHandler;

        /**
        * Feedback button event handler helper function (put reusable code here to minimize the code within
        * FeedbackOverallLikeHandler, FeedbackOverallDontLikeHandler, and FeedbackOverallSuggestionHandler functions)
        * @param {Event} event The Event object
        * @param {string} id The HTML element id
        * @return {void}
        */
        function FeedbackOverallHandlerHelper(event, id) {
            preventDefaultHelper(event);
            stopPropagationHelper(event);

            HandleFeedbackOverall(id);
        }

        function HandleFeedbackOverall(id) {
            var feedbackType;

            Utils.DeleteAndAddClassesById(Constants.IDs.FeedbackOverallLikeAnchor, Constants.Classes.BackgroundBlue, Constants.Classes.BackgroundGrey);
            Utils.DeleteAndAddClassesById(Constants.IDs.FeedbackOverallDontLikeAnchor, Constants.Classes.BackgroundBlue, Constants.Classes.BackgroundGrey);
            Utils.DeleteAndAddClassesById(Constants.IDs.FeedbackOverallSuggestionAnchor, Constants.Classes.BackgroundBlue, Constants.Classes.BackgroundGrey);
            Utils.DeleteAndAddClassesById(id, Constants.Classes.BackgroundGrey, Constants.Classes.BackgroundBlue);

            Utils.SetAttributeOnHtmlElement(Constants.IDs.FeedbackOverallLikeAnchor, Constants.AttributeName.AriaSelected, Constants.AttributeValue.False);
            Utils.SetAttributeOnHtmlElement(Constants.IDs.FeedbackOverallDontLikeAnchor, Constants.AttributeName.AriaSelected, Constants.AttributeValue.False);
            Utils.SetAttributeOnHtmlElement(Constants.IDs.FeedbackOverallSuggestionAnchor, Constants.AttributeName.AriaSelected, Constants.AttributeValue.False);
            Utils.SetAttributeOnHtmlElement(id, Constants.AttributeName.AriaSelected, Constants.AttributeValue.True);

            var element = document.getElementById(id);
            var elementToUpdateId = UI.Layout.GetMiddleTextIdFromOptionString(element.getAttribute(Constants.AttributeName.Value));
            var elementToUpdate = document.getElementById(elementToUpdateId);

            if (!element || !elementToUpdate)
                return;

            switch (element.getAttribute(Constants.AttributeName.Value)) {
                case UI.Strings.l_DontLike: {
                    feedbackType = Constants.FeedbackType.Dislike;
                    elementToUpdate.innerHTML = UI.Strings.l_WhatDontLike;
                    break;
                }
                case UI.Strings.l_Suggestion: {
                    feedbackType = Constants.FeedbackType.Idea;
                    elementToUpdate.innerHTML = UI.Strings.l_WhatSuggest;
                    break;
                }
                default: {
                    feedbackType = Constants.FeedbackType.Like;
                    elementToUpdate.innerHTML = UI.Strings.l_WhatLike;
                    break;
                }
            }

            FeedbackData.AddData(Constants.AttributeValue.FeedbackOverall, feedbackType);

            UI.MainContentHolderSlideLeft(UI.Layout.GetFormContainerIdFromOptionString(element.getAttribute(Constants.AttributeName.Value)));

            // set focus in the comment textarea after a user clicks one of the anchors
            var elementToFocus = document.getElementById(Constants.IDs.SimpleFeedbackFormComment);
            if (elementToFocus)
                elementToFocus.focus();
        }
        Events.HandleFeedbackOverall = HandleFeedbackOverall;

        /**
        * Like button event handler
        * @param {Event} event The Event object
        * @return {void}
        */
        function FeedbackOverallLikeHandler(event) {
            FeedbackOverallHandlerHelper(event, Constants.IDs.FeedbackOverallLikeAnchor);
        }
        Events.FeedbackOverallLikeHandler = FeedbackOverallLikeHandler;

        /**
        * Don't-like button event handler
        * @param {Event} event The Event object
        * @return {void}
        */
        function FeedbackOverallDontLikeHandler(event) {
            FeedbackOverallHandlerHelper(event, Constants.IDs.FeedbackOverallDontLikeAnchor);
        }
        Events.FeedbackOverallDontLikeHandler = FeedbackOverallDontLikeHandler;

        /**
        * Suggestion button event handler
        * @param {Event} event The Event object
        * @return {void}
        */
        function FeedbackOverallSuggestionHandler(event) {
            FeedbackOverallHandlerHelper(event, Constants.IDs.FeedbackOverallSuggestionAnchor);
        }
        Events.FeedbackOverallSuggestionHandler = FeedbackOverallSuggestionHandler;

        /**
        * SimpleFeedbackForm Screen shot check box event handler
        * @param {Event} event The Event object
        * @return {void}
        */
        function SimpleFeedbackFormScreenshotCheckboxHandler(event) {
            stopPropagationHelper(event);

            var element = document.getElementById(Constants.IDs.SimpleFeedbackFormScreenshotCheckbox);

            if (element)
                element.getAttribute(Constants.AttributeName.Value) == Constants.AttributeValue.Checked ? element.setAttribute(Constants.AttributeName.Value, Constants.AttributeValue.Unchecked) : element.setAttribute(Constants.AttributeName.Value, Constants.AttributeValue.Checked);
        }
        Events.SimpleFeedbackFormScreenshotCheckboxHandler = SimpleFeedbackFormScreenshotCheckboxHandler;

        /**
        * SimpleFeedbackForm submit button event handler
        * @param {Event} event The Event object
        * @return {void}
        */
        function SimpleFeedbackFormSubmitButtonHandler(event) {
            preventDefaultHelper(event);
            stopPropagationHelper(event);

            LogFeedbackDataFromElementById(Constants.IDs.SimpleFeedbackFormContainer);
        }
        Events.SimpleFeedbackFormSubmitButtonHandler = SimpleFeedbackFormSubmitButtonHandler;

        /**
        * ContactInfoForm submit button event handler
        * @param {Event} event The Event object
        * @return {void}
        */
        function ContactInfoFormSubmitButtonHandler(event) {
            preventDefaultHelper(event);
            stopPropagationHelper(event);

            LogFeedbackDataFromElementById(Constants.IDs.ContactInfoFormContainer);
        }
        Events.ContactInfoFormSubmitButtonHandler = ContactInfoFormSubmitButtonHandler;

        /**
        * UservoiceLinkForm Close button event handler
        * @param {Event} event The Event object
        * @return {void}
        */
        function UservoiceLinkFormCloseButtonHandler(event) {
            preventDefaultHelper(event);
            stopPropagationHelper(event);

            OfficeBrowserFeedback.Networking.NetworkingMgr.SendTrace(2 /* Info */, "User clicked close button on UserVoice form.");
            DismissAll(false);
        }
        Events.UservoiceLinkFormCloseButtonHandler = UservoiceLinkFormCloseButtonHandler;

        /**
        * UservoiceLinkForm hyperlink event handler. This is necessary so we can log when the user clicks the UserVoice link.
        * @param {Event} event The Event object
        * @return {void}
        */
        function UservoiceLinkFormLinkHandler(event) {
            stopPropagationHelper(event);
            OfficeBrowserFeedback.Networking.NetworkingMgr.SendTrace(2 /* Info */, "User clicked link to UserVoice forum.");
        }
        Events.UservoiceLinkFormLinkHandler = UservoiceLinkFormLinkHandler;

        /**
        * Uses the network manager to log the data that is held on a DOM element. Takes all the elements that are children of the element and are input elements.
        * If the element does not exist, it will fallback to try logging information from the MainContentHolder element. If it is not able to find the element,
        * the function will dismiss the UI with an unsuccesful result and log the error.
        * This fallback is not supposed to happen but while Sway is updated we need to read the data as it was originally read from the MainContentHolder.
        * @param {string} elementId The id string of the element that holds the other elements to log the information about.
        */
        function LogFeedbackDataFromElementById(elementId) {
            // html form data
            var formContainer = document.getElementById(elementId);
            if (!formContainer) {
                formContainer = document.getElementById(Constants.IDs.MainContentHolder);
            }

            if (formContainer) {
                var elements = formContainer.querySelectorAll(Constants.Tags.Input + ", " + Constants.Tags.TextArea);
                for (var i = 0; i < elements.length; i++) {
                    var element = elements[i];
                    switch (element.getAttribute(Constants.AttributeName.Type)) {
                        case Constants.AttributeValue.Submit:
                            break;
                        default:
                            FeedbackData.AddData(element.getAttribute(Constants.AttributeName.Name), element.value);
                            break;
                    }
                }
                FeedbackData.AddData("PageUrl", window.location.href);
                FeedbackData.AddData("BrowserUserAgent", window.navigator.userAgent);

                OfficeBrowserFeedback.Networking.NetworkingMgr.LogFeedbackData(FeedbackData.GetData());

                DismissAll(true);
            } else {
                OfficeBrowserFeedback.Networking.NetworkingMgr.SendTrace(0 /* Error */, "Specified DOM element or MainContentHolder not found");
                DismissAll(false);
            }
        }
        Events.LogFeedbackDataFromElementById = LogFeedbackDataFromElementById;
    })(OfficeBrowserFeedback.Events || (OfficeBrowserFeedback.Events = {}));
    var Events = OfficeBrowserFeedback.Events;

    /**
    * Feedback data module
    */
    (function (FeedbackData) {
        var data = {};

        /**
        * Initializes FeedbackData with app-specific data.
        * @param {[key: string]: any} contextData The intial context data. Used to pass app-specific name/value pairs to be written to the feedback bULS message
        * @return {void}
        */
        function Init(contextData) {
            if (contextData != null) {
                for (var key in contextData) {
                    FeedbackData.AddData(key, contextData[key]);
                }
            }
        }
        FeedbackData.Init = Init;

        /**
        * Add data to feedback data object
        * @param {string} item The item to be added to the data object
        * @param {any} value The value of the item to be added
        * @return {void}
        */
        function AddData(item, value) {
            data[item] = value;
        }
        FeedbackData.AddData = AddData;

        /**
        * Removes a value of the feedback data object.
        * Used to log just the required data, some of the data sent over the wire is just needed to show the appropiate things on UI.
        * @param {string} item key of the data value to remove.
        * @return {void}
        */
        function RemoveData(item) {
            delete data[item];
        }
        FeedbackData.RemoveData = RemoveData;

        /**
        * Get feedback data
        * @return {Object} Feedback data
        */
        function GetData() {
            return data;
        }
        FeedbackData.GetData = GetData;
    })(OfficeBrowserFeedback.FeedbackData || (OfficeBrowserFeedback.FeedbackData = {}));
    var FeedbackData = OfficeBrowserFeedback.FeedbackData;

    

    /**
    * Callback to be invoked when the feedback control is dismissed (cancelled or submitted)
    */
    var OnDismiss;

    /**
    * Initialize all, including networking, UI, and events
    * IMPORTANT: Keep the fully qualified name in sync with the corresponding declaration in
    * msoserviceplatform\src\Browser\feedback\OFeedback\src\scriptsharp\BrowserFeedbackControl.cs
    * @param {string} contentUrl The url in which the collateral for the images reside
    * @param {string} uiStrings List of localized ui strings
    * @param {OnDismissDelegate} Callback to be invoked when the feedback control is dismissed (cancelled or submitted)
    * @param {Diag.ULSCat} Parameter to give a category ID for the browser telemetry. Only optional if you
    *					are using your own implementation of INetworking that doesn't need it
    * @param {Diag.ULSCat} Parameter to give a category ID for the browser feedback data.
    *						Only optional if you are using your own implementation of INetworking that doesn't need it
    * @param {number} lcid The UI locale identifier of the calling page. Optional. If not present, will redirect based on the default
    *						behavior of the privacy policy page.
    * @param {[key: string]: any} context Used to pass app-specific name/value pairs to be written to the feedback bULS message.
    * @param {[key: string]: UI.Layout.FeedbackFormTemplate} activeFormTemplates Dictionary of ids used to identify which form is to be used when the user hits the like option,
    *  indexed by the Constants.FeedbackType string values.
    * @return {void}
    */
    function InitAll(contentUrl, uiStrings, onDismiss, telemetryID, feedbackID, lcid, context, activeFormTemplates) {
        OfficeBrowserFeedback.Networking.NetworkingMgr.Init(telemetryID, feedbackID);
        FeedbackData.Init(context);
        UI.Init(contentUrl, uiStrings, lcid, activeFormTemplates);
        Events.Init();

        OnDismiss = onDismiss;

        OfficeBrowserFeedback.Networking.NetworkingMgr.SendTrace(2 /* Info */, { OFeedback: "Office browser feedback UI opened" });
    }
    OfficeBrowserFeedback.InitAll = InitAll;

    /**
    * Dismiss all, including networking, UI, and events
    * @param {Boolean} Was the control submitted (true), or cancelled (false)?
    * @return {void}
    */
    function DismissAll(submitted) {
        Events.Dismiss();
        UI.Dismiss();
        OfficeBrowserFeedback.Networking.NetworkingMgr.Dismiss();

        OnDismiss(submitted);
    }
    OfficeBrowserFeedback.DismissAll = DismissAll;
})(OfficeBrowserFeedback || (OfficeBrowserFeedback = {}));
//# sourceMappingURL=OFeedback.js.map
//Unit tests for this file can be found in PublicOneNoteDotComUnitTests.ts
// Add this class to elements to add a OnClick telemetry event to them. Make sure they have an id defined. <a> tags are already done automatically
var TelemetryClickableClass = ".onclickable";
/*--------------------------------------------------------------------------
   System Console implementation of the IConsole interface.

   Pipes all methods to the window.console, if it exists.
   -------------------------------------------------------------------------*/
var SystemConsole = (function () {
    function SystemConsole() {
    }
    SystemConsole.prototype.isEnabled = function () {
        return (window.console && window.console.log);
    };
    SystemConsole.prototype.error = function (message) {
        window.console.error(message);
    };
    SystemConsole.prototype.warning = function (message) {
        window.console.warn(message);
    };
    SystemConsole.prototype.info = function (message) {
        window.console.info(message);
    };
    SystemConsole.prototype.log = function (message) {
        window.console.log(message);
    };
    return SystemConsole;
})();
var ConsoleUlsHost = function (defaultCategory, console, suppressBubbling) {
    ConsoleUlsHost.initializeBase(this, [SessionId, "/" + Diag.UploadingUlsHost.defaultRemoteUlsUrl]);
    this._defaultCategory = defaultCategory;
    if (console) {
        this._console = console;
    }
    else {
        this._console = new SystemConsole();
    }
    this._suppressBubbling = suppressBubbling;
};
ConsoleUlsHost.prototype = {
    get_defaultCategory: function () {
        return this._defaultCategory;
    },
    handleTrace: function (args) {
        // In Internet Explorer 9 (and 8), the console object is only exposed when the 
        // developer tools are opened for a particular tab. If you hide the developer 
        // tools window for that tab, the console object remains exposed for each page 
        // you navigate to. If you open a new tab, you must also open the developer 
        // tools for that tab in order for the console object to be exposed.
        if (this._console.isEnabled()) {
            var traceMessage = "(" + args.timestamp + "):\t" + args.message;
            switch (args.level) {
                case Diag.ULSTraceLevel.error:
                    {
                        this._console.error(traceMessage);
                        break;
                    }
                case Diag.ULSTraceLevel.warning:
                    {
                        this._console.warning(traceMessage);
                        break;
                    }
                case Diag.ULSTraceLevel.info:
                    {
                        this._console.info(traceMessage);
                        break;
                    }
                default:
                    {
                        this._console.log(traceMessage);
                        break;
                    }
            }
        }
        if (!this._suppressBubbling)
            ConsoleUlsHost.callBaseMethod(this, "handleTrace", [args]);
    },
    showAssertDialog: function (dialogMessage) {
    }
};
ConsoleUlsHost.registerClass("ConsoleUlsHost", Diag.UploadingUlsHost);
/*--------------------------------------------------------------------------
   Initializes our telemetry:
   -------------------------------------------------------------------------*/
var TheUlsHost;
var InitializeUls = function (defaultCategory) {
    // If we received an invalid uls category set the default value
    var unknownUlsCategoryGiven = false;
    if (!defaultCategory) {
        defaultCategory = Diag.ULSCat.msoulscat_Toronto;
        unknownUlsCategoryGiven = true;
    }
    TheUlsHost = new ConsoleUlsHost(defaultCategory);
    Diag.ULS.setUlsHost(TheUlsHost);
    // Log an error if an unknown category was given
    if (unknownUlsCategoryGiven) {
        // ASSERTTAG_IGNORE_START
        Diag.ULS.sendTraceTag(0x005e01d7, TheUlsHost.get_defaultCategory(), Diag.ULSTraceLevel.error, "Unknown uls category passed to InitializeUls: {0}", ulsCategoryStringSetInCshtml);
    }
    // ASSERTTAG_IGNORE_FINISH
    if (typeof (PageLoadTime) !== "undefined") {
        RecordPageLoadTime();
    }
    return !unknownUlsCategoryGiven;
};
/*--------------------------------------------------------------------------
   Adds tracing to all anchor elements
--------------------------------------------------------------------------*/
var InstrumentLinks = function (anchors) {
    var iUnknown = 0;
    for (var iAnchor = 0; iAnchor < anchors.length; iAnchor++) {
        var anchor = anchors[iAnchor];
        // If the anchor has no id give it an "unknown" id so we can track it.
        if (!anchor.id) {
            anchor.id = "un_" + iUnknown;
            iUnknown++;
        }
        anchor.onclick = GenerateInstrumentationLink(anchor.id, anchor.onclick);
        anchor.ondragstart = GenerateDragInstrumentationLink(anchor.id, anchor.ondrag);
        anchor.oncontextmenu = GenerateContextMenuInstrumentationLink(anchor.id, anchor.oncontextmenu);
    }
};
/*--------------------------------------------------------------------------
   Logs the width and height of the user's screen and window
--------------------------------------------------------------------------*/
var LogUserViewPortInfo = function () {
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    var screenWidth = screen.width;
    var screenHeight = screen.height;
    var documentHeight = $(document).height();
    var percentageOfPageVisible = (windowHeight / documentHeight) * 100;
    // ASSERTTAG_IGNORE_START
    Diag.ULS.sendTraceTag(0x00623714, TheUlsHost.get_defaultCategory(), Diag.ULSTraceLevel.info, "User ViewPort Info;windowWidth={0};windowHeight={1};screenWidth={2};screenHeight={3};percentageOfPageVisible={4};", windowWidth, windowHeight, screenWidth, screenHeight, percentageOfPageVisible.toFixed(3));
    // ASSERTTAG_IGNORE_FINISH
};
/*--------------------------------------------------------------------------
   Determines how much of the page the user has been able to see
--------------------------------------------------------------------------*/
var furthestScrollDepthPercentage = 0;
var UpdateFurthestScrollDepth = function () {
    var scrollTop = $(window).scrollTop();
    var windowHeight = $(window).height();
    var scrollBottom = scrollTop + windowHeight;
    var documentHeight = $(document).height();
    var scrollDepthPercentage = (scrollBottom / documentHeight) * 100;
    if (scrollDepthPercentage > furthestScrollDepthPercentage) {
        furthestScrollDepthPercentage = scrollDepthPercentage;
    }
};
/*--------------------------------------------------------------------------
   Logs the page load time.
--------------------------------------------------------------------------*/
var RecordPageLoadTime = function () {
    Diag.ULS.sendTraceTag(0x007d3814, Diag.ULSCat.msoulscat_Toronto, Diag.ULSTraceLevel.info, "PageLoadTime: {0}", PageLoadTime);
};
/*--------------------------------------------------------------------------
   Logs the amount of time the user was on the page
--------------------------------------------------------------------------*/
var PageStartLoadTime;
var LogElapsedTimeOnPage = function () {
    var pageExitTime = new Date().getTime();
    var secondsSpentOnPage = (pageExitTime - PageStartLoadTime) / 1000;
    // ASSERTTAG_IGNORE_START
    Diag.ULS.sendTraceTag(0x00623715, TheUlsHost.get_defaultCategory(), Diag.ULSTraceLevel.info, "User time on page ;secondsSpentOnPage={0};", secondsSpentOnPage.toFixed(3));
    // ASSERTTAG_IGNORE_FINISH
};
/*--------------------------------------------------------------------------
   Send OnLoad ULS logs and instrument links
--------------------------------------------------------------------------*/
// Uls category for page that's set in cshtml.
// Declared here as undefined. Cshtml should set this value (not declare the var again).
var ulsCategoryStringSetInCshtml; // Set in cshtml
/* Some scripts may also have a "beforeunload" function they want to fire,
 * but need it to fire before the one in BrowserUls.
 * For example, they are adding additional logging, and we want to flush
 * the ULS logs all at once. */
var additionalBeforeUnloadFunctions = new Array();
var InsertAdditionalBeforeUnloadFunction = function (functionToAdd) {
    additionalBeforeUnloadFunctions.push(functionToAdd);
};
/* Run during "BeforeUnload", however in cases where the browser blocked in, it may be
 * called during "Unload".
*/
var OnUnloadingPage = function () {
    for (var i = 0; i < additionalBeforeUnloadFunctions.length; i++) {
        if (typeof additionalBeforeUnloadFunctions[i] == "function") {
            additionalBeforeUnloadFunctions[i]();
        }
    }
    additionalBeforeUnloadFunctions = new Array();
    if (TheUlsHost) {
        FlushBrowserUls();
    }
};
/* We want to hook into the onBeforeUnload/onUnload events and trigger BULS upload.
 * Both for browsers that do not notify of page show & hide, but also in cases where
 * browsers may erroneously block XHRs from OnPageHide/OnUnload.  Note that we'll try
 * our best to upload onBeforeUnload, and if that somehow doesn't get called make
 * another attempt in onUnload instead. */
var _onBeforePageUnloadCalled;
$(window).on("beforeunload", function () {
    OnUnloadingPage();
    _onBeforePageUnloadCalled = true;
});
/**
* Ensure that browser ULS has a chance to finalize any telemetry uploads
* when we're navigating away from the page.
*/
$(window).on("unload", function () {
    if (!_onBeforePageUnloadCalled)
        OnUnloadingPage();
    _onBeforePageUnloadCalled = false;
});
$(window).on("pagehide", function () {
    if (TheUlsHost) {
        // If we're in between an OnBeforeUnload/OnUnload set of events, we don't need to
        // flush again.
        if (!_onBeforePageUnloadCalled)
            FlushBrowserUls();
    }
});
/*
 * The browser fires this every time the scrollbar is moved
 */
$(window).on("scroll", function () {
    UpdateFurthestScrollDepth();
});
/**
 * Finalizes and dispatches any telemetry uploads still in progress.
 */
function FlushBrowserUls() {
    var defaultCategory = TheUlsHost.get_defaultCategory();
    TheUlsHost.dispose();
    // Depending on the link, we may end up not actually navigating away!
    // (For instance ms-windows-store links.)  In such cases, we should re-prime ULS 
    // to ensure that we continue to receive telemetry:
    InitializeUls(defaultCategory);
}
/**
 * Trigger a background telemetry upload
 */
function FlushUlsAsynchronous() {
    if (TheUlsHost) {
        TheUlsHost.flushAsynchronous();
    }
}
/*--------------------------------------------------------------------------
   Helper method used to create a closure with the given anchor's id
--------------------------------------------------------------------------*/
function GenerateInstrumentationLink(elementId, originalClickHandler) {
    return function (event) {
        var buttonPressed = "";
        if (event != null) {
            switch (event.which) {
                case 1:
                    buttonPressed = "Left";
                    break;
                case 2:
                    buttonPressed = "Middle";
                    break;
                case 3:
                    buttonPressed = "Right";
                    break;
                default:
                    buttonPressed = "Unknown";
                    break;
            }
        }
        // Trigger click event uls immediately
        FlushUlsAsynchronous();
        if (originalClickHandler)
            return originalClickHandler(event);
        return true;
    };
}
function GenerateContextMenuInstrumentationLink(elementId, originalContextMenuHandler) {
    return function (event) {
        if (originalContextMenuHandler)
            return originalContextMenuHandler(event);
        return true;
    };
}
function GenerateDragInstrumentationLink(elementId, originalDragHandler) {
    return function (event) {
        if (originalDragHandler)
            return originalDragHandler(event);
        return true;
    };
}
/// <reference path="CommonScripts.ts"/>
/**
 * Enum for the os platforms
 * Important note: Check out BaseWebViewPage. ..\dev\oneservice\site\Controller\Src\Base\OperatingSystemPlatform.cs and OperatingSystemPlatform there, and make sure
 * the OperatingSystemPlatform here is consistent with the returning results from GetCssClassName
 */
var OSPlatform = {
    IPHONE: "iPhone",
    IPOD: "iPod",
    IPAD: "iPad",
    ANDROID: "Android",
    WINDOWSPHONE8: "WP8",
    WINDOWSPHONE7: "WP7",
    WINDOWS8ANDUP: "Win8AndUp",
    WINDOWS7: "Win7",
    WINDOWSVISTAANDBELOW: "WinVistaAndBelow",
    MAC: "Mac",
    CHROMEBOOK: "Chromebook",
    UNSUPPORTED: "unsupported"
};
/**
 * Cached value of the _osPlatform
 */
var _osPlatform = undefined;
/**
 * Our server side code figures out the user platform and puts different info into the html body tag's css class name.
 */
function GetOSPlatform() {
    if (_osPlatform)
        return _osPlatform;
    if ($("body").hasClass(OSPlatform.IPHONE))
        _osPlatform = OSPlatform.IPHONE;
    else if ($("body").hasClass(OSPlatform.IPOD))
        _osPlatform = OSPlatform.IPOD;
    else if ($("body").hasClass(OSPlatform.IPAD))
        _osPlatform = OSPlatform.IPAD;
    else if ($("body").hasClass(OSPlatform.ANDROID))
        _osPlatform = OSPlatform.ANDROID;
    else if ($("body").hasClass(OSPlatform.WINDOWSPHONE8))
        _osPlatform = OSPlatform.WINDOWSPHONE8;
    else if ($("body").hasClass(OSPlatform.WINDOWSPHONE7))
        _osPlatform = OSPlatform.WINDOWSPHONE7;
    else if ($("body").hasClass(OSPlatform.WINDOWS8ANDUP))
        _osPlatform = OSPlatform.WINDOWS8ANDUP;
    else if ($("body").hasClass(OSPlatform.WINDOWS7))
        _osPlatform = OSPlatform.WINDOWS7;
    else if ($("body").hasClass(OSPlatform.WINDOWSVISTAANDBELOW))
        _osPlatform = OSPlatform.WINDOWSVISTAANDBELOW;
    else if ($("body").hasClass(OSPlatform.MAC))
        _osPlatform = OSPlatform.MAC;
    else if ($("body").hasClass(OSPlatform.CHROMEBOOK))
        _osPlatform = OSPlatform.CHROMEBOOK;
    else
        _osPlatform = OSPlatform.UNSUPPORTED;
    return _osPlatform;
}
// variable defined in razor for public site index.cshtml
var ClipperIndexURL;
// variables defined in razor for shared _Layout.cshtml
var NotebooksIndexURL;
var OrigRefCookieName;
var OrigRefCookieValue;
// functions to override as defined in home.js (a shared header script)
var ShowSignInControl;
var onSignInDialogKeyUp;
$(window).on("load", function () {
    // Make sure we are actually using a Chrome
    $("a.ChromeDownload").on("click", function (event) {
        var currentTarget = $(event.currentTarget);
        var chromeAppUrl = currentTarget.attr("href");
        // When we install the chrome apps we want the following behavior
        // OneNote Online App
        //		Install inline, if success navigate to the notebooks url, if non-user initiated failure go to the chrome store
        Common.InstallChromeApp(chromeAppUrl, NotebooksIndexURL, chromeAppUrl, false);
    });
    // if the shared header sign in button exists on page
    // we need to ensure referrer data will be correct after user authentication
    if (document.getElementById("h_sign")) {
        Common.EnableOrigRefCookieSetOnAuth();
    }
});
var Common;
(function (Common) {
    /**
    * Install Chrome apps inline on the site
    */
    function InstallChromeApp(chromeInstallAppUrl, onSuccessDest, onFailureDest, redirectOnAllFailures) {
        if (redirectOnAllFailures === void 0) { redirectOnAllFailures = false; }
        // Allow inline install from the platform install links on chrome browsers/operating systems
        if (chrome.webstore) {
            Utils.DisableClick(event);
            chrome.webstore.install(chromeInstallAppUrl, function () {
                // When the clipper is installed we want to navigate the user to the clipper url for more information
                if (onSuccessDest) {
                    window.location.href = onSuccessDest;
                }
            }, function (error, errorCode) {
                if (onFailureDest) {
                    // there are a few cases we expect failure where we might not want redirect
                    if (redirectOnAllFailures || (errorCode !== "launchInProgress" && errorCode !== "userCancelled" && errorCode !== "aborted")) {
                        window.location.href = onFailureDest;
                    }
                }
            });
        }
    }
    Common.InstallChromeApp = InstallChromeApp;
    /**
    * Override for function onSignInDialogKeyUp as defined in home.js (a shared header script)
    */
    function OnSignInDialogKeyUpOverride(e) {
        // When the escape key is pressed
        if (e.which === 27) {
            // Delete original referrer cookie (by setting past expiration date).
            Utils.SetCookie(OrigRefCookieName, OrigRefCookieValue, new Date("1970-01-01"));
            onSignInDialogKeyUp(e);
            $(document).off("keyup", OnSignInDialogKeyUpOverride);
        }
    }
    /**
    * If the greyed-out area of the HRD overlay is clicked, or ESC pressed, then the user will exit the sign-in flow.
    * We need to be ready to clean up the referrer cookie in this event.
    */
    function ModifyOnClickAndKeyUpForHrdOverlay() {
        // Store the original handler before removal so that we can continue exiting the sign-in flow as usual later on
        var originalOnClickForOverlay = $("#h_overlay")[0].onclick;
        // Replace inline DOM attribute, HideSignInControl(), with this modification
        $("#h_overlay")[0].onclick = function () {
            // Delete original referrer cookie (by setting past expiration date).
            Utils.SetCookie(OrigRefCookieName, OrigRefCookieValue, new Date("1970-01-01"));
            originalOnClickForOverlay(null); // aka HideSignInControl()
            $(document).off("keyup", OnSignInDialogKeyUpOverride);
        };
        // We need to be selective when removing keyup event handlers on "document" jQuery object below
        // Remove this specific handler that is set in home.js (to be called later in OnSignInDialogKeyUpOverride)
        $(document).off("keyup", onSignInDialogKeyUp);
        // Add new keyup handler, making sure to remove it first if it already exists
        $(document).off("keyup", OnSignInDialogKeyUpOverride).keyup(OnSignInDialogKeyUpOverride);
    }
    /**
    * Maintain referrer data in a cookie (set client-side) by modifying the shared sign-in button onclick handler.
    *
    * We need to set this referrer cookie before the user has a chance to navigate away from the site for authentication.
    * We need to modify the inlined onclick handler via JS because it is set in shared header HTML that we do not control.
    * Note that once we set the cookie, we continue sign-in flow as usual.
    */
    function EnableOrigRefCookieSetOnAuth() {
        // Setting the onclick DOM attribute to null removes the inlined function,
        // GenerateInstrumentationLink("h_sign", ShowSignInControl)
        $("#h_sign")[0].onclick = null;
        $("#h_sign").click(function (e) {
            if ($("#h_overlay").is(":visible")) {
                // The HRD overlay is already visible, so this click on sign-in will just hide the overlay and exit sign-in flow.
                // Delete the original referrer cookie (by setting past expiration date) and continue.
                Utils.SetCookie(OrigRefCookieName, OrigRefCookieValue, new Date("1970-01-01"));
                ShowSignInControl();
            }
            else {
                Utils.SetCookie(OrigRefCookieName, OrigRefCookieValue);
                ShowSignInControl();
                // The HRD overlay has become visible, so make sure we can correctly handle a user clicking on it (to dismiss sign-in flow)
                ModifyOnClickAndKeyUpForHrdOverlay();
            }
            // Remember to generate instrumentation for this anchor
            GenerateInstrumentationLink("h_sign", null)(e);
        });
    }
    Common.EnableOrigRefCookieSetOnAuth = EnableOrigRefCookieSetOnAuth;
    function AddParameterToURL(url, paramKey, paramValue) {
        return url + (url.split("?")[1] ? "&" : "?") + paramKey + "=" + paramValue;
    }
    Common.AddParameterToURL = AddParameterToURL;
})(Common || (Common = {}));
/**
 * Helper utility methods
 */
var Utils;
(function (Utils) {
    /**
     * Gets the locale of the document
     */
    function GetLocale(doc) {
        if (doc === void 0) { doc = document; }
        // window.navigator.userLanguage is defined for IE, and window.navigator.language is defined for other browsers
        var docLocale = doc.getElementsByTagName("html")[0].getAttribute("lang");
        return docLocale ? docLocale : (window.navigator.userLanguage || window.navigator.language);
    }
    Utils.GetLocale = GetLocale;
    /**
     * Sets a browser cookie
     */
    function SetCookie(key, value, expires) {
        if (expires === void 0) { expires = null; }
        var cookieBody = key + "=" + value;
        if (expires) {
            cookieBody += ";expires=" + expires.toUTCString();
        }
        // Mark the cookie as secure
        cookieBody += ";secure";
        document.cookie = cookieBody;
    }
    Utils.SetCookie = SetCookie;
    /**
     * Expires/deletes a browser cookie
     */
    function ExpireCookie(key) {
        SetCookie(key, "", new Date("2000-01-01"));
    }
    Utils.ExpireCookie = ExpireCookie;
    /**
     * Gets a browser cookie
     */
    function GetCookie(key) {
        var keyValue = document.cookie.match("(^|;) ?" + key + "=([^;]*)(;|$)");
        return keyValue ? keyValue[2] : null;
    }
    Utils.GetCookie = GetCookie;
    /**
    * Disable click event by preventing and stopping its propagation
    */
    function DisableClick(event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    }
    Utils.DisableClick = DisableClick;
    /**
    * Creates a random Guid
    */
    function GenerateGuid() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === "x" ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    Utils.GenerateGuid = GenerateGuid;
    /**
     * Add an <link> tag for a CSS file at a specific location and call a callback function on success.
     *
     * @param fileName The URL of the CSS file.
     * @param callback The function to be called after the CSS is properly loaded.
     */
    function LoadCSS(fileName, className, callback) {
        var fileRef = document.createElement("link");
        fileRef.rel = "stylesheet";
        fileRef.type = "text/css";
        fileRef.href = fileName;
        fileRef.className = className;
        document.head.appendChild(fileRef);
        // Call the callback function once we have downloaded the CSS. We do this by telling the browser to load 
        // the CSS as an image. This causes an error because of the differing MIME types and thus the callback 
        // is called onerror.
        if (callback) {
            var image = new Image();
            image.onerror = callback;
            image.src = fileName;
        }
    }
    Utils.LoadCSS = LoadCSS;
    /**
     * Gets the css value of the attribute on the element
     */
    function GetCssAttribute(element, attribute) {
        if (window.getComputedStyle) {
            return getComputedStyle(element).getPropertyValue(attribute);
        }
        else {
            return element["currentStyle"][attribute];
        }
    }
    Utils.GetCssAttribute = GetCssAttribute;
    /**
     * Sets the css value of the attribute on the element
     */
    function SetCssAttribute(element, attributeName, value) {
        var attributes = [attributeName];
        // Deal with browser prefixed versions
        if (attributeName[0] === "-") {
            attributes = [
                "-ms" + attributeName,
                "-moz" + attributeName,
                "-webkit" + attributeName,
                "-o" + attributeName,
                attributeName.substr(1)
            ];
        }
        for (var i = 0; i < attributes.length; i++) {
            if (element.style.setProperty) {
                element.style.setProperty(attributes[i], value);
            }
            else {
                element.style["setAttribute"](attributes[i], value);
            }
        }
    }
    Utils.SetCssAttribute = SetCssAttribute;
    /**
     * Add a name/value pair to the query string of a URL
     *
     * @param originalUrl The URL to add the name/value to
     * @param name New value name
     * @param value New value
     * @return Resulting URL
     */
    function AddUrlQueryValue(originalUrl, name, value) {
        var newUrl = originalUrl;
        if (-1 === newUrl.indexOf("?")) {
            newUrl += "?";
        }
        else {
            newUrl += "&";
        }
        newUrl += name + "=" + value;
        return newUrl;
    }
    Utils.AddUrlQueryValue = AddUrlQueryValue;
    /**
     * Call the /count/{id}?paramData route
     *
     * This can be used to log telemetry when we are unable to use BrowserUls
     * (for instance, if we are not on our domain)
     *
     * @param hostName The name of the host to hit (ex: www.onenote.com)
     * @param id The Id of the datapoint
     * @param paramData The data to send, usually in the format of params ("key1=value1,key2=value2")
     */
    function SendDataToCountEndpoint(hostName, id, paramData) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "https://" + hostName + "/count/" + id + "?" + paramData);
        xmlhttp.send();
    }
    Utils.SendDataToCountEndpoint = SendDataToCountEndpoint;
    /*
     * Retrieve the localized string from the server for the given id using /Strings?ids={ids}
     *
     * @param hostName The name of the server to use (ex: www.onenote.com)
     * @param stringId The resourceId to look up in the strings table
     * @param defaultString Optional string in case we are unable to get a result, defaults to null
     * @return The localized string. If unobtained then we return "" or optionally the defaultString value
     */
    function GetLocalizedStringFromServer(hostName, stringId, defaultString) {
        if (defaultString === void 0) { defaultString = ""; }
        var stringResults = GetLocalizedStringsFromServer(hostName, [stringId]);
        if (stringResults[stringId] == null || stringResults[stringId] === "") {
            return defaultString;
        }
        return stringResults[stringId];
    }
    Utils.GetLocalizedStringFromServer = GetLocalizedStringFromServer;
    /*
     * Retrieve the localized strings from the server for the given ids using /Strings?ids={ids}
     *
     * @param hostName The name of the server to use (ex: www.onenote.com)
     * @param stringIds The resourceIds to look up in the strings table
     * @return an associative array of any values obtained. If there was an error, then an empty object is returned
     */
    function GetLocalizedStringsFromServer(hostName, stringIds) {
        try {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("GET", "https://" + hostName + "/Strings?ids=" + stringIds.join(), false);
            xmlhttp.send();
            return JSON.parse(xmlhttp.responseText);
        }
        catch (error) {
            // Either there was an error communicating with the server, or an error parsing the results
            SendDataToCountEndpoint(hostName, "StringsUtil", "error=" + error);
            return {};
        }
    }
    Utils.GetLocalizedStringsFromServer = GetLocalizedStringsFromServer;
})(Utils || (Utils = {}));
/// <reference path="CommonScripts.ts" />
/// <reference path="../../../../../../ICache/current/msoserviceplatform/x64/debug/en-us/browser/intl/ofeedbackintl.d.ts" />
/// <reference path="../../../../../../ICache/current/msoserviceplatform/x64/debug/x-none/browser/feedback/ofeedback/ts10/ofeedback.d.ts" />
var Feedback;
(function (Feedback) {
    var Constants;
    (function (Constants) {
        var Urls;
        (function (Urls) {
        })(Urls = Constants.Urls || (Constants.Urls = {}));
        var Strings;
        (function (Strings) {
        })(Strings = Constants.Strings || (Constants.Strings = {}));
    })(Constants = Feedback.Constants || (Feedback.Constants = {}));
    /**
    * Localized implementation of FdbkIntl.UiStringsType.
    * Notice: Have to add prefix Feedback. when referring Constants.Strings module in this class,
    * otherwise tsc doesn't allow this to compile. Seems a bug of tsc.
    */
    var LocalizedStrings = (function () {
        function LocalizedStrings() {
            this.l_Close = Feedback.Constants.Strings.Close;
            this.l_CommentPlaceholder = Feedback.Constants.Strings.CommentPlaceholder;
            this.l_DontLike = Feedback.Constants.Strings.DontLike;
            this.l_DocumentPermission = Feedback.Constants.Strings.DocumentPermission;
            this.l_EmailRequest = Feedback.Constants.Strings.EmailRequest;
            this.l_FeedbackOverall = Feedback.Constants.Strings.FeedbackOverall;
            this.l_FeedbackTitle = Feedback.Constants.Strings.FeedbackTitle;
            this.l_IncludeScreenshot = Feedback.Constants.Strings.IncludeScreenshot;
            this.l_Like = Feedback.Constants.Strings.Like;
            this.l_Optional = Feedback.Constants.Strings.Optional;
            this.l_PrivacyStatement = Feedback.Constants.Strings.PrivacyStatement;
            this.l_Submit = Feedback.Constants.Strings.Submit;
            this.l_Suggestion = Feedback.Constants.Strings.Suggestion;
            this.l_UservoiceInformation = Feedback.Constants.Strings.UservoiceInformation;
            this.l_WhatLike = Feedback.Constants.Strings.WhatLike;
            this.l_WhatDontLike = Feedback.Constants.Strings.WhatDontLike;
            this.l_WhatSuggest = Feedback.Constants.Strings.WhatSuggest;
        }
        return LocalizedStrings;
    })();
    Feedback.LocalizedStrings = LocalizedStrings;
    function ShowTool(ulsCategoryName, lcid) {
        // TODD: Replace all msoulscat_Toronto with actual uls string.
        var ulsCategory = Diag.ULSCat.msoulscat_Toronto;
        if (ulsCategoryName) {
            ulsCategory = Diag.ULSCat[ulsCategoryName];
        }
        var uiStrings = new Feedback.LocalizedStrings();
        OfficeBrowserFeedback.InitAll(Constants.Urls.ImageRoot, uiStrings, Feedback.OnDismiss, ulsCategory, ulsCategory, lcid);
    }
    Feedback.ShowTool = ShowTool;
    /**
    * Callback to be invoked when the feedback control is dismissed (cancelled or submitted)
    * @param {Boolean} Was the control submitted (true), or cancelled (false)?
    * @return {void}
    */
    function OnDismiss(submitted) {
        if (submitted) {
            BrowserHandler.tabs.query({ 'active': true }, function (tabs) {
                BrowserHandler.tabs.remove(tabs[0].id);
            });
        }
    }
    Feedback.OnDismiss = OnDismiss;
})(Feedback || (Feedback = {}));
/// <reference path="../CommonScripts.ts" />
/// <reference path="../FeedbackTool.ts" />

$(window).on("load", function () {
    Feedback.ShowTool(ulsCategoryStringSetInCshtml, lcid);
});
//# sourceMappingURL=Feedback.core.js.map