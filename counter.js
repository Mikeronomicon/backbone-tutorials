
var Counter = Backbone.Model.extend({
    defaults : {"value" : 0}
});

var CounterView = Backbone.View.extend({
    render: function () {
        var val = this.model.get("value");
        var dec = '<button id="dec">Decrement</button>'
        var btn = '<button id="btn">Increment</button>';
        this.$el.html('<p>'+val+'</p>' + btn + dec);
    }
});

//this is tacky, and I don't like it.
var counterModel, counterView;
$(document).ready( function () {

counterModel = new Counter();

var counterView = new CounterView({model : counterModel});
counterView.render();

counterModel.on("change", function () {
    counterView.render();
});

counterView.$el.on("click","#btn", function () {
    var mod = counterView.model;
    var currVal = mod.get("value");
    mod.set("value",currVal+1);
});

counterView.$el.on("click", "#dec", function () {
    var mod = counterView.model;
    var currVal = mod.get("value");
    mod.set("value", currVal-1);
    if (currVal === 0) {
        mod.set("value",currVal);
    }
});

$("#counterdiv").append(counterView.$el);

});
