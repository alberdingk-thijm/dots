/*! Version=16.0.0.0 */
Type.registerNamespace('Diag');

Diag.ULSCat = function() {}
Diag.ULSCat.prototype = {
    msoulscat_ES_EWAJS: 0, 
    msoulscat_ES_EWAJSGrid: 1, 
    msoulscat_ES_EWAJSHeaderResize: 2, 
    msoulscat_ES_EWAJSKeyboard: 3, 
    msoulscat_ES_EWAJSTest: 4, 
    msoulscat_ES_EWAJSFloatingObjects: 5, 
    msoulscat_ES_EWAJSChart: 6, 
    msoulscat_ES_MobileEwa: 7, 
    msoulscat_ES_EWAJSBIExplore: 8, 
    msoulscat_ES_EWAJSNov: 9, 
    msoulscat_ES_EWAJSExcelEverywhere: 10, 
    msoulscat_ES_EWAJSTp: 11, 
    msoulscat_ES_EWAJSComment: 12, 
    msoulscat_bULS_Uploader: 100, 
    msoulscat_bULS_CachingHost: 101, 
    msoulscat_bULS_Core: 102, 
    msoulscat_Osi_MsoSpLogging: 200, 
    msoulscat_MSOSP_Error: 201, 
    msoulscat_MSOSP_FileMenuCommands: 202, 
    msoulscat_MSOSP_MsoSpRenameManager: 203, 
    msoulscat_MSOSP_CrossDocumentMessenger: 204, 
    msoulscat_MSOSP_ClientRequestManager: 205, 
    msoulscat_MSOSP_DownloadQueue: 206, 
    msoulscat_MSOSP_CommandUI: 207, 
    msoulscat_MSOSP_AppSettings: 208, 
    msoulscat_MSOSP_CommonDebug: 209, 
    msoulscat_MSOSP_DomUtils: 210, 
    msoulscat_MSOSP_OIC: 211, 
    msoulscat_MSOSP_AnonEdit: 212, 
    msoulscat_MSOSP_Activity: 213, 
    msoulscat_MSOSP_AnonCreate: 214, 
    msoulscat_MSOSP_O365ShellService: 215, 
    msoulscat_MSOSP_SaveToCloudStorage: 216, 
    msoulscat_MSOSP_SessionExpirationManager: 217, 
    msoulscat_MSOSP_TaskManager: 218, 
    msoulscat_MSOSP_SaveAsToHost: 219, 
    msoulscat_Wac_WordMerge: 300, 
    msoulscat_WAC_WordViewer: 301, 
    msoulscat_Wac_WordPresence: 302, 
    msoulscat_Wac_RevisionDiffer: 303, 
    msoulscat_Wac_WordCoauth: 304, 
    msoulscat_Wac_Replication: 305, 
    msoulscat_Wac_BrowserGeneral: 306, 
    msoulscat_Box4_CopyPaste: 307, 
    msoulscat_Wac_WordEditorFootnoteEndnote: 308, 
    msoulscat_Wac_WordEditorPageNumber: 309, 
    msoulscat_Wac_EventManager: 310, 
    msoulscat_Wac_WordEditorTableStyle: 311, 
    msoulscat_Wac_WordEditorFindReplace: 312, 
    msoulscat_Wac_FindReplace: 313, 
    msoulscat_Wac_WordEditorPageBreak: 314, 
    msoulscat_WAC_Box4Crash: 315, 
    msoulscat_Wac_WordEditorBlobFormatting: 316, 
    msoulscat_Wac_WordEditorHeaderFooter: 317, 
    msoulscat_Wac_WordEditorSelection: 318, 
    msoulscat_Wac_NodeLogger: 319, 
    msoulscat_Wac_TaskPaneFramework: 320, 
    msoulscat_Wac_Focus: 321, 
    msoulscat_Wac_ImageEditor: 322, 
    msoulscat_Wac_EditingView: 323, 
    msoulscat_Wac_Box4General: 324, 
    msoulscat_Wac_PeoplesWell: 325, 
    msoulscat_Wac_PageView: 326, 
    msoulscat_Wac_Comments: 327, 
    msoulscat_Wac_DirectPrint: 328, 
    msoulscat_Wac_GraphValidation: 329, 
    msoulscat_Wac_OneNotePrint: 330, 
    msoulscat_Wac_AppSettings: 331, 
    msoulscat_Wac_Embed: 332, 
    msoulscat_Wac_SkypeChat: 333, 
    msoulscat_WAC_Accessibility: 334, 
    msoulscat_Wac_Aggregator: 335, 
    msoulscat_Wac_WordEditorPagination: 336, 
    msoulscat_WAC_WordEditorSave: 337, 
    msoulscat_Wac_WoncaGeneral: 338, 
    msoulscat_Wac_OneNoteGeneral: 339, 
    msoulscat_Wac_Ribbon: 340, 
    msoulscat_Wac_WordEditorAppsForOffice: 341, 
    msoulscat_Wac_SendUsYourFile: 342, 
    msoulscat_WAC_DocxSaveMonitor: 343, 
    msoulscat_Wac_AppsForOffice: 344, 
    msoulscat_Wac_BrowserPerformance: 345, 
    msoulscat_Wac_WordEditorShapes: 346, 
    msoulscat_Wac_WordEditorFeatureHelper: 347, 
    msoulscat_Wac_InsertSymbol: 348, 
    msoulscat_Wac_WebAppsPortal: 349, 
    msoulscat_Wac_Yammer: 350, 
    msoulscat_Wac_OoXml: 351, 
    msoulscat_Wac_InsertMedia: 352, 
    msoulscat_Wac_WordZoom: 353, 
    msoulscat_Wac_WordEditorFormatPainter: 354, 
    msoulscat_Wac_WordRealTimeTyping: 355, 
    msoulscat_Wac_WacFeedback: 356, 
    msoulscat_Wac_WacFeedbackExcelOnlineViewMode: 357, 
    msoulscat_Wac_WacFeedbackExcelOnlineEditMode: 358, 
    msoulscat_Wac_WacFeedbackExcelOnlineSurveyMode: 359, 
    msoulscat_Wac_WacFeedbackPptOnlineViewMode: 360, 
    msoulscat_Wac_WacFeedbackPptOnlineEditMode: 361, 
    msoulscat_Wac_WacFeedbackOneNoteOnline: 362, 
    msoulscat_Wac_WacFeedbackWordOnlineViewMode: 363, 
    msoulscat_Wac_WacFeedbackWordOnlineEditMode: 364, 
    msoulscat_Wac_WordEditorUndo: 365, 
    msoulscat_Wac_WordEditorCustomXml: 366, 
    msoulscat_Wac_WordEditorNavigationPane: 367, 
    msoulscat_Wac_WordEditorContentControl: 368, 
    msoulscat_Wac_WordEditorExtension: 369, 
    msoulscat_OneService_Site: 400, 
    msoulscat_OneService_UnitTests: 401, 
    msoulscat_OneService_ClipperInstall: 402, 
    msoulscat_OneService_ClipperUsage: 403, 
    msoulscat_OneService_Site_EmailSettings: 404, 
    msoulscat_OneService_Site_Notebooks: 405, 
    msoulscat_OneService_Site_DevSite: 406, 
    msoulscat_OneService_Site_FeaturedApps: 407, 
    msoulscat_OneService_Site_FeedbackPage: 408, 
    msoulscat_OneService_Augmentation: 409, 
    msoulscat_OneService_AugmentationProvider_UrlEnhancer: 410, 
    msoulscat_OneService_AugmentationProvider_DomEnhancer: 411, 
    msoulscat_OneService_AugmentationProvider_Entitization: 412, 
    msoulscat_OneService_ClipperTooltip: 413, 
    msoulscat_OneService_Site_Students: 414, 
    msoulscat_OneService_AugmentationProvider_BizcardExtractor: 415, 
    msoulscat_OneService_Site_ClassNotebook: 416, 
    msoulscat_WAC_RealtimeChannel: 500, 
    msoulscat_WAC_RealtimeChannelTest: 501, 
    msoulscat_WAC_Signalr: 600, 
    msoulscat_WAC_VisioApp: 700, 
    msoulscat_WAC_VisioLoader: 701, 
    msoulscat_WAC_VisioDataModel: 702, 
    msoulscat_WAC_VisioRenderer: 703, 
    msoulscat_WAC_VisioRecalc: 704, 
    msoulscat_WAC_VisioCommand: 705, 
    msoulscat_WAC_VisioController: 706, 
    msoulscat_WAC_VisioShapePanel: 707, 
    msoulscat_WAC_VisioAppControls: 708, 
    msoulscat_WAC_VisioSync: 709, 
    msoulscat_Wac_PptAnimation: 800, 
    msoulscat_Wac_PptAppEvents: 801, 
    msoulscat_Wac_PptAppsForOffice: 802, 
    msoulscat_Wac_PptBrowserLayer: 803, 
    msoulscat_Wac_PptCoauthoring: 804, 
    msoulscat_Wac_PptComments: 805, 
    msoulscat_Wac_PptEditingManager: 806, 
    msoulscat_Wac_PptFocus: 807, 
    msoulscat_Wac_PptGraph: 808, 
    msoulscat_Wac_PptInit: 809, 
    msoulscat_Wac_PptNavigation: 810, 
    msoulscat_Wac_PptNone: 811, 
    msoulscat_Wac_PptNotes: 812, 
    msoulscat_Wac_PptPerf: 813, 
    msoulscat_Wac_PptPresence: 814, 
    msoulscat_Wac_PptShape: 815, 
    msoulscat_Wac_PptSelection: 816, 
    msoulscat_Wac_PptSession: 817, 
    msoulscat_Wac_PptTasks: 818, 
    msoulscat_Wac_PptThumbnailPane: 819, 
    msoulscat_Wac_PptText: 820, 
    msoulscat_Wac_PptUtil: 821, 
    msoulscat_Wac_PptView: 822, 
    msoulscat_Wac_PptSynchronization: 823, 
    msoulscat_Wac_PptWebService: 824, 
    msoulscat_Wac_PptMedia: 825, 
    msoulscat_Wac_PptCopyPaste: 826, 
    msoulscat_Wac_PptZoom: 827, 
    msoulscat_Uci_CommandsClient: 1300, 
    msoulscat_Uci_InsightsClient: 1301, 
    msoulscat_Uci_Assistance: 1302, 
    msoulscat_Uci_Insights: 1303, 
    msoulscat_Uci_Insights_Overview: 1304, 
    msoulscat_Uci_Insights_DrillIn: 1306, 
    msoulscat_Osf_Latency: 1401, 
    msoulscat_Osf_Notification: 1402, 
    msoulscat_Osf_Runtime: 1403, 
    msoulscat_Osf_AppManagementMenu: 1404, 
    msoulscat_Osf_InsertionDialogSession: 1405, 
    msoulscat_OneNoteOnline_Navigation: 1600, 
    msoulscat_Alchemy_Browser: 1700, 
    msoulscat_Ice_EmailHrd: 1800, 
    msoulscat_Ice_InsertMedia: 1801, 
    msoulscat_Met_Broadcast: 1900
}
Diag.ULSCat.registerEnum('Diag.ULSCat', false);


