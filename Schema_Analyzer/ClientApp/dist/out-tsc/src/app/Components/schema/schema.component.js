var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import '../../../assets/jsplumb/jsplumb.js';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SchemaService } from '../../Services/schema.service.js';
import { NotifierService } from 'angular-notifier';
var SchemaComponent = /** @class */ (function () {
    function SchemaComponent(dialog, _schema, notifier) {
        this.dialog = dialog;
        this._schema = _schema;
        this.loading = false;
        this.relChild = [];
        this.relParent = [];
        // Settings configuration
        this.mySettings = {
            enableSearch: true,
            showCheckAll: true,
            showUncheckAll: true,
            checkedStyle: 'fontawesome',
            buttonClasses: 'btn btn-default btn-block',
            dynamicTitleMaxItems: 3,
            displayAllSelectedText: true
        };
        // Text configuration
        this.myTexts = {
            checkAll: 'Select All Tables',
            uncheckAll: 'Unselect All Tables',
            checked: 'table selected',
            checkedPlural: 'tables selected',
            searchPlaceholder: 'Find',
            searchEmptyResult: 'Nothing found...',
            searchNoRenderText: 'Type in search box to see results...',
            defaultTitle: 'Select Table(s)',
            allSelected: 'Tables All Selected',
        };
        this.htmlSChema = "";
        this.notifier = notifier;
    }
    SchemaComponent.prototype.ngOnInit = function () {
    };
    //_tablesSchema.tables
    SchemaComponent.prototype.openDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
            width: '350px'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.connectSchema(result);
                console.log('result ' + JSON.stringify(result));
            }
            console.log('The dialog was closed' + result);
        });
    };
    SchemaComponent.prototype.connectSchema = function (connectionData) {
        var _this = this;
        this.loading = true;
        this._schema.getallTablesandProperties(connectionData)
            .subscribe(function (data) {
            if (data._tablesSchema.exception != "") {
                _this.notifier.notify('warning', data._tablesSchema.exception);
            }
            else {
                var objTables = [];
                _this.tablesSchemas = data._tablesSchema.tables;
                _this.tablesSchemasRelations = data._tablesSchema.relationKeys;
                //console.log(JSON.stringify(data));
                for (var i = 0; i < data._tablesSchema.tables.length; i++) {
                    objTables.push({ id: data._tablesSchema.tables[i].name, name: data._tablesSchema.tables[i].name });
                }
                //load tables
                _this.myOptions = objTables;
            }
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
            _this.errorManager(error);
        });
    };
    SchemaComponent.prototype.errorManager = function (error) {
        if (error && error.error) {
            this.notifier.notify('warning', 'Problem Creating Schema! Retry, Please...');
        }
    };
    SchemaComponent.prototype.onChange = function () {
        console.log(this.optionsModel);
    };
    SchemaComponent.prototype.demo = function () {
        //jsPlumb.ready(function () {
        //  var j = window.j = jsPlumb.getInstance({ Container: canvas, Connector: ["Flowchart", { stub: 40 }, { gap: 0 }], Endpoint: ["Dot", { radius: 1 }], Anchor: "Center" });
        //  j.bind("connection", function (p) {
        //    p.connection.bind("click", function () {
        //      j.detach(this);
        //    });
        //  });
        //  //var evts = document.querySelector("#events");
        //  //var _appendEvent = function (name, detail) {
        //  //  evts.innerHTML = "<br/><strong>" + name + "</strong><br/> " + detail + "<br/>" + evts.innerHTML;
        //  //};
        //  //j.bind("group:addMember", function (p) {
        //  //  _appendEvent("group:addMember", p.group.id + " - " + p.el.id);
        //  //});
        //  //j.bind("group:removeMember", function (p) {
        //  //  _appendEvent("group:removeMember", p.group.id + " - " + p.el.id);
        //  //});
        //  //j.bind("group:expand", function (p) {
        //  //  _appendEvent("group:expand", p.group.id);
        //  //});
        //  //j.bind("group:collapse", function (p) {
        //  //  _appendEvent("group:collapse", p.group.id);
        //  //});
        //  //j.bind("group:add", function (p) {
        //  //  _appendEvent("group:add", p.group.id);
        //  //});
        //  //j.bind("group:remove", function (p) {
        //  //  _appendEvent("group:remove", p.group.id);
        //  //});
        //  // connect some before configuring group
        //  j.connect({
        //    source: c1_1, target: c2_1
        //  });
        //  j.connect({ source: c2_1, target: c3_1 });
        //  j.connect({ source: c2_2, target: c6_2 });
        //  j.connect({ source: c3_1, target: c4_1 });
        //  j.connect({ source: c4_1, target: c5_1 });
        //  j.connect({ source: c1_1, target: c1_2 });
        //  j.connect({ source: c2_1, target: c2_2 });
        //  // NOTE ordering here. we make one draggable before adding it to the group, and we add the other to the group
        //  //before making it draggable. they should both be constrained to the group extents.
        //  //j.draggable(c1_1);
        //  //j.addGroup({
        //  //  el: container1,
        //  //  id: "one",
        //  //  constrain: true,
        //  //  anchor: "Continuous",
        //  //  endpoint: "Blank",
        //  //  droppable: false
        //  //});
        //  //j.addToGroup("one", c1_1);
        //  //j.addToGroup("one", c1_2);
        //  //j.draggable(c1_2);
        //  //j.draggable(c2_1);
        //  //j.addGroup({
        //  //  el: container2,
        //  //  id: "two",
        //  //  dropOverride: true,
        //  //  endpoint: ["Dot", { radius: 3 }]
        //  //});  //(the default is to revert)
        //  //j.addToGroup("two", c2_1);
        //  //j.addToGroup("two", c2_2);
        //  //j.draggable(c2_2);
        //  //j.draggable(c3_1);
        //  //j.addGroup({
        //  //  el: container3,
        //  //  id: "three",
        //  //  revert: false,
        //  //  endpoint: ["Dot", { radius: 3 }]
        //  //});
        //  //j.addToGroup("three", c3_1);
        //  //j.addToGroup("three", c3_2);
        //  //j.draggable(c3_2);
        //  //j.draggable(c4_1);
        //  //j.addGroup({
        //  //  el: container4,
        //  //  id: "four",
        //  //  prune: true,
        //  //  endpoint: ["Dot", { radius: 3 }]
        //  //});
        //  //j.addToGroup("four", c4_1);
        //  //j.addToGroup("four", c4_2);
        //  //j.draggable(c4_2);
        //  //j.draggable(c5_1);
        //  //j.addGroup({
        //  //  el: container5,
        //  //  id: "five",
        //  //  orphan: true,
        //  //  droppable: false,
        //  //  endpoint: ["Dot", { radius: 3 }]
        //  //});
        //  //j.addToGroup("five", [c5_1, c5_2]);
        //  //j.draggable(c5_2);
        //  //j.draggable(c6_1);
        //  //j.addGroup({
        //  //  el: container6,
        //  //  id: "six",
        //  //  proxied: false,
        //  //  endpoint: ["Dot", { radius: 3 }]
        //  //});
        //  //j.addToGroup("six", [c6_1, c6_2]);
        //  //j.draggable(c6_2);
        //  //j.draggable(c7_1);
        //  //j.addGroup({
        //  //  el: container7,
        //  //  id: "seven",
        //  //  ghost: true,
        //  //  endpoint: ["Dot", { radius: 3 }]
        //  //});
        //  //j.addToGroup("seven", [c7_1, c7_2]);
        //  //j.draggable(c7_2);
        //  //// the independent element that demonstrates the fact that it can be dropped onto a group
        //  //j.draggable("standalone");
        //  ////... and connect others afterwards.
        //  //j.connect({ source: c3_1, target: c3_2 });
        //  //j.connect({ source: c4_1, target: c4_2 });
        //  //j.connect({ source: c5_1, target: c5_2 });
        //  //j.connect({ source: c5_1, target: c3_2 });
        //  //j.connect({ source: c5_1, target: container5, anchors: ["Center", "Continuous"] });
        //  //j.connect({ source: c5_2, target: c6_1 });
        //  //j.connect({ source: c6_2, target: c7_1 });
        //  // delete group button
        //  j.on(canvas, "click", ".del", function () {
        //    var g = this.parentNode.getAttribute("group");
        //    j.removeGroup(g, this.getAttribute("delete-all") != null);
        //  });
        //  // collapse/expand group button
        //  j.on(canvas, "click", ".node-collapse", function () {
        //    var g = this.parentNode.getAttribute("group"), collapsed = j.hasClass(this.parentNode, "collapsed");
        //    j[collapsed ? "removeClass" : "addClass"](this.parentNode, "collapsed");
        //    j[collapsed ? "expandGroup" : "collapseGroup"](g);
        //  });
        //  jsPlumb.fire("jsPlumbDemoLoaded", j);
        //});
    };
    SchemaComponent.prototype.createSchema = function () {
        //this.demo();
        if (typeof (this.optionsModel) === 'undefined' || this.optionsModel === null || this.optionsModel.length === 0) {
            this.notifier.notify('warning', 'Please!, Select Tables and Generate Schema!!...');
            return;
        }
        var objtables = [];
        var objColumns = [];
        var objGroups = [];
        objtables = this.search();
        for (var i = 0; i < objtables.length; i++) {
            console.log('tables in for ' + objtables[i].result.name);
            var container = 'container' + (i + 1);
            var group = 'group' + (i + 1);
            objGroups.push({ container: container, group: group });
            this.htmlSChema += '<div class="group-container" id="' + container + '" group="' + group + '">' +
                '<div class="title" id="' + objtables[i].result.name + '">&nbsp;' + objtables[i].result.name + '</div>' +
                '<ul style="font-size:12px;width:80%;height:85%;overflow:auto">';
            objColumns = objtables[i].result.columns;
            for (var ii = 0; ii < objColumns.length; ii++) {
                if (objColumns[ii].isPrimaryKey) {
                    this.htmlSChema += '<li><div class="key" id="' + objColumns[ii].nameColumn + '/' + objtables[i].result.name + '"><span class="fa fa-key" style="color:darkgoldenrod"></span>&nbsp;' + objColumns[ii].nameColumn + '<strong>:' + objColumns[ii].typeColumn + '</strong></div></li>';
                }
                else if (objColumns[ii].isForeignKey) {
                    this.htmlSChema += '<li><div class="key" id="' + objColumns[ii].nameColumn + '/' + objtables[i].result.name + '"><span class="fa fa-key" style="color:grey"></span>&nbsp;' + objColumns[ii].nameColumn + '<strong>:' + objColumns[ii].typeColumn + '</strong></div></li>';
                }
                else {
                    this.htmlSChema += '<li><div class="key" id="' + objColumns[ii].nameColumn + '/' + objtables[i].result.name + '">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + objColumns[ii].nameColumn + '<strong>:' + objColumns[ii].typeColumn + '</strong></div></li>';
                }
            }
            this.htmlSChema += '</ul>';
            this.htmlSChema += '<div class="del" delete-all></div>' +
                '<div class="node-collapse"></div>';
            var relationsTableParent = this.searchRelationByTable(objtables[i].result.name, true);
            var relationsTableChild = this.searchRelationByTable(objtables[i].result.name, false);
            if (relationsTableParent.length > 0) {
                this.relParent.push({ relationsTableParent: relationsTableParent });
                for (var ii = 0; ii < relationsTableParent.length; ii++) {
                    this.htmlSChema += '<div id="' + relationsTableParent[ii].idRelation + '" class="w" style="left:170px;top:30px">∞</div>';
                }
            }
            if (relationsTableChild.length > 0) {
                this.relChild.push({ relationsTableChild: relationsTableChild });
                for (var ii = 0; ii < relationsTableChild.length; ii++) {
                    this.htmlSChema += '<div id="' + relationsTableChild[ii].idRelation + '" class="w" style="left:170px;top:30px" matTooltip="tooltip text" matTooltipPosition="above">1</div>';
                }
            }
            this.htmlSChema += '</div>';
        }
        setTimeout(function (relParent, relChild, dialog, tablesSchemas) {
            var connections = [];
            //console.log('relations Child [] ' + JSON.stringify(relChild));
            var j = window.j = jsPlumb.getInstance({ Container: canvas, Connector: ["Flowchart", { stub: 40 }, { gap: 0 }], Endpoint: ["Dot", { radius: 1 }], Anchor: "Center" });
            j.bind("connection", function (p) {
                p.connection.bind("click", function () {
                    j.detach(this);
                });
            });
            //console.log('relations parent3 [] ' + JSON.stringify(relParent));
            for (var i = 0; i < relParent.length; i++) {
                if (relParent[i].relationsTableParent.length > 0) {
                    for (var ii = 0; ii < relParent[i].relationsTableParent.length; ii++) {
                        var source = relParent[i].relationsTableParent[ii].idRelation;
                        // console.log('relations parent 1 ' + source);
                        for (var iii = 0; iii < relChild.length; iii++) {
                            if (relChild[iii].relationsTableChild.length > 0) {
                                var _target = relChild[iii].relationsTableChild.find(function (obj) { return obj.idRelation === "C" + source; });
                                console.log('target ' + JSON.stringify(_target));
                                if (_target) {
                                    var target = _target.idRelation;
                                    connections.push({ source: source, target: target });
                                }
                            }
                        }
                    }
                }
            }
            console.log('connections ' + JSON.stringify(connections));
            for (var i = 0; i < connections.length; i++) {
                j.connect({
                    source: connections[i].source, target: connections[i].target
                });
            }
            for (var i = 0; i < objGroups.length; i++) {
                var tpl = document.querySelector("#" + objGroups[i].container + "");
                j.addGroup({
                    el: tpl,
                    id: objGroups[i].group,
                    constrain: true,
                    anchor: "Continuous",
                    endpoint: "Blank",
                    droppable: false
                });
            }
            //j.addGroup({
            //  el: "container1",
            //  id: "group1",
            //  constrain: true,
            //  anchor: "Continuous",
            //  endpoint: "Blank",
            //  droppable: false
            //});
            //j.addGroup({
            //  el: "container2",
            //  id: "group2",
            //  constrain: true,
            //  anchor: "Continuous",
            //  endpoint: "Blank",
            //  droppable: false
            //});
            //j.addGroup({
            //  el: container2,
            //  id: "two",
            //  dropOverride: true,
            //  endpoint: ["Dot", { radius: 3 }]
            //});  //(the default is to revert)
            // delete group button
            //j.on(canvas, "click", ".del", function () {
            //  var g = this.parentNode.getAttribute("group");
            //  j.removeGroup(g, this.getAttribute("delete-all") != null);
            //});
            // collapse/expand group button
            j.on(canvas, "click", ".node-collapse", function () {
                var g = this.parentNode.getAttribute("group"), collapsed = j.hasClass(this.parentNode, "collapsed");
                console.log('connections234234 ' + JSON.stringify(g));
                j[collapsed ? "removeClass" : "addClass"](this.parentNode, "collapsed");
                j[collapsed ? "expandGroup" : "collapseGroup"](g);
            });
            j.on(canvas, "dblclick", ".title", function (event) {
                event = event || window.event; // IE
                var target = event.target || event.srcElement; // IE
                var idTable = target.id;
                console.log('idTable ' + idTable);
                var table = tablesSchemas.find(function (obj) { return obj.name === idTable; });
                if (table) {
                    var dialogRef = dialog.open(DialogInformation, {
                        width: '350px',
                        data: {
                            titledoinfo: "Table: " + idTable,
                            bodydoinfo: table.descrip
                        }
                    });
                }
            });
            j.on(canvas, "dblclick", ".key", function (event) {
                event = event || window.event; // IE
                var target = event.target || event.srcElement; // IE
                var dataColumn = target.id;
                var splittColumn = dataColumn.split("/");
                var idColumn = splittColumn[0];
                var idTable = splittColumn[1];
                console.log('idTable ' + idTable + 'idColumn ' + idColumn);
                var table = tablesSchemas.find(function (obj) { return obj.name === idTable; });
                if (table) {
                    var column = table.columns.find(function (obj) { return obj.nameColumn === idColumn; });
                    if (column) {
                        var dialogRef = dialog.open(DialogInformation, {
                            width: '350px',
                            data: {
                                titledoinfo: "Column: " + idColumn,
                                bodydoinfo: column.descrip
                            }
                        });
                    }
                }
            });
            jsPlumb.fire("jsPlumbDemoLoaded", j);
            //}, prueba.slice(0));
        }, 3000, this.relParent.slice(0), this.relChild.slice(0), this.dialog, this.tablesSchemas);
    };
    SchemaComponent.prototype.search = function () {
        var matches = [];
        var a = [];
        a = this.optionsModel;
        var b = [];
        b = this.tablesSchemas;
        for (var i = 0; i < a.length; i++) {
            //console.log('tabla ' + a[i]);
            var result = b.find(function (obj) { return obj.name === a[i]; });
            //console.log('tables search ' + JSON.stringify(result));
            matches.push({ result: result });
        }
        return matches;
    };
    SchemaComponent.prototype.searchRelationByTable = function (nameTable, isChild) {
        //console.log('table call ' + nameTable);
        var matches;
        var matches2 = [];
        var a = [];
        a = this.optionsModel;
        var b = [];
        b = this.tablesSchemasRelations;
        if (isChild) {
            var result = this.tablesSchemasRelations.filter(function (obj) { return obj.child === nameTable; });
            matches = result;
            for (var i = 0; i < matches.length; i++) {
                for (var ii = 0; ii < a.length; ii++) {
                    if (a[ii] != nameTable) {
                        if (matches[i].parent === a[ii]) {
                            matches2.push({ nameTable: nameTable, tableParent: matches[i].parent, idRelation: matches[i].relationParent });
                        }
                    }
                }
            }
        }
        else {
            var result = this.tablesSchemasRelations.filter(function (obj) { return obj.parent === nameTable; });
            matches = result;
            for (var i = 0; i < matches.length; i++) {
                for (var ii = 0; ii < a.length; ii++) {
                    if (a[ii] != nameTable) {
                        if (matches[i].child === a[ii]) {
                            matches2.push({ nameTable: nameTable, tableChild: matches[i].child, idRelation: matches[i].relationChild });
                        }
                    }
                }
            }
        }
        return matches2;
    };
    SchemaComponent = __decorate([
        Component({
            selector: 'app-schema',
            templateUrl: './schema.component.html',
            styleUrls: ['./schema.component.css'],
            encapsulation: ViewEncapsulation.None,
        }),
        __metadata("design:paramtypes", [MatDialog, SchemaService, NotifierService])
    ], SchemaComponent);
    return SchemaComponent;
}());
export { SchemaComponent };
var DialogOverviewExampleDialog = /** @class */ (function () {
    function DialogOverviewExampleDialog(dialogRef, notifier) {
        this.dialogRef = dialogRef;
        this.connectionData = {};
    }
    DialogOverviewExampleDialog.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    DialogOverviewExampleDialog = __decorate([
        Component({
            selector: 'app-donewschema',
            templateUrl: './dialogs/donewschema.html',
        }),
        __metadata("design:paramtypes", [MatDialogRef, NotifierService])
    ], DialogOverviewExampleDialog);
    return DialogOverviewExampleDialog;
}());
export { DialogOverviewExampleDialog };
var DialogInformation = /** @class */ (function () {
    function DialogInformation(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    DialogInformation.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    DialogInformation = __decorate([
        Component({
            selector: 'app-information',
            templateUrl: './dialogs/information.html',
        }),
        __param(1, Inject(MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [MatDialogRef, Object])
    ], DialogInformation);
    return DialogInformation;
}());
export { DialogInformation };
//# sourceMappingURL=schema.component.js.map