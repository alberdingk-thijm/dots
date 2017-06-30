/* global BrowserHandler */

"use strict";

var SessionId = "";
var lcid = "";

Diag.ULSCat.msoulscat_Toronto = -1; // TODO: Remove this after getting the ofeedback uls string for the extension
ulsCategoryStringSetInCshtml = "msoulscat_Toronto"; // TODO: Replace with the ofeedback uls string for the extension

(function (Feedback) {
    (function (Constants) {
        (function (Urls) {
            Urls.ImageRoot = "../assets/feedback/";
        })(Constants.Urls || (Constants.Urls = {}));
        var Urls = Constants.Urls;
        (function (Strings) {
            Strings.CommentPlaceholder = BrowserHandler.i18n.getMessage("FeedbackCommentPlaceholder");
            Strings.DontLike = BrowserHandler.i18n.getMessage("FeedbackDontLike");
            Strings.FeedbackOverall = BrowserHandler.i18n.getMessage("FeedbackOverall");
            Strings.FeedbackTitle = BrowserHandler.i18n.getMessage("FeedbackTitle");
            Strings.Like = BrowserHandler.i18n.getMessage("FeedbackLike");
            Strings.PrivacyStatement = BrowserHandler.i18n.getMessage("FeedbackPrivacyStatement");
            Strings.Submit = BrowserHandler.i18n.getMessage("FeedbackSubmit");
            Strings.Suggestion = BrowserHandler.i18n.getMessage("FeedbackSuggestion");
            Strings.WhatLike = BrowserHandler.i18n.getMessage("FeedbackWhatLike");
            Strings.WhatDontLike = BrowserHandler.i18n.getMessage("FeedbackWhatDontLike");
            Strings.WhatSuggest = BrowserHandler.i18n.getMessage("FeedbackWhatSuggest");
        })(Constants.Strings || (Constants.Strings = {}));
        var Strings = Constants.Urls;
    })(Feedback.Constants || (Feedback.Constants = {}));
    var Constants = Feedback.Constants;
})(Feedback || (Feedback = {}));

function LogFeedbackDataToAI(data) {
    var telemetryEnabled = !appInsights.config.disableTelemetry;
    
    BrowserHandler.runtime.sendMessage({ activity: 'telemetry', command: 'setDisabledTelemetry', enabled: 'false' });
    BrowserHandler.runtime.sendMessage({ activity: 'telemetry', command: 'trackEvent', eventName: String.format("Feedback_{0}", data.feedbackOverall), properties: { Comment: data.officeBrowserFeedbackComment } });
    BrowserHandler.runtime.sendMessage({ activity: 'telemetry', command: 'setDisabledTelemetry', enabled: telemetryEnabled });
}