Diag.LogCategory = function() {}
Diag.LogCategory.prototype = {
    msoSpLogging: 200, 
    wordMerge: 300, 
    wordViewer: 301, 
    wordPresence: 302, 
    revisionDiffer: 303, 
    wordCoauth: 304, 
    wacReplication: 305, 
    wacBrowserGeneral: 306, 
    box4CopyPaste: 307, 
    wordEditorFootnoteEndnote: 308, 
    wordEditorPageNumber: 309, 
    wacEventManager: 310, 
    wordEditorTableStyle: 311, 
    wordEditorFindReplace: 312, 
    wacFindReplace: 313, 
    wordEditorPageBreak: 314, 
    box4Crash: 315, 
    wordEditorBlobFormatting: 316, 
    wordEditorHeaderFooter: 317, 
    wacGraphValidation: 329
}
Diag.LogCategory.registerEnum('Diag.LogCategory', false);


Diag.LogType = function() {}
Diag.LogType.prototype = {
    trace: 0, 
    assert: 1
}
Diag.LogType.registerEnum('Diag.LogType', false);


Diag.IUlsHost = function() {}
Diag.IUlsHost.registerInterface('Diag.IUlsHost');


Diag.ULSTraceLevel = function() {}
Diag.ULSTraceLevel.prototype = {
    error: 10, 
    warning: 15, 
    info: 50, 
    verbose: 100, 
    spam: 200, 
    shiftFactor: 1000
}
Diag.ULSTraceLevel.registerEnum('Diag.ULSTraceLevel', false);


Diag.LoggingArgs = function Diag_LoggingArgs(ts, cat, tag, lvl, msg, type) {
    this.timestamp = ts;
    this.category = cat;
    this.tag = tag;
    this.level = lvl;
    this.message = msg || '';
    this.logType = type;
}
Diag.LoggingArgs.prototype = {
    timestamp: 0,
    category: 0,
    tag: 0,
    level: 0,
    message: null,
    logType: 0
}


Diag.UlsLoggingEventArgs = function Diag_UlsLoggingEventArgs(args) {
    Diag.UlsLoggingEventArgs.initializeBase(this);
    this.args = args;
}
Diag.UlsLoggingEventArgs.prototype = {
    args: null
}


Diag.UlsHostStub = function Diag_UlsHostStub() {
}
Diag.UlsHostStub.prototype = {
    
    handleTrace: function Diag_UlsHostStub$handleTrace$in(args) {
    },
    
    showAssertDialog: function Diag_UlsHostStub$showAssertDialog$in(dialogMessage) {
    },
    
    handoffToNewHost: function Diag_UlsHostStub$handoffToNewHost$in(host) {
    },
    
    flushAsynchronous: function Diag_UlsHostStub$flushAsynchronous$in() {
    },
    
    add_onUlsTrace: function Diag_UlsHostStub$add_onUlsTrace$in(value) {
    },
    
    remove_onUlsTrace: function Diag_UlsHostStub$remove_onUlsTrace$in(value) {
    },
    
    dispose: function Diag_UlsHostStub$dispose$in() {
    }
}


Diag.LoggingArgs.registerClass('Diag.LoggingArgs');
Diag.UlsLoggingEventArgs.registerClass('Diag.UlsLoggingEventArgs', Sys.EventArgs);
Diag.UlsHostStub.registerClass('Diag.UlsHostStub', null, Diag.IUlsHost, Sys.IDisposable);
Type.registerNamespace('Diag');

