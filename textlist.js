
$(document).ready( function () {

var TextModel = Backbone.Model.extend({
    defaults : {"value" : "0", "count" : 0},
    replace : function (str) {
      this.set("value", str);
      var count = this.get("count");
      this.set("count", count + 1);
    }
});

var TextView = Backbone.View.extend({
    render: function () {
        var textVal = this.model.get("value");
        var count = this.model.get("count");
        var btn = '<button id="clr">Clear</button>';
        var input = '<input type="text" value="' + textVal + '" />';
        this.$el.html(textVal+"<br><div>" + input + btn + count +"</div>");
    },
    initialize: function () {
        this.model.on("change", this.render, this);
        // last argument 'this' ensures that render's
        // 'this' means the view, not the model
    },
    events : {
        "click button" : "clear", 
        "keypress input" : "updateOnEnter",
    },
    replace : function () {
        var str = this.$el.find("input").val();
        this.model.replace(str);
    },
    clear : function () {
        this.model.replace("");
    },
    updateOnEnter : function (e) {
        if(e.keyCode == 13) {
            this.replace();
        }
    }
});

var TextCollection = Backbone.Collection.extend({
    model : TextModel
});

var TextCollectionView = Backbone.View.extend({
    render : function () {
        var btn = '<button id="addbutton">Add Text</button>';
        var del = '<button id="deletebutton">Delete</button>';
        var div = '<div id="text-list"></div>';
        this.$el.html(div + btn + del);
    },
    initialize : function () {
        this.listenTo(this.collection, 'add', this.addView);
        this.views = [];
    },
    events : {
        "click #addbutton" : "addModel",
        "click #deletebutton" : "removeView",
    },
    addModel : function () {
        this.collection.add({});
        // collection adds a model, fires add event, then listener calls this.addView(model)
    },
    addView : function (newModel) {
        newModel.set("value","Enter something here...");
        var view = new TextView({model : newModel});
        this.views.push(view);
        view.render();
        this.$("#text-list").append(view.$el);
    },
    removeModel : function () {
        this.collection.remove();
    },
    removeView : function () {
        var oldView = this.views.pop();
        oldView.remove();
    },
});

var textCollection = new TextCollection();

var textCollectionView = new TextCollectionView({ collection : textCollection});

textCollectionView.render();

$("#listdiv").append(textCollectionView.$el);

});