Diag._iUlsImpl = function() {}
Diag._iUlsImpl.registerInterface('Diag._iUlsImpl');


Diag.CachingUlsHost = function Diag_CachingUlsHost(appName, useInfiniteDuration) {
    this.$$d__reset$p$1 = Function.createDelegate(this, this._reset$p$1);
    Diag.CachingUlsHost.initializeBase(this);
    this._appName$1 = appName;
    this._reset$p$1(useInfiniteDuration);
}
Diag.CachingUlsHost.prototype = {
    _appName$1: null,
    _argsCache$1: null,
    
    _reset$p$1: function Diag_CachingUlsHost$_reset$p$1$in(useInfiniteDuration) {
        this._argsCache$1 = [];
        if (!useInfiniteDuration) {
            window.setTimeout(this.$$d__reset$p$1, Diag.CachingUlsHost._cacheDuration$p);
        }
        Diag.ULS.sendTraceTag(3973958, 101, 50, 'Reset');
    },
    
    handleTrace: function Diag_CachingUlsHost$handleTrace$in(args) {
        if (args) {
            Array.add(this._argsCache$1, args);
        }
    },
    
    handoffToNewHost: function Diag_CachingUlsHost$handoffToNewHost$in(newHost) {
        var count = this._argsCache$1.length;
        Diag.ULS.sendTraceTag(3973959, 101, 50, 'Cached {0} logs', count);
        for (var i = 0; i < count; i++) {
            newHost.handleTrace(this._argsCache$1[i]);
        }
    },
    
    flushAsynchronous: function Diag_CachingUlsHost$flushAsynchronous$in() {
    },
    
    get__argsCache$i$1: function Diag_CachingUlsHost$get__argsCache$i$1$in() {
        return this._argsCache$1;
    }
}


Diag._ulsImplStub = function Diag__ulsImplStub() {
    this._host$0 = new Diag.UlsHostStub();
}
Diag._ulsImplStub.prototype = {
    
    get_host: function Diag__ulsImplStub$get_host$in() {
        return this._host$0;
    },
    
    set_host: function Diag__ulsImplStub$set_host$in(value) {
        return value;
    },
    
    logImpl: function Diag__ulsImplStub$logImpl$in(tagID, categoryID, level, type, skipUlsCallDepthAccounting, output, data) {
    },
    
    assertImpl: function Diag__ulsImplStub$assertImpl$in(tagID, categoryID, condition, output, data) {
    },
    
    shouldTrace: function Diag__ulsImplStub$shouldTrace$in(cat, level) {
        return false;
    },
    
    setTraceLevel: function Diag__ulsImplStub$setTraceLevel$in(newLevel) {
    },
    
    get_ulsCallDepth: function Diag__ulsImplStub$get_ulsCallDepth$in() {
        return 0;
    }
}


Diag.Log = function Diag_Log() {
}
Diag.Log._traceWithoutRetraceOnException$p = function Diag_Log$_traceWithoutRetraceOnException$p$st(tag, verb, originalException) {
    try {
        Diag.Log.traceTag(tag, Diag.LogCategory.msoSpLogging, Diag.Log.Level.error, 'Exception was thrown while {0}: {1}', verb, originalException.toString());
    }
    catch ($$e_3) {
    }
}
Diag.Log.traceTag = function Diag_Log$traceTag$st(tag, category, level, formatString) {
    var data = [];
    for (var $$pai_6 = 4; $$pai_6 < arguments.length; ++$$pai_6) {
        data[$$pai_6 - 4] = arguments[$$pai_6];
    }
    try {
        Diag.ULS.sendTraceTag.apply(null, [ tag, Diag.Log._logCatToUlsCat$p(category), Diag.Log._logLevelToUlsLevel$p(level), formatString ].concat(data));
    }
    catch (e) {
        Diag.Log._traceWithoutRetraceOnException$p(tag, 'logging', e);
    }
}
Diag.Log.shouldTrace = function Diag_Log$shouldTrace$st(category, level) {
    try {
        return Diag.ULS.shouldTrace(Diag.Log._logCatToUlsCat$p(category), Diag.Log._logLevelToUlsLevel$p(level));
    }
    catch (e) {
        Diag.Log._traceWithoutRetraceOnException$p(0, 'checking ShouldTrace', e);
        return false;
    }
}
Diag.Log.debugAssertTag = function Diag_Log$debugAssertTag$st(tag, category, condition, formatString) {
    var data = [];
    for (var $$pai_6 = 4; $$pai_6 < arguments.length; ++$$pai_6) {
        data[$$pai_6 - 4] = arguments[$$pai_6];
    }
    try {
        Diag.ULS.debugAssertTag.apply(null, [ tag, Diag.Log._logCatToUlsCat$p(category), condition, formatString ].concat(data));
    }
    catch (e) {
        Diag.Log._traceWithoutRetraceOnException$p(tag, 'asserting', e);
    }
}
Diag.Log.shipAssertTag = function Diag_Log$shipAssertTag$st(tag, category, condition, formatString) {
    var data = [];
    for (var $$pai_6 = 4; $$pai_6 < arguments.length; ++$$pai_6) {
        data[$$pai_6 - 4] = arguments[$$pai_6];
    }
    try {
        Diag.ULS.shipAssertTag.apply(null, [ tag, Diag.Log._logCatToUlsCat$p(category), condition, formatString ].concat(data));
    }
    catch (e) {
        Diag.Log._traceWithoutRetraceOnException$p(tag, 'asserting', e);
    }
}
Diag.Log._logCatToUlsCat$p = function Diag_Log$_logCatToUlsCat$p$st(category) {
    return category;
}
Diag.Log._logLevelToUlsLevel$p = function Diag_Log$_logLevelToUlsLevel$p$st(level) {
    return level;
}


Diag.Log.Level = function() {}
Diag.Log.Level.prototype = {
    spam: 200, 
    verbose: 100, 
    info: 50, 
    warning: 15, 
    error: 10
}
Diag.Log.Level.registerEnum('Diag.Log.Level', false);


Diag.ULS = function Diag_ULS() {
}
Diag.ULS.setUlsHost = function Diag_ULS$setUlsHost$st(host) {
    if (Diag.ULS._isDisabled) {
        Diag.ULS._impl = new Diag._ulsImpl();
    }
    Diag.ULS._impl.set_host(host);
    Diag.ULS._isDisabled = false;
}
Diag.ULS.get_host = function Diag_ULS$get_host$st() {
    return Diag.ULS._impl.get_host();
}
Diag.ULS.disable = function Diag_ULS$disable$st() {
    Diag.ULS._impl = new Diag._ulsImplStub();
    Diag.ULS._isDisabled = true;
}
Diag.ULS.sendTraceTag = function Diag_ULS$sendTraceTag$st(tagID, categoryID, level, output) {
    var data = [];
    for (var $$pai_5 = 4; $$pai_5 < arguments.length; ++$$pai_5) {
        data[$$pai_5 - 4] = arguments[$$pai_5];
    }
    Diag.ULS._impl.logImpl(tagID, categoryID, level, 0, false, output, data);
}
Diag.ULS.shipAssertTag = function Diag_ULS$shipAssertTag$st(tagID, categoryID, condition, output) {
    var data = [];
    for (var $$pai_5 = 4; $$pai_5 < arguments.length; ++$$pai_5) {
        data[$$pai_5 - 4] = arguments[$$pai_5];
    }
    Diag.ULS._impl.assertImpl(tagID, categoryID, condition, output, data);
}
Diag.ULS.debugAssertTag = function Diag_ULS$debugAssertTag$st(tagID, categoryID, condition, output) {
    var data = [];
    for (var $$pai_5 = 4; $$pai_5 < arguments.length; ++$$pai_5) {
        data[$$pai_5 - 4] = arguments[$$pai_5];
    }
    Diag.ULS._impl.assertImpl(tagID, categoryID, condition, output, data);
}
Diag.ULS.shouldTrace = function Diag_ULS$shouldTrace$st(categoryID, level) {
    return Diag.ULS._impl.shouldTrace(categoryID, level);
}
Diag.ULS.setTraceLevel = function Diag_ULS$setTraceLevel$st(newLevel) {
    Diag.ULS._impl.setTraceLevel(newLevel);
}
Diag.ULS.get_ulsCallDepth = function Diag_ULS$get_ulsCallDepth$st() {
    return Diag.ULS._impl.get_ulsCallDepth();
}
Diag.ULS.concatArray = function Diag_ULS$concatArray$st(o) {
    var $$t_1;
    return ($$t_1 = []).concat.apply($$t_1, o).join('');
}
Diag.ULS.jsonSerialize = function Diag_ULS$jsonSerialize$st(o) {
    if (window.JSON) {
        return JSON.stringify(o);
    }
    return Sys.Serialization.JavaScriptSerializer.serialize(o);
}
Diag.ULS.get__impl$i = function Diag_ULS$get__impl$i$st() {
    return Diag.ULS._impl;
}
Diag.ULS.get__isDisabled$i = function Diag_ULS$get__isDisabled$i$st() {
    return Diag.ULS._isDisabled;
}


Diag._ulsImpl = function Diag__ulsImpl() {
    this._currentLevel$i$0 = 100;
    this._host$0 = new Diag.UlsHostStub();
}
Diag._ulsImpl._buildMessageString$i = function Diag__ulsImpl$_buildMessageString$i$st(format, args) {
    if (!args || !args.length) {
        return format || '';
    }
    for (var i = 0, length = args.length; i < length; ++i) {
        var datum = args[i];
        if (datum && typeof(datum) === 'object') {
            var datumToStringPrototype = Object.getType(datum).prototype['toString'];
            if (datumToStringPrototype === Diag._ulsImpl._objectToStringPrototype$p || !datumToStringPrototype) {
                if ((datum).nodeType === 1) {
                    args[i] = Diag.ULS.concatArray([ (datum).tagName, '#', (datum).id, '.', (datum).className ]);
                }
                else {
                    try {
                        args[i] = Diag.ULS.jsonSerialize(datum);
                    }
                    catch (e) {
                        Diag.ULS.debugAssertTag(4862938, 102, false, 'ULS.BuildMessageString: An object with a cyclic reference was logged', null);
                        args[i] = e;
                    }
                }
            }
        }
    }
    return (!format) ? args.join(', ') : String.format.apply(null, [ format ].concat(args));
}
Diag._ulsImpl.prototype = {
    
    get_ulsCallDepth: function Diag__ulsImpl$get_ulsCallDepth$in() {
        return this._ulsCallDepth$0;
    },
    
    _ulsCallDepth$0: 0,
    _inHostTransition$0: false,
    
    get_host: function Diag__ulsImpl$get_host$in() {
        return this._host$0;
    },
    
    set_host: function Diag__ulsImpl$set_host$in(value) {
        if (value === this._host$0) {
            return value;
        }
        if (this._inHostTransition$0) {
            return value;
        }
        this._inHostTransition$0 = true;
        if (!value) {
            this._host$0.dispose();
            this._host$0 = new Diag.UlsHostStub();
        }
        else {
            this._host$0.handoffToNewHost(value);
            this._host$0.dispose();
            this._host$0 = value;
        }
        this._inHostTransition$0 = false;
        return value;
    },
    
    logImpl: function Diag__ulsImpl$logImpl$in(tagID, categoryID, level, type, skipUlsCallDepthAccounting, output, data) {
        if (!type && !this.shouldTrace(categoryID, level) || this._ulsCallDepth$0 > Diag._ulsImpl._maxPriorUlsCallDepth$p) {
            return;
        }
        if (!skipUlsCallDepthAccounting) {
            this._ulsCallDepth$0++;
        }
        try {
            var now = new Date();
            var args = new Diag.LoggingArgs(now.getTime(), categoryID, tagID, level, Diag._ulsImpl._buildMessageString$i(output, data), type);
            this._host$0.handleTrace(args);
        }
        finally {
            if (!skipUlsCallDepthAccounting) {
                this._ulsCallDepth$0--;
            }
        }
    },
    
    assertImpl: function Diag__ulsImpl$assertImpl$in(tagID, categoryID, condition, output, data) {
        if (!condition && this._ulsCallDepth$0 <= Diag._ulsImpl._maxPriorUlsCallDepth$p) {
            this._ulsCallDepth$0++;
            try {
                var message = Diag._ulsImpl._buildMessageString$i(output, data);
                this.logImpl(tagID, categoryID, 10, 1, true, message, null);
                var traceParameters = [ 'TagID: ', Diag.TaggingUtilities.getTagFromiTag(tagID), '\n\n', message ];
                var dialogMessage = Diag.ULS.concatArray(traceParameters);
                this._host$0.showAssertDialog(dialogMessage);
            }
            finally {
                this._ulsCallDepth$0--;
            }
        }
    },
    
    shouldTrace: function Diag__ulsImpl$shouldTrace$in(cat, level) {
        return level <= this._currentLevel$i$0;
    },
    
    setTraceLevel: function Diag__ulsImpl$setTraceLevel$in(newLevel) {
        this._currentLevel$i$0 = newLevel;
    }
}


Diag.UULS = function Diag_UULS() {
}




Diag.TaggingUtilities = function Diag_TaggingUtilities() {
}
Diag.TaggingUtilities.getTagFromiTag = function Diag_TaggingUtilities$getTagFromiTag$st(tag) {
    if (tag <= Diag.TaggingUtilities._s_maxNumericTag$p) {
        return tag.toString();
    }
    if ((tag >>> 24) >= Diag.TaggingUtilities._s_minOldSchemeHighByteValue$p) {
        return String.fromCharCode.call(null, ((tag >>> 24) & 255), ((tag >>> 16) & 255), ((tag >>> 8) & 255), (tag & 255));
    }
    var symbolSpace = Diag.TaggingUtilities._s_symbolSpace$p;
    return '' + symbolSpace.charAt(((tag >>> 24) & 63)) + symbolSpace.charAt(((tag >>> 18) & 63)) + symbolSpace.charAt(((tag >>> 12) & 63)) + symbolSpace.charAt(((tag >>> 6) & 63)) + symbolSpace.charAt((tag & 63));
}
Diag.TaggingUtilities.getiTagFromTag = function Diag_TaggingUtilities$getiTagFromTag$st(sTag) {
    var result = 0;
    result = parseInt(sTag);
    if (result.toString(10) === sTag && result <= Diag.TaggingUtilities._s_maxNumericTag$p) {
        return result;
    }
    if (sTag.length === 4) {
        result = (sTag.charAt(0) << 24 | sTag.charAt(1) << 16 | sTag.charAt(2) << 8 | sTag.charAt(3));
    }
    else {
        var symbolSpace = Diag.TaggingUtilities._s_symbolSpace$p;
        result = (symbolSpace.indexOf(sTag.charAt(0)) << 24 | symbolSpace.indexOf(sTag.charAt(1)) << 18 | symbolSpace.indexOf(sTag.charAt(2)) << 12 | symbolSpace.indexOf(sTag.charAt(3)) << 6 | symbolSpace.indexOf(sTag.charAt(4)));
    }
    return result;
}
Diag.TaggingUtilities.reserveTag = function Diag_TaggingUtilities$reserveTag$st(iTag) {
    return iTag;
}


Diag.CachingUlsHost.registerClass('Diag.CachingUlsHost', Diag.UlsHostStub);
Diag._ulsImplStub.registerClass('Diag._ulsImplStub', null, Diag._iUlsImpl);
Diag.Log.registerClass('Diag.Log');
Diag.ULS.registerClass('Diag.ULS');
Diag._ulsImpl.registerClass('Diag._ulsImpl', null, Diag._iUlsImpl);
Diag.UULS.registerClass('Diag.UULS');
Diag.TaggingUtilities.registerClass('Diag.TaggingUtilities');
Diag.CachingUlsHost._cacheDuration$p = 60000;
Diag.ULS._impl = new Diag._ulsImpl();
Diag.ULS._isDisabled = false;
Diag._ulsImpl._objectToStringPrototype$p = Object.prototype['toString'];
Diag._ulsImpl._maxPriorUlsCallDepth$p = 1;
Diag.UULS.trace = Diag.ULS.sendTraceTag;
Diag.TaggingUtilities._s_symbolSpace$p = 'abcdefghijklmnopqrstuvwxyz0123456789';
Diag.TaggingUtilities._s_maxNumericTag$p = 65535;
Diag.TaggingUtilities._s_minOldSchemeHighByteValue$p = 36;
Type.registerNamespace('Diag');

Diag.ILogCache = function() {}
Diag.ILogCache.registerInterface('Diag.ILogCache');


Diag._serializableLogCache = function Diag__serializableLogCache(timestampBase, logs, userSessionId, uploadId, schemaVersion) {
    this.T = timestampBase;
    this.L = logs;
    this.S = userSessionId;
    this.I = uploadId;
    this.V = schemaVersion;
}


Diag._logCache = function Diag__logCache(sizeThresholdBytes, logMessageMaxChars, userSessionId) {
    this._sizeThresholdBytes$0 = sizeThresholdBytes;
    this._logMessageMaxChars$0 = logMessageMaxChars;
    this._userSessionId$0 = userSessionId;
    this.reset();
}
Diag._logCache._testJsonSerialize$i = function Diag__logCache$_testJsonSerialize$i$st(o) {
    return Diag.ULS.jsonSerialize(o);
}
Diag._logCache.prototype = {
    _timestampBase$0: 0,
    _logs$0: null,
    _userSessionId$0: null,
    _dataSizeBytes$0: 0,
    _sizeThresholdBytes$0: 0,
    _logMessageMaxChars$0: 0,
    
    reset: function Diag__logCache$reset$in() {
        this._logs$0 = [];
        this._dataSizeBytes$0 = Diag._logCache._serializationEnvelopeSize$p;
        this._timestampBase$0 = new Date().getTime();
    },
    
    get_count: function Diag__logCache$get_count$in() {
        return this._logs$0.length;
    },
    
    _$$pf_UploadId$p$0: 0,
    
    get_uploadId: function Diag__logCache$get_uploadId$in() {
        return this._$$pf_UploadId$p$0;
    },
    
    set_uploadId: function Diag__logCache$set_uploadId$in(value) {
        this._$$pf_UploadId$p$0 = value;
        return value;
    },
    
    addLog: function Diag__logCache$addLog$in(args) {
        if (!args) {
            return;
        }
        if (args.message.length > this._logMessageMaxChars$0) {
            args.message = args.message.substr(0, this._logMessageMaxChars$0 - Diag._logCache._trimMessageLength$p) + '... [trimmed]';
            Diag.ULS.sendTraceTag(3465240, 100, 50, 'Trimmed message for log {0}', Diag.TaggingUtilities.getTagFromiTag(args.tag));
        }
        var log = new Diag._serializableLogEntry(args.message, args.category, args.level, (args.timestamp - this._timestampBase$0), args.logType, args.tag);
        var length = log._computeSerializedLength$i$0();
        Array.add(this._logs$0, log);
        this._dataSizeBytes$0 += length;
    },
    
    get_isDataSizeThresholdExceeded: function Diag__logCache$get_isDataSizeThresholdExceeded$in() {
        return this._dataSizeBytes$0 > this._sizeThresholdBytes$0;
    },
    
    serialize: function Diag__logCache$serialize$in() {
        return Diag.ULS.jsonSerialize(new Diag._serializableLogCache(this._timestampBase$0, this._logs$0, this._userSessionId$0, this.get_uploadId(), Diag._logCache._serializationSchemaVersion$p));
    },
    
    get__sizeThresholdBytes$i$0: function Diag__logCache$get__sizeThresholdBytes$i$0$in() {
        return this._sizeThresholdBytes$0;
    },
    
    get__logMessageMaxChars$i$0: function Diag__logCache$get__logMessageMaxChars$i$0$in() {
        return this._logMessageMaxChars$0;
    },
    
    get__dataSizeBytes$i$0: function Diag__logCache$get__dataSizeBytes$i$0$in() {
        return this._dataSizeBytes$0;
    },
    
    get__logs$i$0: function Diag__logCache$get__logs$i$0$in() {
        return this._logs$0;
    },
    
    get__timestampBase$i$0: function Diag__logCache$get__timestampBase$i$0$in() {
        return this._timestampBase$0;
    }
}


Diag._serializableLogEntry = function Diag__serializableLogEntry(message, category, level, timeDelta, type, tag) {
    this.G = tag;
    this.T = timeDelta;
    this.M = message;
    this.C = category;
    this.D = (type) * (1000) + level;
}
Diag._serializableLogEntry._charsInObj$i = function Diag__serializableLogEntry$_charsInObj$i$st(n) {
    var stringValue = '' + n;
    return stringValue.length;
}
Diag._serializableLogEntry.prototype = {
    G: 0,
    T: 0,
    M: null,
    C: null,
    D: 0,
    
    _computeSerializedLength$i$0: function Diag__serializableLogEntry$_computeSerializedLength$i$0$in() {
        return Diag._logCache._logEnvelopeSize$i + Diag._serializableLogEntry._charsInObj$i(this.G) + Diag._serializableLogEntry._charsInObj$i(this.T) + this.M.length + Diag._serializableLogEntry._charsInObj$i(this.C) + Diag._serializableLogEntry._charsInObj$i(this.D);
    }
}


Diag.UlsUtils = function Diag_UlsUtils() {
}
Diag.UlsUtils.get__standardUlsLevelMap$i = function Diag_UlsUtils$get__standardUlsLevelMap$i$st() {
    if (!Diag.UlsUtils._standardUlsLevelMap_BackingField) {
        Diag.UlsUtils._standardUlsLevelMap_BackingField = [];
        Diag.UlsUtils._standardUlsLevelMap_BackingField[10] = 'Unexpected';
        Diag.UlsUtils._standardUlsLevelMap_BackingField[15] = 'Monitorable';
        Diag.UlsUtils._standardUlsLevelMap_BackingField[50] = 'Medium';
        Diag.UlsUtils._standardUlsLevelMap_BackingField[100] = 'Verbose';
        Diag.UlsUtils._standardUlsLevelMap_BackingField[200] = 'VerboseEx';
    }
    return Diag.UlsUtils._standardUlsLevelMap_BackingField;
}
Diag.UlsUtils.convertLevelToStandardUlsLevel = function Diag_UlsUtils$convertLevelToStandardUlsLevel$st(level) {
    return Diag.UlsUtils.get__standardUlsLevelMap$i()[level] || Diag.UlsUtils._defaultStandardLevel$p;
}
Diag.UlsUtils.convertMillisecondsToTimestamp = function Diag_UlsUtils$convertMillisecondsToTimestamp$st(milliseconds) {
    var now = new Date(milliseconds);
    var timestampParts = [ Diag.UlsUtils._addLeadingZerosFour$p(now.getUTCFullYear()), '-', Diag.UlsUtils._addLeadingZerosTwo$p(now.getUTCMonth() + 1), '-', Diag.UlsUtils._addLeadingZerosTwo$p(now.getUTCDate()), 'T', Diag.UlsUtils._addLeadingZerosTwo$p(now.getUTCHours()), ':', Diag.UlsUtils._addLeadingZerosTwo$p(now.getUTCMinutes()), ':', Diag.UlsUtils._addLeadingZerosTwo$p(now.getUTCSeconds()), '.', Diag.UlsUtils._addLeadingZerosThree$p(now.getUTCMilliseconds()), 'Z' ];
    return Diag.ULS.concatArray(timestampParts);
}
Diag.UlsUtils._addLeadingZerosFour$p = function Diag_UlsUtils$_addLeadingZerosFour$p$st(num) {
    return (num < 1000) ? '0' + Diag.UlsUtils._addLeadingZerosThree$p(num) : num.toString();
}
Diag.UlsUtils._addLeadingZerosThree$p = function Diag_UlsUtils$_addLeadingZerosThree$p$st(num) {
    return (num < 100) ? '0' + Diag.UlsUtils._addLeadingZerosTwo$p(num) : num.toString();
}
Diag.UlsUtils._addLeadingZerosTwo$p = function Diag_UlsUtils$_addLeadingZerosTwo$p$st(num) {
    return (num < 10) ? '0' + num : num.toString();
}


Diag.UlsUploadConfiguration = function Diag_UlsUploadConfiguration(logMessageMaxChars, sizeThresholdBytes, uploadCadenceMs, throttlingTimeoutMs, delayedLogHandlingCadenceMs, asyncUploadRequestTimeout, asyncOverride) {
    this._sizeThresholdBytes$i$0 = 64 * 1024;
    this._uploadCadenceMs$i$0 = 60 * 1000;
    this._delayedLogHandlingCadenceMs$i$0 = 10 * 1000;
    this._asyncUploadRequestTimeout$i$0 = 5 * 1000;
    if (logMessageMaxChars != null) {
        this._logMessageMaxChars$i$0 = logMessageMaxChars;
    }
    if (sizeThresholdBytes != null) {
        this._sizeThresholdBytes$i$0 = sizeThresholdBytes;
    }
    if (uploadCadenceMs != null) {
        this._uploadCadenceMs$i$0 = uploadCadenceMs;
    }
    if (throttlingTimeoutMs != null) {
        this._throttlingTimeoutMs$i$0 = throttlingTimeoutMs;
    }
    if (delayedLogHandlingCadenceMs != null) {
        this._delayedLogHandlingCadenceMs$i$0 = delayedLogHandlingCadenceMs;
    }
    if (asyncUploadRequestTimeout != null) {
        this._asyncUploadRequestTimeout$i$0 = asyncUploadRequestTimeout;
    }
    if (asyncOverride != null) {
        this._asyncOverride$i$0 = asyncOverride;
    }
}
Diag.UlsUploadConfiguration.prototype = {
    _logMessageMaxChars$i$0: 3072,
    _throttlingTimeoutMs$i$0: 2000,
    _asyncOverride$i$0: false
}


Diag.UploadingUlsHost = function Diag_UploadingUlsHost(sessionId, uploadUrl, config) {
    this.$$d__endThrottling$p$0 = Function.createDelegate(this, this._endThrottling$p$0);
    this.$$d__flushImpl$i$0 = Function.createDelegate(this, this._flushImpl$i$0);
    this.$$d__handleDelayedLogs$i$0 = Function.createDelegate(this, this._handleDelayedLogs$i$0);
    if (!config) {
        config = new Diag.UlsUploadConfiguration(null, null, null, null, null, null, null);
    }
    this._sessionId$0 = sessionId;
    this.uploadUrl = uploadUrl;
    if (this.uploadUrl.toLowerCase().startsWith('http:') && document.URL.toLowerCase().startsWith('https:')) {
        alert('!!DISABLING ULS!! due to mixed content between the HTTPS page and the HTTP bULS upload URL.');
        Diag.ULS.disable();
    }
    this._uploadCadenceMs$0 = config._uploadCadenceMs$i$0;
    this._throttlingTimeoutMs$0 = config._throttlingTimeoutMs$i$0;
    this._delayedLogHandlingCadenceMs$0 = config._delayedLogHandlingCadenceMs$i$0;
    this._uploadRequestTimeout$0 = config._asyncUploadRequestTimeout$i$0;
    this._asyncOverride$0 = config._asyncOverride$i$0;
    this._logCache$0 = new Diag._logCache(config._sizeThresholdBytes$i$0, config._logMessageMaxChars$i$0, sessionId);
    this._resetCadenceTimer$p$0();
    this._delayedLogBuffer$0 = [];
    this._resetDelayedLoggingTimer$p$0();
}
Diag.UploadingUlsHost.prototype = {
    uploadUrl: null,
    _failedUploadAttemptCount$0: 0,
    _uploadCadenceMs$0: 0,
    _throttlingTimeoutMs$0: 0,
    _delayedLogHandlingCadenceMs$0: 0,
    _uploadRequestTimeout$0: 0,
    _asyncOverride$0: false,
    _sessionId$0: null,
    nextUploadId: 0,
    _logCache$0: null,
    _delayedLogBuffer$0: null,
    _ulsCallDepthAdjustment$0: 0,
    _request$0: null,
    _disposing$0: false,
    
    handleTrace: function Diag_UploadingUlsHost$handleTrace$in(args) {
        if (this.get_ulsCallDepth() > 1) {
            Array.add(this._delayedLogBuffer$0, args);
            return;
        }
        this._logCache$0.addLog(args);
        if (this.logIndicatesError(args)) {
            this._flushSynchronous$i$0('LogIndicatesError in HandleTrace');
            Diag.ULS.sendTraceTag(3731793, 100, 200, 'Flushing error-level log (tag {0}) synchronously', Diag.TaggingUtilities.getTagFromiTag(args.tag));
        }
        else if (this._logCache$0.get_isDataSizeThresholdExceeded()) {
            this.flushAsynchronous();
            Diag.ULS.sendTraceTag(3731794, 100, 200, 'Flushing asynchronously due to cache size');
        }
    },
    
    logIndicatesError: function Diag_UploadingUlsHost$logIndicatesError$in(args) {
        return !!args && (args.logType === 1 || args.level === 10);
    },
    
    dispose: function Diag_UploadingUlsHost$dispose$in() {
        if (this._disposing$0) {
            return;
        }
        this._disposing$0 = true;
        this.flushForAppClose();
        Diag.ULS.setUlsHost(null);
        window.clearTimeout(this._asyncFlushTimeoutId$0);
        window.clearTimeout(this._delayedLoggingTimerId$0);
        window.clearTimeout(this._cadenceTimerId$0);
        this._asyncFlushTimeoutId$0 = 0;
        this._delayedLoggingTimerId$0 = 0;
        this._cadenceTimerId$0 = 0;
    },
    
    flushForAppClose: function Diag_UploadingUlsHost$flushForAppClose$in() {
        this.set__mode$i$0(2);
        this._handleDelayedLogs$i$0();
        this._sendAfterThrottling$i$0 = false;
        this._endThrottling$p$0();
        this._flushSynchronous$i$0('FlushForAppClose');
    },
    
    uploadLogs: function Diag_UploadingUlsHost$uploadLogs$in(logs, synchronous) {
        return true;
        /*
        logs.set_uploadId(this.nextUploadId);
        if (this.uploadSerializedLogs(logs.serialize(), synchronous)) {
            this.nextUploadId++;
            return true;
        }
        return false; */
    },
    
    uploadSerializedLogs: function Diag_UploadingUlsHost$uploadSerializedLogs$in(serializedLogs, synchronous) {
        var asyncRequest = this._asyncOverride$0 || !synchronous;
        if (!this._request$0 || !asyncRequest) {
            this._request$0 = new XMLHttpRequest();
        }
        if (!this._request$0.readyState || this._request$0.readyState === 4) {
            this._request$0.open('POST', this.uploadUrl, asyncRequest);
            this._request$0.setRequestHeader('Content-Type', 'application/json');
            this._request$0.setRequestHeader(Diag.UploadingUlsHost.sessionIdHeaderName, this._sessionId$0);
            if (asyncRequest) {
                this._request$0.timeout = this._uploadRequestTimeout$0;
            }
            this.modifyHttpRequestBeforeUploading(this._request$0);
            this._request$0.send(serializedLogs);
            return true;
        }
        Diag.ULS.sendTraceTag(3731796, 100, 50, 'Could not initiate upload {0}', { UploadId: this.nextUploadId, XhrReadyState: this._request$0.readyState });
        return false;
    },
    
    onUploadException: function Diag_UploadingUlsHost$onUploadException$in(e) {
        if (this._request$0) {
            this._request$0.abort();
        }
    },
    
    modifyHttpRequestBeforeUploading: function Diag_UploadingUlsHost$modifyHttpRequestBeforeUploading$in(request) {
    },
    
    _setTimeoutToLogOriginAndExecute$p$0: function Diag_UploadingUlsHost$_setTimeoutToLogOriginAndExecute$p$0$in(code, milliseconds, origin) {
        var $$t_3 = this;
        return window.setTimeout(function() {
            Diag.ULS.sendTraceTag(3731797, 100, 200, 'Timeout ({0} ms) set by {1} is now firing.', milliseconds, origin);
            code();
        }, milliseconds);
    },
    
    _delayedLoggingTimerId$0: 0,
    
    _resetDelayedLoggingTimer$p$0: function Diag_UploadingUlsHost$_resetDelayedLoggingTimer$p$0$in() {
        window.clearTimeout(this._delayedLoggingTimerId$0);
        this._delayedLoggingTimerId$0 = this._setTimeoutToLogOriginAndExecute$p$0(this.$$d__handleDelayedLogs$i$0, this._delayedLogHandlingCadenceMs$0, 'ResetDelayedLoggingTimer');
    },
    
    get_ulsCallDepth: function Diag_UploadingUlsHost$get_ulsCallDepth$in() {
        return Diag.ULS.get_ulsCallDepth() + this._ulsCallDepthAdjustment$0;
    },
    
    _handleDelayedLogs$i$0: function Diag_UploadingUlsHost$_handleDelayedLogs$i$0$in() {
        var length = this._delayedLogBuffer$0.length;
        if (!length) {
            this._resetDelayedLoggingTimer$p$0();
            return;
        }
        var bufferCopy = [];
        Array.addRange(bufferCopy, this._delayedLogBuffer$0);
        this._delayedLogBuffer$0 = [];
        Diag.ULS.sendTraceTag(3731798, 100, 50, 'HandleDelayedLogs {0}', { Count: length });
        this._ulsCallDepthAdjustment$0++;
        for (var i = 0; i < length; i++) {
            this.handleTrace(bufferCopy[i]);
        }
        this._ulsCallDepthAdjustment$0--;
        this._resetDelayedLoggingTimer$p$0();
    },
    
    _cadenceTimerId$0: 0,
    
    _resetCadenceTimer$p$0: function Diag_UploadingUlsHost$_resetCadenceTimer$p$0$in() {
        window.clearTimeout(this._cadenceTimerId$0);
        this._cadenceTimerId$0 = this._setTimeoutToLogOriginAndExecute$p$0(this.$$d__flushImpl$i$0, this._uploadCadenceMs$0, 'ResetCadenceTimer');
    },
    
    _throttlingTimeoutId$0: 0,
    _mode$0: 0,
    
    get__mode$i$0: function Diag_UploadingUlsHost$get__mode$i$0$in() {
        return this._mode$0;
    },
    
    set__mode$i$0: function Diag_UploadingUlsHost$set__mode$i$0$in(value) {
        if (!value) {
            window.clearTimeout(this._throttlingTimeoutId$0);
            this._throttlingTimeoutId$0 = 0;
        }
        else if (!this._mode$0) {
            this._throttlingTimeoutId$0 = this._setTimeoutToLogOriginAndExecute$p$0(this.$$d__endThrottling$p$0, this._throttlingTimeoutMs$0, 'ThrottlingMode Setter');
        }
        this._mode$0 = value;
        return value;
    },
    
    _endThrottling$p$0: function Diag_UploadingUlsHost$_endThrottling$p$0$in() {
        this.set__mode$i$0(0);
        if (this._sendAfterThrottling$i$0) {
            this._sendAfterThrottling$i$0 = false;
            this._flushImpl$i$0();
        }
    },
    
    _sendAfterThrottling$i$0: false,
    
    _shouldThrottle$i$0: function Diag_UploadingUlsHost$_shouldThrottle$i$0$in(synchronousFlush) {
        return this.get__mode$i$0() === 2 || (this.get__mode$i$0() === 1 && !synchronousFlush);
    },
    
    _flushSynchronous$i$0: function Diag_UploadingUlsHost$_flushSynchronous$i$0$in(reason) {
        Diag.ULS.sendTraceTag(3731800, 100, 200, 'Flushing Synchronous due to {0}', reason);
        this._flushImpl$i$0(true);
    },
    
    _asyncFlushTimeoutId$0: 0,
    
    flushAsynchronous: function Diag_UploadingUlsHost$flushAsynchronous$in() {
        this._flushAsynchronousInternal$i$0(0);
    },
    
    _flushAsynchronousInternal$i$0: function Diag_UploadingUlsHost$_flushAsynchronousInternal$i$0$in(delay) {
        if (!this._asyncFlushTimeoutId$0) {
            this._asyncFlushTimeoutId$0 = this._setTimeoutToLogOriginAndExecute$p$0(this.$$d__flushImpl$i$0, delay, 'FlushAsynchronous');
        }
    },
    
    _flushImpl$i$0: function Diag_UploadingUlsHost$_flushImpl$i$0$in(synchronous) {
        this._ulsCallDepthAdjustment$0++;
        window.clearTimeout(this._asyncFlushTimeoutId$0);
        this._asyncFlushTimeoutId$0 = 0;
        if (!this._logCache$0.get_count()) {
            this._resetCadenceTimer$p$0();
            this._ulsCallDepthAdjustment$0--;
            return;
        }
        if (this._shouldThrottle$i$0(synchronous)) {
            Diag.ULS.sendTraceTag(3731801, 100, 200, 'Not flushing ({0}) due to throttling', (synchronous) ? 'sync' : 'async');
            this._sendAfterThrottling$i$0 = true;
            this._ulsCallDepthAdjustment$0--;
            return;
        }
        this.set__mode$i$0((synchronous) ? 2 : 1);
        this._resetCadenceTimer$p$0();
        Diag.ULS.sendTraceTag(3731803, 100, 200, 'Flushing ({0}) cached bULS logs ({1} logs)', (synchronous) ? 'sync' : 'async', this._logCache$0.get_count());
        var uploadSucceeded;
        try {
            uploadSucceeded = this.uploadLogs(this._logCache$0, synchronous);
        }
        catch (e) {
            Diag.ULS.debugAssertTag(5838928, 100, false, e.message);
            this.onUploadException(e);
            uploadSucceeded = false;
        }
        if (uploadSucceeded) {
            this._logCache$0.reset();
            this._failedUploadAttemptCount$0 = 0;
        }
        else {
            this._failedUploadAttemptCount$0++;
            if (this._failedUploadAttemptCount$0 < Diag.UploadingUlsHost.maxUploadAttempts) {
                this._flushAsynchronousInternal$i$0(Diag.UploadingUlsHost.retryDelay);
            }
            else {
                Diag.ULS.debugAssertTag(5838929, 100, false, 'Failed to upload bULS logs; Clearing cached logs after {0} upload attempts!', Diag.UploadingUlsHost.maxUploadAttempts);
                this._logCache$0.reset();
                this.nextUploadId++;
                this._failedUploadAttemptCount$0 = 0;
            }
        }
        this._ulsCallDepthAdjustment$0--;
    },
    
    showAssertDialog: function Diag_UploadingUlsHost$showAssertDialog$in(dialogMessage) {
    },
    
    handoffToNewHost: function Diag_UploadingUlsHost$handoffToNewHost$in(host) {
    },
    
    add_onUlsTrace: function Diag_UploadingUlsHost$add_onUlsTrace$in(value) {
    },
    
    remove_onUlsTrace: function Diag_UploadingUlsHost$remove_onUlsTrace$in(value) {
    },
    
    get__logCache$i$0: function Diag_UploadingUlsHost$get__logCache$i$0$in() {
        return this._logCache$0;
    },
    
    set__logCache$i$0: function Diag_UploadingUlsHost$set__logCache$i$0$in(value) {
        this._logCache$0 = value;
        return value;
    },
    
    get__delayedLogBuffer$i$0: function Diag_UploadingUlsHost$get__delayedLogBuffer$i$0$in() {
        return this._delayedLogBuffer$0;
    },
    
    get__cadenceTimerId$i$0: function Diag_UploadingUlsHost$get__cadenceTimerId$i$0$in() {
        return this._cadenceTimerId$0;
    },
    
    get__delayedLoggingTimerId$i$0: function Diag_UploadingUlsHost$get__delayedLoggingTimerId$i$0$in() {
        return this._delayedLoggingTimerId$0;
    },
    
    get__asyncFlushTimeoutId$i$0: function Diag_UploadingUlsHost$get__asyncFlushTimeoutId$i$0$in() {
        return this._asyncFlushTimeoutId$0;
    },
    
    get__throttlingTimeoutId$i$0: function Diag_UploadingUlsHost$get__throttlingTimeoutId$i$0$in() {
        return this._throttlingTimeoutId$0;
    },
    
    get__ulsCallDepthAdjustment$i$0: function Diag_UploadingUlsHost$get__ulsCallDepthAdjustment$i$0$in() {
        return this._ulsCallDepthAdjustment$0;
    },
    
    set__ulsCallDepthAdjustment$i$0: function Diag_UploadingUlsHost$set__ulsCallDepthAdjustment$i$0$in(value) {
        this._ulsCallDepthAdjustment$0 = value;
        return value;
    }
}


Diag.UploadingUlsHost._xmlHttpReadyState = function() {}
Diag.UploadingUlsHost._xmlHttpReadyState.prototype = {
    unInitialized: 0, 
    loading: 1, 
    loaded: 2, 
    interactive: 3, 
    complete: 4
}
Diag.UploadingUlsHost._xmlHttpReadyState.registerEnum('Diag.UploadingUlsHost._xmlHttpReadyState', false);


Diag.UploadingUlsHost._throttlingMode = function() {}
Diag.UploadingUlsHost._throttlingMode.prototype = {
    noThrottling: 0, 
    throttleOnlyAsynchronous: 1, 
    throttleAll: 2
}
Diag.UploadingUlsHost._throttlingMode.registerEnum('Diag.UploadingUlsHost._throttlingMode', false);


Diag._serializableLogCache.registerClass('Diag._serializableLogCache');
Diag._logCache.registerClass('Diag._logCache', null, Diag.ILogCache);
Diag._serializableLogEntry.registerClass('Diag._serializableLogEntry');
Diag.UlsUtils.registerClass('Diag.UlsUtils');
Diag.UlsUploadConfiguration.registerClass('Diag.UlsUploadConfiguration');
Diag.UploadingUlsHost.registerClass('Diag.UploadingUlsHost', null, Diag.IUlsHost, Sys.IDisposable);
Diag._logCache._trimMessageLength$p = 13;
Diag._logCache._serializationEnvelopeSize$p = 25;
Diag._logCache._serializationSchemaVersion$p = 1;
Diag._logCache._logEnvelopeSize$i = 31;
Diag.UlsUtils._defaultStandardLevel$p = 'VerboseEx';
Diag.UlsUtils._standardUlsLevelMap_BackingField = null;
Diag.UploadingUlsHost.defaultRemoteUlsUrl = 'RemoteUls.ashx';
Diag.UploadingUlsHost.maxUploadAttempts = 3;
Diag.UploadingUlsHost.retryDelay = 15000;
Diag.UploadingUlsHost.sessionIdHeaderName = 'X-UserSessionId';
